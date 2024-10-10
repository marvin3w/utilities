
const digitPatterns = {
  '0': [
      [1, 1, 1],
      [1, 0, 1],
      [1, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
  ],
  '1': [
      [0, 1, 0],
      [1, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [1, 1, 1],
  ],
  '2': [
      [1, 1, 1],
      [0, 0, 1],
      [1, 1, 1],
      [1, 0, 0],
      [1, 1, 1],
  ],
  '3': [
      [1, 1, 1],
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 1],
      [1, 1, 1],
  ],
  '4': [
      [1, 0, 1],
      [1, 0, 1],
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 1],
  ],
  '5': [
      [1, 1, 1],
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 1],
      [1, 1, 1],
  ],
  '6': [
      [1, 1, 1],
      [1, 0, 0],
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
  ],
  '7': [
      [1, 1, 1],
      [0, 0, 1],
      [0, 1, 0],
      [1, 0, 0],
      [1, 0, 0],
  ],
  '8': [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
  ],
  '9': [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
      [0, 0, 1],
      [1, 1, 1],
  ],
};

function createDigitElement(id) {
  const digitElement = document.createElement('div');
  digitElement.classList.add('digit');
  digitElement.id = id;
  for (let i = 0; i < 15; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      digitElement.appendChild(dot);
  }
  return digitElement;
}

function updateDigit(elementId, num) {
  const pattern = digitPatterns[num];
  const digitElement = document.getElementById(elementId);
  const dots = digitElement.getElementsByClassName('dot');
  for (let i = 0; i < dots.length; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      if (pattern[row][col] === 1) {
          dots[i].classList.add('on');
      } else {
          dots[i].classList.remove('on');
      }
  }
}

function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');

  updateDigit('hour-tens', h[0]);
  updateDigit('hour-ones', h[1]);
  updateDigit('minute-tens', m[0]);
  updateDigit('minute-ones', m[1]);
  updateDigit('second-tens', s[0]);
  updateDigit('second-ones', s[1]);
}

document.addEventListener('DOMContentLoaded', () => {
  const clockElement = document.querySelector('.clock');
  clockElement.innerHTML = '';

  ['hour-tens', 'hour-ones', 'separator1', 'minute-tens', 'minute-ones', 'separator2', 'second-tens', 'second-ones'].forEach(id => {
      if (id.startsWith('separator')) {
          const sep = document.createElement('div');
          sep.classList.add('separator');
          sep.textContent = ':';
          clockElement.appendChild(sep);
      } else {
          const digitElement = createDigitElement(id);
          clockElement.appendChild(digitElement);
      }
  });

  updateClock();
  setInterval(updateClock, 1000);
});

