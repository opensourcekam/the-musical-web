let img;
let stars = [];
let currentIndex = 0;
let speed = 0.02; // Slower animation speed
let moveSpeed = 0.005; // Movement speed across lines
let threshold = 200;
let strokeWeightValue = 3;
let gradientResolution = 0.05;
let bpm = 30; // Lower BPM
let sampler, gainNode, reverb, filter, bassDrum, delay, echo, bassDrumReverb, bassSynth, analyser;
let eq3, chorus, phaser, tremolo, crusher;
const MAX_VOLUME = 0.18;
let miniCanvas;
let lerpT = 0;

function changeBpm() {
    bpm = bpm < 60 ? bpm + 1 : bpm > 20 ? bpm - 1 : 30;
}

function preload() {
    img = loadImage('./IMG_8153.jpeg');
}

function setup() {
    setupCanvas();
    setupMiniCanvas();
    img.loadPixels();
    findBrightestPixels();
    setupAudioNodes();
    scheduleG3();
    scheduleG4();
    scheduleA3();
    Tone.Transport.start();
    canvas.mousePressed(startAudioContext);
}

function setupCanvas() {
    const maxWidth = windowWidth * 0.8;
    const maxHeight = windowHeight * 0.8;
    const scaleFactor = Math.min(maxWidth / img.width, maxHeight / img.height);
    const newWidth = img.width * scaleFactor;
    const newHeight = img.height * scaleFactor;

    canvas = createCanvas(newWidth, newHeight);
    canvas.position((windowWidth - newWidth) / 2, (windowHeight - newHeight) / 2);
    img.resize(newWidth, newHeight);
}

function setupMiniCanvas() {
    miniCanvas = createGraphics(200, 200); // Create a smaller canvas
}

function findBrightestPixels() {
    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            let pixelIndex = (x + y * img.width) * 4;
            let brightnessValue = (img.pixels[pixelIndex] + img.pixels[pixelIndex + 1] + img.pixels[pixelIndex + 2]) / 3;
            if (brightnessValue > threshold) {
                stars.push({ x: x, y: y, brightness: brightnessValue });
            }
        }
    }
    stars.sort((a, b) => b.brightness * noise(b.brightness) - a.brightness * noise(a.brightness));
}

function setupAudioNodes() {
    sampler = new Tone.Sampler({
        urls: { "A3": "72261-Tribal_percussion_melodic_twinkle-BLASTWAVEFX-06983.mp3", "B3": "8412-koto-c3.mp3", "G4": "22647-swell-rise-91.mp3", "G3": "462084-ambience-sci-fi-choir_voice_drone.mp3" },
        attack: 0.1, decay: 0.2, sustain: 0.9, release: 0.2, baseUrl: "./samples/",
        onload: () => console.log('Sampler loaded')
    });

    gainNode = new Tone.Gain(MAX_VOLUME);
    reverb = new Tone.Reverb({ decay: 5, wet: 0.5 });
    filter = new Tone.Filter({ type: "lowpass", frequency: 400, rolloff: -12, Q: 1, gain: 0 });
    delay = new Tone.FeedbackDelay("8n", 0.5);
    echo = new Tone.FeedbackDelay("4n", 0.5);
    bassDrumReverb = new Tone.Reverb({ decay: 2, wet: 0.3 });
    analyser = new Tone.Analyser("waveform", 256);
    eq3 = new Tone.EQ3({ low: 8, mid: -3, high: -6 });
    chorus = new Tone.Chorus(4, 2.5, 0.5).start();
    phaser = new Tone.Phaser({ frequency: 0.5, octaves: 3, baseFrequency: 350 });
    tremolo = new Tone.Tremolo(9, 0.75).start();

    // Connect the sampler through effects to the destination
    sampler.chain(filter, reverb, delay, gainNode, eq3, analyser, Tone.Destination);

    bassDrum = new Tone.MembraneSynth({
        pitchDecay: 0.1, octaves: 5, oscillator: { type: "sine" }, envelope: { attack: 0.01, decay: 1.4, sustain: 0.01, release: 1.4, attackCurve: "exponential" }
    });

    bassSynth = new Tone.Synth({
        oscillator: { type: "triangle" }, volume: 0.5, portamento: 10, pitchDecay: 0.1, octaves: 5,
        envelope: { attack: 0.5, decay: 1.2, sustain: 0.5, release: 0.5 }
    }).toDestination();
}

function scheduleAudio() {
    Tone.Transport.scheduleRepeat(triggerBassDrum, "30s", 20); // Slower schedule
    stars.forEach((star, index) => {
        Tone.Transport.schedule(() => playBassSynth(star), index * (noise(star.brightness) * 2 + 2) + 20); // Longer delay between stars
    });
    setInterval(changeBpm, 2000); // Slower BPM change
}

function startAudioContext() {
    if (Tone.context.state !== 'running') {
        Tone.start();
    }
    startVolumeModulation();
}

function triggerBassDrum(time) {
    disconnectEffects();
    bassDrum.triggerAttackRelease("C1", "1n", time); // Lower pitch
    connectEffects();
}

function playBassSynth(star) {
    const time = Tone.now();
    const frequency = map(star.brightness, threshold, 255, 50, 150); // Lower frequency
    const duration = map(star.brightness, threshold, 255, 1.5, 3.5); // Longer duration
    bassSynth.triggerAttackRelease(frequency, duration, time);
    bassSynth.volume.setValueAtTime(-12, time);
    bassSynth.volume.linearRampToValueAtTime(-24, time + duration);
}

function connectEffects() {
    const randomEffect = Math.random();
    if (randomEffect < 0.25) {
        bassDrum.chain(delay, Tone.Destination);
        bassSynth.chain(delay, Tone.Destination);
    } else if (randomEffect < 0.5) {
        bassDrum.chain(echo, Tone.Destination);
        bassSynth.chain(echo, Tone.Destination);
    } else if (randomEffect < 0.75) {
        bassDrum.chain(bassDrumReverb, Tone.Destination);
        bassSynth.chain(bassDrumReverb, Tone.Destination);
    } else {
        bassDrum.chain(chorus, Tone.Destination);
        bassSynth.chain(phaser, tremolo, Tone.Destination);
    }
}

function disconnectEffects() {
    bassDrum.disconnect();
    bassSynth.disconnect();
}

function getEnergy() {
    const waveform = analyser.getValue();
    return waveform.reduce((energy, value) => energy * 10 + Math.abs(value), 0) / waveform.length;
}

function drawCurvedLines() {
    noFill();
    strokeWeight(strokeWeightValue);
    const energy = getEnergy();

    for (let starIndex = 0; starIndex < currentIndex - 1; starIndex++) {
        drawGradientLine(starIndex, energy);
        if (frameCount % int(1 / speed) === 0) {
            playChord(starIndex);
        }
    }
}

function drawGradientLine(starIndex, energy) {
    let startColor = color(mouseX, 55, 0, mouseY);
    let endColor = color(255, 255, 0, 0);

    for (let gradientStep = 0; gradientStep < 1; gradientStep += gradientResolution) {
        let interpolatedColor = lerpColor(startColor, endColor, gradientStep);
        stroke(interpolatedColor);
        let waveMod = sin(gradientStep * PI * energy * 5) * 5; // Reduced wave effect
        line(
            lerp(stars[starIndex].x, stars[starIndex + 1].x, gradientStep),
            lerp(stars[starIndex].y, stars[starIndex + 1].y, gradientStep) + waveMod,
            lerp(stars[starIndex].x, stars[starIndex + 1].x, gradientStep + gradientResolution),
            lerp(stars[starIndex].y, stars[starIndex + 1].y, gradientStep + gradientResolution) + waveMod
        );
    }
}

function playChord(starIndex) {
    const note = Math.random() < 0.67 ? 'B3' : Math.random() < 0.33 ? 'G4' : 'G3';
    if (note === 'B3') {
    sampler.triggerAttackRelease(note, '10s', Tone.now() + starIndex);
}
if (note === 'G4') {
    sampler.triggerAttackRelease(note, '10s', Tone.now());
}
if (note === 'G3') {
    sampler.triggerAttackRelease(note, '60s', Tone.now());
}
}

function scheduleG3() {
const playDuration = 60 * 2; // seconds
const delayDuration = 1;
Tone.Transport.scheduleOnce((time) => {
    sampler.triggerAttack('G3', time);
    Tone.Transport.scheduleOnce(() => {
        sampler.triggerRelease('G3', time + playDuration);
        scheduleG3(); // Schedule the next play of G4
    }, time + playDuration);
}, Tone.now() + delayDuration);
}

function scheduleG4() {
const playDuration = 15; // seconds
const delayDuration = Math.random() * 5;
Tone.Transport.scheduleOnce((time) => {
    sampler.triggerAttack('G4', time);
    Tone.Transport.scheduleOnce(() => {
        sampler.triggerRelease('G4', time + playDuration);
        scheduleG4(); // Schedule the next play of G4
    }, time + playDuration);
}, Tone.now() + delayDuration);
}

function scheduleA3() {
const playDuration = 10; // seconds
const delayDuration = Math.random() * 20 + 10; // 10-30 seconds
Tone.Transport.scheduleOnce((time) => {
    sampler.triggerAttack('A3', time);
    Tone.Transport.scheduleOnce(() => {
        sampler.triggerRelease('A3', time + playDuration);
        scheduleA3(); // Schedule the next play of A3
    }, time + playDuration);
}, Tone.now() + delayDuration);
}

function draw() {
background(0);
image(img, 0, 0);
drawCurvedLines();
drawMiniCanvas();
Tone.Transport.bpm.value = bpm;
currentIndex = min(currentIndex + speed, stars.length);
}

function drawMiniCanvas() {
miniCanvas.background(0);
miniCanvas.push();
miniCanvas.translate(100, 100);
miniCanvas.noFill();
miniCanvas.stroke(255);
miniCanvas.strokeWeight(2);

for (let starIndex = 0; starIndex < currentIndex - 1; starIndex++) {
    let currentStar = stars[starIndex];
    let nextStar = stars[starIndex + 1];
    miniCanvas.line(currentStar.x, currentStar.y, nextStar.x, nextStar.y);
}
miniCanvas.pop();

image(miniCanvas, width - miniCanvas.width - 10, height - miniCanvas.height - 10); // Position in bottom right corner
}

function startVolumeModulation() {
const now = Tone.now();
gainNode.gain.setValueAtTime(0.03, now);
gainNode.gain.linearRampToValueAtTime(0.01, now + 120); // Longer decrease duration
gainNode.gain.linearRampToValueAtTime(MAX_VOLUME, now + 180); // Longer increase duration
}