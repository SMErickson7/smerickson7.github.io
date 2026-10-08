---
# Template for a trip page. Files starting with _ are not published.
# Copy this to _trips/YYYY-MM-DD-short-name.md (the date is the trip's start).
# The page is published at /travel/short-name/.
title: Short Trip Name
date: 2025-12-01
end_date: 2025-12-12          # Optional. Shows the trip length.
countries: [Italy, Germany]   # Names must match _data/stamps.yml to show flags.
places: [Rome, Berlin]        # Map markers. Names must match _data/places.yml.
note: One or two sentences shown on the timeline and at the top of the trip page.
cover: /assets/img/trips/short-name/cover.jpg   # Optional. Wide photo for the timeline and page header.
post: /writing/my-post/       # Optional. Related blog post.

# Optional. One entry per day. Everything except date is optional.
days:
  - date: 2025-12-02
    title: Colosseum and Trevi Fountain
    place: Rome                 # Which marker this day belongs to.
    text: What happened that day. A short paragraph.
    sights:                     # Extra markers for specific sights. lat/lng are optional.
      - { name: Colosseum, lat: 41.8902, lng: 12.4922 }
      - { name: Trevi Fountain, lat: 41.9009, lng: 12.4833 }
    photos:
      - { src: /assets/img/trips/short-name/colosseum.jpg, caption: The Colosseum at sunset }

# Optional. Photos not tied to a specific day.
photos:
  - { src: /assets/img/trips/short-name/train.jpg, caption: The train to Berlin }
---
Optional longer story in Markdown. Shown between the overview and the day-by-day section.
