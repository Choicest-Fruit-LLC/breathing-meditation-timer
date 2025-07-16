let breathText = document.getElementById('breathText');
    let timerDisplay = document.getElementById('timerDisplay');
    let affirmationDisplay = document.getElementById('affirmationDisplay');
    let durationSelect = document.getElementById('durationSelect'); // <-- new

    let time = 0;
    let interval;
    let isInhale = true;
    let sessionDuration = 60; 

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

  
    durationSelect.addEventListener('change', function() {
      sessionDuration = parseInt(durationSelect.value) * 60;
      resetExercise();
    });

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

          // Stop session when time is up
          if (time >= sessionDuration) {
            pauseExercise();
            breathText.textContent = 'Session Complete!';
            affirmationDisplay.textContent = 'Great job! Your session is finished.';
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
    }

    const bgAudio = document.getElementById('bgAudio');
const playPauseBtn = document.getElementById('playPauseBtn');
const muteBtn = document.getElementById('muteBtn');

let isPlaying = false;

playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    bgAudio.pause();
    playPauseBtn.textContent = 'Play';
  } else {
    bgAudio.play();
    playPauseBtn.textContent = 'Pause';
  }
  isPlaying = !isPlaying;
});

muteBtn.addEventListener('click', () => {
  bgAudio.muted = !bgAudio.muted;
  muteBtn.textContent = bgAudio.muted ? 'Unmute' : 'Mute';
});

// Optional: Reset buttons if audio ends (shouldn't happen with loop, but for safety)
bgAudio.addEventListener('ended', () => {
  playPauseBtn.textContent = 'Play';
  isPlaying = false;
});