function updateClock() {
  const now = new Date();
  updateUnit('hours', now.getHours());
  updateUnit('minutes', now.getMinutes());
  updateUnit('seconds', now.getSeconds());
}

function updateUnit(unit, value) {
  value = String(value).padStart(2, '0');
  const flipCard = document.querySelector(`#${unit} .flip-card`);
  flipCard.querySelector('.top').textContent = value;
  flipCard.querySelector('.bottom').textContent = value;
}

setInterval(updateClock, 1000);
updateClock();