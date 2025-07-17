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
    function startBreathingLoop() {
      clearInterval(interval);
      updateBreathText('Breathe In');
      isInhale = true;
      interval = setInterval(() => {
        isInhale = !isInhale;
        updateBreathText(isInhale ? 'Breathe In' : 'Breathe Out');
      }, 5000); // 4 seconds
    }

    // Call this when you want to start the breathing animation
    startBreathingLoop();

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