const video = document.getElementById("video");
const muteBtn = document.getElementById("mute-unmute");
const volumeIcon = document.getElementById("volume-icon");
const volumeSlider = document.getElementById("volume-slider");
const volumeControl = document.getElementById("volume-control");
const restartBtn = document.getElementById("restart");
const controls = document.getElementById("controls");
const videoContainer = document.getElementById("video-container");
const playBtn = document.getElementById("play-toggle");
const playIcon = document.getElementById("play-icon");

let controlsTimeout;
let volumeSliderVisible = false;

// Play/Pause on video click
video.addEventListener("click", togglePlayPause);
playBtn.addEventListener("click", togglePlayPause);

function togglePlayPause() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  showControls();
  updatePlayIcon();
}

// Update Play/Pause icon
function updatePlayIcon() {
  playIcon.src = video.paused ? "/icons/play.png" : "/icons/pause.png";
}

// Mute toggle
muteBtn.addEventListener("click", () => {
  video.muted = !video.muted;
  updateVolumeIcon();
  volumeSliderVisible = !volumeSliderVisible;
  volumeControl.classList.toggle("show-slider", volumeSliderVisible);
});

// Volume control
volumeSlider.addEventListener("input", () => {
  video.volume = volumeSlider.value;
  video.muted = video.volume == 0;
  updateVolumeIcon();
});

// Hide slider on mouse leave
volumeControl.addEventListener("mouseleave", () => {
  volumeSliderVisible = false;
  volumeControl.classList.remove("show-slider");
});

restartBtn.addEventListener("click", () => {
  video.pause();            // Just in case it's playing
  video.currentTime = 0;    // Reset to start
  updatePlayIcon();         // Sync icon
  showControls();           // Keep UI visible
});

// Volume icon update
function updateVolumeIcon() {
  volumeIcon.src = video.muted || video.volume === 0
    ? "/icons/mute.png"
    : "/icons/volume.png";
}

// Auto-hide controls
function showControls() {
  controls.classList.remove("hidden");
  clearTimeout(controlsTimeout);
  controlsTimeout = setTimeout(() => {
    if (!video.paused) controls.classList.add("hidden");
  }, 3000);
}

const isMobile = window.innerWidth <= 768;

if (!isMobile) {
  videoContainer.addEventListener("mousemove", showControls);
  videoContainer.addEventListener("mouseleave", () => {
    if (!video.paused) controls.classList.add("hidden");
  });
} else {
  controls.classList.remove("hidden"); // Always visible on mobile
}


video.addEventListener("play", updatePlayIcon);
video.addEventListener("pause", updatePlayIcon);

// Init
video.volume = 1;
updateVolumeIcon();
updatePlayIcon();
showControls();
