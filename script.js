// Variables for intervals and state
let breathingInterval = null;
let currentAnimation = 'bloomCircle'; // Default animation

// DOM Elements
const animationFlipBtn = document.getElementById('animationFlipBtn');
const currentAnimationLabel = document.getElementById('currentAnimationLabel');
const rhythmSelect = document.getElementById('rhythmSelect');
const durationSelect = document.getElementById('durationSelect');
const breathText = document.getElementById('breathText');
const bloomCircle = document.getElementById('bloomCircle');
const pulseDot = document.getElementById('pulseDot');
const waveRing = document.getElementById('waveRing');
const pulseSquare = document.getElementById('pulseSquare');

// Animation Containers
const animations = {
  bloomCircle,
  pulseDot,
  waveRing,
  pulseSquare,
};

// Breathing rhythms
const rhythms = {
  '4-4': [4000, 4000], // 4s inhale, 4s exhale
  '4-7-8': [4000, 7000, 8000], // 4s inhale, 7s hold, 8s exhale
  box: [4000, 4000, 4000, 4000], // 4s inhale, 4s hold, 4s exhale, 4s hold
};

// Start breathing exercise
function startBreathingExercise() {
  const rhythm = rhythmSelect.value;
  const duration = parseInt(durationSelect.value) * 60 * 1000; // Convert minutes to milliseconds
  const rhythmSteps = rhythms[rhythm];

  let stepIndex = 0;

  // Clear any existing interval
  if (breathingInterval) {
    clearInterval(breathingInterval);
  }

  // Update breathing text and animation
  function updateBreathingStep() {
    const stepDuration = rhythmSteps[stepIndex];
    const stepText = ['Breathe In', 'Hold', 'Breathe Out', 'Hold'][stepIndex] || 'Breathe In';
    breathText.textContent = stepText;

    stepIndex = (stepIndex + 1) % rhythmSteps.length; // Cycle through steps
  }

  // Start interval for breathing steps
  updateBreathingStep(); // Run the first step immediately
  breathingInterval = setInterval(updateBreathingStep, rhythmSteps[stepIndex]);

  // Stop breathing exercise after the selected duration
  setTimeout(() => {
    clearInterval(breathingInterval);
    breathText.textContent = 'Relax...';
  }, duration);
}

// Stop breathing exercise
function stopBreathingExercise() {
  if (breathingInterval) {
    clearInterval(breathingInterval);
    breathingInterval = null;
  }
  breathText.textContent = 'Relax...';
}

// Change animation
function flipAnimation() {
  const animationKeys = Object.keys(animations);
  const currentIndex = animationKeys.indexOf(currentAnimation);
  const nextIndex = (currentIndex + 1) % animationKeys.length;
  const nextAnimation = animationKeys[nextIndex];

  // Hide current animation and show the next one
  animations[currentAnimation].style.display = 'none';
  animations[nextAnimation].style.display = 'block';

  // Update current animation and label
  currentAnimation = nextAnimation;
  currentAnimationLabel.textContent = nextAnimation.replace(/([A-Z])/g, ' $1').trim(); // Format label
}

// Event Listeners
animationFlipBtn.addEventListener('click', flipAnimation);
document.getElementById('startBreathing').addEventListener('click', startBreathingExercise);
document.getElementById('stopBreathing').addEventListener('click', stopBreathingExercise);

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  // Ensure the default animation is visible
  animations[currentAnimation].style.display = 'block';
});