main
let breathText = document.getElementById('breathText');

    let timerDisplay = document.getElementById('timerDisplay');
    let affirmationDisplay = document.getElementById('affirmationDisplay');

    let time = 0;
    let interval;
    let isInhale = true;
    let isLoopSession = false;

    const affirmations = [
      "You are calm, capable, and strong.",
      "Every breath brings you peace.",
      "You are enough just as you are.",
      "Your mind is clear and your heart is open.",
      "You radiate positivity and strength.",
      "You are grounded, mindful, and present.",
      "Inhale confidence, exhale doubt.",
      "You are doing your best, and that is enough.",
      "You deserve rest and renewal."
    ];

    function getRandomAffirmation() {
      return affirmations[Math.floor(Math.random() * affirmations.length)];
    }

    function updateAffirmation() {
      affirmationDisplay.style.opacity = 0;
      setTimeout(() => {
        affirmationDisplay.textContent = getRandomAffirmation();
        affirmationDisplay.style.opacity = 1;
      }, 500);
    }

    function showCallNotification() {
      document.getElementById('callNotification').style.display = 'block';
    }

    function dismissNotification() {
      document.getElementById('callNotification').style.display = 'none';
    }

    function startExercise() {
      if (!interval) {
        updateAffirmation();
        interval = setInterval(() => {
          time++;
          let mins = Math.floor(time / 60);
          let secs = time % 60;
          timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

          // toggle inhale/exhale every 4 seconds
          if (time % 4 === 0) {
            isInhale = !isInhale;
            breathText.textContent = isInhale ? 'Breathe In' : 'Breathe Out';
            updateAffirmation();
          }
        }, 1000);

        // Show notification after 1 minute
        setTimeout(showCallNotification, 60000);
      }
    }

    function pauseExercise() {
      clearInterval(interval);
      interval = null;
    }

    function resetExercise() {
      clearInterval(interval);
      interval = null;
      time = 0;
      isInhale = true;
      breathText.textContent = 'Breathe In';
      timerDisplay.textContent = '00:00';
      affirmationDisplay.textContent = 'You are calm, capable, and strong.';
    }

    function updateBreathText(text) {
      document.getElementById('breathText').textContent = text;
      if (document.getElementById('breathTextDot')) document.getElementById('breathTextDot').textContent = text;
      if (document.getElementById('breathTextWave')) document.getElementById('breathTextWave').textContent = text;
      if (document.getElementById('breathTextSquare')) document.getElementById('breathTextSquare').textContent = text;
    }

    // Start the breathing animation loop
    function startBreathingLoop() 
      clearInterval(interval);
      updateBreathText('Breathe In');
      isInhale = true;
      interval = setInterval(() => {

let timerDisplay = document.getElementById('timerDisplay');
let affirmationDisplay = document.getElementById('affirmationDisplay');
const remindersDisplay = document.getElementById('remindersDisplay');
let hydrationInterval, medicationInterval, stretchInterval;
let isInhale = true;
let interval;

const affirmations = [
  "You are calm, capable, and strong.",
  "Every breath brings you peace.",
  "You are enough just as you are.",
  "Your mind is clear and your heart is open.",
  "You radiate positivity and strength.",
  "You are grounded, mindful, and present.",
  "Inhale confidence, exhale doubt.",
  "You are doing your best, and that is enough.",
  "You deserve rest and renewal."
];

function getRandomAffirmation() {
  return affirmations[Math.floor(Math.random() * affirmations.length)];
}

function updateAffirmation() {
  affirmationDisplay.style.opacity = 0;
  setTimeout(() => {
    affirmationDisplay.textContent = getRandomAffirmation();
    affirmationDisplay.style.opacity = 1;
  }, 500);
}

function showReminder(message) {
  remindersDisplay.textContent = message;
  remindersDisplay.style.opacity = 1;
  setTimeout(() => {
    remindersDisplay.style.opacity = 0;
  }, 7000); // Hide after 7 seconds
}

function startReminders() {
  // Hydration every 20 minutes (1200000 ms)
  hydrationInterval = setInterval(() => {
    showReminder("💧 Time to hydrate! Drink some water.");
  }, 1200000);

  // Medication every 60 minutes (3600000 ms)
  medicationInterval = setInterval(() => {
    showReminder("💊 Medication Reminder: Take your meds if scheduled.");
  }, 3600000);

  // Stretching every 10 minutes (600000 ms)
  stretchInterval = setInterval(() => {
    showReminder("🤸‍♂️ Time to stretch or move!");
  }, 600000);
}

function stopReminders() {
  clearInterval(hydrationInterval);
  clearInterval(medicationInterval);
  clearInterval(stretchInterval);
}

function startExercise() {
  if (!interval) {
    updateAffirmation();
    startReminders(); // <-- Make sure this is here
    interval = setInterval(() => {
      time++;
      let mins = Math.floor(time / 60);
      let secs = time % 60;
      timerDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

      // toggle inhale/exhale every 4 seconds
      if (time % 4 === 0) {
        isInhale = !isInhale;
        updateBreathText(isInhale ? 'Breathe In' : 'Breathe Out');
        updateAffirmation();
      }
    }, 1000);
  }
}

function pauseExercise() {
  clearInterval(interval);
  interval = null;
}

function resetExercise() {
  clearInterval(interval);
  interval = null;
  time = 0;
  isInhale = true;
  breathText.textContent = 'Breathe In';
  timerDisplay.textContent = '00:00';
  affirmationDisplay.textContent = 'You are calm, capable, and strong.';
  stopReminders(); // <-- Make sure this is here
  remindersDisplay.textContent = '';
}

function updateBreathText(text) {
  document.getElementById('breathText').textContent = text;
  if (document.getElementById('breathTextDot')) document.getElementById('breathTextDot').textContent = text;
  if (document.getElementById('breathTextWave')) document.getElementById('breathTextWave').textContent = text;
  if (document.getElementById('breathTextSquare')) document.getElementById('breathTextSquare').textContent = text;
}

// Animation flip logic for breathing visuals

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


  playPauseBtn.addEventListener('click', function() {
    if (bgAudio.paused) {
      bgAudio.play();
      playPauseBtn.textContent = 'Pause';
    } else {
      bgAudio.pause();
      playPauseBtn.textContent = 'Play';
    }
  });

  muteBtn.addEventListener('click', function() {
    bgAudio.muted = !bgAudio.muted;
    muteBtn.textContent = bgAudio.muted ? 'Unmute' : 'Mute';
  });

  loopSessionBtn.addEventListener('click', function() {
    isLoopSession = !isLoopSession;
    loopSessionBtn.textContent = isLoopSession ? 'Looping...' : 'Loop Session';
    loopSessionBtn.classList.toggle('active', isLoopSession);
  });



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

main
function restartSession() {
  // Reset timer and start again
  resetExercise();
  startExercise();
  document.getElementById('endSessionBtns').style.display = 'none';
}

// Start the breathing animation loop
function startBreathingLoop() {
  clearInterval(interval);
  updateBreathText('Breathe In');
  isInhale = true;
  interval = setInterval(() => {
    isInhale = !isInhale;
    updateBreathText(isInhale ? 'Breathe In' : 'Breathe Out');
  }, 3000.2); // Change every 4 seconds
}

// Call this when you want to start the breathing animation
startBreathingLoop();


// Theme toggle logic ARYAN //
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const body = document.body;
  const container = document.querySelector('.container');

  // Default to light mode
  body.classList.add('light-mode');
  container.classList.add('light-mode');

  themeToggleBtn.addEventListener('click', function() {
    if (body.classList.contains('light-mode')) {
      body.classList.remove('light-mode');
      body.classList.add('dark-mode');
      container.classList.remove('light-mode');
      container.classList.add('dark-mode');
      themeToggleBtn.textContent = '☀️ Light Mode';
    } else {
      body.classList.remove('dark-mode');
      body.classList.add('light-mode');
      container.classList.remove('dark-mode');
      container.classList.add('light-mode');
      themeToggleBtn.textContent = '🌙 Dark Mode';
    }
  });
});

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  // Animation containers
  const animations = {
    bloomCircle: document.getElementById('bloomCircle'),
    pulseDot: document.getElementById('pulseDot'),
    waveRing: document.getElementById('waveRing'),
    pulseSquare: document.getElementById('pulseSquare'),
  };
  let currentAnimation = 'bloomCircle';
  const animationFlipBtn = document.getElementById('animationFlipBtn');
  const currentAnimationLabel = document.getElementById('currentAnimationLabel');

  // Show only the current animation
  function showAnimation(name) {
    Object.keys(animations).forEach(key => {
      if (animations[key]) animations[key].style.display = (key === name) ? 'block' : 'none';
    });
    if (currentAnimationLabel) {
      currentAnimationLabel.textContent = {
        bloomCircle: 'Blooming Circle',
        pulseDot: 'Pulsing Dot',
        waveRing: 'Wave Ring',
        pulseSquare: 'Pulsing Square'
      }[name] || name;
    }
  }

  // Flip animation on button click
  animationFlipBtn.addEventListener('click', () => {
    const keys = Object.keys(animations);
    let idx = keys.indexOf(currentAnimation);
    idx = (idx + 1) % keys.length;
    currentAnimation = keys[idx];
    showAnimation(currentAnimation);
  });

  // Show the default animation on load
  showAnimation(currentAnimation);
});


