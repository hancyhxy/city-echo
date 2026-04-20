# Section D — The Parts of City Echo and How They Connect

This section describes the design as a set of interrelated "parts" rather than a list of features. The parts are visualised through a **Sydney-map collage** — a detective-pinboard composition, inspired by the reference image in this folder (`image.png`) — because the app's core conceptual argument is that **belonging is pinned across the city**, not located in any single screen or service.

---

## 1. The core argument

City Echo has **three kinds of parts** that interlock:

| Part kind | What it is | Example |
|---|---|---|
| **Place-parts** | Geographic nodes in Sydney that hold soundscapes | UTS Library, Central Station, Newtown café |
| **Sound-parts** | The audio and emotional content pinned to each place | Tracks, mood tags, user traces, artist stories |
| **People-parts** | Users, present and past, represented only through presence and trace — never as profiles | Mei listening now; an anonymous user who left a trace two days ago |

The design connects these three kinds through a single interaction surface — **the map** — and three interfaces that let users dive in, listen, and contribute.

---

## 2. The Sydney-map collage (the master visual for this section)

**Composition brief for image generation** (to be produced via Midjourney/DALL-E or assembled in Figma by combining generated elements):

### 2.1 Base layer

- A stylised, warm-toned illustration of the inner Sydney map covering Darling Harbour, UTS, Central, Redfern, Chippendale, Surry Hills, Newtown, extending to Bondi in the east
- Rendered like an old paper map with a slight coffee-stain vignette — evokes the detective pinboard aesthetic from `image.png`
- Muted cream/beige paper texture, ink-line roads, harbour in soft blue wash

### 2.2 Place-pins (5 featured)

Each pin is a hand-drawn icon + handwritten label, pushed into the map with a red thumbtack:

| Pin | Icon | Soundscape identity | Why chosen |
|---|---|---|---|
| **UTS Library** | Book + headphones | "Study focus + international student picks" | Mei's academic anchor; Scenario 1 location |
| **Central Station** | Train silhouette | "Commute reflective + cross-cultural traces" | Major transit node; Scenario 2 location |
| **Newtown — Brewtown café** | Coffee cup | "Slow indie + local artist stories" | Typical café-culture soundscape |
| **Bondi Beach** | Wave | "Sunrise energetic + migrant beach playlists" | Tourist/local overlap — belonging for weekend visitors |
| **Chippendale — Spice Alley** | Chopsticks | "Food-court buzz + Asian diaspora contributions" | Cultural pocket near UTS with strong Asian migrant presence |

### 2.3 Red strings (the connection logic)

Red yarn/thread is drawn between pins to show **Mei's weekly movement pattern**:

```
Home (off-map, bottom-left)
  └─ red string ─> UTS Library
      └─ red string ─> Spice Alley (lunch)
          └─ red string ─> Central Station
              └─ red string ─> (Home again)

Weekend detour (thinner string):
  Home ─> Newtown café ─> Bondi
```

Red strings represent **user journeys across place-parts**, showing how the soundscape experience is continuous, not episodic. City Echo is not opened once per session — it lives along the route.

### 2.4 Sticky notes & Polaroids pinned around the map

These are the **three key UI screens** rendered as hand-annotated artefacts pinned around the map's border, connected to the place-pins by thin black ink lines. Each sticky note has a short handwritten label.

**Polaroid 1 — "Map Discovery"** (pinned top-left, connected to multiple pins)
- Screenshot showing the in-app stylised map with glowing amber pulses at active places
- Handwritten arrow: *"This is the entry point — you see the city breathing"*

**Polaroid 2 — "Music Discovery"** (pinned top-right, connected to UTS Library pin)
- Screenshot of the place-scoped playlist with mood filter circles and "Left here by others" row
- Handwritten arrow: *"Tap a pulse → you are inside the soundscape"*

**Polaroid 3 — "Artist Story"** (pinned bottom-right, connected to Central Station pin)
- Screenshot of an Aboriginal-Australian musician's migration story, bilingual text
- Handwritten arrow: *"Behind every song there is a person — and their place of displacement"*

### 2.5 Tag labels (torn paper snippets)

Scattered across the pinboard like torn notebook scraps, bearing phrases users have left as traces:

- `homesick but focused` (near UTS pin)
- `between two homes` (near Central pin)
- `this reminds me of home` (near Bondi pin)
- `me too` (connected by tiny red lines to several other tags — showing how traces accumulate reactions)

### 2.6 Legend corner (bottom-right of pinboard)

A small handwritten key:

```
📍 = Place-part (a node that holds a soundscape)
♪  = Sound-part (track + trace + mood)
●  = People-part (anonymous, present or past)
━  = Connection (user journey / same-track co-presence)
```

### 2.7 Single-sentence caption for the collage

> *"City Echo turns the city into a listening room — each place is a pin, each song is a thread, each stranger is a silent neighbour."*

---

## 3. How the parts connect — a component-level view

To supplement the collage (which is metaphorical), this subsection describes the **functional connections** between parts. This will be generated as a cleaner block diagram alongside the collage in the final document.

### 3.1 Primary data flow

```
[User device enters Place] 
    → Location service detects Place-part
    → Soundscape engine fetches Sound-parts (tracks + traces + mood distribution) 
    → Map Discovery renders pulse at that Place
    → User taps pulse → Music Discovery screen loads place-scoped playlist
    → User plays track → "N others listening" counter increments (live People-part)
    → User optionally taps Artist Story OR leaves Trace
    → Trace is attached to Place-part → becomes visible to next visitor
```

### 3.2 The three-screen interaction spine

| Screen | Purpose | Connects to |
|---|---|---|
| **Map Discovery** | Entry — makes the city's listening activity visible | Place-parts (all pins) |
| **Music Discovery** | Dive — lets user inhabit one place's soundscape | One Place-part + its Sound-parts + live People-parts |
| **Artist Story** | Deepen — turns a song into a human migration narrative | Sound-part → Artist (a specific person-part exception: artists are named, users are not) |

This three-screen spine answers the question *"how do the parts connect?"* at the UX level. Users move **zoom → in → deeper**, and can always return to the map.

### 3.3 The asymmetry of identity (a core design decision)

A deliberate design choice: **artists are named, users are not**.

- Named parts: place-parts (UTS Library), artist-parts (featured musicians with stories)
- Anonymous parts: user-parts (represented only by chosen avatar and one-word traces)

This asymmetry is the connection rule that makes the whole system emotionally safe: migrants can contribute without social performance; artists can be discovered as people, not just sounds.

---

## 4. Annotation callouts — the three key UI screens in detail

The following three subsections each describe one screen's **internal parts and connections** in enough detail that Xinyi's image tool can generate clean screen mockups.

### 4.1 Map Discovery — annotated callouts

**Purpose:** The home screen. Makes the city's soundscape activity visible at a glance.

**Parts visible on screen:**

```
┌──────────────────────────────────────────┐
│  [Time + weather header: "Tuesday 4pm"]  │  ◄── Ambient context
│                                          │
│   ☁️ Soft stylised Sydney map           │
│                                          │
│      🟡 UTS (47 listening, pulsing)     │  ◄── Active place-pin (hero)
│   🟡 Chippendale (23 listening)         │
│              🟡 Central (182 listening) │
│                                          │
│   ·  Newtown (dimmed — quiet hour)      │  ◄── Inactive place-pin
│          ·  Bondi (dimmed)              │
│                                          │
│  ─────────────────────────────────────  │
│  "Near you: UTS Library — tap to enter" │  ◄── Proximity hint strip
└──────────────────────────────────────────┘
```

**Annotation callouts** (drawn as red arrows pointing at elements):
1. *"Pulse size = number of current listeners"*
2. *"Warm amber glow = active soundscape; grey = quiet"*
3. *"Map is stylised, not satellite — the point is emotional geography, not navigation"*
4. *"Bottom strip suggests the nearest place based on GPS; one-tap entry"*

### 4.2 Music Discovery — annotated callouts

**Purpose:** Lets the user inhabit a single place's soundscape. Combines passive listening with awareness of co-listeners and trace-leavers.

**Parts visible on screen:**

```
┌──────────────────────────────────────────┐
│  ← UTS Library                47 here   │  ◄── Place header + live counter
│                                          │
│   [ focus ] ( calm ) ( lonely )         │  ◄── Mood filter (three circles)
│                                          │
│   ♫ Now Playing                          │
│   [ waveform animating amber ]           │  ◄── Playback visual
│   Track — Artist                         │
│   "12 others listening here now"         │  ◄── Co-presence ambient line
│                                          │
│  ─── Left here by others ───             │  ◄── Trace row header
│   ┌──┐ ┌──┐ ┌──┐ ┌──┐                   │
│   │♪ │ │♪ │ │♪ │ │♪ │  ← scrollable    │  ◄── Trace cards (horizontal)
│   │homesick│focused│tired│hopeful│      │
│   └──┘ └──┘ └──┘ └──┘                   │
│                                          │
│  [ + Leave a trace ]                     │  ◄── Contribution CTA
└──────────────────────────────────────────┘
```

**Annotation callouts:**
1. *"Mood filter changes the playlist — same place, different emotional weather"*
2. *"'12 others listening here now' appears under playback, not as a notification — it is ambient, not demanding"*
3. *"Trace cards are horizontally scrollable, like Polaroids in a shoebox — not a feed"*
4. *"The '+ Leave a trace' button is always visible but never pulses — contribution is invited, not pressured"*

### 4.3 Artist Story — annotated callouts

**Purpose:** Turns a track into a human migration narrative. The only screen where a named individual (the artist) appears.

**Parts visible on screen (vertical scroll):**

```
┌──────────────────────────────────────────┐
│  ← Back to soundscape                    │
│                                          │
│   [ Large portrait photo of artist ]     │  ◄── Portrait
│                                          │
│   Artist Name · Sydney via Fujian        │  ◄── Name + migration route
│                                          │
│   🌐 EN | 中文    ◄── Bilingual toggle  │  ◄── Language (visible, first-class)
│                                          │
│   "I came to Sydney at 19 with..."       │  ◄── Migration story paragraphs
│   (text in selected language)            │
│                                          │
│   [ Hand-drawn journey map: Fujian→Sydney] │  ◄── Visual journey
│                                          │
│   ── Listen to her library set ──        │  ◄── Curated tracklist
│   [ track ] [ track ] [ track ]          │
│                                          │
│   ──────────────────────────             │
│   [ + Leave a trace on her story ]       │  ◄── Contribution CTA (context-aware)
└──────────────────────────────────────────┘
```

**Annotation callouts:**
1. *"Bilingual toggle is a top-level button, not buried in settings — language choice is treated as a user right"*
2. *"The hand-drawn journey map visualises displacement, not just biography"*
3. *"Tracks here are curated BY the artist for a specific place — the link between artist-part and place-part"*
4. *"Users can leave a trace on a story, not just on a place — creating a secondary 'this spoke to me' layer"*

---

## 5. How the three screens and the collage map together

The Sydney-map collage is the **conceptual** diagram (why the design exists). The three-screen UI callouts are the **experiential** diagram (how the design is used). They connect via a single rule:

> **Every pin on the collage → opens to a Music Discovery screen. Every trace tag on the collage → was left from a Music Discovery screen. Every artist-photo polaroid on the collage → is accessible through an Artist Story screen.**

Read together, the collage shows the design's **worldview**; the three screens show the design's **interaction surface**. Neither alone is enough.

---

## 6. Image-generation checklist for this section

When producing the final visuals:

1. **The Sydney-map collage** — one hero image, landscape orientation, ~2000px wide. Detective pinboard aesthetic.
2. **Map Discovery screen mockup** — phone-framed, clean UI, amber accent, ~1080×1920 aspect
3. **Music Discovery screen mockup** — same phone frame, showing UTS Library soundscape with trace row populated
4. **Artist Story screen mockup** — same phone frame, showing the Aboriginal-Australian musician from Scenario 2 with bilingual toggle visible
5. **(Optional) A simplified block diagram** showing place-parts ↔ sound-parts ↔ people-parts connections, sitting alongside the collage for readers who prefer cleaner information architecture
