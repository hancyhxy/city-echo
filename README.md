# City Echo

> A shared soundscape for belonging.

City Echo is a concept app that turns everyday Sydney places into emotional listening rooms, helping newcomers feel connected without social pressure. Instead of recommending music algorithmically, the app reveals what others have listened to — and felt — in the same physical location.

This repository holds the **Ideation Document + Technical Blueprint** (Section A–E) produced for UTS *Digital Experience Studio* (2026, Assessment 2, Group). The centrepiece is a scrollytelling page narrating two parallel stories — Mei at UTS Library and Qing commuting on the Burwood→Wynyard line — that together demonstrate the core thesis: **belonging gets pinned across the city as small, asynchronous traces left by strangers.**

## What's in here

| Path | What it is |
|------|------------|
| `section_d_narrative/` | **The main deliverable.** A scrollytelling page with a fixed Sydney basemap, three sticky story cards, eight scroll steps, and a choreographed system of pins, torn-paper notes, and tone-aware chromatic transitions. Open `index.html` in a browser. |
| `draft/` | An earlier flat HTML version of the full Ideation Document + Blueprint (Sections A–E), structured as editorial pages rather than scrollytelling. |
| `storyboard/` | Section C — two 8-frame storyboards (UTS Library · Burwood→Wynyard commute), rendered both as `scenarios.md` and as annotated PNG strips. |
| `ideation.md` · `spec.md` | Early concept overview and feature specification. |

## Running the scrollytelling page

```bash
# From the repo root
open section_d_narrative/index.html
```

Or, to avoid file:// path oddities, serve it locally:

```bash
cd section_d_narrative && python3 -m http.server 8000
# then open http://localhost:8000
```

The page is a fixed 1920×1080-friendly canvas optimised for desktop viewing. Scroll vertically through the eight steps; watch the basemap switch between CBD → wide → finale views while story cards cross-fade, pins pulse and anchor, and ambient echo notes surface one pair at a time.

## How the system is built

Vanilla HTML + CSS + JS — no framework, no build step.

- **IntersectionObserver** watches eight invisible `.step-detector` blocks. Each triggers `applyState(n)` which drives every visible element from a single `STATES` table.
- **`STATES[n]`** is the single source of truth per step — it carries `tone`, `mapView` (Ken Burns pan/zoom + which basemap is active), `active`/`anchored` pin ids, `traces` (protagonist voice — one-step ephemeral), `echoNotes` (two anonymous crowd memories per step, surfaced from a pool of ten), `rail` (Burwood→Wynyard line draw-on), `count` (ambient listener counter), and `nowPlaying`.
- **Two-tier trace visual language.** Protagonist traces (`mei`, `qing`) adopt the current chapter's `--signal` colour via `color-mix()` — amber in Mei's chapter, rose in Qing's, brick-red at finale. Ambient crowd notes stay cream with muted ink — visually secondary.
- **Chromatic chaptering.** `body[data-tone]` gets swapped between `neutral / mei / qing / finale`; a handful of CSS custom properties cascade the colour shift through the background, pin glow, counter, story-card surface, and now-playing badge in lockstep.

## Credits

UTS Digital Experience Studio 2026 · Assessment 2 · Team: Xinyi Han · Patrick · Fanghua Li · Jiayao · Evelyn
