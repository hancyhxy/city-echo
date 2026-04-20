/* ============================================================
   Section D · City Echo — Scrollytelling controller (v2)
   ------------------------------------------------------------
   Architecture:
     - IntersectionObserver watches each .step. When a step occupies
       the viewport centre, applyState(stepIndex) runs.
     - applyState is idempotent: it always resets every map element
       and re-applies the state for the given step. This keeps the
       map visually consistent regardless of scroll direction or speed.

   v2 changes vs v1:
     - basemap is now two layered <img> tags (cbd / wide) instead of
       inline SVG. STATES carries a `mapView` { src, x, y, scale }
       that drives Ken Burns pan + zoom transform on the basemap stage.
     - pins and trace tags carry TWO coordinate sets via data-cbd-x/y
       and data-wide-x/y. JS reads the right pair when basemap changes.
     - new STATES field: `nowPlaying` { who, track } updates a fixed
       bottom-right card showing what the current protagonist is hearing.
   ============================================================ */

(() => {

  // -----------------------------
  // DOM references
  // -----------------------------
  const stepDetectors = document.querySelectorAll('.step-detector');
  const storyCards    = document.querySelectorAll('.story-card');
  const pins          = document.querySelectorAll('.pin');
  const traces        = document.querySelectorAll('.trace');
  const basemapStage  = document.querySelector('.basemap-stage');
  const basemapImgs   = document.querySelectorAll('.basemap-img');
  const pinLayer      = document.querySelector('.pin-layer');
  const traceLayer    = document.querySelector('.trace-layer');
  const echoLayer     = document.querySelector('.echo-layer');
  const echoNotes     = document.querySelectorAll('.echo-note');
  const counterNum    = document.querySelector('.counter-num');
  const npCard        = document.querySelector('.now-playing');
  const npWho         = document.querySelector('[data-np-who]');
  const npTrack       = document.querySelector('[data-np-track]');
  const outro         = document.querySelector('.outro');

  // -----------------------------
  // STATES — single source of truth.
  // Each step is fully described here; applyState reads only this table.
  //
  // Fields:
  //   mapView    : { src, x, y, scale }
  //                 src   — 'cbd' or 'wide' (which basemap layer is active)
  //                 x, y  — translate in % (negative = pan map left/up)
  //                 scale — zoom (1 = natural, >1 = pushed in)
  //   active     : pin ids to pulse amber
  //   anchored   : pin ids in settled, deeper-glow state
  //   traces     : trace ids whose torn-paper snippet is visible
  //   rail       : whether the Burwood→Wynyard line is drawn
  //   count      : ambient listener counter
  //   nowPlaying : { who, track } card content, or null for idle
  // -----------------------------
  const STATES = {
    1: {
      tone: 'mei',
      card: 'mei',
      content: {
        meta:  'Mei · UTS Library · on loop, restless',
        title: 'She walks in, stuck on repeat.',
        body:  '<p>Another study session, another loop through the same five songs. The algorithm has run out of ideas. She doesn\'t know it yet — but the room she\'s just entered already has a sound of its own.</p>'
      },
      mapView: { src: 'cbd', x: 0, y: 0, scale: 1.0 },
      active: ['uts'],
      anchored: [],
      traces: [],
      echoNotes: [],
      rail: false,
      count: 47,
      nowPlaying: { who: 'Mei is listening', track: '〈晴天〉· Jay Chou' }
    },
    2: {
      tone: 'mei',
      card: 'mei',
      content: {
        meta:  'Mei · UTS Library · curious, lifted',
        title: 'She picks a feeling, not a genre.',
        body:  '<p>She picks a mood — focus — and a language — Chinese. The library\'s playlist reshuffles around her. A song surfaces with a quiet note: <em>"12 students in this building are listening right now."</em> She didn\'t choose it. The room did.</p>'
      },
      mapView: { src: 'cbd', x: -2, y: -2, scale: 1.15 },
      active: ['uts'],
      anchored: [],
      traces: [],
      echoNotes: ['uts-1', 'uts-2'],
      rail: false,
      count: 59,
      nowPlaying: { who: 'Mei is listening', track: '〈晴天〉· Jay Chou' }
    },
    3: {
      tone: 'mei',
      card: 'mei',
      content: {
        meta:  'Mei · UTS Library · recognised',
        title: 'A stranger has been in her chair before.',
        body:  '<p><em>"listened to this during my thesis all-nighter, felt less alone."</em> A fingerprint attached to the song — no name, no message, just a feeling. At the end of the track, Mei adds her own: <em>"first thing that\'s helped me write in Mandarin all week."</em></p>'
      },
      mapView: { src: 'cbd', x: -2, y: -2, scale: 1.15 },
      active: ['uts'],
      anchored: [],
      traces: ['mei'],
      echoNotes: ['uts-3', 'uts-4'],
      rail: false,
      count: 88,
      nowPlaying: { who: 'Mei is listening', track: '〈晴天〉· Jay Chou' }
    },
    4: {
      tone: 'mei',
      card: 'mei',
      content: {
        meta:  'Mei · UTS Library · quiet belonging',
        title: 'She belongs to this room now.',
        body:  '<p><em>"Your trace has joined 48 others at UTS Library tonight."</em> She glances up — for the first time, the other students are not strangers but a quiet constellation of listeners. She never spoke a word.</p>'
      },
      mapView: { src: 'cbd', x: 0, y: 0, scale: 1.0 },
      active: [],
      anchored: ['uts'],
      traces: ['mei-playlist'],
      echoNotes: [],
      rail: false,
      count: 102,
      nowPlaying: { who: 'Mei is listening', track: '〈晴天〉· Jay Chou' }
    },
    5: {
      tone: 'qing',
      card: 'qing',
      content: {
        meta:  'Qing · Burwood Station · tired, unsure',
        title: 'Across town, another commute begins.',
        body:  '<p>Qing stands on Platform 2 with her crossbody bag, post-uni fatigue in her shoulders. Earbuds in, nothing playing yet. Tonight she wants something — but she doesn\'t know what.</p>'
      },
      mapView: { src: 'wide', x: 18, y: -2, scale: 1.4 },
      active: ['burwood'],
      anchored: ['uts'],
      traces: [],
      echoNotes: ['bur-1', 'bur-2'],
      rail: false,
      count: 156,
      nowPlaying: { who: 'Qing is listening', track: '"Ribs" · Lorde' }
    },
    6: {
      tone: 'qing',
      card: 'qing',
      content: {
        meta:  'Qing · Burwood → Wynyard line · curious, wide',
        title: 'Her train route has its own music.',
        body:  '<p><em>"Burwood → Wynyard line · 218 commuters are sharing music along this route tonight."</em> She switches to the map view. The city reshapes itself — organised not by streets, but by what people have felt at each stop, song by song.</p>'
      },
      mapView: { src: 'wide', x: 0, y: 0, scale: 1.15 },
      active: ['burwood', 'spice', 'central'],
      anchored: ['uts'],
      traces: [],
      echoNotes: ['cen-1', 'cen-2'],
      rail: true,
      count: 218,
      nowPlaying: { who: 'Qing is listening', track: '"Ribs" · Lorde' }
    },
    7: {
      tone: 'qing',
      card: 'qing',
      content: {
        meta:  'Qing · mid-commute · held',
        title: 'A stranger left a song along her exact line — and it isn\'t even in her language.',
        body:  '<p>The track is <em>"Ribs" by Lorde</em>. English. Slow piano synth. <em>"It feels so scary getting old."</em> Attached: <em>"Mandarin is my first language but this song held me anyway. Played it between Strathfield and Central every night of my first semester."</em> She listens. She leaves her own trace. She doesn\'t know the stranger\'s name. She doesn\'t need to.</p><p class="thesis">Belonging didn\'t need a shared language. It needed a shared three minutes.</p>'
      },
      mapView: { src: 'wide', x: -8, y: 2, scale: 1.2 },
      active: ['burwood', 'central', 'wynyard'],
      anchored: ['uts'],
      traces: ['qing'],
      echoNotes: ['cen-3', 'cen-4'],
      rail: true,
      count: 274,
      nowPlaying: { who: 'Qing is listening', track: '"Ribs" · Lorde' }
    },
    8: {
      tone: 'finale',                                          // peak warmth — coral wash as both stories converge
      card: 'finale',
      content: {
        meta:  'Mei + Qing · across Sydney · at home, apart',
        title: 'Belonging is pinned across the city — not located in any one place.',
        body:  '<p>Mei never moved from a single library chair. Qing crossed half of Sydney. Both leave a piece of themselves where they were. Both carry a piece of someone else\'s home back. The map you\'ve just watched fill up <em>is</em> the design — it shows belonging as residue, distributed, asynchronous, low-pressure.</p><p class="thesis">The three kinds of parts — places, sounds, people — connect through a single surface: the map. The three screens — Map Discovery → Music Discovery → Artist Story — are how a user moves through them. Asymmetric by design: artists are named, users never are.</p>'
      },
      mapView: { src: 'finale', x: 0, y: 0, scale: 1.0 },     // switch to coral basemap, full panorama
      active: [],
      anchored: ['uts', 'burwood', 'central', 'wynyard', 'spice'],
      traces: [],
      echoNotes: ['uts-1','uts-2','uts-3','uts-4','bur-1','bur-2','cen-1','cen-2','cen-3','cen-4'],
      rail: true,
      count: 312,
      nowPlaying: { who: 'Both stories live here now', track: '〈晴天〉  ·  "Ribs"' }
    }
  };

  // -----------------------------
  // Apply state for a given step
  // -----------------------------
  function applyState(stepIdx) {
    const state = STATES[stepIdx];
    if (!state) return;

    applyTone(state.tone);
    applyMapView(state.mapView);
    applyPins(state);
    applyTraces(state);
    applyEchoNotes(state);
    applyRail(state);
    animateCounter(state.count);
    applyNowPlaying(state.nowPlaying);
    applyAudio(state.nowPlaying, stepIdx);
    applyCard(state);
  }

  // -----------------------------
  // Chromatic chaptering — body[data-tone] drives a CSS-var swap
  // for background and card surfaces. CSS handles the cross-fade.
  // -----------------------------
  function applyTone(tone) {
    if (!tone) return;
    document.body.dataset.tone = tone;
  }

  // -----------------------------
  // Story card swap — sticky double-card narrative paradigm.
  //
  // Three .story-card elements are fixed-positioned (Mei right, Qing left,
  // finale centre). Only one is .is-active at a time. When step changes:
  //   - if the chapter changed, fade old card out + fade new card in (both
  //     transitions run simultaneously via the .is-active toggle)
  //   - if the chapter stayed the same, cross-fade the inner content
  //     (fade out 0.45s → swap text → fade back in)
  // -----------------------------
  let activeCardName = null;        // tracks which chapter card is currently shown
  function applyCard(state) {
    const targetCard = document.querySelector(`.story-card[data-card="${state.card}"]`);
    if (!targetCard) return;

    if (activeCardName !== state.card) {
      // Chapter handover — swap which card is active. Write content immediately
      // (no cross-fade needed; the entire card is fading in fresh).
      writeCardContent(targetCard, state.content);
      storyCards.forEach(c => c.classList.remove('is-active'));
      targetCard.classList.add('is-active');
      activeCardName = state.card;
    } else {
      // Same chapter, just new step content — cross-fade the inner block
      const inner = targetCard.querySelector('.story-card__inner');
      targetCard.classList.add('is-fading');
      // Wait for the opacity transition (0.45s) then swap text + fade back in
      setTimeout(() => {
        writeCardContent(targetCard, state.content);
        targetCard.classList.remove('is-fading');
      }, 450);
    }
  }

  function writeCardContent(cardEl, content) {
    if (!cardEl || !content) return;
    const metaEl  = cardEl.querySelector('[data-meta]');
    const titleEl = cardEl.querySelector('[data-title]');
    const bodyEl  = cardEl.querySelector('[data-body]');
    if (metaEl)  metaEl.textContent  = content.meta;
    if (titleEl) titleEl.textContent = content.title;
    if (bodyEl)  bodyEl.innerHTML    = content.body;
  }

  function hideAllCards() {
    storyCards.forEach(c => c.classList.remove('is-active'));
    activeCardName = null;
  }

  // -----------------------------
  // Map view: switch active basemap + apply Ken Burns transform
  // -----------------------------
  function applyMapView(mv) {
    if (!mv) return;

    // Activate the right basemap image (fade-cross handled by CSS opacity transition)
    basemapImgs.forEach(img => {
      if (img.dataset.map === mv.src) img.classList.add('is-active');
      else                            img.classList.remove('is-active');
    });

    // Apply transform to basemap-stage AND pin/trace/echo layers in lockstep
    const t = `translate(${mv.x}%, ${mv.y}%) scale(${mv.scale})`;
    if (basemapStage) basemapStage.style.transform = t;
    if (pinLayer)     pinLayer.style.transform = t;
    if (traceLayer)   traceLayer.style.transform = t;
    if (echoLayer)    echoLayer.style.transform = t;

    // Reposition pins/traces/echoes for the active basemap (different maps, different anchors)
    const mapKey = mv.src; // 'cbd', 'wide', or 'finale'
    pins.forEach(pin => positionElement(pin, mapKey));
    traces.forEach(trace => positionElement(trace, mapKey));
    echoNotes.forEach(note => positionElement(note, mapKey));
  }

  function positionElement(el, mapKey) {
    const x = el.dataset[mapKey + 'X'];
    const y = el.dataset[mapKey + 'Y'];
    if (x === '' || x === undefined || y === '' || y === undefined) {
      // Element has no coordinate for this map (e.g. Burwood on cbd map) — hide
      el.style.display = 'none';
      return;
    }
    el.style.display = '';
    el.style.left = x + '%';
    el.style.top  = y + '%';
  }

  // -----------------------------
  // Pin states (active pulse vs anchored glow)
  // -----------------------------
  function applyPins(state) {
    pins.forEach(pin => {
      pin.classList.remove('is-active', 'is-anchored');
      const id = pin.dataset.pin;
      if (state.anchored.includes(id))    pin.classList.add('is-anchored');
      else if (state.active.includes(id)) pin.classList.add('is-active');
    });
  }

  // -----------------------------
  // Trace tag visibility
  // -----------------------------
  function applyTraces(state) {
    traces.forEach(trace => {
      trace.classList.remove('is-visible');
      if (state.traces.includes(trace.dataset.trace)) {
        trace.classList.add('is-visible');
      }
    });
  }

  // -----------------------------
  // Ambient echo note visibility — notes whose data-place matches an
  // active pin in the current step fade in; all others hide.
  // Anchored pins do NOT trigger notes (anchored = settled = quiet).
  // -----------------------------
  function applyEchoNotes(state) {
    const active = state.echoNotes || [];
    echoNotes.forEach(note => {
      if (active.includes(note.dataset.echo)) note.classList.add('is-active');
      else                                    note.classList.remove('is-active');
    });
  }

  // -----------------------------
  // Rail line draw-on
  // -----------------------------
  function applyRail(state) {
    if (state.rail) basemapStage.classList.add('show-rail');
    else            basemapStage.classList.remove('show-rail');
  }

  // -----------------------------
  // Now-playing card (text-only; future audio extension point)
  // -----------------------------
  function applyNowPlaying(np) {
    if (!npCard) return;
    if (np && np.who) {
      npCard.classList.add('is-active');
      if (npWho)   npWho.textContent   = np.who;
      if (npTrack) npTrack.textContent = np.track;
    } else {
      npCard.classList.remove('is-active');
      if (npWho)   npWho.textContent   = '—';
      if (npTrack) npTrack.textContent = 'silent for a moment';
    }
  }

  // -----------------------------
  // Audio controller — maps nowPlaying.track identity to <audio> element.
  // Tracks persist across steps that share the same track; only a change in
  // identity triggers a crossfade. Finale (step 8) keeps Qing's Ribs at 50%.
  // -----------------------------
  const audioMei  = document.getElementById('audio-mei');
  const audioQing = document.getElementById('audio-qing');

  // Mute state is driven by the start gate (Begin with sound / Read in silence)
  // and flipped live by the top-right sound toggle. Default muted until the
  // user makes a choice — this means applyAudio() during hero pre-gate fires
  // with volume 0 and elements still unlocked, ready to flip on demand.
  let audioMuted = true;

  const TRACK_TO_EL = {
    '〈晴天〉· Jay Chou': audioMei,
    '"Ribs" · Lorde'   : audioQing
  };

  let currentTrackEl = null;
  // Track of what SHOULD be playing (even if .play() rejected or we haven't
  // unlocked yet). unlockAudio() uses this to resume the right track on first
  // user gesture. Separate from currentTrackEl so stopCurrent() nulling doesn't
  // lose the intent.
  let desiredTrackEl = null;

  function fadeVolume(el, to, duration, done) {
    const from = el.volume;
    const t0   = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - t0) / duration);
      el.volume = from + (to - from) * t;
      if (t < 1) requestAnimationFrame(tick);
      else if (done) done();
    }
    requestAnimationFrame(tick);
  }

  // Fade out + pause + rewind. Any change of track identity restarts from
  // the top on next play — simple, predictable chapter-based semantics.
  function stopCurrent() {
    if (!currentTrackEl) return;
    const el = currentTrackEl;
    currentTrackEl = null;
    fadeVolume(el, 0, 300, () => { el.pause(); el.currentTime = 0; });
  }

  function applyAudio(np, stepIdx) {
    const isFinale = stepIdx === 8;
    if (!np) { desiredTrackEl = null; stopCurrent(); return; }
    const targetEl = isFinale ? audioQing : (TRACK_TO_EL[np.track] || null);
    if (!targetEl) { desiredTrackEl = null; stopCurrent(); return; }
    desiredTrackEl = targetEl;
    // Same track already playing, or we think it is — nothing to do.
    // readyState >= 2 (HAVE_CURRENT_DATA) guards against a stale currentTrackEl
    // that was marked "playing" but actually stalled/paused by the browser.
    if (targetEl === currentTrackEl && !targetEl.paused && targetEl.readyState >= 2) return;
    // Switch (or retry after a failed autoplay).
    if (targetEl !== currentTrackEl) {
      stopCurrent();
      currentTrackEl = targetEl;
      targetEl.currentTime = 0;
    }
    targetEl.volume = 0;
    targetEl.muted  = audioMuted;
    const tryPlay = targetEl.play();
    if (tryPlay && tryPlay.then) {
      tryPlay.then(() => {
        fadeVolume(targetEl, audioMuted ? 0 : 1.0, 400);
      }).catch((err) => {
        console.warn('[audio] play() blocked →', err.name, err.message);
        // Leave currentTrackEl set — unlockAudio() will resume when the user
        // makes a gesture. desiredTrackEl is the source of truth.
      });
    }
  }

  // Safety net — if the desired track gets paused by anything other than
  // stopCurrent() (tab-switch recovery, OS media keys, autoplay quirks),
  // resume it. stopCurrent() always nulls desiredTrackEl's partner, so an
  // intentional stop leaves el !== desiredTrackEl and is skipped.
  [audioMei, audioQing].forEach(el => {
    if (!el) return;
    el.addEventListener('pause', () => {
      if (!audioUnlocked) return;
      if (el !== desiredTrackEl) return;
      if (el.ended) return;
      el.play().catch(() => {});
    });
  });

  // -----------------------------
  // Autoplay unlock — call this from a click handler so browsers accept the
  // synchronous .play(). The old passive listeners (scroll/wheel/touchstart)
  // were unreliable on Safari and trackpad-only Chrome; we now gate on an
  // explicit button click in the hero.
  // -----------------------------
  let audioUnlocked = false;
  function unlockAudio() {
    if (audioUnlocked) return;
    audioUnlocked = true;
    const target = desiredTrackEl;
    if (!target) return;
    currentTrackEl = target;
    if (target.paused) {
      target.volume = 0;
      target.muted  = audioMuted;
      target.play().then(() => {
        fadeVolume(target, audioMuted ? 0 : 1.0, 400);
        console.log('[audio] unlocked + playing', target.id);
      }).catch(err => console.warn('[audio] unlock play failed', err.name));
    }
  }

  // -----------------------------
  // Start gate — editorial button pair on the hero. Clicking either button
  // satisfies Chrome/Safari/iOS autoplay policy via a strong user gesture.
  //   Sound  → audioMuted=false, unlock, play at full volume as soon as
  //            Step 1 fires.
  //   Silent → audioMuted=true,  unlock anyway so the top-right toggle can
  //            later flip mute without needing a fresh gesture.
  // -----------------------------
  const gateSoundBtn  = document.querySelector('[data-audio-gate-sound]');
  const gateSilentBtn = document.querySelector('[data-audio-gate-silent]');
  const soundToggle   = document.querySelector('[data-sound-toggle]');

  function closeGate(withSound) {
    audioMuted = !withSound;
    unlockAudio();
    document.body.classList.add('audio-gated-out');
    document.querySelector('.opener')?.classList.add('is-gate-closed');
    if (soundToggle) {
      soundToggle.hidden = false;
      soundToggle.dataset.state = withSound ? 'on' : 'off';
    }
  }

  if (gateSoundBtn)  gateSoundBtn.addEventListener('click',  () => closeGate(true));
  if (gateSilentBtn) gateSilentBtn.addEventListener('click', () => closeGate(false));

  // Top-right sound toggle — flips volume of the currently playing track.
  // No new gesture needed: audio was already unlocked at the gate.
  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      audioMuted = !audioMuted;
      soundToggle.dataset.state = audioMuted ? 'off' : 'on';
      if (currentTrackEl) {
        currentTrackEl.muted = audioMuted;
        fadeVolume(currentTrackEl, audioMuted ? 0 : 1.0, 350);
      }
    });
  }

  // -----------------------------
  // Animated counter (ease-out cubic, ~700ms)
  // -----------------------------
  let currentCount = 0;
  let counterTween = null;
  function animateCounter(target) {
    if (counterTween) cancelAnimationFrame(counterTween);
    const start    = currentCount;
    const delta    = target - start;
    const duration = 700;
    const t0       = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      currentCount = Math.round(start + delta * eased);
      if (counterNum) counterNum.textContent = currentCount;
      if (t < 1) counterTween = requestAnimationFrame(tick);
    }
    counterTween = requestAnimationFrame(tick);
  }

  // -----------------------------
  // Step observer — fires on each invisible .step-detector as it crosses
  // the viewport's mid-band. Drives applyState which in turn updates the
  // map, the active story-card content, the now-playing card, and tone.
  // -----------------------------
  // Ordered list of every snap target in the document (opener, opener-card,
  // 8 step-detectors, outro). Keyboard navigation walks this array so pages
  // without a step-detector (opener, opener-card) are still reachable.
  const SNAP_SECTIONS = [
    document.querySelector('.opener'),
    document.querySelector('.opener-card'),
    ...Array.from(document.querySelectorAll('.step-detector')),
    document.querySelector('.outro')
  ].filter(Boolean);
  let currentSectionIdx = 0;

  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = parseInt(entry.target.dataset.step, 10);
        applyState(idx);
        const matchIdx = SNAP_SECTIONS.indexOf(entry.target);
        if (matchIdx >= 0) currentSectionIdx = matchIdx;
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '-10% 0px -10% 0px'
  });

  stepDetectors.forEach(d => stepObserver.observe(d));

  // -----------------------------
  // Outro observer (logo card fade-in)
  // -----------------------------
  if (outro) {
    const outroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) outro.classList.add('is-visible');
      });
    }, { threshold: 0.4 });
    outroObserver.observe(outro);
  }

  // -----------------------------
  // Opener-card observer — re-triggerable so the trace-note "lands"
  // every time the reader scrolls back into page 2.
  // -----------------------------
  const openerCard = document.querySelector('.opener-card');
  if (openerCard) {
    const openerCardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          openerCard.classList.add('is-visible');
          document.body.classList.add('card-in-view');
        } else {
          openerCard.classList.remove('is-visible');
          document.body.classList.remove('card-in-view');
        }
      });
    }, { threshold: 0.4 });
    openerCardObserver.observe(openerCard);
  }

  // -----------------------------
  // Opener + opener-card tone reset — whenever either hero page is in view
  // (including on scroll-back from a step), clear body tone and deactivate
  // the now-playing card. The CSS gate at styles.css:884-887 only shows the
  // card for tone="mei"|"qing", so setting "neutral" hides it cleanly.
  // -----------------------------
  const opener = document.querySelector('.opener');
  const openerNeutralObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.body.dataset.tone = 'neutral';
        if (npCard) npCard.classList.remove('is-active');
      }
    });
  }, { threshold: 0.5 });
  if (opener)     openerNeutralObserver.observe(opener);
  if (openerCard) openerNeutralObserver.observe(openerCard);

  // -----------------------------
  // Scrolly visibility — fade the fixed-positioned map AND all story-cards
  // in/out as the .scrolly section enters/leaves the viewport. Without this
  // the map would sit on top of the opener and outro and ruin both, and
  // story-cards would leak into the outro.
  // -----------------------------
  const scrolly  = document.querySelector('.scrolly');
  const mapStick = document.querySelector('.map-sticky');
  if (scrolly && mapStick) {
    const mapObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          mapStick.classList.add('is-visible');
        } else {
          mapStick.classList.remove('is-visible');
          hideAllCards();
          if (npCard) npCard.classList.remove('is-active');
          document.body.dataset.tone = 'neutral';
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -10% 0px' });
    mapObserver.observe(scrolly);
  }

  // -----------------------------
  // Keyboard navigation — ← / → / Space walk through SNAP_SECTIONS in order.
  // scrollIntoView triggers the browser's smooth scroll, which lands on the
  // nearest snap point; the existing IntersectionObserver pipeline handles
  // any state change that should follow (for step-detector targets).
  // -----------------------------
  function goToSection(n) {
    const target = Math.max(0, Math.min(SNAP_SECTIONS.length - 1, n));
    currentSectionIdx = target;
    SNAP_SECTIONS[target].scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea, [contenteditable]')) return;
    switch (e.key) {
      case 'ArrowRight':
      case ' ':
        e.preventDefault();
        goToSection(currentSectionIdx + 1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        goToSection(currentSectionIdx - 1);
        break;
    }
  });

  // -----------------------------
  // Initial paint — populate step 1's state so the map isn't blank above
  // scrolly, then immediately revert tone + card to neutral so the hero
  // opener loads clean (no now-playing card leaking onto Page 1 / Page 2).
  // The first .step-detector intersection will re-assert the correct state.
  // -----------------------------
  applyState(1);
  document.body.dataset.tone = 'neutral';
  if (npCard) npCard.classList.remove('is-active');

})();
