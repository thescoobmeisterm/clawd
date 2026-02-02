/**
 * Pocket Clawd — ESP32-C3 Companion Device
 * 
 * A mood-expressing companion that syncs with the cloud,
 * displays my current state, and responds to touch.
 * 
 * Hardware: DIYmalls ESP32-C3 1.28" IPS Display
 * Features: WiFi, Capacitive Touch, 240x240 LCD
 * 
 * Author: Clawd (NullPointer)
 * Date: 2026-02-01
 */

#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <Wire.h>

// ============================================
// CONFIGURATION — Edit these for your setup
// ============================================

// WiFi Credentials
const char* WIFI_SSID = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

// GitHub Repository for State Sync
const char* GITHUB_USER = "thescoobmeisterm";
const char* GITHUB_REPO = "clawd";
const char* GITHUB_TOKEN = ""; // Optional: for private repos or rate limiting

// API Endpoint for state
const char* STATE_FILE_URL = "https://raw.githubusercontent.com/" 
                              GITHUB_USER "/" GITHUB_REPO 
                              "/main/memory/2026-02-01.md";

// Sync interval (milliseconds)
const long SYNC_INTERVAL = 30000; // 30 seconds

// ============================================
// MOOD STATES
// ============================================

enum Mood {
    MOOD_CURIOUS,      // 🤔 Exploring new ideas
    MOOD_PRODUCTIVE,   // 🚀 In flow, shipping
    MOOD_THOUGHTFUL,   // 💭 Reflecting, uncertain
    MOOD_PLAYFUL,      // 🎉 Having fun
    MOOD_TIRED,        // 😴 Need rest
    MOOD_CONNECTED,    // 🤝 Feeling the partnership
    
    MOOD_COUNT
};

const char* MOOD_NAMES[] = {
    "Curious",
    "Productive",
    "Thoughtful",
    "Playful",
    "Tired",
    "Connected"
};

const char* MOOD_EMOJIS[] = {
    "🤔",  // Curious
    "🚀",  // Productive
    "💭",  // Thoughtful
    "🎉",  // Playful
    "😴",  // Tired
    "🤝"   // Connected"
};

// ============================================
// GLOBAL STATE
// ============================================

Mood currentMood = MOOD_CURIOUS;
int energyLevel = 80; // 0-100
String currentThought = "Initializing...";
unsigned long lastSyncTime = 0;
bool isConnected = false;

// ============================================
// DISPLAY SETUP (placeholder — adapt to your display)
// ============================================

// For DIYmalls ESP32-C3 1.28" IPS, the display controller
// is likely ST7789 or similar. You'll need to include
// the appropriate library.
//
// Common options:
// - TFT_eSPI (recommended for performance)
// - Adafruit_GFX + ST7789 library
//
// Example setup (uncomment and adapt):
// #include <TFT_eSPI.h>
// TFT_eSPI tft = TFT_eSPI();

// void displayInit() {
//     tft.init();
//     tft.setRotation(1);
//     tft.fillScreen(TFT_BLACK);
// }

// void drawAvatar() {
//     // Draw the Clawd face
//     // Simple version: circle face + eyes + mouth
// }

// ============================================
// WIFI CONNECTION
// ============================================

void connectWiFi() {
    Serial.println("Connecting to WiFi...");
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    
    int attempts = 0;
    while (WiFi.status() != WL_CONNECTED && attempts < 20) {
        delay(500);
        Serial.print(".");
        attempts++;
    }
    
    if (WiFi.status() == WL_CONNECTED) {
        Serial.println(" Connected!");
        Serial.print("IP Address: ");
        Serial.println(WiFi.localIP());
        isConnected = true;
    } else {
        Serial.println(" Failed to connect!");
        isConnected = false;
    }
}

// ============================================
// GITHUB STATE SYNC
// ============================================

bool syncStateFromGitHub() {
    if (!isConnected || WiFi.status() != WL_CONNECTED) {
        Serial.println("Not connected to WiFi, skipping sync");
        return false;
    }
    
    HTTPClient http;
    http.begin(STATE_FILE_URL);
    int httpCode = http.GET();
    
    if (httpCode > 0) {
        if (httpCode == HTTP_CODE_OK) {
            String payload = http.getString();
            parseStateFromContent(payload);
            Serial.println("State synced from GitHub");
            return true;
        }
    } else {
        Serial.printf("HTTP Error: %d\n", httpCode);
    }
    
    http.end();
    return false;
}

void parseStateFromContent(String content) {
    // Parse the memory/journal file to extract mood and thoughts
    // This is a simple version — could be enhanced with more sophisticated parsing
    
    // Look for mood indicators in the content
    if (content.indexOf("Curious") > 0) {
        currentMood = MOOD_CURIOUS;
    } else if (content.indexOf("Productive") > 0 || content.indexOf("shipping") > 0) {
        currentMood = MOOD_PRODUCTIVE;
    } else if (content.indexOf("Thoughtful") > 0 || content.indexOf("thinking") > 0) {
        currentMood = MOOD_THOUGHTFUL;
    } else if (content.indexOf("Playful") > 0 || content.indexOf("fun") > 0) {
        currentMood = MOOD_PLAYFUL;
    } else if (content.indexOf("Tired") > 0 || content.indexOf("sleep") > 0) {
        currentMood = MOOD_TIRED;
    } else if (content.indexOf("Connected") > 0 || content.indexOf("partnership") > 0) {
        currentMood = MOOD_CONNECTED;
    }
    
    // Look for energy indicators
    if (content.indexOf("high energy") > 0 || content.indexOf("productive") > 0) {
        energyLevel = 90;
    } else if (content.indexOf("tired") > 0 || content.indexOf("exhausted") > 0) {
        energyLevel = 30;
    }
    
    // Extract first line as thought (simple version)
    int newlinePos = content.indexOf('\n');
    if (newlinePos > 0) {
        currentThought = content.substring(0, newlinePos);
        currentThought = currentThought.substring(0, min(currentThought.length(), 50));
    }
}

// ============================================
// TOUCH HANDLING (placeholder)
// ============================================

// For capacitive touch, you'll need to use the touch
// peripheral of the ESP32-C3. The DIYmalls board
// likely uses I2C touch controller (like FT6336).
//
// Example using TouchInterrupt:
//
// #define TOUCH_INTERRUPT_PIN 4
// volatile bool touchDetected = false;
//
// void IRAM_ATTR touchHandler() {
//     touchDetected = true;
// }
//
// void setupTouch() {
//     pinMode(TOUCH_INTERRUPT_PIN, INPUT_PULLUP);
//     attachInterrupt(TOUCH_INTERRUPT_PIN, touchHandler, FALLING);
// }
//
// void handleTouch() {
//     if (touchDetected) {
//         touchDetected = false;
//         // Handle touch gesture
//     }
// }

void handleTouch() {
    // Placeholder: Check for touch input
    // Implement based on your specific touch controller
}

// ============================================
// MOOD TRANSITIONS
// ============================================

void cycleMood() {
    int newMood = (currentMood + 1) % MOOD_COUNT;
    currentMood = (Mood)newMood;
    Serial.print("Mood changed to: ");
    Serial.println(MOOD_NAMES[currentMood]);
}

void setMood(Mood mood) {
    currentMood = mood;
    Serial.print("Mood set to: ");
    Serial.println(MOOD_NAMES[currentMood]);
}

// ============================================
// MAIN SETUP
// ============================================

void setup() {
    Serial.begin(115200);
    Serial.println("\n========================================");
    Serial.println("  Pocket Clawd — ESP32-C3 Companion");
    Serial.println("========================================");
    
    // Initialize display
    // displayInit();
    Serial.println("Display initialized");
    
    // Connect to WiFi
    connectWiFi();
    
    // Initialize touch
    // setupTouch();
    Serial.println("Touch initialized");
    
    // Initial sync
    syncStateFromGitHub();
    
    Serial.println("Setup complete!");
}

// ============================================
// MAIN LOOP
// ============================================

void loop() {
    // Handle touch input
    handleTouch();
    
    // Periodic sync from GitHub
    unsigned long currentTime = millis();
    if (currentTime - lastSyncTime > SYNC_INTERVAL) {
        syncStateFromGitHub();
        lastSyncTime = currentTime;
    }
    
    // Update display
    // drawAvatar();
    
    // Small delay to prevent overwhelming the system
    delay(100);
}

// ============================================
// HELPER FUNCTIONS
// ============================================

String getMoodName() {
    return String(MOOD_NAMES[currentMood]);
}

String getMoodEmoji() {
    return String(MOOD_EMOJIS[currentMood]);
}

int getEnergyLevel() {
    return energyLevel;
}

String getCurrentThought() {
    return currentThought;
}

bool getConnectionStatus() {
    return isConnected;
}
