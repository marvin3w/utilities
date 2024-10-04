function createFlipCardAnimate(flipCard) {
  const flipCardAnimate = flipCard.cloneNode(true);
  flipCardAnimate.classList.remove('flip-card');
  flipCardAnimate.classList.add('flip-card-animate');
  flipCard.parentNode.appendChild(flipCardAnimate);
  return flipCardAnimate;
}

function updateClock() {
  const now = new Date();
  const units = ['hours', 'minutes', 'seconds'];
  
  units.forEach(unit => {
    const value = now[`get${unit.charAt(0).toUpperCase() + unit.slice(1)}`]()
      .toString()
      .padStart(2, '0');
    updateUnit(unit, value);
  });
}

function updateUnit(unit, value) {
  const unitElement = document.getElementById(unit);
  const flipCard = unitElement.querySelector('.flip-card');
  let flipCardAnimate = unitElement.querySelector('.flip-card-animate');
  
  if (!flipCardAnimate) {
    flipCardAnimate = createFlipCardAnimate(flipCard);
  }

  const currentValue = flipCard.querySelector('.top').textContent;

  if (currentValue !== value) {
    updateFlipCardContent(flipCard, flipCardAnimate, value);
    animateFlipCard(flipCardAnimate);
    updateAfterAnimation(flipCard, flipCardAnimate, value);
  }
}

function updateFlipCardContent(flipCard, flipCardAnimate, value) {
  flipCard.querySelector('.top').textContent = value;
  flipCardAnimate.querySelector('.bottom').textContent = value;
}

function animateFlipCard(flipCardAnimate) {
  const topElement = flipCardAnimate.querySelector('.top');
  const bottomElement = flipCardAnimate.querySelector('.bottom');

  resetAnimation(topElement);
  resetAnimation(bottomElement);

  requestAnimationFrame(() => {
    topElement.style.animation = 'flip-top 0.25s ease-in 0.05s';
    bottomElement.style.animation = 'flip-bottom 0.25s ease-out 0.3s';
  });
}

function resetAnimation(element) {
  element.style.animation = 'none';
  void element.offsetWidth;
}

function updateAfterAnimation(flipCard, flipCardAnimate, value) {
  setTimeout(() => {
    flipCardAnimate.querySelector('.top').textContent = value;
    flipCard.querySelector('.bottom').textContent = value;
  }, 270);
}

function initializeClock() {
  const units = ['hours', 'minutes', 'seconds'];
  units.forEach(unit => {
    const unitElement = document.getElementById(unit);
    const flipCard = unitElement.querySelector('.flip-card');
    createFlipCardAnimate(flipCard);
  });
  updateClock();
}

setInterval(updateClock, 1000);
initializeClock();