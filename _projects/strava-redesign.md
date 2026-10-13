---
layout: project
title: Strava, redesigned
kind: UX audit
order: 4
summary: A self-initiated audit of the ride-tracking screens, finding where the app adds friction mid-ride, and a redesign that keeps the route and the numbers in one glance.
goal: Make mid-ride screens readable at a glance
built_with: Miro, Figma, Illustrator, InDesign
result: "4 fixes: route clarity, bigger buttons, auto-rotate, one view"
link_label: Read the case study
tags: [UX, Figma, Cycling]
visual:
  type: image
  src: /assets/img/strava-card.jpg
  alt: Annotated Strava ride screens with sticky notes marking problems
---

<p class="case-meta">An unsolicited redesign case study · Published December 15, 2022</p>

<nav class="case-nav" aria-label="Case study sections">
  <a class="chip" href="#problem">The problem</a>
  <a class="chip" href="#process">The process</a>
  <a class="chip" href="#solution">The solution</a>
  <a class="chip" href="#conclusion">Conclusion</a>
</nav>

## The problem {#problem}

**Strava's experience for cyclists created usability issues that could potentially put the cyclist in danger.**

User feedback indicated that cyclists found certain aspects of Strava's experience frustrating and created anxiety. Buttons (placement, padding, and size), flow, and color scheme are the top areas of concern for cyclists.

### Goals

1. Reduce the amount of app interactions during a bike ride
2. Condense important information into one view during a bike ride
3. Create a clearer and vibrant bike ride experience by redesigning existing components and introducing new components and features

### Scope

I only focused on redesigning Strava's cycling in-ride and post ride experience on the Android app.

### Tools

Figma, Miro, Strava brand guidelines, Adobe Illustrator, and Adobe InDesign.

### Background

<details class="case-more">
  <summary>What is Strava?</summary>
  <p>Strava is a social network for athletes and weekend warriors to track, measure, analyze, and share their physical exercise activities. Their platform has over 30 types of activities and its social network features has created the largest sports community in the world. It is the leading service to record and upload cycling rides through its mobile app or via a third-party GPS bike computer. Each ride records time, speed, distance, and elevation. Additional features, like user-generated "segments", brings a competitive spirit to the social networking side of Strava.</p>
</details>

<details class="case-more">
  <summary>How and why I got into cycling</summary>
  <p>I started cycling in the summer of 2018 after a couple of friends talked about their rides. For over 20 years I played soccer to keep the extra pounds off, but it was taking a toll on my body. My knees and lower back were sore and strained from playing on artificial turf. I was looking for a new, fun, and low impact activity. And if I could do it with my friends, even better. I didn't know much about cycling (I did know how to ride a bike), so through the advice of my close friends, I purchased my first road bike, acquired the right gear, and downloaded Strava.</p>
  <figure class="case-figure">
    <img src="/img/cycling-small.jpg" alt="Steven halfway through a 48 mile ride" loading="lazy">
    <figcaption>Halfway through a 48 mile ride.</figcaption>
  </figure>
</details>

## The process {#process}

### Experience map

To simulate a real-world, design thinking activity, I created an experience map in Miro. This map is similar to an affinity diagram, but highlights the order of actions and pain points experienced along the way.

First, I added steps for each objective that are common during a cycling ride with Strava. Then, I added feelings that were gathered from user interviews for those objectives. The feelings are grouped into themes. Green boxes represent a positive experience, yellow boxes represent a neutral experience, and red boxes represent a negative experience.

<figure class="case-figure case-figure--wide">
  <a href="/img/portfolio/strava/new/strava_experience_map.jpg"><img src="/img/portfolio/strava/new/strava_experience_map.jpg" alt="Experience map in Miro with ride steps and color-coded sticky notes for positive, neutral, and negative feelings" loading="lazy"></a>
  <figcaption>The experience map. Select the image to open it full size.</figcaption>
</figure>

<figure class="case-figure">
  <a href="/img/portfolio/strava/current_problems.png"><img src="/img/portfolio/strava/current_problems.png" alt="Current Strava ride screens annotated with the four pain points" loading="lazy"></a>
  <figcaption>The current ride screens, annotated with the four pain points below.</figcaption>
</figure>

### Pain point: Route visibility

**Improve readability on route visibility.** Strava uses two shades of blue to visualize the route and the cyclist's progress. A more contrasting color palette is needed to improve readability on route visibility and cyclist's safety.

### Pain point: Buttons

**Improve button placement, size, and padding.** The cluster of icons on the map are small and too close together, especially during a ride. To accommodate different use cases, the buttons need to be bigger with more padding and placed in more accessible areas.

<div class="case-usecases">
  <figure class="case-usecase">
    <img src="/img/cycling-gloves.jpg" alt="Full-fingered cycling gloves" loading="lazy">
    <figcaption>Full fingered gloves for cold weather riding make tapping small icons, and icons on the edge of the display, difficult.</figcaption>
  </figure>
  <figure class="case-usecase">
    <img src="/img/phone-case.jpg" alt="Phone in a pouch-style bike mount" loading="lazy">
    <figcaption>Phone mounts make icons on the outer edge of the display difficult to reach. This pouch mount makes the outer edge even more inaccessible.</figcaption>
  </figure>
</div>

### Pain point: Auto-rotate

**Enable auto-rotate map to keep direction of travel up.** In map view, the map does not rotate in the cyclist's direction of travel. Enable auto-rotate to prevent cyclists from manually rotating the map to keep their direction of travel up while cycling.

<p class="case-note"><strong>Update:</strong> Strava solved this in summer of 2022. However, when the ride is auto-paused, the compass will default back to "north up". The cyclist has to tap the compass icon to change back to "auto-rotate".</p>

### Pain point: Ride metrics

**Condense map and ride metrics to one view.** To see speed, distance traveled, or time elapsed, a cyclist must tap the small icon in the bottom right. Give the cyclist an option to view metrics and map on one view.

### Wireframes

<figure class="case-figure case-figure--wide">
  <a href="/img/portfolio/strava/new/sketches.jpg"><img src="/img/portfolio/strava/new/sketches.jpg" alt="Hand-drawn wireframe sketches of the redesigned ride screens" loading="lazy"></a>
</figure>

## The solution {#solution}

### Solution: Route visibility

I changed the color that represents the remaining part of the route to Strava's orange and stroked it with a darker orange (Rust in Strava's color palette).

<div class="case-swatches">
  <figure><span class="case-swatch case-swatch--remaining"></span><figcaption>Remaining</figcaption></figure>
  <figure><span class="case-swatch case-swatch--completed"></span><figcaption>Completed</figcaption></figure>
</div>

### Solution: Buttons

The primary buttons, "Locate" and "Compass", were increased by 42%. They were increased to make them easier for the cyclist to tap while traveling at speed. The terrain and 2D/3D buttons remain the same size because these buttons are secondary to the other buttons on the map. The button to switch screens was increased by 70% and matches the size of the "Stop" button in the center.

Padding for the buttons on the map was increased, and the buttons were moved further away from the edge to address limitations caused by cyclists' gloves, phone mounts, and reduced touch precision.

<div class="case-locate">
  <figure><img src="/img/portfolio/strava/new/locate.svg" alt="Locate button at its original size" width="52" height="52"><figcaption>Original size</figcaption></figure>
  <figure><img src="/img/portfolio/strava/new/locate.svg" alt="Locate button at its redesigned size" width="75" height="75"><figcaption>Redesign size</figcaption></figure>
</div>

### Solution: Ride metrics

In map view, I utilized the empty space in the lower left for displaying ride metrics. I give the cyclist three static options to choose from (remaining distance, total distance, and a progress visual). Tapping this area will allow the cyclist to switch options. Additionally, in Settings, an option to auto-rotate the three options will be available.

<div class="case-viewer" data-case-viewer>
  <div class="case-viewer__controls">
    <div class="chips" role="group" aria-label="Ride metric option">
      <button type="button" class="chip chip--active" data-option="remaining" aria-pressed="true">Distance remaining</button>
      <button type="button" class="chip" data-option="total" aria-pressed="false">Distance total</button>
      <button type="button" class="chip" data-option="progressbar" aria-pressed="false">Progress visual</button>
    </div>
    <button type="button" class="chip" data-dark aria-pressed="false">Dark mode</button>
  </div>
  <img class="case-viewer__image" src="/img/portfolio/strava/new/redesign-map-remaining.png" alt="Redesigned map view showing distance remaining in the lower left" data-viewer-image>
</div>

### Redesign: Metrics view

I redesigned the metrics view to incorporate the new metrics (remaining distance and progress visual).

<div class="case-compare">
  <figure><a href="/img/portfolio/strava/new/current-speed.png"><img src="/img/portfolio/strava/new/current-speed.png" alt="Current Strava metrics view" loading="lazy"></a><figcaption>Current</figcaption></figure>
  <figure><a href="/img/portfolio/strava/new/redesign-speed.png"><img src="/img/portfolio/strava/new/redesign-speed.png" alt="Redesigned metrics view with remaining distance and a progress visual" loading="lazy"></a><figcaption>Redesign</figcaption></figure>
</div>

### New view: Map and metrics view

Taking inspiration from the current extended pause view, I designed a view that combines the map and metric view. It provides the cyclist their speed (current speed and average speed), distance, and time elapsed.

<div class="case-compare">
  <figure><a href="/img/portfolio/strava/new/current-map-metrics-paused.png"><img src="/img/portfolio/strava/new/current-map-metrics-paused.png" alt="Current extended pause view with map and metrics" loading="lazy"></a><figcaption>Current extended pause view</figcaption></figure>
  <figure><a href="/img/portfolio/strava/new/redesign-map-metric.png"><img src="/img/portfolio/strava/new/redesign-map-metric.png" alt="New combined map and metrics view during a ride" loading="lazy"></a><figcaption>New view</figcaption></figure>
</div>

### Redesign: Post activity view

I redesigned the post activity view to condense it to be completely visible without scrolling.

<div class="case-compare case-compare--three">
  <figure><a href="/img/portfolio/strava/new/current-post-top.png"><img src="/img/portfolio/strava/new/current-post-top.png" alt="Current post activity view, top of the screen" loading="lazy"></a><figcaption>Current view</figcaption></figure>
  <figure><a href="/img/portfolio/strava/new/current-post-bottom.png"><img src="/img/portfolio/strava/new/current-post-bottom.png" alt="Current post activity view, below the fold" loading="lazy"></a><figcaption>Current view below the fold</figcaption></figure>
  <figure><a href="/img/portfolio/strava/new/redesign-post.png"><img src="/img/portfolio/strava/new/redesign-post.png" alt="Redesigned post activity view that fits on one screen" loading="lazy"></a><figcaption>New view</figcaption></figure>
</div>

### Dark mode prototypes

Each of the redesigned screens also has a dark mode version.

<div class="case-compare case-compare--four">
  <figure><a href="/img/portfolio/strava/new/redesign-dark-mode-map-remaining.png"><img src="/img/portfolio/strava/new/redesign-dark-mode-map-remaining.png" alt="Redesigned map view in dark mode showing distance remaining" loading="lazy"></a><figcaption>Map view</figcaption></figure>
  <figure><a href="/img/portfolio/strava/new/redesign-dark-mode-map-metric.png"><img src="/img/portfolio/strava/new/redesign-dark-mode-map-metric.png" alt="New combined map and metrics view in dark mode" loading="lazy"></a><figcaption>Map and metrics view</figcaption></figure>
  <figure><a href="/img/portfolio/strava/new/redesign-dark-mode-speed.png"><img src="/img/portfolio/strava/new/redesign-dark-mode-speed.png" alt="Redesigned metrics view in dark mode" loading="lazy"></a><figcaption>Metrics view</figcaption></figure>
  <figure><a href="/img/portfolio/strava/new/redesign-dark-mode-post.png"><img src="/img/portfolio/strava/new/redesign-dark-mode-post.png" alt="Redesigned post activity view in dark mode" loading="lazy"></a><figcaption>Post activity view</figcaption></figure>
</div>

## Conclusion {#conclusion}

In conclusion, my UX case study for Strava's cycling activity redesign aimed to improve the user experience and (more importantly) provide a safer experience for cyclists by addressing difficulties with route and ride metrics visibility as well as button size and placement. Through user research and iterative design, I implemented improved route visibility by differentiating route completion and route remaining with contrasting colors for activities where a predefined route has been selected. Additionally, I created new views that incorporate ride metrics with the map view that will also improve safety. Part of the map view redesigns addressed the pain point of button size and placement. I prioritized the locating and compass buttons by enlarging them (which also addressed safety concerns) and adjusted the placement of the buttons on the map further from the edge of the screen. This placement adjustment covers special use cases for cyclists.

Strava is unique in the sense that using the app can cause the user to put themselves in a dangerous situation. This project highlighted the importance of safety and ease-of-use when designing for cyclists. Regular outreach to users would uncover the pain points that I have discovered.

<script src="/assets/js/strava-viewer.js" defer></script>
