# Section C — Two Scenarios

Both scenarios follow the storyboard convention from Sharp, Rogers & Preece, *Fundamentals of Interaction Design* — each frame describes the **scene**, the **user action**, and the **system response**, with a short narrative caption beneath. Each scenario is **8 frames**, one storyboard strip per scenario. Every frame uses a different camera angle / shot type so that the strip reads as cinematic sequence, not a gallery of phone mockups.

---

## Two protagonists, drawn from our group personas

We deliberately use **two different personas** across the two scenarios, both from our group's primary interview research (see `assignment2/group_personas/`). This choice supports the ECD experiential goal of *distributed belonging* — belonging is demonstrated across different people in different places, not anchored to a single hero user.

**Scenario 1 protagonist — Mei Chen** (Persona 1)
25, Taiwan → Sydney 2 years, Casual Hospitality + Master's student at UTS. Mandarin/English bilingual. Music is her "steadying soundtrack" through long days; she struggles with solo-barrier at events and with algorithms that feed her the same loop. See `assignment2/group_personas/persona_mei_chen.md`.

**Scenario 2 protagonist — Qing Xu** (Persona 4)
24, China → Sydney 1–2 years, Postgraduate student. Lives 30 minutes from campus, commutes daily. Her focus quote: *"I know there are events I would enjoy, but I rarely end up going. I don't always have someone to go with, and walking in alone feels uncomfortable."* Feels caught between two cultures; music fills the quiet of living alone. See `assignment2/group_personas/persona_qing_xu.md`.

---

## App feature recap (anchoring the scenarios)

The two scenarios demonstrate six core features of City Echo:

1. **Location-based Experience** — the most-played song/playlist at a location is auto-assigned to that location; the user can accept the shared soundscape or play their own
2. **Mood/Language/Artist Filtering** — location soundscape can be filtered by mood, artist, language, style
3. **Integrated Music Map (Explore mode)** — a Google-Maps-like map where landmarks are songs with users' attached experiences, moods, and stories
4. **Experience/Mood/Story Posting** — at the end of a song, a user can optionally post their experience, mood, or story, and attach a photo of the location
5. **Playlist Saving (on/off)** — users can save location-based discoveries into personal playlists; the location-based feature can be toggled on or off
6. **Friend System** — in Explore mode or Location Experience, users can befriend others who've posted stories attached to the same songs/places, and share concerts, festivals, and playlists

Scenario 1 (Mei, UTS) focuses on features **1, 2, 4, 5**.
Scenario 2 (Qing, Burwood → Wynyard commute) focuses on features **1, 3, 4, 6**.

---

## Shared visual language (for image generation)

Apply these consistently across all 16 frames so both strips read as one coherent series:

- **Style:** soft, illustrated editorial style — think Kinfolk meets Apple Fitness+ marketing; gentle grain, warm-cool split palette
- **Palette:** muted earth tones + one signal colour — **warm amber** for the City Echo UI glow (represents "someone is here")
- **Character A (Scenario 1 — Mei):** East-Asian woman, mid-20s, shoulder-length dark hair, round wire glasses, oversized beige cardigan over a white tee, black jeans, white sneakers, canvas tote with a UTS enamel pin
- **Character B (Scenario 2 — Qing):** East-Asian woman, mid-20s, long dark hair often tied loosely back, soft knit cream jumper, wide-leg dark trousers, black ankle boots, small leather crossbody bag, understated makeup, slightly tired expression
- **Device:** iPhone with City Echo app visible (warm amber accent)
- **Shot-variety rule:** within each 8-frame strip, no two consecutive frames use the same camera distance/angle. UI-dominant frames must never exceed 2 of 8.
- **Mood contrast:** Scenario 1 = weekday afternoon, amber/cream warmth, interior (UTS Library); Scenario 2 = evening commute, blue-hour cool tones, exterior/transit (Burwood platform → train interior → Wynyard concourse)

---

# Scenario 1 — UTS Library: "The Study Companion"

**Protagonist:** Mei Chen (Persona 1)

**Arc:** Mei enters the library stuck on algorithm fatigue, discovers the library's shared soundscape, filters it to match her mood, reads a stranger's story attached to a song, adds her own story at the end of her session, and leaves with the experience saved to her Library playlist.

**Persona anchors:** "Stuck on repeat" (algorithm fatigue) · "I'm so tired of English" (language exhaustion by evening) · "Confidence primer — music puts me at ease in any setting" · "Shared music interest is the stronger connector" (Group Affinity theme 4.4)

**Experiential goal supported (ECD):** *Ambient co-presence* — feeling other students are **here with me** without needing to talk. Shared music and shared stories make a public space emotionally inhabitable.

**Features demonstrated:** Location-based Experience (1) · Mood/Language Filtering (2) · Experience/Story Posting (4) · Playlist Saving (5)

---

## Frame 1 — "Same loop, again"
**Scene:** Mid-afternoon. Mei enters UTS Library Level 5 reading room. Golden window light, rows of students at laptops. Her earbuds are in; her phone shows a Mandopop track she's played for the third day running.
**User action:** Sets down her tote, opens her laptop, absent-mindedly skips the track for the fourth time.
**System response:** (No City Echo yet — establishing the before-state.)
**Caption:** Another study session, another loop through the same five songs. The algorithm has run out of ideas.
**Image prompt:** *Wide establishing shot from corridor entrance, editorial illustration style, UTS Library Level 5 reading room, Mei walking in from the left wearing beige cardigan with canvas tote, rows of students at wooden desks in soft focus behind her, late-afternoon window light bathing the room in cream and amber, warm grain, shallow depth of field on Mei, visible small frustration on her face as she glances at her phone.*
**Frame type:** Wide establishing · **Shot:** 1/8

---

## Frame 2 — "The Library has a soundscape"
**Scene:** Mei settles at her desk. Her phone screen lights up on its own with a gentle amber prompt.
**User action:** Notices the prompt from the corner of her eye while opening her laptop.
**System response:** Subtle push: *"You're at UTS Library — 47 students are sharing a soundscape here right now. Tap to tune in."* Accept / Keep my own.
**Caption:** Every place holds its own quiet listening. The library's soundscape has been shaped by the people already here.
**Image prompt:** *Medium three-quarter shot of Mei at her desk, phone lying flat on the wooden surface with amber notification visible but not dominant, her hand mid-air reaching for the laptop, other students blurred in the background, warm amber light from the phone screen catching her glasses, desk-level camera angle.*
**Frame type:** Medium (person + device in context) · **Shot:** 2/8

---

## Frame 3 — "Filtering by mood and language"
**Scene:** Mei taps in. The Location Experience screen shows UTS Library's current shared playlist, with filter chips across the top: mood (focus · calm · lonely), language (Mandarin · English · Instrumental), artist, style.
**User action:** Taps "focus" and "Mandarin" — two filter chips light amber.
**System response:** The playlist reshuffles in real time. Top track is a Mandopop lo-fi remix she's never heard. A small line under the track reads: *"Played by 12 students in this building right now."*
**Caption:** She didn't pick a genre — she picked a feeling and a language. The library offered the rest.
**Image prompt:** *Over-the-shoulder shot from behind Mei's right side, phone in her hands occupying the lower third of the frame with filter chips and playlist visible in amber UI, her shoulder and cardigan fabric in the foreground, library bookshelves softly blurred in the background, warm editorial palette, shallow depth of field.*
**Frame type:** Over-the-shoulder · **Shot:** 3/8

---

## Frame 4 — "Someone was here before"
**Scene:** Insert close-up. The Now Playing screen shows the lo-fi Mandopop track. Beneath it, a single story card has surfaced — anonymous red-panda avatar, a photo attachment of the same library floor at night, and one short sentence: *"listened to this during my thesis all-nighter, felt less alone."*
**User action:** (No action — she reads it while resting her hand on the keyboard.)
**System response:** The card sits quietly on screen. A small counter: *"3 others felt this too."*
**Caption:** A stranger has been in her chair before her, left a sentence, and moved on. No name, no message — just a fingerprint attached to a song.
**Frame type:** Insert close-up (UI-dominant, supporting) · **Shot:** 4/8
**Image prompt:** *Extreme macro close-up of phone screen laid flat on warm wooden desk, the story card fills most of the frame with the small attached location photograph visible, amber accents, library bokeh reflected faintly on the screen glass, dust motes in a slanting beam of window light above the device, cinematic and intimate.*

---

## Frame 5 — "Settling in"
**Scene:** Time has passed. Mei is deep in her thesis document. The lo-fi Mandopop plays through her earbuds. Her shoulders have dropped; her reflection in the laptop screen shows a quieter focus.
**User action:** Keeps typing. Doesn't look at the phone.
**System response:** Playback steady. A subtle status line at the bottom of the phone reads: *"You're part of UTS Library's soundscape."*
**Caption:** She is not alone in this track. Somewhere in this building, twelve others are inside the same three minutes of music.
**Image prompt:** *Cinematic medium-wide side profile of Mei at her laptop, golden-hour light streaming horizontally across the frame, her phone propped on a stack of books showing faint amber glow, other students visible in background bokeh at their own desks, warm grain, her posture relaxed, focused expression.*
**Frame type:** Medium-wide side profile · **Shot:** 5/8

---

## Frame 6 — "End of the song — leave a trace?"
**Scene:** The track ends. A small, unhurried prompt slides up from the bottom of Mei's phone: *"How was this track for you? Attach a mood, a sentence, a photo — optional."*
**User action:** Picks up the phone. Taps *"Add mood."* Selects "focus · quietly comforted." Types one sentence: *"First thing that's helped me write in Mandarin all week."* Skips the photo.
**System response:** The prompt gently confirms — *"Your story is now attached to this track at UTS Library."* A soft amber pulse.
**Caption:** The app never demanded she say anything. But a song she actually liked earned one sentence back — her first contribution to this place.
**Image prompt:** *Close-up of Mei's hands holding the phone at desk level, her thumbs typing on the compose screen visible in soft focus, her laptop keyboard partly visible at the bottom of the frame, amber UI glow illuminating her fingertips, library shelves blurred behind, warm editorial lighting.*
**Frame type:** Hands + device detail · **Shot:** 6/8

---

## Frame 7 — "Save to Library playlist"
**Scene:** Mei's Now Playing screen shows a small heart-bookmark icon lighting amber. The app offers: *"Save this track to your 'UTS Library · Focus' playlist?"* Below, a preview of the playlist — four other tracks she's already saved from this soundscape over the past month.
**User action:** Taps "Save." The track slides into her playlist thumbnail stack.
**System response:** A soft toast: *"Saved. Next time you're here, your Library playlist will be waiting."* Beneath, a small toggle: *Location-based soundscape is ON.*
**Caption:** The discovery doesn't vanish with the session. Her library study-self now has its own quiet catalogue, built from strangers' recommendations.
**Image prompt:** *Top-down macro of the phone on the desk, the playlist save animation visible as the track thumbnail slots into a stack, coffee cup and notebook in the corners of the frame, warm amber glow from the screen, editorial still-life composition.*
**Frame type:** Top-down macro (UI-dominant, supporting) · **Shot:** 7/8

---

## Frame 8 — "She belongs to this room now"
**Scene:** Late afternoon has turned to early evening. Window light has gone gold-pink. Mei closes her laptop. On her phone, a gentle farewell: *"Your story has joined 48 others at UTS Library tonight."* She glances up — for the first time, she sees the other students around her not as strangers but as a quiet constellation of listeners.
**User action:** Puts the phone in her pocket. A small smile.
**System response:** City Echo fades to background.
**Caption:** She never spoke to anyone. She is leaving with a new playlist, a contribution, and the quiet certainty that this room has been inhabited with her.
**Image prompt:** *Wide cinematic hero shot, UTS Library at golden hour turning to dusk, Mei packing up her tote mid-foreground, other students at desks around her in soft focus forming a constellation of warm desk-lamp glows, big window showing a pink-amber Sydney sky, warm grain, editorial atmosphere, she is clearly **among** them now.*
**Frame type:** Wide cinematic resolution · **Shot:** 8/8

---

### Scenario 1 — Experiential goal check

**Ambient co-presence.** This scenario delivers the ECD goal through four concrete mechanisms: (a) the *location-based soundscape* (feature 1) makes "47 others here" the first information Mei receives — presence before content; (b) *mood + language filtering* (feature 2) respects her "tired of English" persona frustration without forcing cultural segregation; (c) the *story card* (feature 4) delivers asymmetric recognition from a stranger; (d) *playlist saving* (feature 5) means the discovery compounds session-to-session. No chat, no names, no social performance — belonging arises from simultaneity, filtering choice, and left-behind traces.

---

---

# Scenario 2 — Burwood → Wynyard Commute: "A Stranger's Recommendation"

**Protagonist:** Qing Xu (Persona 4)

**Arc:** Qing, exhausted after a day at uni, gets on the train at Burwood. On the journey to Wynyard, she opens the Explore map, discovers a song pinned to her exact line by another commuter, listens, recognises herself in the story, and — for the first time in the app — sends a friend request to someone going to the same festival she'd been too hesitant to attend alone.

**Persona anchors:** "I know there are events I would enjoy, but I rarely end up going" (focus quote) · "No one to go to events with" · "Commute — private space in public" · "Music from home brings comfort and familiarity" · "Hearing home language/music in public triggers an instant sense of familiarity" (Group Affinity theme 4.6)

**Experiential goal supported (ECD):** *Distributed belonging* — belonging deposited across the city, in transit, via small cross-user exchanges. One commute carries more than one person's story.

**Features demonstrated:** Location-based Experience (1) · Integrated Music Map / Explore mode (3) · Experience/Story Posting (4) · Friend System (6)

---

## Frame 1 — "End of a long day"
**Scene:** Burwood Station, platform 2, 6:45 pm. Winter dusk. Qing stands near the yellow line with her leather crossbody bag, wide-leg trousers, a soft cream jumper. Post-uni fatigue shows in her posture. Other commuters are scattered along the platform, each in their own phone-bubble.
**User action:** Stares at the digital board. Earbuds already in, nothing playing yet.
**System response:** (No City Echo active yet — establishing the before-state.)
**Caption:** Another day where she's been surrounded by people and spoken to almost none of them. The ride home is the part of the day she can have to herself.
**Image prompt:** *Wide cinematic hero shot, Burwood Station platform at blue hour, Qing standing mid-frame slightly off-centre in cream jumper and dark trousers with crossbody bag, her face tired but composed, warm amber platform lights contrasting with cool blue dusk sky, other commuters softly out of focus further down the platform, departure board glowing above, melancholy but settled mood.*
**Frame type:** Wide establishing · **Shot:** 1/8

---

## Frame 2 — "The train line is listening"
**Scene:** A T2/T3/T9 train rolls in. Qing boards, takes a window seat in the upper deck. As she sits, her phone lights up: *"Burwood → Wynyard line · 218 commuters are sharing music along this route tonight. Explore what they're listening to?"*
**User action:** Glances at the push. Taps to explore — she'd normally dismiss it, but tonight she wants something.
**System response:** The Explore map begins to load.
**Caption:** The entire line between Burwood and Wynyard has a listening pattern. Tonight, for the first time, she wants to see it.
**Image prompt:** *Medium close-up through the train window, Qing just sitting down, reflection of the platform lights smearing across the window glass behind her, phone in her hand with amber notification visible but not dominant, earbud wire trailing from her jumper collar, blue-hour mood, camera at eye level from the aisle seat opposite.*
**Frame type:** Medium through glass · **Shot:** 2/8

---

## Frame 3 — "The music map of the T2/T3/T9 line"
**Scene:** Explore mode opens. A stylised Sydney map, zoomed to her train route. Instead of cafes or petrol stations, the landmarks are **songs** — small amber pins at Burwood (a K-ballad), Strathfield (a Mandarin indie track), Redfern (an Aboriginal-Australian artist), Central (lo-fi hip-hop), Town Hall (jazz), Wynyard (a Vietnamese pop cover). Each pin shows a tiny story-count and mood indicator.
**User action:** Pinches to zoom along her line; taps the pin between Redfern and Central.
**System response:** The pin blooms open into a song preview card with three attached stories.
**Caption:** The map shows a city that isn't organised by shops or streets — it's organised by what people have felt here, song by song.
**Image prompt:** *Over-the-shoulder shot from the seat beside Qing, phone in her hands occupying lower third of frame with the music map UI clearly visible — amber song pins scattered along a stylised T2/T3/T9 line over Sydney — train interior with warm overhead lights and blurred window reflections in the upper background, her hair falling softly as she leans over the phone.*
**Frame type:** Over-the-shoulder · **Shot:** 3/8

---

## Frame 4 — "A stranger's story, pinned to her line"
**Scene:** Insert close-up of the expanded song card. The track is **"Ribs" by Lorde** — slow piano synth, English lyrics, *"It feels so scary getting old."* Qing's first language is Mandarin; the song is not. Attached story: an anonymous avatar (a small fox), a photo of the exact upper-deck window Qing is sitting in right now at a slightly different hour, and one sentence: *"Mandarin is my first language but this song held me anyway. Played it between Strathfield and Central every night of my first semester. Cried once. Worth it."*
**User action:** Reads twice. Taps play.
**System response:** The song begins. Qing's earbuds pick it up. A quiet confirmation: *"Now playing along your route. 41 others listening on this line tonight."*
**Caption:** Someone else has sat in her seat, looked through her window, and left a line behind. The song starts — and the carriage changes character around her.
**Image prompt:** *Extreme macro close-up of phone screen in Qing's hands, the song card with the attached window-seat photo filling the frame, amber UI glow on her fingers, warm train-interior bokeh behind the phone with faint amber overhead lights, cinematic intimate composition.*
**Frame type:** Insert close-up (UI-dominant, supporting) · **Shot:** 4/8

---

## Frame 5 — "Recognition"
**Scene:** The train is passing through the tunnel between Redfern and Central. The Mandarin indie song swells. Qing looks up from the phone at the darkened window, which now shows her faint reflection and the tunnel lights streaking past. Her expression softens — not a smile, but the small loosening of someone whose feelings have just been described accurately by a stranger.
**User action:** Lowers the phone to her lap. Listens. Breathes out.
**System response:** Playback continues; the map on the phone dims to an ambient state.
**Caption:** She didn't share his first semester. But she shares the shape of it — the end of a long day in a language that isn't hers, moving through a tunnel, music doing what no one around her could.
**Image prompt:** *Close-up portrait of Qing in profile against the train window, faint reflection of her face overlapping with streaking tunnel lights, earbud visible in her ear, soft cream jumper catching warm carriage light, her eyes slightly unfocused with a quiet emotion, shallow depth of field.*
**Frame type:** Close-up profile portrait · **Shot:** 5/8

---

## Frame 6 — "Leave her own trace"
**Scene:** The song ends just as the train pulls out of Central. The end-of-song prompt appears softly: *"Attach your own mood, sentence, or photo?"*
**User action:** Qing thinks. Takes one discreet photo of the amber light falling across her empty seat next to her. Tags mood: *"tired but held."* Adds one sentence: *"Coming home to a flat that's quiet, but this song made the quiet okay."*
**System response:** The story attaches to the track at this segment of the T2/T3/T9 line. Confirmation: *"Your story is now pinned between Central and Town Hall. Someone riding this line next week will see it."*
**Caption:** Three inputs. One photo, one phrase, one mood. She is not performing for anyone — she is leaving a small honest thing where she found one.
**Image prompt:** *High-angle top-down shot looking down at Qing's lap, her phone open to the compose screen with the just-taken photo of the amber-lit empty seat visible as a preview, her hands composing, jumper fabric and crossbody bag visible, warm train interior lighting, cinematic still-life composition.*
**Frame type:** High-angle top-down · **Shot:** 6/8

---

## Frame 7 — "She's going to the same festival"
**Scene:** The train is approaching Wynyard. As Qing looks at the fox-avatar user whose song she played, his profile shows he's also attending a free open-air gig at Hyde Park next Friday — and two other strangers who posted to this line are marked as *"going."* A subtle prompt: *"You can't message yet — but you can send a friend-request so you can explore together."*
**User action:** Stares at the button for a long beat. Exhales. Taps *"Send friend request."*
**System response:** The request sends. A gentle toast: *"We'll let you know if they accept. No pressure either way."*
**Caption:** "No one to go with" is the reason she's missed six events she wanted to attend this year. Tonight, for the first time, she does the thing that scares her — through a song, not a bio.
**Image prompt:** *Medium close-up of Qing's face lit warmly by the phone screen from below, her thumb visible at the edge of the frame hovering over the send button, train window beside her showing Wynyard platform lights approaching, a faint smile mixed with nerves, cinematic portrait lighting.*
**Frame type:** Face close-up with device light · **Shot:** 7/8

---

## Frame 8 — "Wynyard, carrying something back"
**Scene:** Wide hero shot. The train has stopped at Wynyard. Commuters are stepping off into the warm-lit underground concourse. Qing steps out with them, earbud still in, a Mandarin indie track still playing. Her phone in her coat pocket glows faintly. She glances back once at the carriage — at a seat she has left something of herself inside.
**User action:** Walks up the escalator toward the exit.
**System response:** City Echo fades to background. Lockscreen shows a gentle line: *"Commute mode. Your story rides the T2/T3/T9 tonight."*
**Caption:** She didn't speak a word to a stranger. And yet the line between Burwood and Wynyard now holds a piece of her — and she carries a piece of someone else's home song back into the city with her.
**Image prompt:** *Wide cinematic hero shot, Wynyard underground station concourse, Qing walking up the escalator mid-frame with other commuters, warm amber station lights washing the scene, she glances backwards once over her shoulder with a small settled expression, train just visible at the platform behind her through the ticket gates, editorial cinematic atmosphere, mood: melancholic but settled, something gained.*
**Frame type:** Wide cinematic resolution · **Shot:** 8/8

---

### Scenario 2 — Experiential goal check

**Distributed belonging.** This scenario delivers the ECD goal through mechanisms unique to the commute context: (a) the *Integrated Music Map* (feature 3) externalises the city's emotional pattern so Qing can *see* belonging as distributed geography, not a single community to join; (b) a *story pinned to her exact line* (feature 4) makes recognition hyper-local — it couldn't have happened on any other route; (c) the *Friend System* (feature 6) gives her, for the first time, a route past her "no one to go with" frustration that doesn't require her to perform confidence she doesn't have — the music did the social work; (d) her own *posted story* means tomorrow another commuter may have the same experience she just had; (e) **the song that recognises her isn't even in her first language** — belonging here crosses the boundary the user research kept warning us about (Group Affinity theme 4.4: *shared music interest is the stronger connector*). Belonging is not a place Qing arrives at — it's a residue she now both leaves and carries.

---

---

# Cross-scenario design through-lines

- **UI signal colour is always amber** — represents "someone is here / shared presence"
- **No faces or names for strangers** — anonymity is a feature. Avatars are animals / abstract shapes chosen at onboarding (Mei = red panda, Qing = fox)
- **Every posted story is one sentence + optional mood + optional photo** — the system refuses to become a forum or comment thread. Brevity is the inclusion policy
- **Location is the organising principle, not friendship** — the map and the soundscape exist because *places* exist; friendships are a downstream option, never a prerequisite
- **Features introduced are diegetic, never tutorialised** — each scenario shows features emerging in context, not as onboarding walkthroughs
- **Shot variety rule** — each 8-frame strip uses eight distinct camera distances/angles: wide establishing · medium · over-shoulder · insert close-up · medium-wide profile · hands/top-down · face close-up · wide resolution. No two consecutive frames repeat angle. UI-dominant frames capped at 2 per strip.

---

# Image-generation brief (for the illustrator / Lovart)

- **Total frames:** 16 (8 per scenario)
- **Format:** two horizontal storyboard strips, one strip per scenario
- **Render priority:** all 16 frames are production frames (no supporting/sketch distinction)
- **Hard constraint:** no two frames within a strip may share camera distance or angle; UI-dominant frames ≤ 2 per strip
- **Character continuity:** Mei (Scenario 1) and Qing (Scenario 2) must be visually distinct — different hair, different outfit palette, different demeanour; both mid-20s East-Asian women but not interchangeable
- **Environmental continuity:** Scenario 1 stays inside UTS Library Level 5 across all 8 frames (different angles of the same room); Scenario 2 progresses physically (Burwood platform → train carriage → Wynyard concourse)
