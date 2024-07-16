document.addEventListener("DOMContentLoaded", () => {
	const audioElement = document.getElementById("audioElement");
	const playButton = document.getElementById("playButton");
	const backgroundImage = document.getElementById("backgroundImage");
	const overlayImage = document.getElementById("overlayImage");
	const gradient2 = document.querySelector(".gradient2");
  
	audioElement.volume = 1.0; // Ensure volume is set to 100%
  
	let isPlaying = false;
	let audioContext, analyzer, dataArray, source, angle;
	let currentIndex = 0;
	let intervalId;
  
	function setupAudioContext() {
	  console.log("Setting up audio context");
	  audioContext = new (window.AudioContext || window.webkitAudioContext)();
	  analyzer = audioContext.createAnalyser();
	  source = audioContext.createMediaElementSource(audioElement);
	  source.connect(analyzer);
	  analyzer.connect(audioContext.destination); // Ensure connection to destination for playback
  
	  analyzer.fftSize = 256;
	  const bufferLength = analyzer.frequencyBinCount;
	  dataArray = new Uint8Array(bufferLength);
	  requestAnimationFrame(updateGradient);
	}
  
	function updateGradient() {
	  if (!isPlaying) return;
	  analyzer.getByteFrequencyData(dataArray);
	  const averageFrequency =
		dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
  
	  const red = Math.min(190, averageFrequency * 8);
	  const green = Math.min(255, averageFrequency * 10);
	  const blue = Math.min(255, averageFrequency);
  
	  const gradient = document.querySelector(".gradient");
  
	  gradient.style.backgroundImage = `
	  radial-gradient(
		rgba(190,${green},${blue},1),
		rgba(255,${green},${blue},0.3), 
		rgba(255,${green},${blue},.8)
	  )`;
	  
	  console.log(angle);
  
	  gradient2.style.backgroundImage = `
		linear-gradient(${angle}deg,
		  rgba(131,58,180,0.1) 0%,
		  rgba(253,29,29,0.2) 50%,
		  rgba(252,176,69,0.1) 100%
		)`;
  
	  requestAnimationFrame(updateGradient);
	}
  
	audioElement.addEventListener("timeupdate", updatePage);
  
	function updatePage(data) {
	  const currentTime = data.srcElement.currentTime;
	  const duration = data.srcElement.duration;
	  const percentageComplete = Math.floor(100 - (currentTime / duration) * 100);
	  document.querySelector(".time").innerHTML = `${Math.floor(
		percentageComplete
	  )}%`;
  
	  updateImageOpacity(currentTime, duration);
	}
  
	function updateImageOpacity(currentTime, duration) {
	  const opacity = Math.min(0.05 + (currentTime / duration) * 0.95, 1); // Ensure opacity doesn't exceed 1
	  backgroundImage.style.opacity = opacity;
	  const percentageComplete = Math.floor(100 - (currentTime / duration) * 100);
  
	  let newSrc = null;
	  if (percentageComplete <= 90) {
		newSrc =
		  "https://cdn.glitch.global/01485531-a16b-4ce3-9dcc-f9be1dd94e81/IMG_0324.jpeg?v=1718393775053";
	  }
	  if (percentageComplete <= 70) {
		newSrc =
		  "https://cdn.glitch.global/01485531-a16b-4ce3-9dcc-f9be1dd94e81/IMG_0322.jpeg?v=1718394441809";
	  }
	  if (percentageComplete <= 10) {
		newSrc =
		  "https://cdn.glitch.global/01485531-a16b-4ce3-9dcc-f9be1dd94e81/IMG_0327.jpeg?v=1718394450645";
	  }
  
	  if (newSrc && newSrc !== overlayImage.src) {
		overlayImage.src = newSrc;
		overlayImage.style.opacity = 1;
		backgroundImage.style.opacity = 0;
  
		setTimeout(() => {
		  backgroundImage.src = newSrc;
		  backgroundImage.style.opacity = opacity;
		  overlayImage.style.opacity = 0;
		}, 2000); // The duration should match the CSS transition duration
	  }
	}
  
	playButton.addEventListener("click", () => {
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
		audioElement
		  .play()
		  .then(() => {
			console.log("Audio is playing");
		  })
		  .catch((error) => {
			console.error("Error playing audio:", error);
		  });
	  }
	});
  
	audioElement.addEventListener("pause", () => {
	  console.log("Audio pause event triggered, ending experience");
	  alert("Thank you, feel free to take a screenshot as a digital keepsake.");
	});
  
	audioElement.addEventListener("volumechange", () => {
	  console.log("Audio volume:", audioElement.volume);
	  // IDEA: turn up volume to make brighter & inverse
	});
  
	audioElement.addEventListener("error", (e) => {
	  console.error("Audio error:", e);
	});
  
	document.addEventListener("mousemove", (event) => {
	  const width = window.innerWidth;
	  const height = window.innerHeight;
	  const x = event.clientX;
	  const y = event.clientY;
	  angle =
		Math.atan2(y - height / 2, x - width / 2) * (180 / Math.PI) + 180;
	});
  
	const texts = document.querySelectorAll("#playButton small");
  
	function showText(index) {
	  texts.forEach((text, i) => {
		text.style.display = i === index ? "block" : "none";
	  });
	}
  
	function cycleText() {
	  showText(currentIndex);
	  currentIndex = (currentIndex + 1) % texts.length;
	}
  
	function startCycling() {
	  intervalId = setInterval(cycleText, 4000); // Change text every 4 seconds (adjust as needed)
	  cycleText(); // Initial call to show the first text
	}
  
	function stopCycling() {
	  clearInterval(intervalId);
	  playButton.innerHTML = ""; // Remove all content inside playButton
	}
  
	function startBreathing() {
	  if (!playButton.classList.contains("breathing")) {
		playButton.classList.add("breathing");
	  } else {
		playButton.classList.remove("breathing");
	  }
	}
  
	playButton.addEventListener("click", stopCycling);
	playButton.addEventListener("click", startBreathing);
  
	startCycling(); // Start the text cycling when the page loads
  });
  