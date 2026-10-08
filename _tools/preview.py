#!/usr/bin/env python3
"""Rough local preview of the Jekyll site without Ruby.

GitHub Pages builds the real site with Jekyll. This script approximates it for
the small subset of Liquid used in _layouts, _includes and the new pages, so
pages can be checked before pushing. Jekyll ignores this folder (it starts with _).

usage: python3 _tools/preview.py OUT_DIR [--sample]
  --sample  add placeholder posts so the writing layouts can be seen populated
"""
import datetime as dt
import os
import re
import shutil
import sys

import jinja2
import markdown
import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FM = re.compile(r"^---\s*\n(.*?)\n---\s*\n?(.*)$", re.S)


def read(path):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    m = FM.match(text)
    if not m:
        return None, text
    return yaml.safe_load(m.group(1)) or {}, m.group(2)


def liquid_to_jinja(src):
    def include(m):
        name, args = m.group(1), m.group(2).strip()
        pairs = re.findall(r"(\w+)=(\"[^\"]*\"|'[^']*'|[\w.]+)", args)
        items = ", ".join(f"'{k}': {v}" for k, v in pairs)
        return "{% with include = {" + items + "} %}{% include '" + name + "' %}{% endwith %}"

    src = re.sub(r"{%\s*include\s+([\w.-]+)(.*?)%}", include, src)

    def loop(m):
        var, coll, opts = m.group(1), m.group(2), m.group(3)
        lim = re.search(r"limit:\s*(\d+)", opts)
        off = re.search(r"offset:\s*(\d+)", opts)
        o = int(off.group(1)) if off else 0
        end = str(o + int(lim.group(1))) if lim else ""
        return "{% for " + var + " in (" + coll + ")[" + str(o) + ":" + end + "] %}"

    src = re.sub(r"{%\s*for\s+(\w+)\s+in\s+([\w.]+)(.*?)%}", loop, src)
    src = re.sub(r"{%\s*assign\s", "{% set ", src)
    src = re.sub(r"([\w.]+)\.size\b", r"(\1|length)", src)
    src = re.sub(r"\|\s*(\w+):\s*(\"[^\"]*\"|'[^']*'|[\w.]+)", r"| \1(\2)", src)
    src = re.sub(r"\btrue\b", "True", src)
    return src


class LiquidEnv(jinja2.Environment):
    """Liquid looks up keys before methods, so `now.items` is the data, not dict.items."""

    def getattr(self, obj, attribute):
        if isinstance(obj, dict):
            return obj[attribute] if attribute in obj else self.undefined(obj=obj, name=attribute)
        return super().getattr(obj, attribute)


def env_for():
    env = LiquidEnv(
        loader=jinja2.FunctionLoader(lambda n: liquid_to_jinja(open(os.path.join(ROOT, "_includes", n), encoding="utf-8").read())),
        autoescape=False,
    )

    def date(v, fmt):
        if isinstance(v, str):
            v = dt.datetime.fromisoformat(v)
        return v.strftime(fmt.replace("%-d", str(v.day)))

    env.filters.update(
        date=date,
        minus=lambda a, b: int(a) - int(b),
        plus=lambda a, b: int(a) + int(b),
        divided_by=lambda a, b: int(a) // int(b),
        number_of_words=lambda s: len(re.findall(r"\S+", re.sub(r"<[^>]+>", " ", s or ""))),
    )
    return env


def sample_posts():
    topics = ["building", "marketing", "cycling", "3d-printing", "marketing", "building"]
    posts = []
    for i, t in enumerate(topics):
        posts.append({
            "title": f"[Sample post {i + 1}: placeholder title for layout testing]",
            "description": "[Placeholder description. Real posts will set this in their front matter.]",
            "topic": t,
            "date": dt.datetime(2026, 10, 6 - i),
            "slug": f"sample-{i + 1}",
            "body": "[Placeholder body]\n\n## A heading\n\nSome text with a [link](#).\n\n> A quote.\n\n" + ("Lorem text. " * 120),
        })
    return posts


def main():
    out = sys.argv[1]
    sample = "--sample" in sys.argv
    config = yaml.safe_load(open(os.path.join(ROOT, "_config.yml"), encoding="utf-8"))
    data = {}
    for fn in os.listdir(os.path.join(ROOT, "_data")):
        if fn.endswith(".yml"):
            data[fn[:-4]] = yaml.safe_load(open(os.path.join(ROOT, "_data", fn), encoding="utf-8"))
    env = env_for()
    md = markdown.Markdown(extensions=["extra", "sane_lists"])

    raw_posts = []
    pdir = os.path.join(ROOT, "_posts")
    if os.path.isdir(pdir):
        for fn in sorted(os.listdir(pdir)):
            m = re.match(r"(\d{4})-(\d\d)-(\d\d)-(.+)\.md$", fn)
            if m:
                fm, body = read(os.path.join(pdir, fn))
                fm.update(date=dt.datetime(*map(int, m.group(1, 2, 3))), slug=m.group(4), body=body)
                raw_posts.append(fm)
    if sample:
        raw_posts += sample_posts()
    raw_posts.sort(key=lambda p: p["date"], reverse=True)
    posts = []
    for p in raw_posts:
        p = dict(p)
        p["url"] = f"/writing/{p['slug']}/"
        p["content"] = md.reset().convert(p.pop("body"))
        p.setdefault("layout", "post")
        posts.append(p)
    for i, p in enumerate(posts):
        p["next"] = posts[i - 1] if i > 0 else None
        p["previous"] = posts[i + 1] if i + 1 < len(posts) else None

    site = dict(config, data=data, posts=posts, time=dt.datetime.now())

    def render_layout(name, content, page):
        fm, src = read(os.path.join(ROOT, "_layouts", name + ".html"))
        merged = dict(fm or {}, **page)
        html = env.from_string(liquid_to_jinja(src)).render(site=site, page=merged, content=content)
        if fm and fm.get("layout"):
            return render_layout(fm["layout"], html, merged)
        return html

    def write(url, html):
        path = os.path.join(out, url.strip("/"), "index.html") if url.endswith("/") else os.path.join(out, url.strip("/"))
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            f.write(html)

    if os.path.exists(out):
        shutil.rmtree(out)
    os.makedirs(out)
    # Static files: link every top-level entry Jekyll would copy.
    for entry in os.listdir(ROOT):
        if entry.startswith(("_", ".")) or entry in ("new", "writing", "workshop", "about"):
            continue
        os.symlink(os.path.join(ROOT, entry), os.path.join(out, entry))

    for folder in ("new", "writing", "workshop", "about"):
        fm, src = read(os.path.join(ROOT, folder, "index.html"))
        page = dict(fm, url=fm.get("permalink", f"/{folder}/"))
        body = env.from_string(liquid_to_jinja(src)).render(site=site, page=page)
        write(page["url"], render_layout(fm["layout"], body, page))

    for p in posts:
        write(p["url"], render_layout(p["layout"], p["content"], p))
    print(f"built {len(posts)} posts into {out}")


if __name__ == "__main__":
    main()
