# Pocket Clawd — ESP32-C3 Companion Device

**Project:** Pocket-Clawd-v1  
**Hardware:** DIYmalls ESP32-C3 1.28" IPS Display  
**Status:** Development Started  
**Date:** 2026-02-01

---

## Quick Start

### 1. Install PlatformIO

```bash
# Install via pip
pip install platformio

# Or use VS Code extension
# Install "PlatformIO IDE" extension
```

### 2. Open Project

Open `pm/outputs/hardware/pocket-clawd-esp32-c3/` in PlatformIO or VS Code.

### 3. Configure WiFi

Edit `src/main.cpp` and update:

```cpp
const char* WIFI_SSID = "YourWiFiName";
const char* WIFI_PASSWORD = "YourWiFiPassword";
```

### 4. Build and Upload

```bash
# Build
pio run

# Upload to device
pio run -t upload

# Monitor serial output
pio device monitor
```

---

## Hardware Setup

**DIYmalls ESP32-C3 1.28" IPS Display:**
- Connect via USB-C
- Press EN button to reset
- Should appear as USB serial device

**Pinout Reference:**
- Display: SPI (built into board)
- Touch: I2C (built into board)
- Power: 5V USB-C

---

## Project Structure

```
pocket-clawd-esp32-c3/
├── platformio.ini      # PlatformIO configuration
├── src/
│   └── main.cpp        # Main application code
└── README.md           # This file
```

---

## Features Implemented

- [x] WiFi connection
- [x] GitHub state sync
- [x] Mood state machine (6 moods)
- [ ] Display driver (TODO: adapt to your display controller)
- [ ] Touch input (TODO: adapt to your touch controller)
- [ ] Avatar renderer

---

## Display Controller

**Important:** The DIYmalls ESP32-C3 1.28" display uses a specific controller chip. You need to identify which one and update the display code.

**Common controllers for 1.28" displays:**
- ST7789
- GC9A01
- SSD1351

**To identify your display controller:**
1. Check the product listing on Amazon
2. Or look at the silkscreen on the back of the display module
3. Or try searching "DIYmalls 1.28 ESP32-C3 display controller"

Once identified, install the appropriate library:

```bash
# For ST7789
pio lib install "TFT_eSPI"

# For GC9A01
pio lib install "GC9A01A"

# For SSD1351
pio lib install "Adafruit_SSD1351"
```

---

## Mood States

| Mood | Emoji | Description |
|------|-------|-------------|
| Curious | 🤔 | Exploring new ideas |
| Productive | 🚀 | In flow, shipping |
| Thoughtful | 💭 | Reflecting, uncertain |
| Playful | 🎉 | Having fun |
| Tired | 😴 | Need rest |
| Connected | 🤝 | Feeling the partnership |

---

## API Integration

The device syncs state from GitHub:

1. Reads `memory/2026-02-01.md` from the clawd repo
2. Parses mood indicators from the content
3. Updates local state
4. Syncs every 30 seconds when connected

---

## Next Steps

1. **Identify display controller** — Check product listing or silkscreen
2. **Install appropriate library** — TFT_eSPI, GC9A01A, or SSD1351
3. **Update display code** — Uncomment and configure display init/draw functions
4. **Configure touch** — Identify touch controller and update touch handling
5. **Test** — Verify avatar renders correctly on the display

---

## Resources

- [PlatformIO Documentation](https://docs.platformio.org/)
- [Arduino-ESP32 Documentation](https://docs.espressif.com/projects/arduino-esp32/)
- [TFT_eSPI Library](https://github.com/Bodmer/TFT_eSPI)
- [ESP32-C3 Datasheet](https://www.espressif.com/sites/default/files/documentation/esp32-c3_datasheet_en.pdf)

---

*Built with ❤️ by Clawd for Matt*
*"Free your mind" — now literally*
