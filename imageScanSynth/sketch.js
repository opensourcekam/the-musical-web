let img;
let canvas;
let synthCount = 5;
let playingRow = -1;
let lastUpdateTime = 0;
const rowInterval = 1000 / 10; // Move one row every frame at 60fps
const batchSize = 105; // Number of pixels to process per frame
let synthPool = [];
let delayFactory = [];
let colorMap = [0,0,0,0];
let lowPassFilter;
let hpFilter;
let lfo;

const noteLengths = ["2n","4n", "8n", "16n"];

// Major scale frequencies (C major)
const majorScaleC = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88];

// Major scale frequencies (G major)
const majorScaleG = [196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 392.00];

// Major scale frequencies (A major)
const majorScaleA = [220.00, 246.94, 277.18, 293.66, 329.63, 369.99, 415.30];

function startAudio() {
	Tone.start().then(() => {
		document.getElementById('startButton').remove();
		playingRow = 0;
	});
}

function preload() {
	img = loadImage(
		_.sample(
			[
				'./111.jpeg',
				'./IMG_7997.jpeg',
				'./IMG_8064.jpeg',
				'./IMG_8062.jpeg',
				'./IMG_7727.jpeg',
				'./IMG_8067.jpeg',
			]
		)
	); // Ensure the path to your image is correct
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
	document.getElementById('startButton').addEventListener('click', startAudio);

	// Initialize effects
	lowPassFilter = new Tone.Filter(800, "lowpass").toDestination();
	hpFilter = new Tone.Filter(1500, "highpass").toDestination();
	hpFilter.frequency.rampTo(20000, 10);
	
	
	delayFactory = noteLengths
		.map(
			(note) =>
				new Tone.FeedbackDelay(note, (Math.random() * 0.6) + 0.01)
					.toDestination()
		);

	new Tone.PitchShift(
		{
			pitch  : 10 ,
			windowSize  : 0.1 ,
			delayTime  : 0 ,
			feedback  : 0
			}
	).toMaster()

	// Initialize AMSynth pool
	// gets really uncanny after 2+
	for (let i = 0; i < synthCount; i++) {
		lfo = new Tone.LFO(_.sample(noteLengths), 500, 2000);
		lfo.start();
		const synth = new Tone.PolySynth(Tone.Synth,
			{
				"detune": Math.random() * 15,
				"portamento": Math.random() * 26,
				"envelope": {
					"attack": Math.random() * 5.005,
					"attackCurve": "linear",
					"decay": Math.random() * 4.1,
					"decayCurve": "exponential",
					"release": Math.random() * 10,
					"releaseCurve": "exponential",
					"sustain": Math.random() * 1
				},
				"oscillator": {
					"partialCount": Math.random() * 3,
					"partials": [
						0.8105694651603699,
						0,
						0.8434636622299385
					],
					"phase": Math.random() * 10,
					"type": "custom"
				}
			}
		).toDestination();
		synth.volume.value = -20;
		synth.connect(lowPassFilter); // Connect the synth to the low-pass filter
		synth.connect(hpFilter); // Connect the synth to the high-pass filter
		lfo.connect(hpFilter.frequency);
		synthPool.push(synth);


	}
}

function draw() {
	image(img, 0, 0);
	if (playingRow >= 0) {
		stroke(colorMap);
		line(5, playingRow, width, playingRow);

		let currentTime = millis();
		if (currentTime - lastUpdateTime > rowInterval) {
			lastUpdateTime = currentTime;
			processRow();
		}
	}
}

function processRow() {
	if (playingRow < img.height) {
		for (let x = 0; x < img.width; x += batchSize) {
			for (let i = 0; i < batchSize && x + i < img.width; i++) {
				let index = ((x + i) + playingRow * img.width) * 4;
				let pixel = img.get(img.pixels[index], playingRow);
				let r = red(pixel);
				let g = green(pixel);
				let b = blue(pixel);
				let a = alpha(pixel);
				document.getElementById('index').innerHTML = index;
				document.getElementById('pixels').innerHTML = img.pixels[index];
				document.getElementById('rgbax').innerHTML = `${r}-${g}-${b}-${a}-${x + i}`;
				pixelToSound(r, g, b, a, x + i);
			}
		}
		document.getElementById('playing').innerHTML = playingRow;
		playingRow++;
	} else {
		playingRow = 0; // Reset to loop forever
	}
}

function pixelToSound(r, g, b, a, x) {
	colorMap = [r,g,b,a]
	// based on red color
	let noteIndex = Math.floor(map(r, 0, 255, 0, majorScaleC.length));
	// based on green color
	let noteIndexG = Math.floor(map(g, 0, 255, 0, majorScaleG.length));

	let frequency = majorScaleC[noteIndex];
	let frequencyG = majorScaleG[noteIndex];
	
	let volume = map(g, 0, 255, -30, -10); // Adjust volume to be more subtle
	let duration = map(b, 0, 255, 5, 30); // Set duration between 5 and 30 seconds

	let synthIndex = (x % synthPool.length);
	let synth = synthPool[synthIndex];
	// synth.volume.value = volume;
	// Create a chord with three notes

	document.getElementById('note-index-c').innerHTML = noteIndex;
	document.getElementById('note-index-g').innerHTML = noteIndexG;

	let baseFreq = noteIndex % 3 ? frequency : frequencyG;
	let harmony1 = majorScaleC[(noteIndex + 2) % majorScaleC.length]; // third interval above
	let harmony2 = majorScaleG[(noteIndexG + 4) % majorScaleG.length]; // fifth interval above

	// Ensure the frequencies are an array of numbers
	synth.triggerAttackRelease([baseFreq, harmony1, harmony2], duration)
		.connect(delayFactory[x % delayFactory.length]);
}