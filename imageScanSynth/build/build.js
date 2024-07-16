define("sketch", ["require", "exports", "p5", "tone", "lodash"], function (require, exports, p5, Tone, lodash_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var img;
    var canvas;
    var playingRow = -1;
    var lastUpdateTime = 0;
    var rowInterval = 1000 / 60;
    var batchSize = 10;
    var synthPool = [];
    var reverb;
    var delay;
    var startX, startY, endX, endY;
    var isDragging = false;
    var selectedArea = [];
    function preload(p) {
        var imageName = lodash_1.sample([
            '111.jpeg',
            'IMG_7997.jpeg',
            'IMG_8064.jpeg',
            'IMG_8062.jpeg',
            'IMG_7727.jpeg',
            'IMG_8067.jpeg',
        ]);
        img = p.loadImage("../" + imageName);
    }
    function setup(p) {
        var maxWidth = p.windowWidth * 0.8;
        var maxHeight = p.windowHeight * 0.8;
        var scaleFactor = Math.min(maxWidth / img.width, maxHeight / img.height);
        var newWidth = img.width * scaleFactor;
        var newHeight = img.height * scaleFactor;
        canvas = p.createCanvas(newWidth, newHeight);
        canvas.position((p.windowWidth - newWidth) / 2, (p.windowHeight - newHeight) / 2);
        img.resize(newWidth, newHeight);
        img.loadPixels();
        reverb = new Tone.Reverb(4).toDestination();
        delay = new Tone.FeedbackDelay("8n", 0.5).toDestination();
        for (var i = 0; i < 10; i++) {
            var synth = new Tone.FMSynth().connect(reverb).connect(delay).toDestination();
            synth.volume.value = -10;
            synthPool.push(synth);
        }
    }
    function draw(p) {
        p.background(25);
        p.image(img, 0, 0);
        if (isDragging) {
            p.stroke(255, 0, 0);
            p.noFill();
            p.rect(startX, startY, p.mouseX - startX, p.mouseY - startY);
        }
        else if (selectedArea.length === 4) {
            p.stroke(255, 0, 0);
            p.noFill();
            p.rect(selectedArea[0], selectedArea[1], selectedArea[2] - selectedArea[0], selectedArea[3] - selectedArea[1]);
        }
        if (playingRow >= 0) {
            var currentTime = p.millis();
            if (currentTime - lastUpdateTime > rowInterval) {
                lastUpdateTime = currentTime;
                processRow();
            }
        }
    }
    function mousePressed(p) {
        startX = Math.floor(p.constrain(p.mouseX, 0, p.width));
        startY = Math.floor(p.constrain(p.mouseY, 0, p.height));
        isDragging = true;
    }
    function mouseReleased(p) {
        var _a, _b;
        endX = Math.floor(p.constrain(p.mouseX, 0, p.width));
        endY = Math.floor(p.constrain(p.mouseY, 0, p.height));
        isDragging = false;
        if (startX > endX) {
            _a = [endX, startX], startX = _a[0], endX = _a[1];
        }
        if (startY > endY) {
            _b = [endY, startY], startY = _b[0], endY = _b[1];
        }
        selectedArea = [startX, startY, endX, endY];
        playingRow = startY;
        console.log(selectedArea);
        startAudio();
    }
    function startAudio() {
        Tone.start();
    }
    function processRow() {
        var sX = selectedArea[0], sY = selectedArea[1], eX = selectedArea[2], eY = selectedArea[3];
        if (playingRow < eY) {
            for (var x = sX; x < eX; x += batchSize) {
                for (var i = 0; i < batchSize && x + i < eX; i++) {
                    var index = Math.floor(((x + i) + playingRow * img.width) * 4);
                    if (index < img.pixels.length && index >= 0) {
                        var r = img.pixels[index];
                        var g = img.pixels[index + 1];
                        var b = img.pixels[index + 2];
                        var a = img.pixels[index + 3];
                        pixelToSound(r, g, b, a, index);
                    }
                }
            }
            playingRow++;
        }
        else {
            playingRow = sY;
        }
    }
    function pixelToSound(r, g, b, a, x) {
        var frequency = p5.prototype.map(r, 0, 255, 100, 800);
        var volume = p5.prototype.map(g, 0, 255, -30, -10);
        var duration = p5.prototype.map(b, 0, 255, 0.5, 5);
        console.log(frequency, volume, duration);
        var synthIndex = (x % synthPool.length);
        var synth = synthPool[synthIndex];
        console.log(synthPool.length, synth, synthIndex, startX, startY, endX, endY);
        if (synth) {
            var baseFreq = frequency;
            var harmony1 = baseFreq * 1.2;
            var harmony2 = baseFreq * 1.5;
            console.log(baseFreq, harmony1, harmony2);
            synth.triggerAttackRelease(baseFreq, duration, Tone.now(), volume);
        }
    }
    var sketch = function (p) {
        p.preload = function () { return preload(p); };
        p.setup = function () { return setup(p); };
        p.draw = function () { return draw(p); };
        p.mousePressed = function () { return mousePressed(p); };
        p.mouseReleased = function () { return mouseReleased(p); };
    };
    new p5(sketch);
});
//# sourceMappingURL=build.js.map