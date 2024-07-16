let img;
let stars = [];
let currentIndex = 0;
let speed = .41; // Speed of animation
let threshold = 200; // Brightness threshold for detecting stars
let strokeWeightValue = 0.4; // Stroke weight for the lines
let gradientResolution = 0.01; // Resolution of the gradient effect

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
	stars = stars.sort((a, b) => b.brightness - a.brightness).reverse();
	stars = stars
		.filter((a, idx, arr) => a.brightness === arr[idx + 1]?.brightness || a.brightness === arr[idx - 1]?.brightness)
		// .filter((star) => star.brightness > 222);
}

function drawCurvedLines() {
	noFill();
	strokeWeight(strokeWeightValue);

	for (let starIndex = 0; starIndex < currentIndex - 1; starIndex++) {
		let startColor = color(255, 255, 255, 255);
		let endColor = color(255, 255, 255, 255);

		let controlX1 = (stars[starIndex].x + stars[starIndex + 1].x) / 2 + noise(-20, 20);
		let controlY1 = (stars[starIndex].y + stars[starIndex + 1].y) / 2 + noise(-20, 20);
		let controlX2 = (stars[starIndex].x + stars[starIndex + 1].x) / 2 + noise(-20, 20);
		let controlY2 = (stars[starIndex].y + stars[starIndex + 1].y) / 2 + noise(-20, 20);

		for (let gradientStep = 0; gradientStep < 1; gradientStep += gradientResolution) {
			let interpolatedColor = lerpColor(startColor, endColor, gradientStep);
			stroke(interpolatedColor);
			let x1 = bezierPoint(stars[starIndex].x, controlX1, controlX2, stars[starIndex + 1].x, gradientStep);
			let y1 = bezierPoint(stars[starIndex].y, controlY1, controlY2, stars[starIndex + 1].y, gradientStep);
			let x2 = bezierPoint(stars[starIndex].x, controlX1, controlX2, stars[starIndex + 1].x, gradientStep + gradientResolution);
			let y2 = bezierPoint(stars[starIndex].y, controlY1, controlY2, stars[starIndex + 1].y, gradientStep + gradientResolution);
			line(x1, y1, x2, y2)
		}
		// text(`star ${starIndex} has a brightness of ${stars[starIndex].brightness}`, controlX2, controlY2)
	}
}

function draw() {
	background(0); // Clear the canvas before drawing
	image(img, 0, 0);
	drawCurvedLines();

	// stars.forEach((star, starIndex)=> {
	// 	console.log(`star ${starIndex} has a brightness of ${star.brightness}`)
	// })
	
	// Increment currentIndex by speed, but not beyond the length of stars
	currentIndex = min(currentIndex + speed, stars.length);
}