#!/usr/bin/env python3
"""Pull the ride log from Google Sheets and write _data/rides.json.

The GitHub Action in .github/workflows/sync-rides.yml runs this every morning.
It reads the "Log" tab of the Strava Ride log sheet, keeps only rows whose Type
is "Ride", and writes every ride plus the all-time totals the site shows.
Jekyll ignores this folder (it starts with _).

The sheet has to stay shared as "Anyone with the link can view" for the
download to work. No API key or login is needed.

usage:
  python3 _tools/sync_rides.py               # download from the sheet
  python3 _tools/sync_rides.py --csv log.csv # use a local CSV export instead
"""
import csv
import io
import json
import os
import sys
import urllib.request
from datetime import datetime

SHEET_ID = "1HpMowcG-Ll-oQF_2U0mlNvRer2Pm9xnTF9w8Oo128us"
LOG_GID = "0"  # the "Log" tab
EXPORT_URL = f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={LOG_GID}"

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "_data", "rides.json")

# Column headers in the Log tab. Change these if you rename a column.
COL_DATE = "Date"
COL_NAME = "Ride Name"
COL_MILES = "Distance (mi)"
COL_TIME = "Time (minutes)"  # holds h:mm:ss despite the name
COL_ELEV = "Total elevation (ft)"
COL_TYPE = "Type"
COL_BIKE = "Bike"


def fetch_csv():
    req = urllib.request.Request(EXPORT_URL, headers={"User-Agent": "smerickson7-ride-sync"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        body = resp.read().decode("utf-8-sig")
    if body.lstrip().startswith("<"):
        sys.exit("Got a web page instead of CSV. Is the sheet shared as 'Anyone with the link can view'?")
    return body


def to_float(value):
    value = (value or "").replace(",", "").strip()
    return float(value) if value else 0.0


def to_seconds(value):
    """'1:05:48' -> 3948. Also accepts 'mm:ss' or plain minutes."""
    value = (value or "").strip()
    if not value:
        return 0
    parts = value.split(":")
    if len(parts) == 1:
        return round(float(parts[0]) * 60)
    seconds = 0
    for part in parts:
        seconds = seconds * 60 + float(part)
    return round(seconds)


def to_iso(value):
    value = value.strip()
    for fmt in ("%m/%d/%Y", "%Y-%m-%d", "%m/%d/%y"):
        try:
            return datetime.strptime(value, fmt).strftime("%Y-%m-%d")
        except ValueError:
            pass
    raise ValueError(f"Unrecognized date: {value!r}")


def commas(number, places=0):
    return f"{number:,.{places}f}"


def duration(seconds):
    minutes = round(seconds / 60)
    hours, minutes = divmod(minutes, 60)
    h = f"{commas(hours)} {'hour' if hours == 1 else 'hours'}"
    m = f"{minutes} {'minute' if minutes == 1 else 'minutes'}"
    return f"{h}, {m}" if hours else m


def parse(text):
    rides = []
    for row in csv.DictReader(io.StringIO(text)):
        if (row.get(COL_TYPE) or "").strip().lower() != "ride":
            continue
        if not (row.get(COL_DATE) or "").strip():
            continue
        rides.append({
            "date": to_iso(row[COL_DATE]),
            "name": " ".join((row.get(COL_NAME) or "").split()),
            "miles": round(to_float(row.get(COL_MILES)), 2),
            "seconds": to_seconds(row.get(COL_TIME)),
            "elevation_ft": round(to_float(row.get(COL_ELEV))),
            "bike": (row.get(COL_BIKE) or "").strip(),
        })
    # Newest first; keep same-day rides in sheet order.
    rides.sort(key=lambda r: r["date"], reverse=True)
    return rides


def summarize(rides):
    miles = sum(r["miles"] for r in rides)
    elev = sum(r["elevation_ft"] for r in rides)
    secs = sum(r["seconds"] for r in rides)
    longest = max(rides, key=lambda r: r["miles"])
    climb = max(rides, key=lambda r: r["elevation_ft"])
    bikes = {}
    for r in rides:
        b = bikes.setdefault(r["bike"], {"name": r["bike"], "rides": 0, "miles": 0.0})
        b["rides"] += 1
        b["miles"] += r["miles"]
    return {
        "rides": len(rides),
        "miles": round(miles, 2),
        "elevation_ft": elev,
        "seconds": secs,
        # Ready-to-print strings for Liquid, which can't add thousands separators.
        "display": {
            "rides": commas(len(rides)),
            "distance": f"{commas(miles, 1)} miles",
            "elevation": f"{commas(elev)} ft",
            "time": duration(secs),
            "longest": f"{longest['miles']:.2f} miles",
            "most_climbing": f"{commas(climb['elevation_ft'])} ft",
        },
        "bikes": [
            {"name": b["name"], "rides": commas(b["rides"]), "miles": commas(b["miles"], 1)}
            for b in sorted(bikes.values(), key=lambda b: -b["rides"])
        ],
    }


def main():
    if len(sys.argv) == 3 and sys.argv[1] == "--csv":
        with open(sys.argv[2], encoding="utf-8-sig") as f:
            text = f.read()
    else:
        text = fetch_csv()
    rides = parse(text)
    if not rides:
        sys.exit("No rides found. Check the column names at the top of this script.")
    data = {
        "source": "Strava Ride log (Google Sheets), Log tab",
        "last_ride": rides[0]["date"],
        "totals": summarize(rides),
        "rides": rides,
    }
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
        f.write("\n")
    t = data["totals"]["display"]
    print(f"Wrote {len(rides)} rides to {os.path.relpath(OUT, ROOT)}: {t['distance']}, {t['elevation']}, {t['time']}")


if __name__ == "__main__":
    main()
