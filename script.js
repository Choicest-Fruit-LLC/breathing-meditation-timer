let breathText = document.getElementById('breathText');
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

const bloomCircle = document.getElementById('bloomCircle');
const pulseDot = document.getElementById('pulseDot');
const waveRing = document.getElementById('waveRing');
const pulseSquare = document.getElementById('pulseSquare');
const animationFlipBtn = document.getElementById('animationFlipBtn');
const currentAnimationLabel = document.getElementById('currentAnimationLabel');

const animations = [
  { id: 'bloomCircle', label: 'Blooming Circle' },
  { id: 'pulseDot', label: 'Pulsing Dot' },
  { id: 'waveRing', label: 'Wave Ring' },
  { id: 'pulseSquare', label: 'Pulsing Square' }
];
let currentAnimationIndex = 0;

function showAnimation(index) {
  bloomCircle.style.display = 'none';
  pulseDot.style.display = 'none';
  waveRing.style.display = 'none';
  pulseSquare.style.display = 'none';
  const anim = animations[index].id;
  document.getElementById(anim).style.display = 'flex';
  currentAnimationLabel.textContent = animations[index].label;
}

animationFlipBtn.addEventListener('click', function() {
  currentAnimationIndex = (currentAnimationIndex + 1) % animations.length;
  showAnimation(currentAnimationIndex);
});

// Show the first animation on page load
showAnimation(currentAnimationIndex);

updateBreathText(isInhale ? 'Breathe In' : 'Breathe Out');

document.addEventListener('DOMContentLoaded', function() {
  const bgAudio = document.getElementById('bgAudio');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const muteBtn = document.getElementById('muteBtn');
  const loopSessionBtn = document.getElementById('loopSessionBtn');

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



// Modify onTimerEnd to loop if enabled
function onTimerEnd() {
  document.getElementById('endSessionBtns').style.display = 'block';
  if (isLoopSession) {
    setTimeout(() => {
      restartSession();
    }, 1000); // 1 second pause before looping
  }
}

function extendSession() {
  // Add 1 minute to timer and restart
  time += 60;
  document.getElementById('endSessionBtns').style.display = 'none';
}

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