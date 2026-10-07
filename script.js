const intro = document.querySelector('#intro');
const buttonStage = document.querySelector('#buttonStage');
const loveButton = document.querySelector('#loveButton');
const loveStory = document.querySelector('#loveStory');
const message = document.querySelector('.message');

const fallDuration = 1150;
const pulseDuration = 3100;

function setButtonPosition(x, y, rotation, scale = 1) {
  buttonStage.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg) scale(${scale})`;
}

function finishFall() {
  const startTime = performance.now();
  const dropDistance = Math.min(window.innerHeight * 0.34, 340);
  const horizontalDrift = Math.min(window.innerWidth * 0.055, 24);
  let lastFrame = startTime;

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / fallDuration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const bounce = Math.sin(progress * Math.PI * 5) * Math.pow(1 - progress, 2) * 10;

    if (progress < 1) {
      const y = dropDistance * eased + bounce;
      const x = Math.sin(progress * Math.PI) * horizontalDrift;
      const rotation = Math.sin(progress * Math.PI * 2) * 7;
      const scale = 1 - Math.pow(progress, 2) * 0.03;
      setButtonPosition(x, y, rotation, scale);
      lastFrame = now;
      requestAnimationFrame(animate);
      return;
    }

    setButtonPosition(0, dropDistance, 0, 0.02);
    buttonStage.style.opacity = '0';
    window.setTimeout(showHeart, 220);
  }

  requestAnimationFrame(animate);
}

function showHeart() {
  intro.classList.add('is-leaving');
  loveStory.classList.add('is-active');
  loveStory.setAttribute('aria-hidden', 'false');

  window.setTimeout(() => {
    loveStory.classList.add('heart-finished');
  }, 3000);

  window.setTimeout(() => {
    message.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, pulseDuration);
}

function handleLoveButton() {
  if (loveStory.classList.contains('is-active')) return;

  loveButton.disabled = true;
  loveButton.setAttribute('aria-hidden', 'true');
  buttonStage.style.transition = 'none';
  buttonStage.style.opacity = '1';
  setButtonPosition(0, 0, 0);
  finishFall();
}

loveButton.addEventListener('click', handleLoveButton);
