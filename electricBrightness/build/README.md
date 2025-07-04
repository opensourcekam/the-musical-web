# Electric Brightness - Animated Star Field Generator

A p5.js creative coding project that transforms bright pixels from an image into an animated star field, connecting them with flowing curved lines to create a mesmerizing visual experience.

## 🌟 Overview

This project analyzes a photograph to detect bright pixels (stars) and animates them by drawing curved Bezier lines between adjacent bright points. The result is a dynamic star field that gradually reveals itself, creating a beautiful connection between photography and generative art.

## ✨ Features

### Image Analysis
- **Brightness Detection**: Automatically identifies bright pixels above a configurable threshold
- **Pixel Sorting**: Orders stars by brightness for controlled animation progression
- **Image Scaling**: Responsive canvas that adapts to window size while maintaining aspect ratio

### Animation System
- **Progressive Reveal**: Stars appear gradually at a controlled speed
- **Curved Connections**: Bezier curves create smooth, organic lines between stars
- **Noise Integration**: Subtle randomness in control points for natural movement
- **Gradient Effects**: Smooth color transitions along the connecting lines

### Visual Design
- **Responsive Layout**: Canvas centers automatically and scales with window size
- **Dark Theme**: Black background for optimal star visibility
- **Smooth Rendering**: High-resolution gradient steps for crisp line quality

## 🛠 Technical Implementation

### Core Technologies
- **p5.js** - Creative coding framework for graphics and animation
- **HTML5 Canvas** - High-performance graphics rendering
- **JavaScript ES6+** - Modern JavaScript features for pixel manipulation

### Key Components
- `findBrightestPixels()` - Analyzes image pixels for brightness detection
- `drawCurvedLines()` - Renders Bezier curves between star points
- `preload()` - Loads and prepares the source image
- `setup()` - Initializes canvas and image processing

### Algorithm Details
1. **Pixel Analysis**: Scans image pixels to find those above brightness threshold
2. **Star Sorting**: Orders detected points by brightness value
3. **Bezier Calculation**: Creates control points with noise for organic curves
4. **Progressive Animation**: Gradually reveals stars at controlled speed
5. **Line Rendering**: Draws high-resolution gradient lines between points

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your system
- A modern web browser with Canvas support

### Installation & Setup

1. **Install p5-server globally:**
   ```bash
   npm install -g p5-server
   ```

2. **Navigate to the project directory:**
   ```bash
   cd electricBrightness
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
2. **Watch the Stars**: Observe as bright pixels from the image are gradually connected
3. **Full Screen**: For the best experience, view in full-screen mode
4. **Explore Variations**: Try different source images by replacing `IMG_8153.jpeg`

## 📁 Project Structure

```
electricBrightness/
├── index.html              # Main HTML file with p5.js setup
├── electric-brightness.js   # Core p5.js sketch and animation logic
├── IMG_8153.jpeg           # Source image for star detection
└── README.md               # This file
```

## ⚙️ Configuration

### Adjustable Parameters
- `speed` - Controls how fast stars appear (default: 0.41)
- `threshold` - Brightness threshold for star detection (default: 200)
- `strokeWeightValue` - Thickness of connecting lines (default: 0.4)
- `gradientResolution` - Smoothness of line gradients (default: 0.01)

### Customization Examples
```javascript
// Faster animation
let speed = 0.8;

// More sensitive star detection
let threshold = 150;

// Thicker lines
let strokeWeightValue = 1.0;

// Smoother gradients
let gradientResolution = 0.005;
```

## 🎨 Visual Elements

- **Source Image**: The photograph that provides the star data
- **Animated Lines**: Flowing Bezier curves connecting bright pixels
- **Progressive Reveal**: Gradual appearance of the star field
- **Responsive Canvas**: Automatically scales to fit the window

## 🔧 Development

### Live Reload Development
With p5-server, any changes you make to the files will automatically reload in the browser:

```bash
p5 serve --open
```

### Key Functions

- `preload()` - Loads the source image
- `setup()` - Initializes canvas and processes image pixels
- `findBrightestPixels()` - Detects and sorts bright pixels
- `drawCurvedLines()` - Renders animated Bezier connections
- `draw()` - Main animation loop

### Performance Considerations
- Image processing happens once during setup
- Bezier calculations are optimized for smooth animation
- Canvas clearing and redrawing maintains consistent frame rate

## 🌐 Browser Compatibility

This project requires modern browsers with support for:
- HTML5 Canvas
- ES6+ JavaScript features
- p5.js library

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

## 🔗 Related Projects

This project has a companion version with sound integration:
- **Electric Brightness Sound** - Adds audio-reactive elements to the star field

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome! Feel free to:
- Report bugs or issues
- Suggest new features or effects
- Share your own star field creations
- Propose improvements to the animation algorithm

## 📄 License

This project is open source and available under the MIT License.

---

*Created as part of a creative coding portfolio by Kameron Robinson showcasing generative art, image processing, and interactive visual experiences.* 