let img;
let stars = [];
let currentIndex = 0;
let speed = 0.03; // Speed of animation
let soundSpeed = speed; // Speed of sound
let threshold = 200; // Brightness threshold for detecting stars
let strokeWeightValue = 3; // Stroke weight for the lines
let gradientResolution = 0.05; // Resolution of the gradient effect
let sampler, gainNode;

function preload() {
	img = loadImage('./IMG_8153.jpeg');
}

function setup() {
	const maxWidth = windowWidth * 0.8;
	const maxHeight = windowHeight * 0.8;
	const scaleFactor = Math.min(maxWidth / img.width, maxHeight / img.height);
	const newWidth = img.width * scaleFactor;
	const newHeight = img.height * scaleFactor;

	canvas = createCanvas(newWidth, newHeight);
	canvas.position((windowWidth - newWidth) / 2, (windowHeight - newHeight) / 2); // Center canvas

	img.resize(newWidth, newHeight);
	img.loadPixels();

	findBrightestPixels();

	// Set up Tone.js sampler with custom samples
	sampler = new Tone.Sampler({
		urls: {
			"A3": "72261-Tribal_percussion_melodic_twinkle-BLASTWAVEFX-06983.mp3",
			"B3": "8412-koto-c3.mp3",
			"G4": "22647-swell-rise-91.mp3"
		},
		attack: 0.1,
		decay: 0.2,
		sustain: 0.9,
		release: 0.2,
		baseUrl: "./samples/",
		onload: () => {
			console.log('Sampler loaded');
		}
	});

	// Set up a gain node for volume control
	gainNode = new Tone.Gain(0.4).toDestination(); // Reduce volume
	sampler.connect(gainNode);

	// Start Tone.js context on user interaction
	canvas.mousePressed(() => {
		if (Tone.context.state !== 'running') {
			Tone.start();
		}
	});
}

function findBrightestPixels() {
	for (let y = 0; y < img.height; y++) {
		for (let x = 0; x < img.width; x++) {
			let pixelIndex = (x + y * img.width) * 4;
			let redValue = img.pixels[pixelIndex];
			let greenValue = img.pixels[pixelIndex + 1];
			let blueValue = img.pixels[pixelIndex + 2];
			let brightnessValue = (redValue + greenValue + blueValue) / 3;
			if (brightnessValue > threshold) {
				stars.push({ x: x, y: y, brightness: brightnessValue });
			}
		}
	}
	stars.sort((a, b) => b.brightness - a.brightness);
}

function drawCurvedLines() {
	noFill();
	strokeWeight(strokeWeightValue);

	for (let starIndex = 0; starIndex < currentIndex - 1; starIndex++) {
		let startColor = color(mouseX, 55, 0, mouseY);
		let endColor = color(255, 255, 0, 0);
		for (let gradientStep = 0; gradientStep < 1; gradientStep += gradientResolution) {
			let interpolatedColor = lerpColor(startColor, endColor, gradientStep);
			stroke(interpolatedColor);
			line(
				lerp(stars[starIndex].x, stars[starIndex + 1].x, gradientStep) * noise(stars[starIndex].x * 10),
				lerp(stars[starIndex].y, stars[starIndex + 1].y, gradientStep) * noise(stars[starIndex].y * 10),
				lerp(stars[starIndex].x, stars[starIndex + 1].x, gradientStep + gradientResolution) * noise(stars[starIndex].x * 10),
				lerp(stars[starIndex].y, stars[starIndex + 1].y, gradientStep + gradientResolution) * noise(stars[starIndex].y * 10)
			);
		}

		if (frameCount % int(1 / soundSpeed) === 0) {
			playChord(starIndex);
		}
	}
}

function playChord(starIndex) {
	const chordProgression = [
		["G4"],
	];

	let chordIndex = starIndex % chordProgression.length;
	let chord = chordProgression[chordIndex];

	chord.forEach(note => {
		sampler.triggerAttack(note, Tone.now());
	});
}

function draw() {
	background(0); // Clear the canvas before drawing
	image(img, 0, 0);
	drawCurvedLines();
	// Increment currentIndex by speed, but not beyond the length of stars
	currentIndex = min(currentIndex + speed, stars.length);
}