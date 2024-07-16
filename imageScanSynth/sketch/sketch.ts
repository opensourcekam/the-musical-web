// Import necessary libraries
import * as p5 from 'p5';
import * as Tone from 'tone';
import { sample } from 'lodash';

let img: p5.Image;
let canvas: p5.Renderer;
let playingRow: number = -1;
let lastUpdateTime: number = 0;
const rowInterval: number = 1000 / 60; // Move one row every frame at 60fps
const batchSize: number = 10; // Number of pixels to process per frame
let synthPool: Tone.FMSynth[] = [];
let reverb: Tone.Reverb;
let delay: Tone.FeedbackDelay;

let startX: number, startY: number, endX: number, endY: number;
let isDragging: boolean = false;
let selectedArea: number[] = [];

function preload(p: p5) {
  let imageName = sample(
    [
      '111.jpeg',
      'IMG_7997.jpeg',
      'IMG_8064.jpeg',
      'IMG_8062.jpeg',
      'IMG_7727.jpeg',
      'IMG_8067.jpeg',
    ]
  )
  img = p.loadImage(`../${imageName}`); // Ensure the path to your image is correct
}

function setup(p: p5) {
  const maxWidth: number = p.windowWidth * 0.8;
  const maxHeight: number = p.windowHeight * 0.8;
  const scaleFactor: number = Math.min(maxWidth / img.width, maxHeight / img.height);
  const newWidth: number = img.width * scaleFactor;
  const newHeight: number = img.height * scaleFactor;

  canvas = p.createCanvas(newWidth, newHeight);
  canvas.position((p.windowWidth - newWidth) / 2, (p.windowHeight - newHeight) / 2); // Center canvas
  img.resize(newWidth, newHeight);
  img.loadPixels();

  // Initialize effects
  reverb = new Tone.Reverb(4).toDestination();
  delay = new Tone.FeedbackDelay("8n", 0.5).toDestination();

  // Initialize FMSynth pool
  for (let i = 0; i < 10; i++) {
    const synth = new Tone.FMSynth().connect(reverb).connect(delay).toDestination();
    synth.volume.value = -10; // Lower the volume to avoid distortion
    synthPool.push(synth);
  }
}

function draw(p: p5) {
  p.background(25);
  p.image(img, 0, 0);

  if (isDragging) {
    p.stroke(255, 0, 0);
    p.noFill();
    p.rect(startX, startY, p.mouseX - startX, p.mouseY - startY);
  } else if (selectedArea.length === 4) {
    p.stroke(255, 0, 0);
    p.noFill();
    p.rect(selectedArea[0], selectedArea[1], selectedArea[2] - selectedArea[0], selectedArea[3] - selectedArea[1]);
  }

  if (playingRow >= 0) {
    let currentTime: number = p.millis();
    if (currentTime - lastUpdateTime > rowInterval) {
      lastUpdateTime = currentTime;
      processRow();
    }
  }
}

function mousePressed(p: p5) {
  startX = Math.floor(p.constrain(p.mouseX, 0, p.width));
  startY = Math.floor(p.constrain(p.mouseY, 0, p.height));
  isDragging = true;
}

function mouseReleased(p: p5) {
  endX = Math.floor(p.constrain(p.mouseX, 0, p.width));
  endY = Math.floor(p.constrain(p.mouseY, 0, p.height));
  isDragging = false;

  if (startX > endX) {
    [startX, endX] = [endX, startX]; // Swap to ensure startX is less than endX
  }
  if (startY > endY) {
    [startY, endY] = [endY, startY]; // Swap to ensure startY is less than endY
  }

  selectedArea = [startX, startY, endX, endY];
  playingRow = startY; // Start processing from the selected area
  console.log(selectedArea);
  startAudio();
}

function startAudio() {
  Tone.start();
}

function processRow() {
  const [sX, sY, eX, eY] = selectedArea;

  if (playingRow < eY) {
    for (let x = sX; x < eX; x += batchSize) {
      for (let i = 0; i < batchSize && x + i < eX; i++) {
        let index = Math.floor(((x + i) + playingRow * img.width) * 4);

        if (index < img.pixels.length && index >= 0) {
          let r = img.pixels[index];
          let g = img.pixels[index + 1];
          let b = img.pixels[index + 2];
          let a = img.pixels[index + 3];
          pixelToSound(r, g, b, a, index);
        }
      }
    }
    playingRow++;
  } else {
    playingRow = sY; // Loop over the selected area
  }
}

function pixelToSound(r: number, g: number, b: number, a: number, x: number) {
  let frequency = p5.prototype.map(r, 0, 255, 100, 800); // Frequency range for drone sound
  let volume = p5.prototype.map(g, 0, 255, -30, -10); // Adjust volume to be more subtle
  let duration = p5.prototype.map(b, 0, 255, 0.5, 5); // Shorter duration for more varied sounds
  console.log(frequency, volume, duration);
  let synthIndex = (x % synthPool.length);
  let synth = synthPool[synthIndex];
  console.log(synthPool.length, synth, synthIndex, startX, startY, endX, endY);
  if (synth) {
    // Create a chord with three notes
    let baseFreq = frequency;
    let harmony1 = baseFreq * 1.2; // Slightly different intervals
    let harmony2 = baseFreq * 1.5;
    console.log(baseFreq, harmony1, harmony2);
    // Ensure the frequencies are an array of numbers
    synth.triggerAttackRelease(baseFreq, duration, Tone.now(), volume);
  }
}

// Attach the functions to p5
const sketch = (p: p5) => {
  p.preload = () => preload(p);
  p.setup = () => setup(p);
  p.draw = () => draw(p);
  p.mousePressed = () => mousePressed(p);
  p.mouseReleased = () => mouseReleased(p);
};

new p5(sketch);