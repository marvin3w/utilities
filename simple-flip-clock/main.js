function updateUnit(unit, newValue) {
  const flipCard = document.getElementById(unit).querySelector('.flip-card');
  const currentValue = flipCard.querySelector('.top').textContent;

  if (newValue !== currentValue) {
    flipCard.classList.add('flipping');
    
    setTimeout(() => {
      flipCard.querySelector('.top').textContent = newValue;
    }, 150);

    setTimeout(() => {
      flipCard.querySelector('.bottom').textContent = newValue;
    }, 450);

    setTimeout(() => {
      flipCard.classList.remove('flipping');
    }, 600);
  }
}

function updateClock() {
  const now = new Date();
  updateUnit('hours', String(now.getHours()).padStart(2, '0'));
  updateUnit('minutes', String(now.getMinutes()).padStart(2, '0'));
  updateUnit('seconds', String(now.getSeconds()).padStart(2, '0'));
}

setInterval(updateClock, 1000);
updateClock();