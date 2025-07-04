# Star Sounds 3D - Immersive 3D Audio-Reactive Star Field

A cutting-edge p5.js and Tone.js project that creates an immersive 3D audio-visual experience by transforming bright pixels from images into a dynamic 3D star field with intelligent camera movement, spatial audio processing, and real-time 3D visualization with audio-reactive animations.

## 🌟 Overview

This project pushes the boundaries of web-based audio-visual experiences by creating a fully immersive 3D environment. It analyzes images to detect bright pixels and places them in 3D space, then uses an intelligent camera system to navigate through the star field while synchronized audio creates a rich spatial experience.

## ✨ Features

### Advanced 3D Visualization
- **3D Star Field**: Bright pixels placed in 3D space with depth coordinates
- **Intelligent Camera System**: Automated navigation through the star field
- **Dynamic Star Sizing**: Stars scale based on distance from camera
- **Smooth Camera Transitions**: Lerp-based movement between stars
- **Continuous Rotation**: Dynamic rotation for immersive experience

### Sophisticated Audio System
- **Multi-Synthesizer Architecture**: Sampler, bass drum, and bass synth
- **Complex Effects Chain**: Reverb, delay, echo, chorus, phaser, tremolo, and EQ
- **Dynamic BPM Modulation**: Tempo changes automatically over time
- **Audio Analysis**: Real-time waveform analysis for visual feedback
- **Scheduled Audio Events**: Precise timing control for musical composition

### Immersive Interaction
- **3D Camera Movement**: Automated navigation through star field
- **Stay Duration Control**: Configurable time spent at each star
- **Smooth Transitions**: Lerp-based camera movement
- **Depth Perception**: Stars scale based on distance
- **Full-Screen Immersion**: Optimized for immersive viewing

## 🛠 Technical Implementation

### Core Technologies
- **p5.js WEBGL** - 3D graphics and WebGL rendering
- **Tone.js** - Professional audio synthesis and processing library
- **Lodash** - Utility library for enhanced functionality
- **3D Camera System** - Intelligent navigation and movement
- **Real-time Analysis** - Waveform analysis for visual feedback

### Key Components
- `setupCanvas()` - Initializes WEBGL canvas for 3D rendering
- `findBrightestPixels()` - Analyzes image and adds 3D coordinates
- `updateCamera()` - Manages intelligent camera movement
- `drawStars()` - Renders 3D stars with depth-based scaling
- `setupAudioNodes()` - Initializes complex audio effects chain
- `scheduleAudio()` - Manages timed audio events and BPM changes

### 3D Camera System
```javascript
// Intelligent camera movement through 3D space
function updateCamera() {
    let currentStar = stars[targetStarIndex];
    let nextStar = stars[(targetStarIndex + 1) % stars.length];
    
    // Lerp-based smooth transitions
    let target = p5.Vector.lerp(
        createVector(currentStar.x, currentStar.y, currentStar.z),
        createVector(nextStar.x, nextStar.y, nextStar.z),
        lerpT
    );
    
    // Camera positioning and orientation
    camera(targetCameraPosition.x, targetCameraPosition.y, targetCameraPosition.z,
           lookAtX, lookAtY, lookAtZ, 0, 1, 0);
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your system
- A modern web browser with WebGL support
- Web Audio API support
- Audio output device (speakers or headphones recommended)

### Installation & Setup

1. **Navigate to the project directory:**
   ```bash
   cd starsounds3d
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

1. **Load the Page**: The 3D environment will initialize automatically
2. **Start Audio**: Click anywhere on the canvas to begin the audio context
3. **Experience 3D**: Watch as the camera navigates through the 3D star field
4. **Listen**: Experience the complex musical composition with spatial audio
5. **Immerse**: Enjoy the synchronized 3D audio-visual performance
6. **Full Screen**: For the best experience, view in full-screen mode

## 📁 Project Structure

```
starsounds3d/
├── index.html                                    # Main HTML file with p5.js and Tone.js setup
├── sketch-with-sound-with-effects-3d.js          # Core 3D p5.js sketch with advanced camera system
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

### 3D Camera Parameters
- `cameraMoveSpeed` - Speed of camera movement (default: 0.02)
- `moveSpeed` - Movement speed across stars (default: 0.005)
- `stayDuration` - Time spent at each star (default: 200 frames)
- `rotationAngle` - Continuous rotation speed (default: 0.05)

### Audio Configuration
- `speed` - Animation speed (default: 0.01)
- `threshold` - Brightness threshold for star detection (default: 200)
- `bpm` - Base tempo (default: 50, changes dynamically)
- `MIN_VOLUME` - Minimum audio volume (default: 0.09)
- `MAX_VOLUME` - Maximum audio volume (default: 0.18)

### 3D Star Configuration
```javascript
// 3D star placement with random z-coordinates
stars.push({ 
    x: x - img.width / 2, 
    y: y - img.height / 2, 
    z: random(-200, 200), 
    brightness: brightnessValue 
});

// Dynamic star sizing based on distance
let starSize = map(p5.Vector.dist(
    createVector(star.x, star.y, star.z), 
    cameraPosition
), 0, 500, 10, 1);
```

## 🎨 Visual Elements

- **3D Star Field**: Bright pixels transformed into 3D animated elements
- **Intelligent Camera**: Automated navigation through 3D space
- **Depth-Based Scaling**: Stars scale based on distance from camera
- **Smooth Transitions**: Lerp-based camera movement
- **Continuous Rotation**: Dynamic rotation for immersive experience
- **Audio-Reactive Lines**: 3D connecting lines with audio influence

## 🎵 Audio Elements

- **Multi-Layer Composition**: Sampler, bass drum, and bass synth
- **Complex Effects Chain**: Reverb, delay, echo, chorus, phaser, tremolo
- **Dynamic BPM**: Automatic tempo changes over time
- **Scheduled Events**: Precise timing for musical composition
- **Real-time Analysis**: Waveform analysis for visual feedback
- **Extensive Sample Library**: 13 high-quality audio samples

## 🔧 Development

### Key Functions

- `setupCanvas()` - Initializes WEBGL canvas for 3D rendering
- `findBrightestPixels()` - Detects stars and adds 3D coordinates
- `updateCamera()` - Manages intelligent 3D camera movement
- `drawStars()` - Renders 3D stars with depth-based scaling
- `setupAudioNodes()` - Initializes complex audio system
- `scheduleAudio()` - Manages timed audio events
- `getEnergy()` - Analyzes audio for visual feedback

### 3D Camera Algorithm
```javascript
// Intelligent navigation through 3D star field
function updateCamera() {
    // Stay at each star for configured duration
    if (stayTimer < stayDuration) {
        stayTimer++;
    } else {
        // Smooth transition to next star
        lerpT += moveSpeed;
        
        if (lerpT >= 1) {
            // Move to next star
            targetStarIndex = (targetStarIndex + 1) % stars.length;
            lerpT = 0;
            stayTimer = 0;
        }
        
        // Calculate camera position and orientation
        let target = p5.Vector.lerp(currentStar, nextStar, lerpT);
        camera(target.x, target.y, target.z, lookAtX, lookAtY, lookAtZ, 0, 1, 0);
    }
}
```

### Performance Considerations
- Efficient 3D rendering with WEBGL
- Optimized camera movement calculations
- Real-time audio analysis at 60fps
- Dynamic star scaling based on distance
- Smooth transitions with lerp interpolation

## 🌐 Browser Compatibility

This project requires modern browsers with support for:
- WebGL
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

The 3D environment:
- Uses full window dimensions for immersive experience
- Maintains aspect ratio for 3D calculations
- Adapts to different screen sizes
- Optimizes performance for various devices
- Scales 3D elements appropriately

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
- **Starsounds 2D** - 2D audio-reactive star field

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome! Feel free to:
- Report bugs or issues
- Suggest new audio samples or effects
- Propose improvements to the 3D camera system
- Share your own 3D audio-visual creations

## 📄 License

This project is open source and available under the MIT License.

---

*Created as part of a creative coding portfolio by Kameron Robinson showcasing advanced 3D graphics, intelligent camera systems, and immersive spatial audio-visual experiences.* 