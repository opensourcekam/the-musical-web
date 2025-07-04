# Electric Brightness Sound - Audio-Reactive Star Field

A p5.js and Tone.js creative coding project that transforms bright pixels from an image into an animated star field with synchronized audio, creating an immersive audio-visual experience where visual connections trigger musical elements.

## 🌟 Overview

This project extends the original Electric Brightness concept by adding audio-reactive elements. As bright pixels from a photograph are connected with animated lines, the visual connections trigger musical samples, creating a synchronized audio-visual composition that responds to both the image data and user interaction.

## ✨ Features

### Audio-Visual Synchronization
- **Real-time Audio Triggering**: Visual connections trigger musical samples
- **Synchronized Timing**: Audio events are perfectly timed with visual animations
- **Interactive Audio**: Mouse position influences visual colors and audio characteristics
- **Sample-based Synthesis**: Uses high-quality audio samples for rich soundscapes

### Enhanced Visual Effects
- **Mouse-Reactive Colors**: Line colors respond to mouse position (red/orange/yellow spectrum)
- **Noise-based Distortion**: Perlin noise creates organic, flowing line movements
- **Progressive Animation**: Stars appear gradually with synchronized audio accompaniment
- **Responsive Design**: Canvas adapts to window size while maintaining aspect ratio

### Audio System
- **Tone.js Integration**: Professional-grade audio processing and synthesis
- **Custom Sample Library**: Curated collection of atmospheric sounds
- **Chord Progressions**: Musical structure based on visual star connections
- **Volume Control**: Optimized audio levels for immersive experience

## 🛠 Technical Implementation

### Core Technologies
- **p5.js** - Creative coding framework for graphics and animation
- **Tone.js** - Web Audio API wrapper for professional audio processing
- **HTML5 Canvas** - High-performance graphics rendering
- **Lodash** - Utility library for enhanced JavaScript functionality

### Key Components
- `setup()` - Initializes both visual canvas and audio sampler
- `findBrightestPixels()` - Analyzes image for bright pixel detection
- `drawCurvedLines()` - Renders animated lines with audio triggering
- `playChord()` - Manages audio sample playback and musical structure
- `sampler` - Tone.js sampler for high-quality audio playback

### Audio-Visual Algorithm
1. **Image Analysis**: Detects bright pixels above threshold
2. **Progressive Animation**: Gradually reveals stars at controlled speed
3. **Line Rendering**: Draws noise-distorted lines between stars
4. **Audio Triggering**: Synchronizes musical samples with visual connections
5. **Interactive Response**: Mouse position influences visual and audio characteristics

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your system
- A modern web browser with Web Audio API support
- Audio output device (speakers or headphones recommended)

### Installation & Setup

1. **Install p5-server globally:**
   ```bash
   npm install -g p5-server
   ```

2. **Navigate to the project directory:**
   ```bash
   cd electricBrightnessSound
   ```

3. **Start the development server:**
   ```bash
   p5 serve --open
   ```

   This will:
   - Start a local development server (usually on port 3000)
   - Open your browser automatically
   - Enable live reload for development

### Alternative Setup (Without p5-server)

If you prefer not to use p5-server, you can run this project with any local web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 🎮 How to Use

1. **Load the Page**: The animation will start automatically
2. **Enable Audio**: Click anywhere on the canvas to start the audio context
3. **Interact**: Move your mouse to see colors and audio characteristics change
4. **Experience**: Watch and listen as stars connect with synchronized audio
5. **Full Screen**: For the best experience, view in full-screen mode

## 📁 Project Structure

```
electricBrightnessSound/
├── index.html                    # Main HTML file with p5.js and Tone.js setup
├── sketch-with-sound.js          # Core p5.js sketch with audio integration
├── IMG_8153.jpeg                # Source image for star detection
├── samples/                     # Audio sample library
│   ├── 22647-swell-rise-91.mp3
│   ├── 72261-Tribal_percussion_melodic_twinkle-BLASTWAVEFX-06983.mp3
│   └── 8412-koto-c3.mp3
└── README.md                    # This file
```

## ⚙️ Configuration

### Adjustable Parameters
- `speed` - Controls animation speed (default: 0.03)
- `soundSpeed` - Controls audio trigger frequency (default: 0.03)
- `threshold` - Brightness threshold for star detection (default: 200)
- `strokeWeightValue` - Line thickness (default: 3)
- `gradientResolution` - Line smoothness (default: 0.05)

### Audio Configuration
```javascript
// Adjust sampler settings
sampler = new Tone.Sampler({
    attack: 0.1,    // Attack time
    decay: 0.2,     // Decay time
    sustain: 0.9,   // Sustain level
    release: 0.2,   // Release time
    baseUrl: "./samples/"
});

// Adjust volume
gainNode = new Tone.Gain(0.4).toDestination();
```

## 🎨 Visual Elements

- **Source Image**: The photograph that provides star data
- **Animated Lines**: Noise-distorted connections between bright pixels
- **Interactive Colors**: Mouse-reactive color gradients
- **Progressive Reveal**: Gradual star field appearance with audio

## 🎵 Audio Elements

- **Atmospheric Samples**: Curated collection of ambient sounds
- **Synchronized Triggers**: Audio events timed with visual connections
- **Chord Progressions**: Musical structure based on star patterns
- **Interactive Response**: Audio characteristics influenced by user interaction

## 🔧 Development

### Live Reload Development
With p5-server, any changes you make to the files will automatically reload in the browser:

```bash
p5 serve --open
```

### Key Functions

- `setup()` - Initializes canvas, image processing, and audio sampler
- `findBrightestPixels()` - Detects and sorts bright pixels
- `drawCurvedLines()` - Renders animated lines with audio triggering
- `playChord()` - Manages musical sample playback
- `draw()` - Main animation loop

### Audio Considerations
- Web Audio API requires user interaction to start
- Audio context is initialized on first mouse click
- Samples are preloaded for smooth playback
- Volume is optimized for immersive experience

## 🌐 Browser Compatibility

This project requires modern browsers with support for:
- Web Audio API
- HTML5 Canvas
- ES6+ JavaScript features
- p5.js and Tone.js libraries

Tested and working in:
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 📱 Responsive Design

The canvas automatically:
- Scales to fit 80% of the window size
- Maintains the original image aspect ratio
- Centers itself on the page
- Adapts to different screen sizes

## 🖼️ Image Requirements

The source image should be:
- High resolution for better star detection
- Good contrast between bright and dark areas
- In JPEG or PNG format
- Named `IMG_8153.jpeg` or update the filename in the code

## 🎵 Audio Sample Requirements

Audio samples should be:
- High-quality MP3 format
- Short duration (1-3 seconds recommended)
- Atmospheric or ambient in nature
- Placed in the `samples/` directory
- Referenced correctly in the sampler configuration

## 🔗 Related Projects

This project is part of a series exploring audio-visual experiences:
- **Electric Brightness** - Visual-only star field animation
- **Starsounds 2D** - 2D audio-reactive star field
- **Starsounds 3D** - 3D audio-reactive star field

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome! Feel free to:
- Report bugs or issues
- Suggest new audio samples or effects
- Propose improvements to the audio-visual synchronization
- Share your own audio-reactive creations

## 📄 License

This project is open source and available under the MIT License.

---

*Created as part of a creative coding portfolio by Kameron Robinson showcasing audio-visual integration, interactive media, and immersive digital experiences.* 