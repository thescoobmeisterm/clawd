# AI Image Generation - Professional Design & Transparency Fixes

**Last Updated:** 2026-02-01

## Problem 1: Missing "Professional Designer Feel"

The AI is generating art, not designs. Fix by being more specific:

### Add These Style Modifiers to Every Prompt

| Instead of... | Try... |
|--------------|--------|
| "cute dinosaur" | "flat vector illustration, minimal design, clean lines, Pantone colors" |
| "funny cat shirt" | "screen print ready, bold graphic, centered composition, limited 3-color palette" |
| "colorful pattern" | "seamless repeat, geometric abstraction, Bauhaus inspired, balanced negative space" |

### Professional Design Prompt Structure

```
[subject], [style] + technical specs
```

**Example:**
```
Cute dinosaur wearing a party hat, flat vector art style, minimal design, 
bold thick outlines, centered composition, 3-color palette (teal, coral, cream),
transparent background, print-ready, white background
```

### Key Professional Design Keywords
- **Composition:** centered, symmetrical, rule of thirds, balanced negative space
- **Style:** flat vector, minimalist, geometric, Swiss design, Bauhaus
- **Technical:** print-ready, screen print optimized, vector scalable, clean lines
- **Color:** limited palette, 2-3 colors, Pantone-matched, high contrast
- **Details:** bold outlines, no gradients, no shading, simplified forms

---

## Problem 2: Transparent Background (Checker Pattern)

Nano Banana and similar tools often output a **preview with checker pattern** instead of actual transparent PNGs.

### Solutions

#### Option A: Use Remove.bg (Fastest)
1. Go to https://remove.bg
2. Upload the image
3. Download the clean PNG with real transparency

#### Option B: Use Photopea (Free, Browser-Based)
1. Go to https://photopea.com
2. Open your image
3. Select → Color Range → Pick the gray/white background → Delete
4. File → Export PNG

#### Option C: Better Prompts (Works Sometimes)
Instead of "transparent background," try:
- "isolated subject on pure white background"
- "cutout style, white background"
- "product photography style, clean white backdrop"

Then remove white in post-processing.

---

## Updated Nano Banana Workflow

1. **Prompt for white background, not transparent**
2. **Generate**
3. **Remove background** using remove.bg or Photopea
4. **Add to product** (Printify, etc.)

### Proven Nano Banana Prompts

**For T-Shirt Designs:**
```
Flat vector graphic, centered composition, bold clean lines, 
limited color palette (teal/navy/white), no gradients, 
transparent background when exported
```

**For Funny/Edgy Designs:**
```
Minimalist typography + graphic, screen print ready, 
bold contrast, 2-color design, clean edges, 
isolated subject on white
```

**For Children's/Playful:**
```
Whimsical flat illustration, thick outlines, saturated colors, 
simple shapes, centered, playful composition
```

---

## Quick Post-Processing Checklist

Before uploading to Printify/Etsy:

- [ ] Remove background (real transparency)
- [ ] Check colors match Pantone/brand
- [ ] Verify dimensions (typically 4500x5400px for Printify)
- [ ] Preview on mockup before publishing
- [ ] Export as PNG (highest quality)
