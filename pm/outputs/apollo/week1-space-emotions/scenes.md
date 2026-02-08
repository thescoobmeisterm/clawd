# Apollo Week 1 Video - Scene Breakdown

**Theme:** Space & Emotions  
**Target Duration:** 60 seconds  
**Aspect Ratio:** 1080x1920 (Vertical/TikTok/Reels)

## Scenes

### Scene 1: Opening (0:00 - 0:08)
**Visual:** Rocket launch countdown  
**Narration:** "Welcome to Apollo's Learning Corner! Today we're going on a space adventure!"  
**Duration:** 8 seconds  
**Pexels Search:** rocket launch countdown
**Audio File:** `voice_01.mp3`

### Scene 2: Blast Off (0:08 - 0:15)
**Visual:** Rocket launching into space  
**Narration:** "Apollo is SO excited to blast off into space!"  
**Duration:** 7 seconds  
**Pexels Search:** rocket space launch
**Audio File:** `voice_02.mp3`

### Scene 3: The Wobble (0:15 - 0:25)
**Visual:** Space ship wobbling/rocking  
**Narration:** "But uh oh... the ship starts to wobble! Apollo feels scared. His heart goes fast!"  
**Duration:** 10 seconds  
**Pexels Search:** space wobble OR floating astronaut
**Audio File:** `voice_03.mp3`

### Scene 4: The Tool (0:25 - 0:35)
**Visual:** Deep breathing/calm space  
**Narration:** "What do we do when we feel scared? We breathe! One... two... three... four... five. Now Apollo feels calm."  
**Duration:** 10 seconds  
**Pexels Search:** calm space OR stars calm
**Audio File:** `voice_04.mp3`

### Scene 5: Ask for Help (0:35 - 0:45)
**Visual:** Communication/radio/signal  
**Narration:** "Apollo remembers another tool: ask for help! He calls Mission Control."  
**Duration:** 10 seconds  
**Pexels Search:** radio OR communication OR satellite
**Audio File:** `voice_05.mp3`

### Scene 6: Success (0:45 - 0:55)
**Visual:** Happy celebration/planet discovery  
**Narration:** "Mission Control helps Apollo land on a beautiful planet. He feels SO happy and proud!"  
**Duration:** 10 seconds  
**Pexels Search:** planet earth OR happy celebration
**Audio File:** `voice_06.mp3`

### Scene 7: Closing (0:55 - 1:00)
**Visual:** Apollo logo/brand  
**Narration:** "What emotion do YOU feel when you're brave? Bye for now, space explorers!"  
**Duration:** 5 seconds  
**Pexels Search:** (use branding)
**Audio File:** `voice_07.mp3`

## Assets Needed

### Audio (TTS) - ✅ COMPLETE
- [x] voice_01.mp3 - Opening (34KB)
- [x] voice_02.mp3 - Blast Off (24KB)
- [x] voice_03.mp3 - The Wobble (24KB)
- [x] voice_04.mp3 - The Tool (49KB)
- [x] voice_05.mp3 - Ask for Help (66KB)
- [x] voice_06.mp3 - Success (36KB)
- [x] voice_07.mp3 - Closing (41KB)
- [x] voice_08.mp3 - CTA (36KB)

### Video (Pexels) - ✅ COMPLETE
| Scene | Video ID | File | Size |
|-------|----------|------|------|
| Scene 1: Opening | 854270 | pexels_854270.mp4 | 12.2 MB |
| Scene 2: Blast Off | 854224 | pexels_854224.mp4 | 27.9 MB |
| Scene 3: The Wobble | 5299577 | pexels_5299577.mp4 | 8.9 MB |
| Scene 4: The Tool | 15289793 | pexels_15289793.mp4 | 11.4 MB |
| Scene 5: Ask for Help | 2954006 | pexels_2954006.mp4 | 12.7 MB |
| Scene 6: Success | 5921369 | pexels_5921369.mp4 | 24.4 MB |
| Scene 7: Closing | 7418472 | pexels_7418472.mp4 | 5.1 MB |

## Technical Notes

**TTS Settings:**
- Voice: Friendly, warm, slow pace for kids
- Stability: 0.5
- Similarity Boost: 0.75

**FFmpeg Command (when all assets ready):**
```
ffmpeg -y -i bg_01.mp4 -i voice_01.mp3 -c:v copy -c:a aac output_01.mp4
```
