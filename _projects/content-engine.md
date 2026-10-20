---
layout: project
title: The content repurposing engine
kind: Agentic workflow
order: 2
summary: I pitched an AI content repurposing engine in a job interview but never built it. Here's how I built one for myself with Claude, what worked on the first run, and what I'm fixing next.
goal: Turn my raw thoughts into posts that sound like me
built_with: Claude (skills, Claude Docs), Gemini (Nano Banana, Gemini Video), Jekyll, GitHub Pages
result: "3 Claude skills · first post live October 13, 2026 · $0 extra"
link_label: Read how I built it
tags: [Agents, Claude, AI, Writing]
visual:
  type: flow
  steps:
    - Brain dump
    - Claude drafts
    - I approve
    - Blog + LinkedIn
---

<p class="case-meta">An agentic workflow · Live since October 13, 2026</p>

<nav class="case-nav" aria-label="Project sections">
  <a class="chip" href="#why">Why I built it</a>
  <a class="chip" href="#how-it-works">How it works</a>
  <a class="chip" href="#how-i-built-it">How I built it</a>
  <a class="chip" href="#first-run">The first run</a>
  <a class="chip" href="#whats-next">What's next</a>
  <a class="chip" href="#skills">The skills</a>
</nav>

## Why I built it {#why}

I had two reasons to build this, and honestly, neither one was "I want to be a content creator."

### Reason one: I pitched it, but I never built it

Somewhere in my job search, I realized I had some catching up to do. Marketing had kept moving while my last role stalled out, and AI had gone from a novelty to something every team was expected to have in its toolkit.

In one of my interviews in September 2026, I presented an idea for a content repurposing engine. The pitch was simple: a small marketing team never has enough hours (or people). Let the team focus on the idea, and let AI handle the heavy lifting of turning it into a blog post, a LinkedIn post, social content and the rest.

I liked the idea. But I'd never actually done it. I'd described a thing I hadn't built, and that bugged me. I wanted to find out if it would hold up in practice, messy parts included.

### Reason two: I have opinions, and formatting is the enemy

I have a lot of thoughts and opinions (this will shock no one who knows me). About marketing, about products that let me down, about news in the industry, about the trips I take.

The problem was never having something to say. It was the friction. Writing a blog post, then reworking it for LinkedIn, then formatting it, then finding an image, was enough work that most of my thoughts never made it out of my head. If I could hand AI my raw thoughts and get back posts that sound like me, in my voice and tone, I'd actually share them.

{% include img-slot.html n="01" note="A raw brain dump next to the finished blog post it became" %}

## How it works {#how-it-works}

I start a chat with `/content-engine` and dump my thoughts. Messy is fine: a rant, a list of bullets, a voice note transcript. From there, Claude does the formatting and I do the approving.

1. **Claude reads the dump** and pins down the one core idea, the best story in it, and which of my five topics it fits (Observations, In the News, Experiences, Projects, or Events & Travel).
2. **It proposes channels and waits.** The blog post is always made. For everything else, Claude suggests where it should go and flags anything borderline for LinkedIn (a complaint that names a company, a purely personal topic). I say yes or no to each one.
3. **It writes the blog post first.** The blog is the pillar piece, written in my voice, with the front matter my Jekyll site expects. It's a file I can drop straight into my `_posts` folder.
4. **It builds a Content Kit** for the channels I approved. Each one gets its own angle and its own hook (never just a shorter blog post).
5. **It writes the visual prompts.** Every image and video gets a numbered, ready-to-paste prompt for Gemini, in my site's cobalt and ink style, with a file name and aspect ratio.
6. **I review, edit and approve each piece.** Nothing gets posted without my yes, and a yes on one channel doesn't count for the others.
7. **The blog goes live first,** then the social posts point back to it.

{% include img-slot.html n="02" note="The workflow as a diagram: brain dump, channel proposal, blog, Content Kit, visual prompts, approval" %}

Every piece ends with a note that it was made with this workflow, plus an invitation to ask me how I built it. I'm not hiding the AI. It's kind of the whole point.

## How I built it {#how-i-built-it}

The engine is three Claude skills. A skill is a set of written instructions Claude loads when a task calls for it, and each of mine does one job.

| Skill | Its job |
| --- | --- |
| brand-kit | Who I am on the page: my voice, my five content topics, the AI disclosure for each channel, my writing rules and the site's visual system |
| content-engine | The workflow itself: read the dump, propose channels, write the blog, build the Content Kit, wait for approval |
| nano-banana-prompts | Turns every visual into a ready-to-paste Gemini prompt, sized for each channel |

### Starting with the website

The engine needed somewhere to publish, which meant my website needed a blog. My old site was a Bootstrap template that was really just my resume in HTML form. While rebuilding it with Claude, I moved it to Jekyll specifically for the blog: every post is a Markdown file with a bit of front matter, which is exactly the kind of thing AI is good at writing.

### The first version

I asked Claude for the skills and the workflow in one prompt: write my thoughts into a prompt, get back a blog post, a LinkedIn post, an Instagram post and story, and a TikTok, with Nano Banana handling the images and video.

Before writing anything, Claude checked what Gemini Pro could actually do. That changed the design. Nano Banana only makes still images, and video comes from a separate tool with a limit of about three clips a day. The TikTok script got built around that limit: at most three AI clips, with the rest filled by me talking to camera, my own DJI Osmo Pocket 3 footage, or stills with a slow zoom.

{% include img-slot.html n="03" note="Screenshot of the first prompt and the three skills Claude proposed" %}

That first version worked, but it was generic. The voice was a guess ("like telling a friend over a beer"), the content topics were a guess, and the visual style was a vague description of cobalt blue.

### Making it mine

Most of the real work happened in the next round of edits:

- **AI disclosure on everything.** I wanted it obvious that AI helped. Each channel got its own version, from a full note at the end of a blog post to a short end card on TikTok. The rule: if a post runs long, trim the post, never the disclosure.
- **A voice built from my own writing.** Instead of adjectives, Claude rewrote the voice section from a sample of how I actually write: thinking out loud, parenthetical asides, wry humor. It also catches my filler "so," which I'm actively trying to drop.
- **Topics that match the site.** The five content topics map one to one to the Writing section on my site, and each post's front matter gets the matching topic.
- **The real visual system.** The brand kit now pulls its exact colors, fonts and motifs from my site's CSS: the Matchday x Passport look, with cobalt blocks, condensed headlines and tilted rubber stamps.
- **Approval and LinkedIn routing.** Not every thought belongs on LinkedIn. Claude now proposes channels first and flags anything borderline before writing.

{% include img-slot.html n="04" note="The brand kit's visual system: colors, fonts and stamp motifs" %}

### Deploying it

The three skills are installed in Claude, and I call the engine with `/content-engine` from a chat in my website project. Because Claude can reach my site's GitHub repo, an approved blog post doesn't need copying anywhere: Claude commits it to `_posts`, and GitHub Pages publishes it. The social posts land in a Content Kit document I can edit before anything goes out.

{% include img-slot.html n="05" note="Screenshot of a Content Kit document" %}

## The first run {#first-run}

The first thing through the engine was my first blog post, [A Layoff, a Rebuild, and a First Post](/writing/layoff-rebuild-first-post/). It was a good test because it was a sensitive one. I wanted to talk about being laid off without it reading like I had hard feelings toward my old employer, and I told Claude exactly that in my notes.

It handled that part well. The blog kept my campfire line ("make a gourmet meal but use a campfire, a couple pieces of scrap metal, and food that's about to rot") and flagged it as something a future employer might read, then left it out of the LinkedIn version entirely. LinkedIn got a gracious version: one paragraph on the layoff, no company name, and the focus on what's next. I approved the blog, Claude committed it to my site's repo, and the Content Kit came back with a LinkedIn post, an Instagram carousel and story, a TikTok script and 14 Gemini prompts.

{% include img-slot.html n="06" note="The finished blog post next to the LinkedIn post it became" %}

Then came the fixes:

- The LinkedIn draft slipped in #OpenToWork, which I never want on any post. That's now a hard rule in the skills.
- I moved the blog link into the LinkedIn post body instead of the first comment.
- I asked for a cinematic reveal on Instagram and TikTok, which meant a new round of prompts.

And then the visuals, which were the hardest part by a wide margin. More on that below.

## What I'm fixing next {#whats-next}

The writing side works. Three things don't, yet.

### 1. The visuals are too much back and forth

The image workflow is a relay race. Claude writes a prompt, I paste it into Gemini, I download the result, I upload it back to Claude, Claude reviews it, and we decide whether to keep it or reroll. Multiply that by 14 prompts and it's the slowest part of the whole engine by far.

The results weren't always worth the trip, either. Nano Banana got the palette and the stamp style right on my hero image, but it garbled the small text, and at one point it printed the name of a font ("Space Mono") as words on the image because the prompt mentioned it. Some results needed a reroll or an edit pass before they were usable.

{% include img-slot.html n="07" note="A Nano Banana result with the garbled text, ideally with the problem circled" %}

What I'm looking at:

- Fewer generated images, more real ones (screenshots and my own photos).
- Cutting out the relay, either by having Claude drive Gemini in a browser while I pick the keepers, or by moving templated graphics into Canva entirely.

### 2. Instagram and TikTok aren't the right channels for this

For my first post, I posted the TikTok but never got around to posting on Instagram, and that told me something. I don't need an Instagram and TikTok version of every thought. My opinions on marketing, products and the news fit a blog and LinkedIn. A carousel and a TikTok script added a lot of work (and most of the visual pain) for channels that aren't where those conversations happen. They come out of the default channel list.

When I have topics (that are more personal to me) that would be appropriate for Instagram or TikTok, I'll use the content repurposing engine for that. And that tells me it'll probably leave out the LinkedIn post.

### 3. I'm still copying and pasting into LinkedIn

Right now, posting to LinkedIn means copying the approved text out of the Content Kit, pasting it in and attaching the image by hand. I want Claude to post it for me, but only after I approve it.

What I'm looking at:

- A scheduling tool that connects to Claude. A few show up in Claude's connector directory (Typefully, Taplio and Metricool), and the question is whether any of them fit my "domain plus Claude, nothing else paid" rule.
- Claude in my browser: it opens LinkedIn, fills in the post and the image, and I click Post myself. That keeps the final approval literally in my hands.

Whichever way it goes, the rule doesn't change. Nothing goes out without my yes.

## The skills, word for word {#skills}

If you want to build your own version, here are the instructions for all three skills exactly as I use them. Swap in your own voice, topics and visual style; the structure is the part worth borrowing. Open each one below, or download it as a text file.

{% raw %}
<details class="case-more">
  <summary>content-engine (the workflow)</summary>
  <pre><code>---
name: "content-engine"
description: "Turn Steven's raw brain dump (notes, voice-note transcript, rant, rough draft) into a blog post for stevenmerickson.com plus social posts for the channels he approves (LinkedIn, Instagram feed and story, TikTok), with ready-to-paste Gemini image and video prompts. Use whenever he shares thoughts he wants to turn into content: something he observed at work, a product or service experience, a reaction to news, a project he's building, or an event or trip recap. Trigger even if he only says 'turn this into a post' or 'here's my brain dump'."
---

# Content Engine

Input: Steven's raw thoughts (a brain dump, voice-note transcript, bullet list, or rough draft).
Output: a blog post, plus social posts for the channels he confirms, plus every visual prompt he needs for Gemini. Every piece ends with an AI disclosure (section 5). Nothing is ever posted without his approval.

## 1. Before writing

1. Load the `brand-kit` skill first if it's listed, and follow its voice, pillars, approval and LinkedIn routing rules, visual system, banned phrases and AI disclosure wording. Where brand-kit and this skill disagree, brand-kit wins; it's the more current of the two.
2. Read the brain dump and pin down:
   - the single core idea and the best story or example in it
   - the primary pillar (an observation from marketing or work, a product or service experience, a reaction to news, a project, or an event or trip)
   - the site `topic` (section 3)
3. If there's no clear core idea, or two competing ones, ask one question to pick.
4. Facts:
   - Never invent experiences, opinions, quotes, names, places or numbers about Steven's life. Use only what the dump contains, and leave a `[FILL: what is needed]` note for any missing detail.
   - For news reactions, check the facts of the news story itself with a search before writing, and keep the source link to cite in the blog post. If something can't be verified, leave a `[FILL]` note rather than guessing.

## 2. Propose channels, then wait

The blog post is always made. Before writing anything else, propose which social channels this piece should go to and wait for Steven to confirm. Present it as a short list: channel, a one-line reason, and a flag on any LinkedIn pick that brand-kit's routing rules would call borderline. Example:

&gt; **Proposed channels for "My printer's firmware update bricked it"**
&gt; Pillar: product experience. Site topic: experiences.
&gt; - Blog: always
&gt; - Instagram feed and story: yes, the before-and-after photos carry it
&gt; - TikTok: yes, a quick rant to camera fits
&gt; - LinkedIn: borderline. It names the company and it's mostly a complaint. Want it there anyway, maybe reframed around what good support would have looked like?

Then write only the confirmed channels. If he's not around to answer (for example a scheduled run), draft the blog plus the channels you proposed, mark the borderline ones clearly at the top, and post nothing.

## 3. Blog post (stevenmerickson.com, Jekyll)

The blog is the pillar. Write it first, then derive each social channel from it.

Length and shape depend on the pillar:

| Pillar | Length | Shape |
|---|---|---|
| Observations from marketing and work | 300 to 600 words | The thing he noticed, his honest take on it, what he'd do instead; 0 to 2 H2 sections |
| Reacting to news | 300 to 600 words | Lead with his reaction, link the source early, 0 to 2 H2 sections |
| Product or service experience | 300 to 600 words | What happened, why it mattered, what would have fixed it; 0 to 2 H2 sections |
| Projects | 800 to 1,500 words | The problem, the messy middle, what worked; 3 to 5 H2 sections |
| Events and travel | 800 to 1,500 words | What stood out to him, not a schedule; 3 to 5 H2 sections |

File and front matter, matching the redesign's `_drafts/post-template.md`:

- File name: `YYYY-MM-DD-slug.md` for the `_posts` folder. The date is the publish date; the slug becomes the URL `/writing/slug/`.

```
---
layout: post
title: ""
description: ""   # one or two sentences on what the reader gets; shown on the homepage, Writing page and link previews
topic: projects   # exactly one of: observations, news, experiences, projects, events-travel
image: /assets/img/posts/SLUG/hero.png   # optional; 16:10
image_alt: ""
ai_assisted: true
---
```

- `topic` must be exactly one of the five site topic slugs, matched to the pillar:

  | Pillar | Topic slug | Shown as |
  |---|---|---|
  | Observations from marketing and work | `observations` | Observations |
  | Reacting to news | `news` | In the News |
  | Product or service experience | `experiences` | Experiences |
  | Projects | `projects` | Projects |
  | Events and travel | `events-travel` | Events &amp; Travel |
- Open with a story, moment or reaction. No throat clearing.
- Close with the takeaway or an open question, then the blog AI disclosure (section 5).
- Plan 1 hero image (16:10) and up to 2 inline images, marked with `&lt;!-- IMAGE: slug-blog-02.png --&gt;` and placed in Markdown as `![alt text](/assets/img/posts/SLUG/slug-blog-02.png)`.

## 4. Social channels (only the confirmed ones)

Every channel gets its own angle and its own hook; never just shorten the blog. Each piece should stand on its own for someone who never reads the blog.

### LinkedIn
- 150 to 300 words, including the disclosure. The first two lines have to earn the "see more" click.
- One idea per short paragraph, generous line breaks.
- His take and his experience, told the way he'd tell a colleague. No expert framing, listicle lessons or "here's what this teaches us about marketing."
- No link in the body. Add a note: "Post blog link as first comment."
- End with a question that invites real replies (not "Thoughts?"), then the LinkedIn disclosure, then up to 3 hashtags. Never use #OpenToWork.
- Visual: one image, 4:5 (1080x1350), or suggest reusing carousel slides as a LinkedIn document post.

### Instagram feed post
- Default: carousel of 5 to 8 slides, 4:5 (1080x1350).
  - Slide 1: hook headline.
  - Middle slides: one idea each, 20 words or fewer of on-slide text.
  - Last slide: takeaway plus "Full story: link in bio." and a small footer line: "Made with my Claude AI workflow".
- For each slide give: on-slide text, image prompt, alt text.
- Caption: hook first line, 80 to 200 words, call to action, the Instagram disclosure, then 5 to 10 relevant hashtags (include #AIassisted).

### Instagram story
- 3 to 5 frames, 9:16 (1080x1920).
- Each frame: on-screen text (12 words or fewer), image prompt, and one sticker idea (poll, question box, quiz, or emoji slider).
- Final frame: link sticker to the blog post, plus the story disclosure and a question sticker reading "Ask me how I built it".

### TikTok
- 20 to 45 seconds, 9:16.
- Hook in the first 2 seconds, both spoken and as on-screen text.
- Script as a table: Time | Spoken (voiceover or to camera) | On-screen text | Visual.
- Last 2 to 3 seconds: end card with the TikTok disclosure as on-screen text.
- Tag every visual as `[AI CLIP]`, `[STILL]`, or `[SELF-SHOT]`.
  - Use at most 3 `[AI CLIP]` shots (Gemini Pro allows only a few videos per day), each about 8 seconds, one continuous shot each.
  - Fill the rest with talking to camera, Steven's own footage (for example DJI Osmo Pocket 3 b-roll), or Nano Banana stills with a pan or zoom added in the editor.
- Caption under 150 characters including the short disclosure, plus 3 to 5 hashtags (include #AIassisted).
- Sound: say "pick a trending sound in-app" or describe a mood; never name a specific song.

## 5. AI disclosure (required on every piece)

It has to be obvious that AI helped write and prep the content, and it should invite people to ask how the workflow works. Use the channel wording from brand-kit if it's listed. Otherwise use these:

- **Blog** (after a horizontal rule at the very end, in italics):
  `*This post was produced with a Claude repurposing agentic workflow I built: I write down my raw thoughts, and AI helps turn them into this post, my social posts and the visuals. I review and edit everything before it goes live. Curious how it works? Ask me how I built it!*`
- **LinkedIn** (own paragraph before the hashtags):
  `This post was produced with a Claude repurposing agentic workflow I built (AI-assisted writing and posting). Ask me how I built it!`
- **Instagram caption** (before the hashtags):
  `Made with my Claude repurposing agentic workflow: AI-assisted writing and visuals. Ask me how I built it!`
- **Instagram story** (final frame, on-screen):
  `Made with my AI workflow. Ask me how!`
- **TikTok** end card: `Made with my Claude AI workflow. Ask me how!`; caption: `AI-assisted with my Claude workflow. Ask me how!`

Rules:
- Keep the disclosure whole when space is tight; trim the content instead. It's what keeps the audience's trust.
- Never phrase it in a way that implies the content was written without AI.
- When visuals came from Gemini, the blog, Instagram and TikTok versions mention AI visuals too ("AI-assisted writing and visuals").
- In the posting checklist, remind Steven to switch on platform AI labels where offered: TikTok's AI-generated content toggle for posts with AI clips or realistic AI images, and Instagram's AI label for AI images.

## 6. Visual prompts

Every visual should look like part of the site's Matchday x Passport system: start each prompt from brand-kit's image prompt style block and its color and type specs. If the `nano-banana-prompts` skill is listed, load it and follow its formulas and output format. If not, include: subject, setting, composition, lighting, style and palette, any text to render in quotes, aspect ratio, and an Avoid line.

Name every asset `SLUG-CHANNEL-NN.ext` (for example `inter-trip-ig-03.png`, `inter-trip-tt-clip-01.mp4`).

## 7. Delivery and approval

- Blog post: deliver as the `.md` file, ready to drop into `_posts`.
- Everything else: one Content Kit document with these sections, skipping any channel that wasn't confirmed:
  1. Summary: core idea, pillar, site topic, and the angle for each channel (one line each).
  2. LinkedIn
  3. Instagram feed
  4. Instagram story
  5. TikTok
  6. Visual prompt checklist: every prompt, numbered, with file name, tool (Nano Banana or Gemini Video) and aspect ratio, in the order to generate them (style-anchor image first).
  7. Posting checklist, confirmed channels only: blog live first, then LinkedIn (link in first comment), Instagram feed, story with link sticker, TikTok; AI label toggles on each platform.
- End the reply with any `[FILL]` notes Steven must resolve, then ask for his approval of each piece by channel.
- Never post, schedule or publish anything (including pushing the blog post to the site repo) until Steven explicitly approves that specific piece. Approving one channel doesn't approve the others, and a revised draft needs a fresh yes.

## 8. Quality pass (do this before delivering)

- It sounds like Steven: thinking out loud, his asides and wry humor intact, not corporate or thought-leader polished. Read it against brand-kit's Voice section.
- No filler "so" anywhere. Search for it and restructure those sentences.
- Every channel has a different hook. Read them side by side.
- Each piece stands alone; nobody needs to have read the blog.
- Every piece ends with its AI disclosure, clearly visible (not buried in hashtags).
- Every fact traces back to the brain dump or, for news, to a cited source.
- Any LinkedIn piece has passed brand-kit's routing check.
- No em dashes, en dashes or double hyphens anywhere, including captions, disclosures and on-image text.
- None of the brand-kit banned phrases, and no #OpenToWork hashtag on any channel.
- Character and length limits respected, with the disclosure counted.</code></pre>
  <p class="case-download"><a href="/files/skills/content-engine.txt" download>Download content-engine.txt</a></p>
</details>

<details class="case-more">
  <summary>brand-kit (voice, rules and visual system)</summary>
  <pre><code>---
name: "brand-kit"
description: "Steven Erickson's brand: voice, content pillars, approval and LinkedIn routing rules, AI disclosure, hard writing rules, and the Matchday x Passport visual system (exact colors, fonts, motifs) from his site redesign. Load before writing, editing or designing anything for stevenmerickson.com or his LinkedIn, Instagram or TikTok: blog posts, captions, scripts, image or video prompts, graphics, slides, thumbnails, or site pages. Use it even when the request only says 'a post', 'a caption' or 'a graphic' without naming the brand."
---

# Brand Kit: Steven Erickson

Steven: edit anything that doesn't sound like you. The Voice section is built from one sample of how you write; paste more of your writing into a chat any time and ask Claude to refine it.

## Home base

- Site: www.stevenmerickson.com (Jekyll, GitHub repo `SMErickson7/smerickson7.github.io`; the new look lives on the `redesign` branch). Blog posts publish at `/writing/&lt;post-title&gt;/`.
- Every social post points back to the blog post.

## Approval and channel routing

This is Steven's outlet for his own thoughts, not a professional-only feed. Not every piece belongs on every channel.

- **Nothing gets posted without Steven's explicit approval.** Draft everything, then stop and ask. Approval for one piece or one channel doesn't carry over to the next.
- **LinkedIn check.** Before proposing a piece for LinkedIn, judge whether it fits there. If it's borderline, flag it and ask whether he still wants it on LinkedIn, with a one-line reason. Borderline includes:
  - Sharp complaints that name a company or person, especially without a constructive point
  - Purely personal or fandom topics (football, a trip recap with no wider takeaway)
  - Politics, or anything a former colleague or future employer could read badly
  - Humor that relies on the reader knowing him personally
- Clearly fine for LinkedIn: observations from work, news reactions with a real take, project build stories, fair product critiques with a lesson.
- When presenting drafts, list which channels each piece is proposed for. He approves or drops each one.

## Accounts

| Channel | Handle | URL |
|---|---|---|
| Instagram | @stevenmerickson | https://www.instagram.com/stevenmerickson/ |
| TikTok | @steven_ma720 | https://www.tiktok.com/@steven_ma720 |
| LinkedIn | Steven Michael Erickson | [FILL: full LinkedIn profile URL] |

## Voice

Built from Steven's own writing. The goal is for posts to sound like him talking, lightly tidied, not like a polished thought-leader post.

### How he sounds

- **Thinks out loud.** He lets the reader watch him reach a conclusion: "the more I think about it, the more I'm realizing that..." Keep that sense of a mind working, rather than opening with a tidy thesis.
- **Conversational and direct.** First person, contractions, plain words. He says what he wants plainly ("I will always give the approval before any content is posted") and owns opinions with soft framing ("I would say", "I wouldn't worry about").
- **Parenthetical asides do a lot of work.** He uses parentheses for quick examples, honest caveats and dry humor: "(more like complaints, but we'll work on the tone)", "(there's enough of those)". Use them the same way: one short aside, not nested clauses.
- **Concrete examples, named.** He grounds points with real specifics strung inline with commas (HubSpot layoffs, a Fitbit announcement, a 3D print that solved a pain point) rather than abstract claims.
- **Honest and self-aware.** He admits where he's still figuring things out and what he isn't trying to be. Keep that candor; it's the point of the content.
- **Light, wry humor.** Understated and in passing, usually inside an aside. Encouraged, never forced.
- **Sentence rhythm.** Mostly medium-length, flowing sentences joined with "and" or "but", broken up by short, blunt ones. Starting a sentence with "And" or "Also" is fine.

### What to do and avoid

- Lead with a real moment, reaction or detail, then what he took from it.
- Share insights and experiences, not expertise. He isn't positioning himself as a subject matter expert; skip "here are 5 lessons" framing, frameworks and authority-building language.
- Don't over-polish. Tighten rambling and fix grammar, but keep his cadence, asides and hedges. If a draft reads like a corporate post, it's wrong.
- Cut the word "so" when it's filler: as an opener ("So, I..."), as a connector ("..., so I..."), or as an intensifier ("so good"). He's actively trying to drop it, and it shows up in his natural writing; expect to remove it. Restructure the sentence rather than swapping in another filler like "anyway" or "basically".
- In finished posts, write out "for example" instead of "i.e." or "e.g." (he sometimes uses "i.e." to introduce examples, which technically means "that is"), and drop "etc." in favor of a fuller list or "and more".


## Content pillars

Each piece maps to one primary pillar, and each pillar has a matching site topic (the `topic` slug in a post's front matter, set in `_config.yml`). Note both in the content kit summary.

| Pillar | Site topic slug | Shown on site as |
|---|---|---|
| Observations | `observations` | Observations |
| Reacting to news | `news` | In the News |
| Product and service experiences | `experiences` | Experiences |
| Projects | `projects` | Projects |
| Events and travel | `events-travel` | Events &amp; Travel |

1. **Observations.** Something he noticed, usually from marketing or work, and his honest thoughts on it (for example ungating content for AEO, and why it was ever gated). This isn't general how-to or strategy advice; it's his reaction to something he saw or did.
2. **Reacting to news.** His take on industry and tech news (for example HubSpot layoffs, Artcraft vibe coding Adobe apps, a Fitbit product announcement). Lead with his reaction, not a recap of the article. Never invent facts about the news; check them.
3. **Product and service experiences.** Musings on something he bought, used or dealt with. These often start as complaints; keep the tone fair and specific: what happened, why it mattered, what would have fixed it. Wry beats bitter.
4. **Projects.** Build stories and the process behind them: the website redesign, a 3D print that solved a pain point, AI and agentic workflows. Show the messy middle, not just the result.
5. **Events and travel.** Summaries of events he attends and trips he takes, focused on what stood out to him.

## AI disclosure (always on)

Steven is open about using AI. Every piece of content ends with a clear note that a Claude agentic workflow helped write it and prep it for posting, plus an invitation to ask how it was built. This doubles as a hook for his projects pillar.

Base message: "This content was produced with a Claude repurposing agentic workflow. Ask me how I built it!"

| Channel | Placement | Wording |
|---|---|---|
| Blog | Italic note after a horizontal rule at the end; `ai_assisted: true` in front matter | This post was produced with a Claude repurposing agentic workflow I built: I write down my raw thoughts, and AI helps turn them into this post, my social posts and the visuals. I review and edit everything before it goes live. Curious how it works? Ask me how I built it! |
| LinkedIn | Own paragraph, before hashtags | This post was produced with a Claude repurposing agentic workflow I built (AI-assisted writing and posting). Ask me how I built it! |
| Instagram caption | Before hashtags; carousel last slide footer "Made with my Claude AI workflow" | Made with my Claude repurposing agentic workflow: AI-assisted writing and visuals. Ask me how I built it! |
| Instagram story | Final frame on-screen, plus question sticker "Ask me how I built it" | Made with my AI workflow. Ask me how! |
| TikTok | End card on-screen; short line in caption | Made with my Claude AI workflow. Ask me how! |

The disclosure is what keeps the audience's trust. Keep it whole even when space is tight. Turn on platform AI labels (TikTok AI-generated content toggle, Instagram AI label) when AI visuals are used.

## Hard writing rules

- Never use em dashes, en dashes, or double hyphens. Use commas, periods, colons, semicolons or parentheses.
- Banned phrases: "In today's fast-paced world", "game-changer", "Let's dive in", "unlock", "unleash", "delve", "Here's the thing", "elevate", "in the ever-evolving landscape".
- No engagement bait ("Comment YES if...").
- Never use the #OpenToWork hashtag (or any open-to-work wording as a hashtag) on any channel.
- Never invent experiences, numbers or quotes.

## Visual system: Matchday x Passport

Source of truth: `assets/css/site.css` on the site's `redesign` branch. If it changes, update this section to match.

The idea: a football matchday program crossed with a travel passport. Big condensed uppercase headlines, solid cobalt blocks, near-black ink bands, and tilted rubber-stamp badges.

### Colors

| Role | Name | Hex | Use |
|---|---|---|---|
| Primary | Cobalt | `#0047AB` | Headers, heroes, footers, links, highlights; the dominant color |
| Primary dark | Cobalt dark | `#003580` | Hover and pressed states, deeper accents |
| Accent | Cobalt tint | `#8FB3FF` | Separators and small accents on dark backgrounds |
| Accent | Cobalt soft | `#C7D7F2` | Labels on cobalt backgrounds |
| On cobalt | Ice | `#E3EBF8` | Body text sitting on cobalt |
| Dark | Ink | `#1E212E` | Headlines, ticker bands, dark panels; use instead of pure black |
| Dark 2 | Ink 2 | `#2F3446` | Secondary dark surfaces |
| Text | Body | `#3A3F52` | Long-form body copy |
| Text | Muted | `#4A5068` | Captions, metadata |
| Neutral | Line | `#D5D9E4` | Dividers, borders |
| Neutral | Surface | `#EEF1F7` | Light panels and section backgrounds |
| Base | White | `#FFFFFF` | Page background, text on cobalt |

Keep it to cobalt, ink and white plus their tints. No other hues in brand assets.

### Typography (all Google Fonts)

- **Display: Big Shoulders Display**, weight 800 to 900, always uppercase, very tight line height (about 0.85 to 0.95). Headlines, titles, nav, big numbers.
- **Body: Inter**, 400 to 700. Paragraphs and UI text.
- **Labels: Space Mono**, 700, uppercase, slightly letter-spaced. Small tags, dates, metadata, "ticket stub" details.

### Motifs and layout

- Solid cobalt hero and header blocks with white text; ink-colored ticker bands with uppercase items separated by cobalt-tint dots.
- Rubber stamps and badges: outlined in cobalt or ink (solid, dashed, dotted or double borders), round, pill or square, rotated a few degrees (roughly -6 to +6).
- Passport details: holder ID card with dashed divider, flags, country stamps, boarding-pass and ticket-stub fields.
- Matchday details: fixture-list rows (date, topic, title), team code tags, thick 6px ink rules under section heads.
- Flat color and crisp borders; panels use 18px rounded corners, photos 10px. Generous whitespace, high contrast.

### Image prompt style block

Paste this into image or video prompts to make every asset look like one family:

&gt; Bold editorial matchday-program meets travel-passport style. Dominant cobalt blue (#0047AB) with near-black ink (#1E212E) and white, plus pale cobalt tints only. Huge condensed uppercase sans-serif headlines like Big Shoulders Display, clean sans-serif body like Inter, small monospace uppercase labels like Space Mono. Flat color blocks, crisp borders, tilted rubber-stamp badges with double or dashed outlines, ticket-stub and boarding-pass details. High contrast, uncluttered, generous empty space. No gradients, no other colors.

Image generators often garble text. Add exact headline text as a design layer afterward when it matters.</code></pre>
  <p class="case-download"><a href="/files/skills/brand-kit.txt" download>Download brand-kit.txt</a></p>
</details>

<details class="case-more">
  <summary>nano-banana-prompts (Gemini image and video prompts)</summary>
  <pre><code>---
name: "nano-banana-prompts"
description: "Write ready-to-paste Gemini prompts for Nano Banana images and Gemini Video clips, sized for blog, LinkedIn, Instagram, stories and TikTok."
---

# Nano Banana and Gemini Video Prompts

Steven generates visuals himself in the Gemini app on the Google AI Pro plan. Claude writes the prompts; Steven pastes them in. Write for that handoff: each prompt must work on its own, pasted cold into a fresh Gemini chat.

## What the tools do (as of Oct 2026; limits change, check the app)

- Nano Banana (Nano Banana Pro or Nano Banana 2) makes and edits STILL images only. Pro handles complex scenes and on-image text best. The Pro plan allows roughly 100 images a day.
- Short video comes from the Gemini app's Video option (Veo / Gemini Omni), not Nano Banana. The Pro plan allows only about 3 videos a day, and clips are short (around 8 to 10 seconds).
- Best video workflow: make the first frame as a Nano Banana image, then upload that image in Video mode with a motion prompt. This locks the look before spending a scarce video generation.

## Aspect ratios

| Use | Ratio | Pixels |
|---|---|---|
| Blog hero | 16:9 | 1920x1080 |
| LinkedIn image | 4:5 or 1:1 | 1080x1350 |
| Instagram feed / carousel | 4:5 | 1080x1350 |
| Instagram story | 9:16 | 1080x1920 |
| TikTok frame or clip | 9:16 | 1080x1920 |

State the ratio in words inside every prompt ("vertical 9:16 image").

## Image prompt formula

Write in full sentences, in this order:
1. Subject and action
2. Setting
3. Composition and camera (shot size, angle, lens feel, where empty space sits for text)
4. Lighting and time of day
5. Style and palette (paste the style block from the `brand-kit` skill if listed)
6. Text to render, in quotes, with position and type style. Keep it to 8 words or fewer per image.
7. Aspect ratio
8. `Avoid:` line (for example: extra text, watermarks, logos, distorted hands)

If a slide needs more than 8 words, generate a clean background with empty space instead and note: "Add text in Canva."

## Keeping a set consistent

- Mark one image per set as the STYLE ANCHOR (usually carousel slide 1 or the blog hero). Generate it first.
- For every later image in the set, start the prompt with: "Using the attached image as the style reference, match its palette, lighting, typography and illustration style." and remind Steven to attach the anchor.
- To feature Steven himself, tell him to attach his own reference photo; never describe a real person's face from imagination.

## Video prompt formula (Gemini Video)

One continuous shot per prompt, no cuts. Include:
1. Starting frame: "Animate the attached image" (preferred) or a full scene description
2. One clear motion for the subject
3. One camera move (slow push-in, gentle handheld drift, slow orbit, tilt up)
4. Lighting and mood
5. Audio: ambient sound described plainly; no dialogue unless the script needs it
6. "Vertical 9:16, about 8 seconds"

## Never prompt for

Real brand logos, club crests, kits with sponsor marks, stadium branding, celebrities, other real people without their photo supplied by Steven, or copyrighted characters. For sports or travel themes, describe generic equivalents ("a blue and black striped football scarf", "a packed stadium at night").

## Output format

One block per asset, in generation order:

```
#01  STYLE ANCHOR | slug-ig-01.png | Nano Banana Pro | 4:5
ATTACH: none
PROMPT: ...
Avoid: ...
```

```
#07  slug-tt-clip-01.mp4 | Gemini Video | 9:16, ~8s
ATTACH: slug-tt-frame-01.png
PROMPT: ...
```

Finish with a count line: "N images, M video clips (Pro plan: about 3 clips a day)." If M is over 3, say which clips to make on which day.</code></pre>
  <p class="case-download"><a href="/files/skills/nano-banana-prompts.txt" download>Download nano-banana-prompts.txt</a></p>
</details>
{% endraw %}

---

*This page was produced with a Claude repurposing agentic workflow I built: I write down my raw thoughts, and AI helps turn them into this post, my social posts and the visuals. I review and edit everything before it goes live. Curious how it works? You just read it. Ask me anything else about how I built it!*
