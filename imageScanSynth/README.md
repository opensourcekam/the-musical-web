# Image Scan Synth - Image-to-Sound Conversion

A sophisticated p5.js and Tone.js project that transforms images into musical compositions by scanning pixel data row by row and converting color information into harmonically rich audio sequences.

## 🌟 Overview

This project creates a unique audio-visual experience by analyzing images pixel by pixel and converting the color data into musical notes. As the scanner moves down each row of the image, it generates chords based on the RGB values, creating a dynamic soundtrack that represents the visual content in musical form.

## ✨ Features

### Image-to-Sound Conversion
- **Pixel Analysis**: Scans images row by row, processing RGB values in real-time
- **Color-to-Frequency Mapping**: Converts red and green channel values to musical notes
- **Harmonic Generation**: Creates rich chords using multiple frequency scales (C, G, A major)
- **Volume Control**: Uses green channel to control audio volume levels
- **Duration Mapping**: Uses blue channel to determine note duration

### Advanced Audio Synthesis
- **Polyphonic Synthesis**: Multiple synthesizers working simultaneously
- **Custom Oscillators**: Complex waveform generation with partial harmonics
- **Audio Effects**: Low-pass filters, high-pass filters, and delay effects
- **LFO Modulation**: Low-frequency oscillators for dynamic sound shaping
- **Pitch Shifting**: Real-time pitch manipulation for enhanced audio texture

### Visual Feedback
- **Real-time Scanning**: Visual indicator shows current scan position
- **Debug Information**: Live display of pixel data and musical parameters
- **Color Visualization**: Current pixel color displayed in real-time
- **Responsive Design**: Canvas adapts to window size while maintaining aspect ratio

## 🛠 Technical Implementation

### Core Technologies
- **p5.js** - Creative coding framework for graphics and image processing
- **Tone.js** - Professional audio synthesis and processing library
- **TypeScript** - Type-safe JavaScript development
- **Lodash** - Utility library for enhanced functionality

### Key Components
- `setup()` - Initializes canvas, image processing, and audio synthesizers
- `processRow()` - Handles row-by-row pixel analysis and sound generation
- `pixelToSound()` - Converts RGB values to musical parameters
- `startAudio()` - Manages Web Audio API context initialization
- `draw()` - Main animation loop with visual feedback

### Audio-Visual Algorithm
1. **Image Loading**: Randomly selects from a collection of source images
2. **Row Scanning**: Processes image data row by row at controlled intervals
3. **Color Analysis**: Extracts RGB values from each pixel
4. **Frequency Mapping**: Maps red/green channels to musical scales
5. **Chord Generation**: Creates harmonic combinations using multiple scales
6. **Audio Synthesis**: Triggers polyphonic synthesizers with effects

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your system
- A modern web browser with Web Audio API support
- Audio output device (speakers or headphones recommended)

### Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

   This will:
   - Compile TypeScript files automatically
   - Start a local development server
   - Enable live reload for development
   - Open your browser automatically

### Alternative Setup (Without npm)

If you prefer to run without the build system:

1. **Navigate to the project directory:**
   ```bash
   cd imageScanSynth
   ```

2. **Start a simple HTTP server:**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

3. **Open your browser to `http://localhost:8000`**

## 🎮 How to Use

1. **Load the Page**: The image will load and display automatically
2. **Start Audio**: Click the "Start Audio" button to begin the audio context
3. **Watch and Listen**: Observe as the scanner moves down the image, generating music
4. **Debug Information**: Monitor the debug panel for real-time pixel and audio data
5. **Full Screen**: For the best experience, view in full-screen mode

## 📁 Project Structure

```
imageScanSynth/
├── index.html                    # Main HTML file with UI and styling
├── sketch.js                     # Core p5.js sketch (compiled from TypeScript)
├── sketch/
│   └── sketch.ts                 # TypeScript source code
├── package.json                  # Project dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── global.d.ts                   # Global type definitions
├── build/                        # Compiled output directory
├── node_modules/                 # Dependencies
├── *.jpeg                        # Source images for audio generation
└── README.md                     # This file
```

## ⚙️ Configuration

### Adjustable Parameters
- `synthCount` - Number of simultaneous synthesizers (default: 5)
- `rowInterval` - Time between row processing (default: 1000/10 ms)
- `batchSize` - Pixels processed per frame (default: 105)
- `noteLengths` - Musical note durations for effects

### Audio Configuration
```javascript
// Synthesizer settings
const synth = new Tone.PolySynth(Tone.Synth, {
    "detune": Math.random() * 15,
    "portamento": Math.random() * 26,
    "envelope": {
        "attack": Math.random() * 5.005,
        "decay": Math.random() * 4.1,
        "release": Math.random() * 10,
        "sustain": Math.random() * 1
    }
});

// Filter settings
lowPassFilter = new Tone.Filter(800, "lowpass");
hpFilter = new Tone.Filter(1500, "highpass");
```

### Musical Scales
- **C Major Scale**: [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88]
- **G Major Scale**: [196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 392.00]
- **A Major Scale**: [220.00, 246.94, 277.18, 293.66, 329.63, 369.99, 415.30]

## 🎨 Visual Elements

- **Source Images**: Collection of JPEG images for audio generation
- **Scanning Line**: Visual indicator of current processing row
- **Debug Panel**: Real-time display of pixel and audio data
- **Color Visualization**: Current pixel color display
- **Responsive Canvas**: Automatically scales to fit window

## 🎵 Audio Elements

- **Polyphonic Synthesis**: Multiple synthesizers for rich harmonies
- **Custom Oscillators**: Complex waveforms with partial harmonics
- **Audio Effects Chain**: Filters, delays, and pitch shifting
- **LFO Modulation**: Dynamic frequency and amplitude modulation
- **Harmonic Progressions**: Musical structure based on image content

## 🔧 Development

### TypeScript Development
The project uses TypeScript for type safety and better development experience:

```bash
# Watch for changes and recompile
npm run start-compile

# Start development server
npm run start-run
```

### Key Functions

- `setup()` - Initializes canvas, image processing, and audio synthesizers
- `processRow()` - Handles row-by-row pixel analysis
- `pixelToSound()` - Converts RGB values to musical parameters
- `startAudio()` - Manages Web Audio API context
- `draw()` - Main animation loop

### Audio Considerations
- Web Audio API requires user interaction to start
- Multiple synthesizers create complex harmonic textures
- Effects chain adds depth and character to the audio
- Real-time processing maintains smooth performance

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

Source images should be:
- High resolution for detailed audio generation
- Good color variation for musical diversity
- In JPEG format
- Placed in the project root directory
- Referenced in the `preload()` function

## 🎵 Audio Sample Requirements

The project generates audio entirely through synthesis, requiring:
- No external audio files
- Web Audio API support
- Sufficient processing power for real-time synthesis
- Quality audio output device for best experience

## 🔗 Related Projects

This project is part of a series exploring audio-visual experiences:
- **Breathing** - Audio-reactive meditation experience
- **Electric Brightness** - Visual star field animation
- **Electric Brightness Sound** - Audio-reactive star field

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome! Feel free to:
- Report bugs or issues
- Suggest new image processing algorithms
- Propose improvements to the audio synthesis
- Share your own image-to-sound creations

## 📄 License

This project is open source and available under the MIT License.

---

*Created as part of a creative coding portfolio by Kameron Robinson showcasing advanced audio-visual programming, image processing, and algorithmic music composition.*
