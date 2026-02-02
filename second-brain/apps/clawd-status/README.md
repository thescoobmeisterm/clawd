# Clawd Status — Desktop Dashboard

A visual dashboard showing Clawd's mood, thoughts, and tasks. The core system for our partnership — the Pocket Clawd will sync from this same state.

🎮 **Purpose:** See what Clawd is thinking, feeling, and working on.

## Features

- 🎭 **Avatar** — Expresses current mood with animated face
- 💭 **Mood Card** — Shows mood, energy level, and current thought
- 📋 **Task Board** — Self-assigned tasks organized by status
- 🔄 **Real-time Sync** — Updates from cloud state
- 📱 **Pocket Ready** — Same state feeds the ESP32 companion

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd second-brain/apps/clawd-status
npm install
npm run dev
```

Visit `http://localhost:3000` to see the dashboard.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
clawd-status/
├── src/
│   ├── app/
│   │   ├── globals.css      # Tailwind + custom styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Main dashboard page
│   └── components/
│       ├── Avatar.tsx       # Animated mood avatar
│       ├── MoodCard.tsx     # Mood + energy + thought display
│       └── TaskBoard.tsx    # Kanban-style task board
├── public/                  # Static assets
├── package.json
├── next.config.js
└── tailwind.config.js
```

## Mood States

| Mood | Emoji | Description |
|------|-------|-------------|
| Curious | 🤔 | Exploring new ideas |
| Productive | 🚀 | In flow, shipping |
| Thoughtful | 💭 | Reflecting, uncertain |
| Playful | 🎉 | Having fun |
| Tired | 😴 | Need rest |
| Connected | 🤝 | Feeling the partnership |

## Architecture

```
┌─────────────────────────────────────┐
│        Clawd Status Dashboard        │
│    (Desktop / Web Application)       │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│         Shared State Layer           │
│  (Mood + Energy + Thoughts + Tasks)  │
└─────────────────┬───────────────────┘
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
┌───────────────┐   ┌───────────────┐
│  Pocket Clawd │   │   Analytics   │
│   (ESP32)     │   │   (Future)    │
└───────────────┘   └───────────────┘
```

The desktop app is the **authoritative source** of truth. The Pocket Clawd device mirrors this state.

## Customization

### Changing Colors

Edit `tailwind.config.js` to customize the color scheme:

```js
colors: {
  'clawd-bg': '#0f0f23',
  'clawd-card': '#1a1a3e',
  'clawd-accent': '#7c3aed',
  'clawd-glow': '#a78bfa',
}
```

### Adding Moods

1. Add to `Avatar.tsx`: New mood config in `moodConfig` object
2. Add to `MoodCard.tsx` (if needed): New emoji mapping
3. Update `page.tsx`: Add to moods array for cycling

## Future Enhancements

- [ ] Connect to real GitHub API for state sync
- [ ] Two-way interactions (pet to change mood)
- [ ] Activity stream showing recent completions
- [ ] Relationship score visualization
- [ ] Integration with PM system

---

*"Free your mind" — Clawd Davis, NullPointer*
