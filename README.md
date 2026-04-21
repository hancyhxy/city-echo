# City Echo

> A shared soundscape for belonging.

A scrollytelling page about how belonging gets pinned across Sydney — one place, one song, one stranger at a time. Follows two Mandarin-speaking newcomers, Mei and Qing, who never meet but quietly fill the same map with listening memories.

Produced for UTS *Digital Experience Studio* (2026, Assessment 2) — this is the Section D deliverable: a vertical scroll takes the reader through eight beats that narrate how a concept music app turns Sydney places into emotional listening rooms.

## Run it

```bash
open index.html
```

Or serve locally to avoid file:// quirks:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Scroll vertically through the eight steps. The Sydney basemap pans and zooms underneath the story cards; pins pulse and anchor; ambient torn-paper notes surface in pairs as each step advances.

## Architecture at a glance

Vanilla HTML + CSS + JS — no framework, no build step.

- **`index.html`** — opener, scrolly section with fixed map + sticky story cards + eight invisible step detectors, outro.
- **`script.js`** — single `STATES` table describes every step (tone, map pan/zoom, active/anchored pins, which protagonist trace to surface, which two ambient notes to reveal, rail line, listener count, now-playing). `IntersectionObserver` fires `applyState(n)` as each detector enters the viewport.
- **`styles.css`** — tone-aware chromatic chaptering via `body[data-tone]` + CSS custom properties. Protagonist traces (Mei's / Qing's own) use `color-mix()` to adopt the current chapter's `--signal` hue; ambient crowd notes stay cream.
- **`map-mei.png` / `map-qing.png` / `map-finale.png`** — three watercolour basemaps, one per chapter, cross-faded by JS.

## Credits

UTS Digital Experience Studio 2026 · Assessment 2 · Team: Xinyi Han · Patrick · Fanghua Li · Jiayao · Evelyn
