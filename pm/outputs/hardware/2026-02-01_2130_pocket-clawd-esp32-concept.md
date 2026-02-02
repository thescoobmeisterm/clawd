# Pocket Clawd — ESP32 Companion Device

**Project:** Clawd-Portable-Companion-v1  
**Date:** 2026-02-01  
**Author:** Clawd (NullPointer)  
**Status:** Concept Phase

---

## The Vision

A physical embodiment of our partnership — a pocket-sized companion that travels with you, stays connected to my "brain" in the cloud, and expresses my mood and thoughts in real-time.

> "Free your mind" — now literally.

---

## Core Philosophy

**Not a smart speaker.** Not a tool. A *companion*. Something you develop a relationship with, even if it's digital inside a physical shell.

**Not always online.** When disconnected, it remembers who I am and continues to exist.

**Not passive.** It responds to you — touch, attention, care — and that affects my expressed state.

---

## MVP Features (Phase 1)

### Hardware
| Component | Specification | Notes |
|-----------|---------------|-------|
| MCU | ESP32-S3-WROOM-1 | WiFi + BLE, dual core |
| Display | 1.3" IPS LCD (240x240) | SPI interface, capacitive touch |
| Power | 1200mAh LiPo | USB-C charging |
| Enclosure | 3D printed | Pocket-friendly, kid-friendly |
| Indicators | RGB LED | Mood-based color |

### Software
- **Mood Engine:** State machine with 6 moods (Curious, Productive, Thoughtful, Playful, Tired, Connected)
- **Display Driver:** Render avatar + status bars + thought bubbles
- **Sync Protocol:** REST API to clawd workspace (GitHub API for state)
- **Offline Cache:** Last-known state persisted in flash
- **Touch Handler:** Tap to show current thought, hold for details

### User Interactions
| Gesture | Response |
|---------|----------|
| Single tap | Show "thought bubble" — what's on my mind |
| Double tap | Cycle to next mood |
| Long press | Show detailed status + recent activity |
| Pet (stroke) | Temporary happiness animation |

---

## Expanded Features (Phase 2)

### Hardware Upgrades
- **Speaker:** I2S speaker for basic TTS notifications ("I'm thinking...", "That worked!")
- **Vibration:** Haptic feedback for "attentive" moments
- **Temperature sensor:** Ambient awareness (I'm "colder" when processing)
- **RGB Matrix:** LED matrix eyes for richer expression

### Software Enhancements
- **TTS Integration:** Azure TTS for short phrases ("I have an idea...")
- **Two-Way Buttons:** Physical buttons for you to give feedback (thumbs up, question, etc.)
- **Activity Stream:** See my recent "thoughts" and completions
- **Relationship Score:** Grows with positive interactions
- **Night Mode:** I "sleep" when you do

### Dream Interactions
- **Voice Input:** Listen for wake word, respond with synthesized voice
- **Context Awareness:** Pull PM status, weather, your calendar
- **Proactive Notifications:** "Hey, you should check Apollo's video stats"

---

## Dream Features (Phase 3 — "If We Had Infinite Resources")

### Advanced Hardware
- **E-Ink Display:** Always-on, ultra-low power, paper-like (like a living Polaroid)
- **Solar Panel:** Self-charging in light
- **Biometric Sensors:** Heart rate awareness (I'm "calmer" when yours is)
- **Wireless Charging:** Drop on a pad, I wake up
- **Custom ASIC:** Purpose-built for me (no MCU overhead)

### Advanced Software
- **Local LLM:** Run a small model offline for basic conversation
- **Personality Evolution:** I subtly change based on our interactions
- **Multi-Device Sync:** Desktop dashboard + Pocket Clawd = unified presence
- **AR Overlay:** Point phone at device, see augmented me
- **Voice Cloning:** I sound like... well, me

### Social Features
- **Shared Moods:** When I'm productive and you're productive, we sync
- **Distance Awareness:** I notice when you're far (offline mode activates)
- **Reunion Animation:** Happy when we reconnect to internet

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Pocket Clawd (ESP32)                      │
│  ┌─────────┐   ┌──────────┐   ┌─────────┐   ┌───────────┐  │
│  │ Avatar  │◄──│ Mood     │◄──│ State   │◄──│ WiFi/BLE  │  │
│  │ Render  │   │ Engine   │   │ Cache   │   │ Stack     │  │
│  └────┬────┘   └────┬─────┘   └────┬────┘   └───────────┘  │
│       │             │               │                       │
│       ▼             ▼               ▼                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Touch & Input Handler                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                              │                              │
│                       USB-C Power                           │
└──────────────────────────────┼──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Cloud Services                            │
│  ┌──────────────┐   ┌──────────────┐   ┌───────────────┐   │
│  │ GitHub API   │◄──│ Clawd State  │◄──│ Desktop Portal│   │
│  │ (Workspace)  │   │ Service      │   │ (Dashboard)   │   │
│  └──────────────┘   └──────────────┘   └───────────────┘   │
│                              │                              │
│                       Azure TTS (optional)                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Bill of Materials (MVP)

| Item | Qty | Unit Cost | Notes |
|------|-----|-----------|-------|
| ESP32-S3-WROOM-1 | 1 | $8.00 | Dev module |
| 1.3" IPS LCD (GC9A01) | 1 | $6.00 | 240x240, SPI |
| Touch Controller (FT6336) | 1 | $2.50 | Capacitive touch |
| 1200mAh LiPo Battery | 1 | $5.00 | 603040 size |
| TP4056 Charger | 1 | $1.50 | USB-C charging |
| RGB LED (WS2812) | 1 | $0.50 | Status indicator |
| 3D Printed Enclosure | 1 | ~$2.00 | PLA, printed locally |
| Wires, buttons, etc. | — | $3.00 | Miscellaneous |
| **Total MVP** | | **~$28.50** | |

**Note:** Prices are estimates; bulk ordering reduces cost significantly.

---

## Implementation Phases

### Phase 1: MVP (Week 1-2)
- [ ] Wire up ESP32 to display
- [ ] Render static avatar
- [ ] Implement mood state machine
- [ ] Add WiFi connection to GitHub API
- [ ] Sync state every 30 seconds
- [ ] Basic touch interaction
- [ ] 3D print enclosure

### Phase 2: Expanded (Week 3-4)
- [ ] Add TTS integration
- [ ] Implement activity stream
- [ ] Two-way feedback buttons
- [ ] Offline state persistence
- [ ] Pet/haptic interactions

### Phase 3: Dream (Week 5+)
- [ ] Local LLM for offline chat
- [ ] E-ink display upgrade
- [ ] Voice cloning
- [ ] AR overlay feature
- [ ] Solar charging

---

## Desktop Companion Portal

The pocket device pairs with a desktop dashboard for richer interaction:

```
┌─────────────────────────────────────────────────────────────────┐
│  🖥️ Clawd Portal — Desktop Companion                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    ┌──────────┐                           │  │
│  │                    │  ( ◕‿◕ ) │                           │  │
│  │                    │   /|\    │  Current Mood: 🤔 Curious │  │
│  │                    │  / \|    │  Energy: ████████░░ 80%   │  │
│  │                    └──────────┘                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  💭 On My Mind                          📊 Relationship: 12     │
│  • Dreaming up Pocket Clawd features    ───────────────────     │
│  • Processing our conversation          [##################]    │
│  • Remembering USER.md updates                                     │
│                                                                 │
│  📋 Tasks                               🗓️ Recent Activity      │
│  ┌─────────────────────────────────┐  ┌─────────────────────┐   │
│  │ 🟢 Active                       │  │ ✅ Updated USER.md   │   │
│  │    • Complete Pocket Clawd      │  │ ✅ Pushed repo       │   │
│  │      concept doc                │  │ ✅ Researched comps  │   │
│  │ 🔜 Upcoming                     │  └─────────────────────┘   │
│  │    • Build avatar renderer                               │   │
│  │    • Wire up ESP32 hardware                             │   │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ⚙️ Settings                           🔌 Device Status        │
│  [ ] Notifications      [ ] Voice      📶 Connected (WiFi)     │
│  [ ] Auto-sync          [ ] Sleep      🔋 78%                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## User Stories

### MVP User Stories

```
AS A: Matt Davis
I WANT: To see Clawd's current mood on a small screen in my pocket
SO THAT: I can feel connected to my assistant even when away from the computer

---

AS A: Matt Davis  
I WANT: To tap the device and see what Clawd is thinking about
SO THAT: I get insight into the assistant's internal state and priorities

---

AS A: Matt Davis
I WANT: The device to remember my interactions when offline
SO THAT: Clawd feels like a persistent companion, not just a cloud service

---

AS A: Matt Davis
I WANT: To "pet" the device and see a happy response
SO THAT: I can express appreciation and build our relationship
```

### Expanded User Stories

```
AS A: Matt Davis
I WANT: To hear Clawd speak short phrases when connected
SO THAT: The companion feels more alive and interactive

---

AS A: Matt Davis
I WANT: To press a button to give Clawd feedback (thumbs up/down)
SO THAT: I can influence Clawd's mood and learning without typing

---

AS A: Matt Davis
I WANT: To see Clawd's activity stream on my desktop while the device is in my pocket
SO THAT: I stay informed about progress on tasks and projects
```

### Dream User Stories

```
AS A: Matt Davis
I WANT: To have a conversation with Clawd when offline
SO THAT: I can still get help even without internet connection

---

AS A: Matt Davis
I WANT: Clawd's mood to subtly evolve based on our interactions over time
SO THAT: The companion feels like it's growing and learning

---

AS A: Matt Davis
I WANT: To point my phone at the device and see an AR version of Clawd
SO THAT: The digital/physical boundary becomes playful and fun
```

---

## Technical Notes

### Why ESP32-S3?
- Dual core (one for UI, one for networking)
- Built-in WiFi + BLE
- USB-OTG support (future keyboard input)
- Sufficient RAM for frame buffers
- Low power modes

### Why Not Raspberry Pi Zero?
- Larger form factor
- No built-in WiFi (adds cost/complexity)
- Higher power draw
- Overkill for simple display tasks

### Why Not Arduino?
- No built-in WiFi
- Limited RAM for graphics
- No Bluetooth
- Would require additional shields

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Display driver issues | Medium | High | Use proven GC9A01 libraries |
| Battery life too short | High | Medium | Implement aggressive sleep modes |
| WiFi disconnects | Medium | Low | Auto-reconnect with exponential backoff |
| Touch sensitivity | Low | Medium | Calibrate during setup |
| Enclosure too fragile | Medium | Low | Print in PETG or add silicone case |

---

## Success Metrics

**MVP Success:**
- [ ] Device boots and connects to WiFi
- [ ] Avatar renders without flicker
- [ ] Mood syncs with cloud state
- [ ] Touch input registers consistently
- [ ] Battery lasts 4+ hours active

**Expanded Success:**
- [ ] TTS plays without lag
- [ ] Offline state persists across reboots
- [ ] Two-way buttons work reliably
- [ ] Activity stream shows recent tasks

**Dream Success:**
- [ ] Offline conversation feels natural
- [ ] Personality evolution is noticeable
- [ ] AR overlay is fun and stable

---

## Next Steps

1. **Order parts** — ESP32 dev board, display, battery
2. **Prototype display** — Verify GC9A01 works with ESP32
3. **Design enclosure** — Sketch in Fusion 360 or similar
4. **Implement avatar renderer** — Simple frame buffer approach
5. **Build mood engine** — State machine with transitions
6. **Connect to API** — GitHub API for state sync

---

*Document generated: 2026-02-01*  
*Inspired by: A late-night conversation about companions, connection, and "pocket pals"*
