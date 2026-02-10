---
title: "Gridfinity PCB Starter Research"
date: "2026-02-08"
tags: ["hardware", "pcb", "kicad", "gridfinity", "usb", "oled"]
related-projects: ["Cyberdeck"]
---

# Gridfinity PCB Module Starter Research

Research compiled for Matt's beginner PCB project: modular Gridfinity modules with USB connectivity for his Cyberdeck.

---

## 1. USB Hub Chip Comparison

### Beginner-Friendly USB Hub ICs

| Chip | Ports | Package | Price | Difficulty | Notes |
|------|-------|---------|-------|------------|-------|
| **FE1.1s** | 4-port | SSOP-28 | ~$0.30 | ⭐ Easy | Popular hobbyist chip, no firmware needed |
| **SL2.1A** | 4-port | SOP-28 | ~$0.40 | ⭐ Easy | Core Chips, minimal external components |
| **USB2512B** | 2-port | QFN-36 | ~$1.50 | ⭐⭐ Medium | Microchip, more config options |
| **USB2514** | 4-port | QFN-36 | ~$1.80 | ⭐⭐ Medium | Same family, 4 ports |
| **USB2422** | 2-port | VQFN-24 | ~$2.00 | ⭐⭐ Medium | Microchip, fully programmable |

### Recommendation for Beginners

**Start with FE1.1s or SL2.1A** — these are:
- ~$0.30-0.40 each
- No firmware/flashing required
- Just need capacitors, resistors, and crystal
- Well-documented in hobbyist projects

**Reference Projects:**
- [Hackaday DIY USB 2.0 Hub](https://hackaday.io/project/183688-diy-usb-20-4-port-hub) - Uses SL2.1A
- [Hackster Hacker Friendly USB Hub](https://www.hackster.io/a13_technology/hacker-friendly-usb-hub-f7a95a) - FE1.1s based
- [PCBWay Nano USB Hub](https://www.pcbway.com/project/shareproject/I_made_a_Nano_USB_HUB_daafa782.html) - Uses USB2422

---

## 2. I2C OLED Module BOM

### Option A: Pre-Made Module Breakout (EASIEST)

Buy a pre-made OLED module and design a breakout PCB:

| Component | Source | Price | Qty |
|-----------|--------|-------|-----|
| SSD1306 128x32 OLED | Amazon/Aliexpress | $3-5 | 1 |
| Female pin headers | Digikey | $0.50 | 1 |
| 42mm Gridfinity base | Custom PCB | $2-5 | 1 |

**Total: ~$6-10 per module**

### Option B: Discrete Components (Harder, Cheaper)

| Component | Value | Package | Price | Qty |
|-----------|-------|---------|-------|-----|
| SSD1306 | IC | WLP-28 (0.4mm pitch) | $1.50 | 1 |
| Capacitor C1 | 4.7µF | 0603 | $0.10 | 1 |
| Capacitor C2 | 10µF | 0603 | $0.10 | 1 |
| Capacitor C3-C5 | 0.1µF | 0603 | $0.05 | 3 |
| Resistor R1 | 10kΩ | 0603 | $0.05 | 1 |
| Resistor R2 | 2.2kΩ (I2C address) | 0603 | $0.05 | 1 |
| Crystal Y1 | 16MHz | 3225 | $0.30 | 1 |
| OLED Glass | 128x32 | - | $2.00 | 1 |

**Total: ~$5-7 per module** — but requires fine-pitch soldering (0.4mm!)

### Recommendation

**Start with Option A** — buy pre-made OLED modules from Amazon/Aliexpress and design a **breakout/holder PCB**. This teaches you:
- PCB footprint creation
- Connector selection
- Mechanical design (Gridfinity mounting)
- Without the pain of 0.4mm pitch soldering

---

## 3. Schematic Concept: Gridfinity USB Hub Module

### Block Diagram

```
┌─────────────────────────────────────────────┐
│           Gridfinity Module Board            │
│  42mm x 42mm                               │
├─────────────────────────────────────────────┤
│                                             │
│   ┌──────────┐      ┌──────────┐           │
│   │ USB-C    │      │ FE1.1s   │           │
│   │ Input    │──────│ USB Hub  │───┬───┐   │
│   │ (from    │      │ Chip     │   │   │   │
│   │ previous │      └──────────┘   │   │   │
│   │ module)  │                    │   │   │
│   └──────────┘                    │   │   │
│                                  │   │   │
│   ┌──────────┐   ┌──────────┐    │   │   │
│   │ USB-C    │   │ USB-C    │    │   │   │
│   │ Port 1   │   │ Port 2   │    │   │   │
│   │ (output) │   │ (output) │    │   │   │
│   └────┬─────┘   └────┬─────┘    │   │   │
│        │              │           │   │   │
│        └──────────────┴───────────┘   │   │
│                                        │   │
│   ┌──────────┐                        │   │
│   │ OLED     │                        │   │
│   │ 128x32   │◄────── I2C (SDA/SCL)───┘   │
│   │ Display  │                             │
│   └──────────┘                             │
│                                             │
│   Power: 5V from USB                       │
│   Data: USB 2.0 (480Mbps)                  │
│   I2C Address: 0x3C (OLED)                │
│                                             │
└─────────────────────────────────────────────┘
```

### Key Connections

| Signal | USB-C Input | FE1.1s | USB-C Out 1 | USB-C Out 2 |
|--------|-------------|--------|-------------|-------------|
| VBUS   | 5V IN       | VBUS   | 5V OUT      | 5V OUT      |
| GND    | GND         | GND    | GND         | GND         |
| D+     | D+          | D+     | D+          | D+          |
| D-     | D-          | D-     | D-          | D-          |
| CC1/CC2| 5.1kΩ to GND| -      | -           | -           |

### I2C OLED Connections

| Signal | SSD1306 | Notes |
|--------|---------|-------|
| SDA    | SDA     | 2.2kΩ pull-up |
| SCL    | SCL     | 2.2kΩ pull-up |
| VDD    | 3.3V    | LDO if 5V input |
| GND    | GND     | - |

---

## 4. Gridfinity Base Specifications

### Standard Gridfinity Dimensions

| Parameter | Value |
|-----------|-------|
| Grid unit | 42mm x 42mm |
| Base height | 7mm |
| Hole diameter | 4.2mm |
| Hole positions | 4 corners, 6mm from edges |
| Magnet diameter | 6mm |
| Magnet depth | 2mm |

### Mounting Hole Pattern

```
     ┌──────────────────────────┐
     │    ○                ○    │  ← 6mm from edges
     │                        │
     │                        │
     │                        │
     │                        │
     │                        │
     │                        │
     │                        │
     │    ○                ○    │
     └──────────────────────────┘
```

### PCB Stackup

| Layer | Material | Thickness |
|-------|----------|-----------|
| Top   | Copper   | 35µm     |
        | Dielectric | 1.6mm   |
| Bottom| Copper   | 35µm     |

### Recommended PCB Specs

- **Size:** 42mm x 42mm (custom)
- **Layers:** 2 (simple) or 4 (if needed)
- **Thickness:** 1.6mm standard
- **Finish:** ENIG (gold) or HASL (lead-free)
- **Silkscreen:** Top and bottom recommended
- **Edge connectors:** USB-C receptacles require careful layout

---

## 5. KiCad Learning Resources

### Official KiCad Resources

| Resource | URL | Level |
|----------|-----|-------|
| KiCad Getting Started | kicad.org/help/getting-started/ | Beginner |
| KiCad Documentation | docs.kicad.org | All |
| KiCad YouTube Channel | youtube.com/@KicadOfficial | Beginner-Intermediate |

### Recommended Tutorials

| Resource | URL | Notes |
|----------|-----|-------|
| Contextual Electronics | youtube.com/@ContextualElectronics | Excellent step-by-step |
| DigiKey KiCad Tutorial | digikey.com/en/tutorials/dt/kicad | Free, comprehensive |
| SparkFun KiCad Tutorials | learn.sparkfun.com/tutorials/kicad | Good for hardware integration |
| Murder and Love Song | youtube.com/@MurderandLoveSong | Advanced, great production value |

### ClawdHub Skills (search results)

> Search clawdhub.com for "KiCad" or "PCB Design" skills — current skills installed don't include PCB design. Consider installing `electronics-design` skill if available.

---

## 6. Recommended Learning Path

### Week 1-2: KiCad Basics
1. Install KiCad 8.x (latest stable)
2. Complete DigiKey KiCad tutorial series
3. Create a simple through-hole breakout board

### Week 3-4: First USB Hub Module
1. Design USB-C connector footprint
2. Add FE1.1s circuit (reference datasheet)
3. Create 4-port USB hub layout

### Week 5-6: OLED Module
1. Design I2C OLED breakout
2. Add mounting holes for Gridfinity
3. Create combined hub + display board

### Week 7+: Custom Gridfinity Base
1. Design 42mm x 42mm PCB with mounting holes
2. Add USB-C daisy-chain connectors
3. Order prototype from PCBWay/JLCPCB

---

## 7. Next Steps for Matt

### Immediate Actions
- [ ] Download KiCad 8.x from kicad.org
- [ ] Complete DigiKey KiCad tutorial (2-3 hours)
- [ ] Order FE1.1s samples (Digikey/Mouser)
- [ ] Buy SSD1306 128x32 modules ($5-10 on Amazon)

### First Project: USB Hub Base Module
- 42mm x 42mm PCB
- USB-C input (from Pi or previous module)
- 2-4 USB-C outputs (downstream)
- Status LED
- No OLED yet — keep it simple

### BOM for First Board (USB Hub Only)

| Component | Qty | Price Est |
|-----------|-----|-----------|
| FE1.1s IC | 1 | $0.30 |
| USB-C receptacle | 3 | $1.50 |
| 12MHz crystal | 1 | $0.30 |
| 4.7µF capacitor (0603) | 4 | $0.20 |
| 0.1µF capacitor (0603) | 6 | $0.30 |
| 10kΩ resistor (0603) | 2 | $0.10 |
| 27Ω resistor (0603) | 4 | $0.20 |
| Power LED (0603) | 1 | $0.10 |
| PCB (42x42mm, 2-layer) | 5 | $15.00 |

**Total prototype parts: ~$18** (plus PCB fabrication)

---

## 8. Files to Create

| File | Description |
|------|-------------|
| `pm/outputs/hardware/2026-02-08_pcb-starter-research.md` | This document |
| `pm/outputs/hardware/2026-02-08_usb-hub-schematic.kicad_sch` | KiCad schematic (Week 3) |
| `pm/outputs/hardware/2026-02-08_oled-breakout-schematic.kicad_sch` | OLED breakout schematic (Week 5) |

---

## 9. Questions for Matt

1. **Which approach for OLED?** Buy pre-made modules ($5-10) or source discrete parts?
2. **USB ports?** How many downstream ports do you want on each module?
3. **Power source?** Will modules get power from Gridfinity bus bars or USB only?
4. **Daisy-chain topology?** True daisy-chain (data passes through) or hub-and-spoke?

---

## 10. References

- FE1.1s Datasheet: https://www.nexustek.com.tw/upload/Fe1.1s.pdf
- SL2.1A Datasheet: Core Chips documentation
- USB2512/USB2422: Microchip.com
- SSD1306 Datasheet: https://cdn-shop.adafruit.com/datasheets/SSD1306.pdf
- Gridfinity Specs: https://github.com/沥血/Gridfinity
