function updateClock() {
  const now = new Date();
  document.getElementById('hours').textContent = String(now.getHours()).padStart(2, '0');
  document.getElementById('minutes').textContent = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('seconds').textContent = String(now.getSeconds()).padStart(2, '0');
}

setInterval(updateClock, 1000);
updateClock();