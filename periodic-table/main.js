let openCard = null;

const debounce = (fn, ms) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
};

document.querySelectorAll('.element-card').forEach(card => {
  
  card.addEventListener('click', () => {
    if (card.classList.contains('flip')) {
      card.classList.remove('flip');
      card.style.removeProperty('top');
      card.style.removeProperty('left');
      card.style.removeProperty('transform');
      openCard = null;
    } else {
      if (openCard) {
        openCard.classList.remove('flip');
        openCard.style.removeProperty('top');
        openCard.style.removeProperty('left');
        openCard.style.removeProperty('transform');
      }
      
      card.classList.add('flip');
      openCard = card;
    }
  });

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let moveX = (x - rect.width / 2) / 10;
    let moveY = (y - rect.height / 2) / 10;

    if (card.classList.contains('flip')) {
        moveX = -moveX;
    }

    card.style.setProperty('--x', `${moveX}px`);
    card.style.setProperty('--y', `${moveY}px`);
    card.style.setProperty('--rx', `${-moveY}deg`);
    card.style.setProperty('--ry', `${moveX}deg`);

    card.classList.add('magnetic');
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('magnetic');
    card.style.removeProperty('--x');
    card.style.removeProperty('--y');
    card.style.removeProperty('--rx');
    card.style.removeProperty('--ry');
  });
});
