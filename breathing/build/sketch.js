// Breathing Meditation - P5.js Sketch
// Audio-reactive meditation experience

let audioElement;
let playButton;
let backgroundImage;
let overlayImage;
let gradient2;
let isPlaying = false;
let audioContext, analyzer, dataArray, source, angle;
let currentIndex = 0;
let intervalId;

function preload() {
  // Load images
  backgroundImage = loadImage('https://cdn.glitch.global/01485531-a16b-4ce3-9dcc-f9be1dd94e81/IMG_0324.png?v=1718392813331');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Create audio element
  audioElement = createAudio('https://cdn.glitch.global/01485531-a16b-4ce3-9dcc-f9be1dd94e81/tessaract.mp3?v=1718388840172', 'audio/mp3');
  audioElement.volume(1.0);
  audioElement.hide();
  
  // Create UI elements
  playButton = createDiv();
  playButton.class('play-button');
  playButton.html(`
    <small>This is best experienced in full screen.</small>
    <small>Click anywhere on the screen to begin an audio visual meditation</small>
    <small>Feel free to breath with the visuals.</small>
    <small>End the experience by clicking again.</small>
    <small>Thank you</small>
  `);
  
  // Create time display
  let timeDisplay = createDiv('100%');
  timeDisplay.class('time');
  
  // Create gradient overlays
  gradient2 = createDiv();
  gradient2.class('gradient2');
  
  // Setup event listeners
  playButton.mousePressed(togglePlayback);
  audioElement.elt.addEventListener('timeupdate', updatePage);
  audioElement.elt.addEventListener('pause', onPause);
  audioElement.elt.addEventListener('volumechange', onVolumeChange);
  audioElement.elt.addEventListener('error', onAudioError);
  
  // Start text cycling
  startCycling();
}

function draw() {
  background(0);
  
  // Draw background image
  if (backgroundImage) {
    image(backgroundImage, 0, 0, width, height);
  }
  
  // Update gradient based on audio
  if (isPlaying && analyzer) {
    updateGradient();
  }
  
  // Update mouse-based angle
  updateMouseAngle();
}

function setupAudioContext() {
  console.log("Setting up audio context");
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  analyzer = audioContext.createAnalyser();
  source = audioContext.createMediaElementSource(audioElement.elt);
  source.connect(analyzer);
  analyzer.connect(audioContext.destination);
  analyzer.fftSize = 256;
  const bufferLength = analyzer.frequencyBinCount;
  dataArray = new Uint8Array(bufferLength);
}

function updateGradient() {
  if (!isPlaying) return;
  
  analyzer.getByteFrequencyData(dataArray);
  const averageFrequency = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
  
  const red = Math.min(190, averageFrequency * 8);
  const green = Math.min(255, averageFrequency * 10);
  const blue = Math.min(255, averageFrequency);
  
  // Update gradient styles
  let gradient = select('.gradient');
  if (gradient) {
    gradient.style('background-image', `radial-gradient(rgba(190,${green},${blue},1), rgba(255,${green},${blue},0.3), rgba(255,${green},${blue},.8))`);
  }
  
  if (gradient2) {
    gradient2.style('background-image', `linear-gradient(${angle}deg, rgba(131,58,180,0.1) 0%, rgba(253,29,29,0.2) 50%, rgba(252,176,69,0.1) 100%)`);
  }
}

function updatePage(data) {
  const currentTime = data.srcElement.currentTime;
  const duration = data.srcElement.duration;
  const percentageComplete = Math.floor(100 - (currentTime / duration) * 100);
  
  select('.time').html(`${Math.floor(percentageComplete)}%`);
  updateImageOpacity(currentTime, duration);
}

function updateImageOpacity(currentTime, duration) {
  const opacity = Math.min(0.05 + (currentTime / duration) * 0.95, 1);
  
  // Update background image opacity
  if (backgroundImage) {
    backgroundImage.style('opacity', opacity);
  }
  
  const percentageComplete = Math.floor(100 - (currentTime / duration) * 100);
  let newSrc = null;
  
  if (percentageComplete <= 90) {
    newSrc = "https://cdn.glitch.global/01485531-a16b-4ce3-9dcc-f9be1dd94e81/IMG_0324.jpeg?v=1718393775053";
  }
  if (percentageComplete <= 70) {
    newSrc = "https://cdn.glitch.global/01485531-a16b-4ce3-9dcc-f9be1dd94e81/IMG_0322.jpeg?v=1718394441809";
  }
  if (percentageComplete <= 10) {
    newSrc = "https://cdn.glitch.global/01485531-a16b-4ce3-9dcc-f9be1dd94e81/IMG_0327.jpeg?v=1718394450645";
  }
  
  if (newSrc && newSrc !== backgroundImage.src) {
    loadImage(newSrc, (img) => {
      backgroundImage = img;
    });
  }
}

function togglePlayback() {
  console.log("Audio play event triggered");
  
  if (isPlaying) {
    isPlaying = false;
    audioElement.pause();
  } else {
    isPlaying = true;
    if (!audioContext) {
      console.log("Setup audio context!");
      setupAudioContext();
    }
    audioElement.play()
      .then(() => {
        console.log("Audio is playing");
      })
      .catch((error) => {
        console.error("Error playing audio:", error);
      });
  }
}

function onPause() {
  console.log("Audio pause event triggered, ending experience");
  alert("Thank you, feel free to take a screenshot as a digital keepsake.");
}

function onVolumeChange() {
  console.log("Audio volume:", audioElement.volume);
}

function onAudioError(e) {
  console.error("Audio error:", e);
}

function updateMouseAngle() {
  const x = mouseX;
  const y = mouseY;
  angle = Math.atan2(y - height / 2, x - width / 2) * (180 / Math.PI) + 180;
}

function showText(index) {
  const texts = selectAll("#playButton small");
  texts.forEach((text, i) => {
    text.style('display', i === index ? 'block' : 'none');
  });
}

function cycleText() {
  showText(currentIndex);
  currentIndex = (currentIndex + 1) % 5; // 5 text elements
}

function startCycling() {
  intervalId = setInterval(cycleText, 4000);
  cycleText();
}

function stopCycling() {
  clearInterval(intervalId);
  playButton.html('');
}

function startBreathing() {
  if (!playButton.class().includes('breathing')) {
    playButton.addClass('breathing');
  } else {
    playButton.removeClass('breathing');
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
} 