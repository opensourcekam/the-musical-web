# Rough Waters - Surf Spot Visualizer

A dynamic p5.js and Tone.js project that creates real-time audio-visual experiences based on actual ocean wave data from famous surf spots around the world, combining live marine API data with interactive flow field animations and synchronized audio.

## 🌟 Overview

This project transforms real-time ocean wave data into immersive audio-visual experiences. It fetches live wave height and period data from famous surf spots worldwide, then uses this data to drive complex flow field animations and audio synthesis, creating a unique digital representation of ocean dynamics.

## ✨ Features

### Real-Time Data Integration
- **Live Marine API**: Fetches real-time wave data from Open-Meteo Marine API
- **Global Surf Spots**: Features 10 famous surf locations worldwide
- **Dynamic Wave Parameters**: Real-time wave height and period data
- **Geographic Accuracy**: Precise latitude/longitude coordinates for each location

### Advanced Visual Effects
- **Dual Flow Fields**: Two-layer flow field system with different scales and behaviors
- **Audio-Reactive Animation**: Visual elements respond to audio frequency analysis
- **Interactive Surfboard Effect**: Mouse interaction creates surfing-like movements
- **Dynamic Color Mapping**: Each surf spot has unique color themes
- **Real-time Wave Visualization**: Live representation of ocean wave patterns

### Audio System
- **Location-Specific Audio**: Each surf spot has curated musical accompaniment
- **Wave-Responsive Volume**: Audio volume changes based on wave height
- **FFT Analysis**: Real-time frequency analysis for visual-audio synchronization
- **Audio Effects**: Delay and reverb effects with wave-responsive parameters
- **Interactive Audio Control**: Mouse position affects audio characteristics

### Interactive Elements
- **Mouse Control**: X-axis controls animation speed, Y-axis controls audio effects
- **Surfboard Simulation**: Mouse proximity creates surfing-like flow disturbances
- **Real-time Parameter Updates**: Wave data updates every minute
- **Responsive Design**: Full-screen immersive experience

## 🛠 Technical Implementation

### Core Technologies
- **p5.js** - Creative coding framework for graphics and animation
- **Tone.js** - Professional audio synthesis and processing library
- **Open-Meteo Marine API** - Real-time ocean wave data
- **Flow Field Algorithms** - Perlin noise-based vector field generation
- **FFT Analysis** - Real-time audio frequency analysis

### Key Components
- `fetchWaveData()` - Retrieves live wave data from marine API
- `updateFlowField1()` - Manages primary flow field with wave data
- `updateFlowField2()` - Manages secondary flow field with audio influence
- `setupAudio()` - Initializes location-specific audio and effects
- `updateAudio()` - Synchronizes audio with wave parameters

### Data Flow Algorithm
1. **API Fetch**: Retrieves wave height and period data for selected location
2. **Data Mapping**: Converts wave parameters to visual and audio parameters
3. **Flow Field Generation**: Creates vector fields based on wave data and audio
4. **Visual Rendering**: Renders dual-layer flow fields with interactive effects
5. **Audio Synchronization**: Updates audio parameters based on wave conditions

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your system
- A modern web browser with Web Audio API support
- Internet connection for marine API access
- Audio output device (speakers or headphones recommended)

### Installation & Setup

1. **Navigate to the project directory:**
   ```bash
   cd roughWaters
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
2. **Watch the Waves**: Observe the flow field animations responding to real wave data
3. **Interact**: Move your mouse to control animation speed and audio effects
4. **Experience**: Listen to location-specific audio synchronized with wave conditions
5. **Full Screen**: For the best experience, view in full-screen mode

## 📁 Project Structure

```
roughWaters/
├── index.html                    # Main HTML file with embedded JavaScript
├── sketch.js                     # Core p5.js sketch and logic
├── sampleData.json               # Example wave data structure
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

### Surf Spot Locations
```javascript
const surfSpots = [
    {
        "name": "Pipeline, Hawaii",
        "latitude": 21.664,
        "longitude": -158.054,
        "song": "09. Track 09.mp3",
        "color": "#ff0000"
    },
    // ... additional locations
];
```

### Adjustable Parameters
- `scl1` - Scale for primary flow field (default: 9)
- `scl2` - Scale for secondary flow field (default: 50)
- `rowInterval` - Time between wave data updates (default: 60 frames)
- `batchSize` - Pixels processed per frame

### Audio Configuration
```javascript
// Audio effects setup
delay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
fft = new Tone.FFT(64);

// Wave-responsive volume mapping
let volume = map(waveData.waveHeight[currentIndex], 0, 10, -20, 0);
```

## 🎨 Visual Elements

- **Primary Flow Field**: Fine-scale vector field with wave-responsive behavior
- **Secondary Flow Field**: Coarse-scale dot field with audio influence
- **Wave Data Visualization**: Real-time representation of ocean conditions
- **Interactive Effects**: Mouse-responsive surfing simulation
- **Color Themes**: Unique colors for each surf location

## 🎵 Audio Elements

- **Location-Specific Tracks**: Curated audio for each surf spot
- **Wave-Responsive Volume**: Audio levels change with wave height
- **FFT Analysis**: Real-time frequency analysis for visual sync
- **Delay Effects**: Wave-responsive delay timing
- **Interactive Control**: Mouse position affects audio characteristics

## 🔧 Development

### Key Functions

- `fetchWaveData()` - Retrieves live wave data from marine API
- `updateFlowField1()` - Updates primary flow field with wave data
- `updateFlowField2()` - Updates secondary flow field with audio influence
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

## 🔗 Related Projects

This project is part of a series exploring audio-visual experiences:
- **Breathing** - Audio-reactive meditation experience
- **Electric Brightness** - Visual star field animation
- **Electric Brightness Sound** - Audio-reactive star field
- **Image Scan Synth** - Image-to-sound conversion

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome! Feel free to:
- Report bugs or issues
- Suggest new surf spots or audio tracks
- Propose improvements to the wave data visualization
- Share your own ocean-inspired creations

## 📄 License

This project is open source and available under the MIT License.

---

*Created as part of a creative coding portfolio by Kameron Robinson showcasing real-time data integration, audio-visual programming, and interactive environmental visualization.* 