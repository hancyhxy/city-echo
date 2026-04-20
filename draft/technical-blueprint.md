# Section E — System (Technical) Blueprint

This is a **draft for group review** — Section E is a shared deliverable. The blueprint below shows the technologies, components, and hierarchy of interfaces that would let City Echo be built as a real product. Each layer is written so that a group member can adopt, challenge, or extend it.

---

## 1. Design principles driving the architecture

Before listing components, three principles constrain the entire stack:

| Principle | Architectural consequence |
|---|---|
| **Ambient, low-pressure** | No real-time chat, no push spam, no social graph — the backend does not need a messaging subsystem, but it does need a high-read low-write trace store |
| **Anonymous by default** | User accounts are minimal (avatar + region + language). No friend graph. No profile pages. Identity service is lightweight |
| **Place-first, not user-first** | Places are the primary data entity; users are secondary. The soundscape API is scoped to `placeId`, not `userId` |

These principles explain why the blueprint **omits** several things common in social music apps (friend recommendations, DM, profile-based feeds) and **emphasises** others (place-scoped caches, trace moderation, bilingual metadata).

---

## 2. Layered architecture (the hierarchy of interfaces)

City Echo is organised into **five layers**. The blueprint image should render these as horizontal bands stacked top-to-bottom, with labelled connection arrows between them.

```
┌──────────────────────────────────────────────────────────────────┐
│  LAYER 1 — Presentation (user-facing interfaces)                 │
├──────────────────────────────────────────────────────────────────┤
│  LAYER 2 — Device services (on-device logic)                     │
├──────────────────────────────────────────────────────────────────┤
│  LAYER 3 — Application services (business logic, APIs)           │
├──────────────────────────────────────────────────────────────────┤
│  LAYER 4 — Data & external integrations                          │
├──────────────────────────────────────────────────────────────────┤
│  LAYER 5 — Inclusion infrastructure (cross-cutting)              │
└──────────────────────────────────────────────────────────────────┘
```

Layer 5 is drawn as a **vertical band running across all four upper layers** — it is not sequential, it is cross-cutting. This reflects City Echo's design commitment: inclusion is not a feature added at the UI; it is infrastructure present at every layer.

---

## 3. Layer-by-layer component breakdown

### Layer 1 — Presentation (user-facing interfaces)

| Component | Technology | Role |
|---|---|---|
| **iOS app** | SwiftUI, iOS 17+ | Primary mobile client; full feature set |
| **Android app** | Jetpack Compose, Kotlin, Android 13+ | Primary mobile client; parity with iOS |
| **Web companion** | Next.js 15, React 19 | Artist Story deep-link landing pages (for sharing Stories via WhatsApp / WeChat / email) |
| **Ambient widget** | iOS/Android home-screen widget | "Near you: UTS Library — 47 listening" proximity glance without opening the app |

**Hierarchy rationale:** Mobile is primary because the experience is location-dependent. Web exists only for read-only deep links (Stories can be shared and read outside the app ecosystem — important for cross-cultural reach). Widgets are ambient: they honour the "low-pressure" principle by letting users stay passive.

### Layer 2 — Device services (on-device logic)

| Component | Technology | Role |
|---|---|---|
| **Location detection** | CoreLocation (iOS), FusedLocationProvider (Android), geofence API | Detects entry/exit at registered place-parts; triggers soundscape fetch |
| **Audio playback bridge** | Spotify iOS/Android SDK, MusicKit (Apple Music), fallback to 30-second preview via Spotify Web API | Plays tracks using the user's existing music subscription |
| **On-device trace composer** | Native forms | Composes trace offline; syncs when network returns |
| **Ambient haptic layer** | CoreHaptics / Android VibrationEffect | Subtle feedback on "me too" and trace-submit (never intrusive) |
| **Local cache** | Core Data / Room | Caches nearby place soundscapes for offline commute use |

**Hierarchy rationale:** Location and audio playback are on-device because latency matters (the experience should feel instant on arrival at a place). Trace composition is offline-capable because transit (trains, tunnels) is a primary use context.

### Layer 3 — Application services (business logic, APIs)

This is where most of the custom backend lives. Each service is a small REST/GraphQL endpoint. Written in **Node.js (TypeScript)** with a **NestJS** framework, deployed on **AWS ECS Fargate** (or equivalent managed container service).

| Service | Primary responsibility | Key endpoints |
|---|---|---|
| **Soundscape service** | Given `placeId`, return current playlist, mood distribution, live listener count | `GET /places/:id/soundscape` |
| **Trace service** | Read traces for a place; write a new trace; apply moderation before publish | `GET /places/:id/traces`, `POST /traces`, `POST /traces/:id/reactions` |
| **Place registry service** | Manages the catalogue of recognised places (UTS Library, Central Station, …); exposes geofence definitions to the client | `GET /places/nearby?lat&lng`, admin endpoints for curators |
| **Artist Story service** | Hosts migration-narrative content for featured artists; returns bilingual content blocks and curated tracklists | `GET /artists/:id/story` |
| **Identity service** | Anonymous-account creation (avatar + language + region); no email, no phone required by default | `POST /identity`, `GET /identity/me` |
| **Moderation service** | Runs automated + human moderation on traces and trace tags before they become visible | `POST /moderation/review` (internal), webhook to human queue |
| **Live presence service** | Maintains the real-time "N listening now" counter per place; WebSocket-ish but scoped to the place the user is currently viewing | `WS /places/:id/presence` |

**Hierarchy rationale:** Each service owns one concept; they never reach into each other's database. The seven services communicate via REST/GraphQL calls internally, with an API Gateway (AWS API Gateway) as the single external entry point.

### Layer 4 — Data & external integrations

| Store / integration | Technology | What lives here |
|---|---|---|
| **Primary DB** | PostgreSQL 16 (AWS RDS) | Places, users, traces, artist stories, reactions |
| **Live counters** | Redis (AWS ElastiCache) | Per-place listening count, per-place recent trace count, WebSocket session tracking |
| **Search index** | OpenSearch | Fuzzy place search, trace text search (for the group moderation dashboard, not end-users) |
| **Blob storage** | AWS S3 | Artist story photos, hand-drawn journey maps, user avatar asset pack |
| **Spotify Web API** | External | Track metadata, album art, search, deep-link URIs |
| **Apple Music API** | External | Equivalent for Apple Music subscribers |
| **Geocoding** | Mapbox Geocoding API | Reverse-lookup for curator UI when onboarding new places |
| **Map tiles** | Mapbox Static API (stylised) | The custom stylised map rendered in Map Discovery |
| **Analytics** | PostHog (self-hosted) | Privacy-preserving usage metrics; no PII sent to third parties |

**Hierarchy rationale:** Postgres as source of truth; Redis for anything that needs sub-second freshness (live counts). Music catalogue is deliberately *not* ours — we integrate with Spotify/Apple for rights, royalties, and the user's existing subscription. Mapbox is chosen over Google Maps because its styling API supports the illustrated, warm-amber aesthetic the design depends on.

### Layer 5 — Inclusion infrastructure (cross-cutting)

This layer sits alongside every layer above. It is what makes the product culturally and linguistically safe.

| Component | Where it lives | What it does |
|---|---|---|
| **Bilingual content pipeline** | Layers 3 & 4 | Every artist story, trace tag suggestion, and UI string is stored with language variants. Artists submit content in at least two languages (usually English + their heritage language) |
| **"International students' picks" dataset** | Layer 4 (curated in Postgres) | A manually curated seed dataset of tracks and Stories sourced from diaspora communities in Sydney (Chinese, Vietnamese, Indian, Filipino, Iranian, Ethiopian). Prevents cold-start bias toward Anglo-Australian indie |
| **Moderation pipeline** | Layer 3 (Moderation service) + human queue | Three-stage: (1) automated toxicity classifier trained on multilingual data; (2) cultural-sensitivity review for tags touching heritage, religion, identity; (3) human review of edge cases by trained community moderators |
| **Language-first identity** | Layer 3 (Identity service) | During onboarding, language choice is asked *before* region — the UI defaults to whatever language the user picks, not the device locale. This reflects the persona's "I'm tired of English" frustration |
| **Accessibility layer** | Layer 1 | VoiceOver / TalkBack audit at every release; every trace and story has a readable text equivalent (no text-in-image) |

**Hierarchy rationale:** Inclusion is not a feature; it is a substrate. Decoupling it into its own layer in the blueprint makes clear that removing any of these pieces breaks the product, not just a module.

---

## 4. The hierarchy of interfaces (rubric requirement spotlight)

The rubric explicitly asks for "the hierarchy of interfaces". The stack produces a clear top-to-bottom hierarchy:

```
TIER 1 — Primary user interface
   └─ Map Discovery (home screen on mobile)

TIER 2 — Situated interfaces (entered from TIER 1)
   ├─ Music Discovery (place-scoped)
   └─ Artist Story (song- or story-scoped)

TIER 3 — Creation interface (entered from TIER 2)
   └─ Trace Composer

TIER 4 — Ambient interfaces (independent of TIER 1–3)
   ├─ Home-screen widget ("Near you: …")
   ├─ Lockscreen live-activity ("47 listening at UTS Library")
   └─ Push notifications (rate-limited; max 1/day in a given place)

TIER 5 — Share-out interfaces (external)
   ├─ Web Artist Story (read-only, public URL)
   └─ Deep-link URLs for WeChat / WhatsApp / email
```

**Rule:** Users can always return to TIER 1 from anywhere. TIER 4 and TIER 5 do not require the app to be opened.

---

## 5. Key data flows (how the parts connect at runtime)

Four high-value flows, shown as sequence-diagram skeletons for the blueprint image.

### 5.1 "Arriving at a place"

```
Device enters geofence
  → Location service (Layer 2) emits place-entered event
  → Client calls Soundscape service (Layer 3) → GET /places/:id/soundscape
  → Soundscape service queries Postgres (Layer 4) for tracks + traces
  → Soundscape service queries Redis for live listener count
  → Response returned; client opens Music Discovery (Layer 1)
  → Optional: push notification fired if user opted in
```

### 5.2 "Listening updates co-presence"

```
User taps play → Audio playback bridge (Layer 2) starts track
  → Client opens WebSocket to Live presence service (Layer 3)
  → Presence service increments Redis counter for :placeId
  → Presence service broadcasts new count to all connected clients at that place
  → Each client updates the "N listening now" line in real time
  → On track end / app close, WebSocket disconnects; counter decrements
```

### 5.3 "Leaving a trace"

```
User submits trace → On-device composer (Layer 2) validates and caches
  → POST /traces (Layer 3 Trace service)
  → Trace service persists to Postgres with status=PENDING
  → Trace service posts to Moderation service (Layer 3)
  → Automated classifier scores; if low-risk → status=PUBLISHED instantly
  → If uncertain → queued for human moderator
  → Once PUBLISHED, trace becomes visible in Music Discovery for that place
  → Inclusion pipeline (Layer 5) re-indexes tag for language consistency
```

### 5.4 "Discovering an Artist Story"

```
User taps artist name on trace/track
  → Client calls Artist Story service (Layer 3) → GET /artists/:id/story
  → Service returns bilingual content blocks + image refs (S3 URLs)
  → Client renders Story screen (Layer 1)
  → If user taps share → generates deep-link URL pointing to Web companion (Layer 1 Tier 5)
  → External app opens the URL; read-only Story loads without requiring City Echo install
```

---

## 6. What the blueprint image should contain

For Xinyi's (or whoever owns visual production) image generation:

### The blueprint image (the master Section E visual)

**Format:** Landscape, ~2000×1400px, clean flat-illustration style (different aesthetic from the Section D collage — this is a technical document, not a pinboard)

**Composition:**

- Five stacked horizontal bands (Layer 1 at top, Layer 4 at bottom)
- Layer 5 as a **vertical band on the left edge**, spanning all four others
- Inside each horizontal band: icon + label for each component from Section 3 above
- Between bands: thin arrows showing the primary data-flow directions
- Top-right corner: a small legend explaining arrow conventions (solid = API call, dashed = WebSocket, dotted = read-only share)
- Bottom-right corner: a tiny version label (e.g., "Blueprint v0.1 — for group review")

**Colour:** Use the same warm amber as the UI mockups for Layer 1 (the user-visible layer), cooler greys/blues for Layers 2–4 (under-the-hood), and a green tint for Layer 5 (the inclusion band) — so the viewer's eye immediately reads the inclusion commitment as distinct and cross-cutting.

### Supplementary sequence diagrams (optional)

Render the four flows in Section 5 as small swimlane diagrams placed beneath the master blueprint. These are optional — if the master blueprint is cluttered without them, include them; if the master is rich enough, leave them as appendix.

---

## 7. Open questions for the group

Items to resolve before finalising:

1. **Music rights model** — Spotify SDK playback requires the listener to hold a Spotify Premium account. Is that assumption acceptable, or do we add a fallback via 30-second previews?
2. **Geofence granularity** — UTS Library has multiple floors with different vibes (Level 5 silent vs Level 2 group study). Do we treat sub-locations as separate place-parts? (My recommendation: no, at MVP — one place per building.)
3. **Moderation staffing** — Who moderates? Volunteers from the group's network? Paid community moderators? This is a real operational question even for an ungraded prototype.
4. **Artist Story authorship** — Do featured artists write their own stories, or does a curator interview them and co-write? Affects the content pipeline design.
5. **Launch geography** — MVP at Sydney inner-city only (5 pins), or attempt broader Sydney + cross-city expansion from the start? Inner-city-only keeps the pilot believable.

---

## 8. What is deliberately NOT in this blueprint

To prevent scope creep and keep the principles honest:

- ❌ **No direct messaging or chat** — breaks the "ambient, low-pressure" principle
- ❌ **No friend/follow graph** — breaks the "anonymous by default" principle
- ❌ **No algorithmic "For You" feed** — breaks the "place-first" principle; the map is the feed
- ❌ **No user-generated profile pages** — keeps people-parts anonymous; trace is the contribution unit
- ❌ **No public "leaderboard" of most-contributing users** — gamification would re-introduce the social performance pressure the design is trying to remove

Absences are design decisions. The blueprint is as much about what we refuse to build as what we do build.
