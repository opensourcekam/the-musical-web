const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for audio files
app.use(cors());

// Serve static files from project directories
app.use('/breathing', express.static(path.join(__dirname, 'breathing')));
app.use('/electricBrightness', express.static(path.join(__dirname, 'electricBrightness')));
app.use('/electricBrightnessSound', express.static(path.join(__dirname, 'electricBrightnessSound')));
app.use('/imageScanSynth', express.static(path.join(__dirname, 'imageScanSynth')));
app.use('/roughWaters', express.static(path.join(__dirname, 'roughWaters')));
app.use('/roughWatersAudioZoom', express.static(path.join(__dirname, 'roughWatersAudioZoom')));
app.use('/starsounds2d', express.static(path.join(__dirname, 'starsounds2d')));
app.use('/starsounds3d', express.static(path.join(__dirname, 'starsounds3d')));

// Serve libraries
app.use('/libraries', express.static(path.join(__dirname, 'libraries')));

// Route handlers for each project
app.get('/breathing', (req, res) => {
  res.sendFile(path.join(__dirname, 'breathing', 'index-p5.html'));
});

app.get('/electricBrightness', (req, res) => {
  res.sendFile(path.join(__dirname, 'electricBrightness', 'index-p5.html'));
});

app.get('/electricBrightnessSound', (req, res) => {
  res.sendFile(path.join(__dirname, 'electricBrightnessSound', 'index.html'));
});

app.get('/imageScanSynth', (req, res) => {
  res.sendFile(path.join(__dirname, 'imageScanSynth', 'index.html'));
});

app.get('/roughWaters', (req, res) => {
  res.sendFile(path.join(__dirname, 'roughWaters', 'index.html'));
});

app.get('/roughWatersAudioZoom', (req, res) => {
  res.sendFile(path.join(__dirname, 'roughWatersAudioZoom', 'index.html'));
});

app.get('/starsounds2d', (req, res) => {
  res.sendFile(path.join(__dirname, 'starsounds2d', 'index.html'));
});

app.get('/starsounds3d', (req, res) => {
  res.sendFile(path.join(__dirname, 'starsounds3d', 'index.html'));
});

// Root route - serve a portfolio index
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>The Musical Web - Creative Coding Portfolio</title>
      <style>
        body {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: #000;
          color: #fff;
          margin: 0;
          padding: 40px;
          line-height: 1.6;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
        }
        h1 {
          font-size: 3rem;
          margin-bottom: 2rem;
          text-align: center;
        }
        .projects {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }
        .project {
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 10px;
          text-decoration: none;
          color: #fff;
          transition: all 0.3s ease;
        }
        .project:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-5px);
        }
        .project h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }
        .project p {
          margin: 0;
          opacity: 0.8;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>The Musical Web</h1>
        <p style="text-align: center; font-size: 1.2rem; opacity: 0.8;">
          A collection of interactive audio-visual experiences created with p5.js and Tone.js
        </p>
        
        <div class="projects">
          <a href="/breathing" class="project">
            <h3>Breathing</h3>
            <p>Audio-reactive meditation experience with synchronized visuals</p>
          </a>
          
          <a href="/electricBrightness" class="project">
            <h3>Electric Brightness</h3>
            <p>Star field visualization with curved connecting lines</p>
          </a>
          
          <a href="/electricBrightnessSound" class="project">
            <h3>Electric Brightness Sound</h3>
            <p>Audio-reactive star field with sound synthesis</p>
          </a>
          
          <a href="/imageScanSynth" class="project">
            <h3>Image Scan Synth</h3>
            <p>Convert images to sound through pixel analysis</p>
          </a>
          
          <a href="/roughWaters" class="project">
            <h3>Rough Waters</h3>
            <p>Real-time ocean wave data visualization</p>
          </a>
          
          <a href="/roughWatersAudioZoom" class="project">
            <h3>Rough Waters Audio Zoom</h3>
            <p>Interactive surf spot explorer with audio-responsive text</p>
          </a>
          
          <a href="/starsounds2d" class="project">
            <h3>Star Sounds 2D</h3>
            <p>2D audio-reactive star field with complex audio effects</p>
          </a>
          
          <a href="/starsounds3d" class="project">
            <h3>Star Sounds 3D</h3>
            <p>Immersive 3D audio-reactive star field with intelligent camera movement</p>
          </a>
        </div>
      </div>
    </body>
    </html>
  `);
});

// Handle 404s
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>404 - Project Not Found</title>
      <style>
        body { font-family: system-ui; background: #000; color: #fff; text-align: center; padding: 50px; }
        a { color: #fff; }
      </style>
    </head>
    <body>
      <h1>404 - Project Not Found</h1>
      <p>The project you're looking for doesn't exist.</p>
      <a href="/">← Back to Portfolio</a>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 The Musical Web server running on port ${PORT}`);
  console.log(`📁 Available projects:`);
  console.log(`   • /breathing`);
  console.log(`   • /electricBrightness`);
  console.log(`   • /electricBrightnessSound`);
  console.log(`   • /imageScanSynth`);
  console.log(`   • /roughWaters`);
  console.log(`   • /roughWatersAudioZoom`);
  console.log(`   • /starsounds2d`);
  console.log(`   • /starsounds3d`);
}); 