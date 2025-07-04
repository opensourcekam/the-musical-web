# 100% Breathing - Interactive Audio-Visual Meditation

An immersive web-based meditation experience that synchronizes audio frequency analysis with dynamic visual effects to create a guided breathing session.

## 🌟 Overview

This project creates an interactive meditation tool that responds to audio in real-time, providing visual feedback that guides users through a breathing exercise. As the audio plays, the background gradually transitions through different stages, creating a progressive visual journey from 100% to completion.

## ✨ Features

### Audio-Visual Synchronization
- **Real-time frequency analysis** using Web Audio API
- **Dynamic color gradients** that respond to audio frequency data
- **Smooth visual transitions** synchronized with audio playback

### Interactive Elements
- **Mouse-responsive gradients** that follow cursor movement
- **Progressive image transitions** as the meditation progresses
- **Guided text prompts** that cycle through instructions automatically

### User Experience
- **Full-screen immersive experience**
- **Audio controls** with volume management
- **Smooth opacity transitions** for visual changes
- **Completion notification** with screenshot encouragement

## 🛠 Technical Implementation

### Core Technologies
- **Vanilla JavaScript** - No frameworks required
- **Web Audio API** - Real-time audio processing
- **HTML5 Audio** - Audio playback and controls
- **CSS3 Animations** - Smooth visual transitions

### Key Components
- `AudioContext` and `AnalyserNode` for frequency analysis
- Real-time color generation based on audio data
- Mouse-tracking for interactive gradient angles
- Progressive image opacity management

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your system
- A modern web browser with Web Audio API support

### Installation & Setup

1. **Install p5-server globally:**
   ```bash
   npm install -g p5-server
   ```

2. **Navigate to the project directory:**
   ```bash
   cd breathing
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

1. **Full Screen Experience**: For the best experience, view in full-screen mode
2. **Start Meditation**: Click anywhere on the screen to begin the audio-visual meditation
3. **Follow the Visuals**: The background will gradually change as the meditation progresses
4. **Interactive Elements**: Move your mouse to see the gradient respond to your movement
5. **End Session**: Click again to pause and end the experience

## 📁 Project Structure

```
breathing/
├── index.html          # Main HTML file
├── script.js           # Core JavaScript functionality
├── style.css           # Styling and animations
└── README.md           # This file
```

## 🎨 Visual Elements

- **Background Images**: Progressive transitions through meditation stages
- **Dynamic Gradients**: Color changes based on audio frequency analysis
- **Interactive Overlays**: Mouse-responsive gradient angles
- **Text Prompts**: Cycling instructions for user guidance

## 🔧 Development

### Live Reload Development
With p5-server, any changes you make to the files will automatically reload in the browser:

```bash
p5 serve --open
```

### Key Functions

- `setupAudioContext()` - Initializes audio analysis
- `updateGradient()` - Updates visual effects based on audio data
- `updateImageOpacity()` - Manages progressive image transitions
- `updatePage()` - Handles time-based updates and percentage display

## 🌐 Browser Compatibility

This project requires modern browsers with support for:
- Web Audio API
- ES6+ JavaScript features
- CSS3 animations and transitions

Tested and working in:
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## 📱 Responsive Design

The experience is designed to work across different screen sizes, though it's optimized for full-screen desktop viewing for maximum immersion.

## 🎵 Audio Credits

The meditation audio track is sourced from external CDN and provides the foundation for the interactive experience.

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome! Feel free to:
- Report bugs or issues
- Suggest new features
- Share your experience with the meditation tool

## 📄 License

This project is open source and available under the MIT License.

---

*Created as part of a creative coding portfolio by Kameron Robinson showcasing interactive audio-visual experiences and user-centered design.*