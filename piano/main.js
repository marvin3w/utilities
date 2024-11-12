const keys = document.querySelectorAll('.piano-keys');

const audioPool = new Map();

function playNote(noteKey) {
    if (!audioPool.has(noteKey)) {
        audioPool.set(noteKey, new Audio(`./mp3/Piano.ff.${noteKey}.ogg`));
    }

    const audio = audioPool.get(noteKey);
    
    audio.currentTime = 0;
    
    audio.play().catch(error => {
        console.error(`Erro ao tocar nota ${noteKey}:`, error);
    });

    const key = document.querySelector(`.piano-keys[data-key="${noteKey}"]`);
    if (key) {
        key.classList.add('active');
        setTimeout(() => key.classList.remove('active'), 150);
    }
}

keys.forEach((key) => {
    key.addEventListener('click', (e) => {
        const noteKey = e.target.dataset.key;
        playNote(noteKey);
    });
});
