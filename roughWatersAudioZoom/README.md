# Rough Waters Audio Zoom - Interactive Surf Spot Explorer

An enhanced p5.js and Tone.js project that creates immersive audio-visual experiences based on real-time ocean wave data from famous surf spots worldwide, featuring interactive navigation, inspirational quotes, and audio-responsive text scaling that creates a dynamic storytelling experience.

## 🌟 Overview

This project extends the original Rough Waters concept with advanced interactive features. It allows users to navigate between different surf spots, each with unique wave data, audio tracks, and inspirational quotes. The text dynamically scales based on audio progress, creating a powerful narrative experience that combines environmental data, music, and motivational messaging.

## ✨ Features

### Interactive Navigation
- **Surf Spot Selection**: Clickable list of 10 famous surf locations worldwide
- **Dynamic Switching**: Seamless transitions between different locations
- **Real-time Data Updates**: Each location fetches current wave conditions
- **Location Information**: Displays coordinates and location details

### Enhanced Visual Effects
- **Dual Flow Fields**: Two-layer flow field system with different scales
- **Audio-Reactive Animation**: Visual elements respond to audio frequency analysis
- **Interactive Surfboard Effect**: Mouse interaction creates surfing-like movements
- **Dynamic Color Mapping**: Each surf spot has unique color themes
- **Real-time Wave Visualization**: Live representation of ocean wave patterns

### Audio-Responsive Text System
- **Inspirational Quotes**: Each surf spot has a unique motivational message
- **Dynamic Text Scaling**: Quote size changes based on audio progress
- **Audio Synchronization**: Text timing perfectly matches musical progression
- **Narrative Experience**: Creates emotional storytelling through audio-visual sync

### Advanced Audio System
- **Location-Specific Audio**: Each surf spot has curated musical accompaniment
- **Wave-Responsive Volume**: Audio volume changes based on wave height
- **FFT Analysis**: Real-time frequency analysis for visual-audio synchronization
- **Audio Effects**: Delay and reverb effects with wave-responsive parameters
- **Interactive Audio Control**: Mouse position affects audio characteristics

## 🛠 Technical Implementation

### Core Technologies
- **p5.js** - Creative coding framework for graphics and animation
- **Tone.js** - Professional audio synthesis and processing library
- **Open-Meteo Marine API** - Real-time ocean wave data
- **Flow Field Algorithms** - Perlin noise-based vector field generation
- **FFT Analysis** - Real-time audio frequency analysis

### Key Components
- `setupNavigation()` - Creates interactive surf spot selection interface
- `selectSurfSpot()` - Handles location switching and data updates
- `fetchWaveData()` - Retrieves live wave data from marine API
- `updateFlowField1()` - Manages primary flow field with wave data
- `updateFlowField2()` - Manages secondary flow field with audio influence
- `drawQuote()` - Renders audio-responsive inspirational text
- `setupAudio()` - Initializes location-specific audio and effects

### Enhanced Data Flow Algorithm
1. **User Navigation**: User selects surf spot from interactive list
2. **API Fetch**: Retrieves wave height and period data for selected location
3. **Audio Setup**: Loads location-specific audio track and effects
4. **Data Mapping**: Converts wave parameters to visual and audio parameters
5. **Flow Field Generation**: Creates vector fields based on wave data and audio
6. **Text Rendering**: Displays inspirational quotes with audio-responsive scaling
7. **Visual Rendering**: Renders dual-layer flow fields with interactive effects

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your system
- A modern web browser with Web Audio API support
- Internet connection for marine API access
- Audio output device (speakers or headphones recommended)

### Installation & Setup

1. **Navigate to the project directory:**
   ```bash
   cd roughWatersAudioZoom
   ```

2. **Start a local HTTP server:**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open your browser to `http://localhost:8000`**

### Alternative Setup with p5-server

If you have p5-server installed:

```bash
# Install p5-server globally
npm install -g p5-server

# Start the development server
p5 serve --open
```

## 🎮 How to Use

1. **Load the Page**: The application will automatically select a random surf spot
2. **Navigate**: Click on different surf spots in the left sidebar to switch locations
3. **Watch the Waves**: Observe the flow field animations responding to real wave data
4. **Read the Quotes**: Watch as inspirational text scales with the audio progression
5. **Interact**: Move your mouse to control animation speed and audio effects
6. **Experience**: Listen to location-specific audio synchronized with wave conditions

## 📁 Project Structure

```
roughWatersAudioZoom/
├── index.html                    # Main HTML file with embedded JavaScript
├── audio/                        # Location-specific audio files
│   ├── 09. Track 09.mp3         # Pipeline, Hawaii
│   ├── 16. Track 16.mp3         # Mavericks, California
│   ├── 24. Track 24.mp3         # Teahupo'o, Tahiti
│   ├── 34. Track 34.mp3         # Jaws (Peahi), Hawaii
│   ├── 44. Track 44.mp3         # Nazaré, Portugal
│   ├── 61. Track 61.mp3         # Dungeons, South Africa
│   ├── 62. Track 62.mp3         # Shipstern Bluff, Tasmania
│   ├── Alien (ft. Ant Clemons).mp3
│   ├── SADEVILLAIN.mp3
│   ├── side_a.aif
│   └── side_b.aif
└── README.md                     # This file
```

## ⚙️ Configuration

### Surf Spot Locations with Quotes
```javascript
const surfSpots = [
    {
        "name": "Pipeline, Hawaii",
        "latitude": 21.664,
        "longitude": -158.054,
        "song": "09. Track 09.mp3",
        "color": "#ff0000",
        "quote": "slow down to swim through"
    },
    {
        "name": "Teahupo'o, Tahiti",
        "latitude": -17.848,
        "longitude": -149.267,
        "song": "24. Track 24.mp3",
        "color": "#00ff00",
        "quote": "ride the waves of life"
    },
    // ... additional locations with unique quotes
];
```

### Adjustable Parameters
- `scl1` - Scale for primary flow field (default: 9)
- `scl2` - Scale for secondary flow field (default: 50)
- `rowInterval` - Time between wave data updates (default: 60 frames)
- `batchSize` - Pixels processed per frame

### Audio-Responsive Text Configuration
```javascript
// Text scaling based on audio progress
const progressSeconds = Tone.TransportTime().toSeconds();
let progress = audio ? Math.abs(progressSeconds / audio.buffer.duration) : 0;
let size = map(progress, 0, 1, 16, 100);
textSize(size);
```

## 🎨 Visual Elements

- **Primary Flow Field**: Fine-scale vector field with wave-responsive behavior
- **Secondary Flow Field**: Coarse-scale dot field with audio influence
- **Wave Data Visualization**: Real-time representation of ocean conditions
- **Interactive Effects**: Mouse-responsive surfing simulation
- **Color Themes**: Unique colors for each surf location
- **Dynamic Text**: Audio-responsive inspirational quotes

## 🎵 Audio Elements

- **Location-Specific Tracks**: Curated audio for each surf spot
- **Wave-Responsive Volume**: Audio levels change with wave height
- **FFT Analysis**: Real-time frequency analysis for visual sync
- **Delay Effects**: Wave-responsive delay timing
- **Interactive Control**: Mouse position affects audio characteristics
- **Progress Tracking**: Audio progress drives text scaling

## 🔧 Development

### Key Functions

- `setupNavigation()` - Creates interactive surf spot selection
- `selectSurfSpot()` - Handles location switching and data updates
- `fetchWaveData()` - Retrieves live wave data from marine API
- `updateFlowField1()` - Updates primary flow field with wave data
- `updateFlowField2()` - Updates secondary flow field with audio influence
- `drawQuote()` - Renders audio-responsive inspirational text
- `setupAudio()` - Initializes audio system for selected location
- `updateAudio()` - Synchronizes audio with current wave conditions

### API Integration
The project uses the Open-Meteo Marine API to fetch real-time wave data:
```javascript
const response = await fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${latitude}&longitude=${longitude}&hourly=wave_height,wave_direction,wave_period&forecast_days=16`);
```

### Performance Considerations
- Wave data updates every minute to minimize API calls
- Flow field calculations optimized for real-time performance
- Audio analysis runs at 60fps for smooth visual sync
- Efficient vector field generation using Perlin noise
- Smooth transitions between different surf spots

## 🌐 Browser Compatibility

This project requires modern browsers with support for:
- Web Audio API
- HTML5 Canvas
- ES6+ JavaScript features (async/await)
- Fetch API for external data
- p5.js and Tone.js libraries

Tested and working in:
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 📱 Responsive Design

The application:
- Uses full window dimensions for immersive experience
- Maintains aspect ratio for flow field calculations
- Adapts to different screen sizes
- Optimizes performance for various devices
- Responsive navigation interface

## 🌊 Wave Data Requirements

The marine API provides:
- **Wave Height**: Measured in meters (0-10+ range)
- **Wave Period**: Measured in seconds (0-20+ range)
- **Wave Direction**: Measured in degrees
- **Forecast Data**: 16-day forecast with hourly intervals

## 🎵 Audio Requirements

Audio files should be:
- High-quality MP3 or AIFF format
- Curated to match each surf spot's character
- Properly licensed for use
- Optimized for web streaming
- Synchronized with inspirational quotes

## 🔗 Related Projects

This project is part of a series exploring audio-visual experiences:
- **Breathing** - Audio-reactive meditation experience
- **Electric Brightness** - Visual star field animation
- **Electric Brightness Sound** - Audio-reactive star field
- **Image Scan Synth** - Image-to-sound conversion
- **Rough Waters** - Basic surf spot visualizer

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome! Feel free to:
- Report bugs or issues
- Suggest new surf spots, audio tracks, or inspirational quotes
- Propose improvements to the wave data visualization
- Share your own ocean-inspired creations

## 📄 License

This project is open source and available under the MIT License.

---

*Created as part of a creative coding portfolio by Kameron Robinson showcasing interactive data visualization, audio-responsive design, and immersive environmental storytelling.* 