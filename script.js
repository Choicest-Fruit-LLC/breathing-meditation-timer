document.addEventListener('DOMContentLoaded', () => {
  // === DOM ELEMENTS ===
  const breathText = document.getElementById('breathText');
  const timerDisplay = document.getElementById('timerDisplay');
  const affirmationDisplay = document.getElementById('affirmationDisplay');
  const remindersDisplay = document.getElementById('remindersDisplay');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const body = document.body;
  const container = document.querySelector('.container');
  const animationFlipBtn = document.getElementById('animationFlipBtn');
  const rhythmSelect = document.getElementById('rhythmSelect');
  const durationSelect = document.getElementById('durationSelect');
  const startBreathingBtn = document.getElementById('startBreathing');
  const stopBreathingBtn = document.getElementById('stopBreathing');
  const callNotification = document.getElementById('callNotification');

  // Removed pulseSquare here
  const animations = {
    bloomCircle: document.getElementById('bloomCircle'),
    pulseDot: document.getElementById('pulseDot'),
    waveRing: document.getElementById('waveRing'),
  };

  // === STATE ===
  let time = 0;
  let interval = null;
  let breathingInterval = null;
  let hydrationInterval = null;
  let medicationInterval = null;
  let stretchInterval = null;
  let isInhale = true;
  let currentAnimation = 'bloomCircle';

  // === DATA ===
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

  const rhythms = {
    '4-4': [4000, 4000],
    '4-7-8': [4000, 7000, 8000],
    box: [4000, 4000, 4000, 4000],
  };

  // === FUNCTIONS ===

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

  function updateBreathText(text) {
    ['breathText', 'breathTextDot', 'breathTextWave', 'breathTextSquare'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    });
  }

  function showReminder(message) {
    remindersDisplay.textContent = message;
    remindersDisplay.style.opacity = 1;
    setTimeout(() => remindersDisplay.style.opacity = 0, 7000);
  }

  function startReminders() {
    hydrationInterval = setInterval(() => showReminder("💧 Time to hydrate! Drink some water."), 1200000);
    medicationInterval = setInterval(() => showReminder("💊 Medication Reminder: Take your meds if scheduled."), 3600000);
    stretchInterval = setInterval(() => showReminder("🤸‍♂️ Time to stretch or move!"), 600000);
  }

  function stopReminders() {
    clearInterval(hydrationInterval);
    clearInterval(medicationInterval);
    clearInterval(stretchInterval);
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
      startReminders();
      interval = setInterval(() => {
        time++;
        const mins = Math.floor(time / 60).toString().padStart(2, '0');
        const secs = (time % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${mins}:${secs}`;
        if (time % 4 === 0) {
          isInhale = !isInhale;
          updateBreathText(isInhale ? 'Breathe In' : 'Breathe Out');
          updateAffirmation();
        }
      }, 1000);
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
    updateBreathText('Breathe In');
    timerDisplay.textContent = '00:00';
    affirmationDisplay.textContent = affirmations[0];
    stopReminders();
    remindersDisplay.textContent = '';
    dismissNotification();
  }

  function startBreathingExercise() {
    const rhythm = rhythmSelect.value;
    const duration = parseInt(durationSelect.value) * 60 * 1000;
    const rhythmSteps = rhythms[rhythm];
    let stepIndex = 0;

    if (breathingInterval) clearInterval(breathingInterval);

    function updateBreathingStep() {
      const stepText = ['Breathe In', 'Hold', 'Breathe Out', 'Hold'][stepIndex] || 'Breathe In';
      updateBreathText(stepText);
      const stepDuration = rhythmSteps[stepIndex];
      stepIndex = (stepIndex + 1) % rhythmSteps.length;

      clearInterval(breathingInterval);
      breathingInterval = setInterval(updateBreathingStep, stepDuration);
    }

    updateBreathingStep();

    setTimeout(() => {
      clearInterval(breathingInterval);
      updateBreathText('Relax...');
    }, duration);
  }

  function stopBreathingExercise() {
    if (breathingInterval) clearInterval(breathingInterval);
    updateBreathText('Relax...');
  }

  function flipAnimation() {
    const keys = Object.keys(animations);
    const currentIndex = keys.indexOf(currentAnimation);
    const nextIndex = (currentIndex + 1) % keys.length;

    animations[currentAnimation].style.display = 'none';
    currentAnimation = keys[nextIndex];
    showAnimation(currentAnimation);
    animations[currentAnimation].style.display = 'block';
  }

function showAnimation(name) {
    Object.keys(animations).forEach(key => {
      if (animations[key]) animations[key].style.display = (key === name) ? 'block' : 'none';
    });
  }

  function toggleTheme() {
    const isLight = body.classList.contains('light-mode');
    body.classList.toggle('light-mode', !isLight);
    body.classList.toggle('dark-mode', isLight);
    container.classList.toggle('light-mode', !isLight);
    container.classList.toggle('dark-mode', isLight);
    themeToggleBtn.textContent = isLight ? '☀️ Light Mode' : '🌙 Dark Mode';
  }

  

  // === INIT ===
  // Show default animation
  showAnimation(currentAnimation);
 // Event listeners
  animationFlipBtn.addEventListener('click', flipAnimation);
  startBreathingBtn.addEventListener('click', startBreathingExercise);
  stopBreathingBtn.addEventListener('click', stopBreathingExercise);
  themeToggleBtn.addEventListener('click', toggleTheme);
  document.getElementById('startBtn').addEventListener('click', startExercise);
  document.getElementById('pauseBtn').addEventListener('click', pauseExercise);
  document.getElementById('resetBtn').addEventListener('click', resetExercise);
  document.getElementById('dismissNotificationBtn').addEventListener('click', dismissNotification);
});