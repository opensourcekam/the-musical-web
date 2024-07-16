let waveData = null;
let grid1, grid2;
let cols1, rows1, cols2, rows2;
let scl1 = 9; // Scale for first flow field
let scl2 = 50; // Scale for second flow field (dots)
let zOffset1 = 0;
let zOffset2 = 0;
let audio;
let delay, reverb;
let fft;
let scrubber;
let currentIndex = 0;
let waveStartTime;
let surfSpot;

// Variables for original wave design
let currentWaveHeight = 0;
let currentWavePeriod = 0;

// Alien (ft. Ant Clemons)
// side_a
// side_b


const surfSpots = [
    {
        "name": "Pipeline, Hawaii",
        "latitude": 21.664,
        "longitude": -158.054,
        "song": "09. Track 09.mp3",
        "color": "#ff0000"
    },
    {
        "name": "Teahupo'o, Tahiti",
        "latitude": -17.848,
        "longitude": -149.267,
        "song": "24. Track 24.mp3",
        "color": "#00ff00"
    },
    {
        "name": "Mavericks, California",
        "latitude": 37.495,
        "longitude": -122.501,
        "song": "16. Track 16.mp3",
        "color": "#0000ff"
    },
    {
        "name": "Jaws (Peahi), Hawaii",
        "latitude": 20.942,
        "longitude": -156.311,
        "song": "34. Track 34.mp3",
        "color": "#ffff00"
    },
    {
        "name": "Nazaré, Portugal",
        "latitude": 39.602,
        "longitude": -9.071,
        "song": "44. Track 44.mp3",
        "color": "#ff00ff"
    },
    {
        "name": "Shipstern Bluff, Tasmania",
        "latitude": -43.145,
        "longitude": 147.847,
        "song": "62. Track 62.mp3",
        "color": "#00ffff"
    },
    {
        "name": "Waimea Bay, Hawaii",
        "latitude": 21.639,
        "longitude": -158.064,
        "song": "Alien (ft. Ant Clemons).mp4",
        "color": "#ff8800"
    },
    {
        "name": "Dungeons, South Africa",
        "latitude": -34.037,
        "longitude": 18.336,
        "song": "61. Track 61.mp3",
        "color": "#8800ff"
    },
    {
        "name": "The Box, Australia",
        "latitude": -33.640,
        "longitude": 115.038,
        "song": "side_b.aif",
        "color": "#ff0088"
    },
    {
        "name": "Puerto Escondido, Mexico",
        "latitude": 15.859,
        "longitude": -97.066,
        "song": "SADEVILLAIN.mp3",
        "color": "#0088ff"
    }
];

// Fetch wave data from API
async function fetchWaveData() {
    surfSpot = surfSpots[Math.floor(Math.random() * surfSpots.length)];

    try {
        const response = await fetch(`https://marine-api.open-meteo.com/v1/marine?latitude=${surfSpot.latitude}&longitude=${surfSpot.longitude}&hourly=wave_height,wave_direction,wave_period,wind_wave_height,wind_wave_direction,wind_wave_period,wind_wave_peak_period,ocean_current_velocity,ocean_current_direction&forecast_days=16`);
        const data = await response.json();
        waveData = {
            waveHeight: data.hourly.wave_height,
            wavePeriod: data.hourly.wave_period
        };
        // Set initial wave parameters
        currentWaveHeight = waveData.waveHeight[0];
        currentWavePeriod = waveData.wavePeriod[0];
    } catch (error) {
        console.error('Error fetching wave data:', error);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    fetchWaveData().then(() => setupAudio());

    // Setup grids for two flow fields
    cols1 = floor(width / scl1);
    rows1 = floor(height / scl1);
    grid1 = new Array(cols1).fill().map(() => new Array(rows1).fill().map(() => createVector()));

    cols2 = floor(width / scl2);
    rows2 = new Array(cols2).fill().map(() => new Array(rows2).fill().map(() => createVector()));

    // Setup scrubber
    scrubber = createSlider(0, 1, 0, 0.01);
    scrubber.position(0, height - 20);
    scrubber.style('width', width + 'px');

    waveStartTime = millis();
}

function draw() {
    background('darkblue');
    if (waveData) {
        updateFlowField1();
        updateFlowField2();
        drawFlowField2(); // Draw dots background first
        drawOriginalWaves(); // Draw original wave design
        drawFlowField1(); // Draw lines on top
        updateAudio();
    }
    drawLocationBox();
}

function updateFlowField1() {
    // Use frameCount to periodically update the currentIndex
    if (frameCount % 60 === 0) {
        currentIndex = (currentIndex + 1) % waveData.waveHeight.length;
    }

    let waveHeight = map(waveData.waveHeight[currentIndex], 0, 10, 0.5, 2); // Example mapping
    let wavePeriod = map(waveData.wavePeriod[currentIndex], 0, 20, 0.01, 0.1); // Example mapping
    let speed = map(mouseX, 0, width, 0.01, 0.1); // Control speed with mouseX
    zOffset1 += speed;

    // Get audio analysis data
    let spectrum = fft.getValue();
    let audioInfluence = map(spectrum[0], -140, 0, 0, 1); // Example mapping

    for (let i = 0; i < cols1; i++) {
        for (let j = 0; j < rows1; j++) {
            let xOffset = i * wavePeriod;
            let yOffset = j * wavePeriod;
            let angle = noise(xOffset, yOffset, zOffset1) * TWO_PI * waveHeight * audioInfluence;

            // Add surfboard effect
            let d = dist(mouseX, mouseY, i * scl1, j * scl1);
            if (d < 100) {
                angle += PI / 4 * (1 - d / 100);
            }

            grid1[i][j] = p5.Vector.fromAngle(angle);
        }
    }
}

function updateFlowField2() {
    let elapsed = (millis() - waveStartTime) / 1000;
    let phase = (elapsed % 30) / 30 * TWO_PI; // 30-second wave cycle

    let waveHeight = map(waveData.waveHeight[currentIndex], 0, 10, 0.5, 2); // Example mapping
    let wavePeriod = map(waveData.wavePeriod[currentIndex], 0, 20, 0.01, 0.1); // Example mapping

    // Adjust zOffset2 based on mouseY for speed control
    let speed = map(mouseY, 0, height, 0.01, 0.1);
    zOffset2 += speed;

    // Get audio analysis data
    let spectrum = fft.getValue();
    let audioInfluence = map(spectrum[1], -140, 0, 0, 1); // Different aspect of audio data

    for (let i = 0; i < cols2; i++) {
        for (let j = 0; j < rows2; j++) {
            let xOffset = i * wavePeriod;
            let yOffset = j * wavePeriod;
            let angle = noise(xOffset, yOffset, zOffset2 + phase) * TWO_PI * waveHeight * audioInfluence;

            // Add surfboard effect
            let d = dist(mouseX, mouseY, i * scl2, j * scl2);
            if (d < 100) {
                angle += PI / 4 * (1 - d / 100);
            }

            grid2[i][j] = p5.Vector.fromAngle(angle);
        }
    }
}

function drawFlowField1() {
    stroke(surfSpot.color);
    for (let i = 0; i < cols1; i++) {
        for (let j = 0; j < rows1; j++) {
            let vector = grid1[i][j];
            let mag = vector.mag();
            strokeWeight(2 + mag * 2); // Adjust stroke weight for more lines
            push();
            translate(i * scl1, j * scl1);
            rotate(vector.heading());
            line(0, 0, scl1, 0);
            pop();
        }
    }
}

function drawFlowField2() {
    for (let i = 0; i < cols2; i++) {
        for (let j = 0; j < rows2; j++) {
            let vector = grid2[i][j];
            let mag = vector.mag();
            stroke(255, 100 + mag * 155, 100);
            strokeWeight(3 + mag * 2); // Stroke weight for dots
            push();
            translate(i * scl2, j * scl2);
            point(0, 0);
            pop();
        }
    }
}

function drawOriginalWaves() {
    // Update wave parameters periodically
    if (frameCount % 60 === 0) {
        currentIndex = (currentIndex + 1) % waveData.waveHeight.length;
        currentWaveHeight = waveData.waveHeight[currentIndex];
        currentWavePeriod = waveData.wavePeriod[currentIndex];
    }

    let waveHeight = map(currentWaveHeight, 0, 10, 50, 300); // Map wave height to amplitude
    let wavePeriod = map(currentWavePeriod, 0, 20, 0.01, 0.1); // Example mapping

    for (let x = 0; x < width; x++) {
        let y = height / 2 + waveHeight * sin(TWO_PI * x * wavePeriod + frameCount * 0.1);
        stroke(255);
        point(x, y);
    }
}

function setupAudio() {
    audio = new Tone.Player(`audio/${surfSpot.song}`).toDestination(); // Use the selected song
    audio.autostart = true;

    // Add effects
    delay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
    audio.connect(delay);

    // Setup FFT for audio analysis
    fft = new Tone.FFT(64);
    audio.connect(fft);

    Tone.Transport.start();
}

function updateAudio() {
    let volume = map(waveData.waveHeight[currentIndex], 0, 10, -20, 0); // Example mapping
    audio.volume.value = volume;

    // Update effects parameters based on wave data
    delay.delayTime.value = map(mouseY, 0, height, 0.01, 1); // Control delay with mouseY
    // reverb.decay = map(waveData.waveHeight[currentIndex], 0, 10, 1, 5); // Example mapping for reverb

    // Update scrubber position based on audio progress
    // scrubber.value(audio.progress);
}

function drawLocationBox() {
    fill(0, 0, 0, 150);
    noStroke();
    rect(width - 200, height - 60, 200, 60);

    fill(255);
    textSize(16);
    textAlign(LEFT, CENTER);
    text(surfSpot.name, width - 190, height - 45);
    text(`Lat: ${surfSpot.latitude}`, width - 190, height - 30);
    text(`Lng: ${surfSpot.longitude}`, width - 190, height - 15);
}
