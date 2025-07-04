# Star Sounds 2D - Audio-Reactive Star Field

A sophisticated p5.js and Tone.js project that transforms bright pixels from images into complex musical compositions, featuring an extensive audio effects chain, dynamic BPM modulation, and 2D star field visualization with audio-reactive animations.

## 🌟 Overview

This project creates an immersive audio-visual experience by analyzing images to detect bright pixels (stars) and converting them into rich musical compositions. It features a comprehensive audio effects system with multiple synthesizers, dynamic BPM changes, and real-time audio analysis that influences the visual animations.

## ✨ Features

### Advanced Audio System
- **Multi-Synthesizer Architecture**: Sampler, bass drum, and bass synth working together
- **Complex Effects Chain**: Reverb, delay, echo, chorus, phaser, tremolo, and EQ
- **Dynamic BPM Modulation**: Tempo changes automatically over time
- **Audio Analysis**: Real-time waveform analysis for visual feedback
- **Scheduled Audio Events**: Precise timing control for musical composition

### Visual Effects
- **2D Star Field**: Bright pixels from images become animated stars
- **Audio-Reactive Lines**: Connecting lines respond to audio energy
- **Gradient Animations**: Smooth color transitions with wave modulation
- **Mouse-Interactive Colors**: Dynamic color changes based on cursor position
- **Mini Canvas**: Secondary visualization for additional feedback

### Interactive Elements
- **Mouse Control**: Position affects colors and visual characteristics
- **Audio Context Management**: Click to start audio system
- **Real-time Parameter Updates**: Continuous adjustment of audio and visual elements
- **Responsive Design**: Canvas adapts to window size while maintaining aspect ratio

## 🛠 Technical Implementation

### Core Technologies
- **p5.js** - Creative coding framework for graphics and animation
- **Tone.js** - Professional audio synthesis and processing library
- **Lodash** - Utility library for enhanced functionality
- **Audio Effects Chain** - Complex signal processing pipeline
- **Real-time Analysis** - Waveform analysis for visual feedback

### Key Components
- `setupAudioNodes()` - Initializes complex audio effects chain
- `findBrightestPixels()` - Analyzes image for bright pixel detection
- `drawCurvedLines()` - Renders audio-reactive connecting lines
- `scheduleAudio()` - Manages timed audio events and BPM changes
- `getEnergy()` - Analyzes audio waveform for visual feedback
- `connectEffects()` - Dynamically routes audio through effects

### Audio Effects Chain
```javascript
// Complex audio routing
sampler.chain(filter, reverb, delay, gainNode, eq3, analyser, Tone.Destination);

// Multiple synthesizers
bassDrum = new Tone.MembraneSynth({...});
bassSynth = new Tone.Synth({...});

// Effects processors
reverb = new Tone.Reverb({ decay: 5, wet: 0.5 });
chorus = new Tone.Chorus(4, 2.5, 0.5);
phaser = new Tone.Phaser({ frequency: 0.5, octaves: 3 });
tremolo = new Tone.Tremolo(9, 0.75);
```

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your system
- A modern web browser with Web Audio API support
- Audio output device (speakers or headphones recommended)

### Installation & Setup

1. **Navigate to the project directory:**
   ```bash
   cd starsounds2d
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

1. **Load the Page**: The image will load and display automatically
2. **Start Audio**: Click anywhere on the canvas to begin the audio context
3. **Watch the Stars**: Observe as bright pixels become animated stars
4. **Listen**: Experience the complex musical composition with multiple layers
5. **Interact**: Move your mouse to see colors and effects change
6. **Experience**: Enjoy the synchronized audio-visual performance

## 📁 Project Structure

```
starsounds2d/
├── index.html                                    # Main HTML file with p5.js and Tone.js setup
├── sketch-with-sound-with-effects-2d.js          # Core p5.js sketch with complex audio system
├── IMG_8153.jpeg                                # Primary source image for star detection
├── IMG_8155.jpeg                                # Additional source image
├── IMG_8155-2.jpeg                              # Additional source image
├── samples/                                     # Extensive audio sample library
│   ├── 72261-Tribal_percussion_melodic_twinkle-BLASTWAVEFX-06983.mp3
│   ├── 8412-koto-c3.mp3
│   ├── 22647-swell-rise-91.mp3
│   ├── 462084-ambience-sci-fi-choir_voice_drone.mp3
│   ├── 8356-marimba-c3.mp3
│   ├── 5896-C3-Staccato-f.mp3
│   ├── 6423-C-3-Legato-p.mp3
│   ├── 7192-G-4-Legato-f.mp3
│   ├── 39677-CARTOON_DRUM_BASS_HIGH_01.mp3
│   ├── 2367-Happy_house_kick_141_BPM.mp3
│   ├── 252647-Xylophone_Toy_Stick_C3-TS_02.mp3
│   ├── 314149-G4_Harmonic_Hard.mp3
│   └── 314159-G4_Vibrato1.mp3
└── README.md                                    # This file
```

## ⚙️ Configuration

### Adjustable Parameters
- `speed` - Animation speed (default: 0.02)
- `moveSpeed` - Movement speed across lines (default: 0.005)
- `threshold` - Brightness threshold for star detection (default: 200)
- `strokeWeightValue` - Line thickness (default: 3)
- `gradientResolution` - Line smoothness (default: 0.05)
- `bpm` - Base tempo (default: 30, changes dynamically)
- `MAX_VOLUME` - Maximum audio volume (default: 0.18)

### Audio Configuration
```javascript
// Sampler setup with multiple samples
sampler = new Tone.Sampler({
    urls: {
        "A3": "72261-Tribal_percussion_melodic_twinkle-BLASTWAVEFX-06983.mp3",
        "B3": "8412-koto-c3.mp3",
        "G4": "22647-swell-rise-91.mp3",
        "G3": "462084-ambience-sci-fi-choir_voice_drone.mp3"
    },
    attack: 0.1, decay: 0.2, sustain: 0.9, release: 0.2
});

// Effects chain configuration
reverb = new Tone.Reverb({ decay: 5, wet: 0.5 });
chorus = new Tone.Chorus(4, 2.5, 0.5);
phaser = new Tone.Phaser({ frequency: 0.5, octaves: 3 });
tremolo = new Tone.Tremolo(9, 0.75);
```

## 🎨 Visual Elements

- **Source Images**: Multiple JPEG images for star detection
- **Animated Stars**: Bright pixels transformed into animated elements
- **Connecting Lines**: Audio-reactive lines between stars
- **Gradient Effects**: Smooth color transitions with wave modulation
- **Mini Canvas**: Secondary visualization layer
- **Dynamic Colors**: Mouse-responsive color changes

## 🎵 Audio Elements

- **Multi-Layer Composition**: Sampler, bass drum, and bass synth
- **Complex Effects Chain**: Reverb, delay, echo, chorus, phaser, tremolo
- **Dynamic BPM**: Automatic tempo changes over time
- **Scheduled Events**: Precise timing for musical composition
- **Real-time Analysis**: Waveform analysis for visual feedback
- **Extensive Sample Library**: 13 high-quality audio samples

## 🔧 Development

### Key Functions

- `setupAudioNodes()` - Initializes complex audio system
- `findBrightestPixels()` - Detects and sorts bright pixels
- `drawCurvedLines()` - Renders audio-reactive visual elements
- `scheduleAudio()` - Manages timed audio events
- `getEnergy()` - Analyzes audio for visual feedback
- `connectEffects()` - Dynamic audio routing
- `drawMiniCanvas()` - Secondary visualization

### Audio Scheduling System
```javascript
// Scheduled audio events with precise timing
function scheduleG3() {
    const playDuration = 60 * 2; // 2 minutes
    Tone.Transport.scheduleOnce((time) => {
        sampler.triggerAttack('G3', time);
        Tone.Transport.scheduleOnce(() => {
            sampler.triggerRelease('G3', time + playDuration);
            scheduleG3(); // Recursive scheduling
        }, time + playDuration);
    }, Tone.now() + delayDuration);
}
```

### Performance Considerations
- Efficient pixel analysis during setup
- Optimized audio effects chain routing
- Real-time waveform analysis at 60fps
- Dynamic BPM changes every 2 seconds
- Smooth visual animations with audio sync

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
- Optimizes performance for various devices

## 🖼️ Image Requirements

Source images should be:
- High resolution for detailed star detection
- Good contrast between bright and dark areas
- In JPEG format
- Placed in the project root directory
- Referenced in the `preload()` function

## 🎵 Audio Sample Requirements

Audio samples should be:
- High-quality MP3 format
- Various durations and characteristics
- Properly licensed for use
- Optimized for web streaming
- Referenced correctly in sampler configuration

## 🔗 Related Projects

This project is part of a series exploring audio-visual experiences:
- **Breathing** - Audio-reactive meditation experience
- **Electric Brightness** - Visual star field animation
- **Electric Brightness Sound** - Audio-reactive star field
- **Image Scan Synth** - Image-to-sound conversion
- **Rough Waters** - Real-time wave data visualization
- **Rough Waters Audio Zoom** - Interactive surf spot explorer
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

*Created as part of a creative coding portfolio by Kameron Robinson showcasing advanced audio synthesis, complex effects processing, and sophisticated audio-visual programming.* 