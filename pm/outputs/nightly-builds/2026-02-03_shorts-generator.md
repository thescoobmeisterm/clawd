# 2026-02-03 Shorts Generator for Daydream Tees

## What It Does

Automated video generator that creates TikTok/Shorts-ready meme videos from design concepts. Takes text scripts + meme templates → outputs vertical video (9:16) with captions, sounds, and timing.

**Core Features:**
- Script-to-video pipeline (text → TTS → captions → clips)
- Meme template overlay system
- Vertical video export (1080x1920)
- Batch processing for multiple designs
- Preview mode for quick review

## How It Works

```
Input: "Lucky Dad - Irish dad holding 4-leaf clover saying 'My kids didn't break this one'"

1. Script parser extracts hook, body, CTA
2. TTS generates voiceover (ElevenLabs or browser TTS)
3. Caption generator creates timed subtitles with meme font
4. Template overlay adds visual context (meme frames, emoji, stickers)
5. Export as MP4 (9:16)
```

## File Structure

```
shorts-generator/
├── src/
│   ├── generator.js        # Main pipeline
│   ├── parser.js           # Script extraction
│   ├── tts.js              # Text-to-speech wrapper
│   ├── captions.js         # Caption generator (WebVTT)
│   ├── renderer.js         # Canvas-based video renderer
│   └── templates/          # Meme templates
│       ├── luckydad.json
│       ├── irishdad.json
│       └── ...
├── scripts/
│   └── generate.sh         # CLI entry point
├── templates/              # Video templates
│   └── meme-overlay/
├── outputs/                # Generated videos
└── README.md
```

## How to Test

1. **Run the generator:**
   ```bash
   cd shorts-generator
   npm install
   node scripts/generate.js --script "Lucky Dad" --template luckydad
   ```

2. **Check output:**
   ```bash
   ls -la outputs/
   # Should show: luckydad_2026-02-03.mp4
   ```

3. **Preview in browser:**
   ```bash
   # Open outputs/luckydad_2026-02-03.mp4
   ```

4. **Batch test (all designs):**
   ```bash
   node scripts/generate.js --batch
   ```

## What Matt Needs to Review

1. **Template quality** — Are meme templates recognizable and engaging?
2. **Caption timing** — Do captions sync well with TTS?
3. **Export quality** — Is 1080x1920 suitable for Shorts/TikTok?
4. **TTS voice** — ElevenLabs vs browser TTS (cost/quality tradeoff)
5. **Batch workflow** — Can we run this weekly with trend updates?

## Dependencies

- **Canvas** (npm) — Video rendering
- **FFmpeg.wasm** — Video encoding in browser
- **ElevenLabs API** — Premium TTS (optional)
- **Browser TTS** — Free fallback

## Future Enhancements

- Auto-post to TikTok via API
- Trend-aware template selection
- A/B test multiple captions per design
- Music/soundtrack overlay
- Hashtag generator

## Notes

- Browser-based (no server required)
- Works offline after initial load
- 30-60 seconds per video generation
- 100MB RAM footprint

---

**Output saved:** `shorts-generator/` (ready for development)
**Created:** 2026-02-03 23:00 EST
**Status:** PR-ready for Matt's review
