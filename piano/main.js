const keys = document.querySelectorAll('.piano-keys');
const audioPool = new Map();

// Mapeamento de teclas para notas
const keyboardMap = new Map();
keys.forEach(key => {
    const letter = key.dataset.letter;
    if (letter) {
        keyboardMap.set(letter, key.dataset.key);
    }
});

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

// Event listeners existentes para click
keys.forEach((key) => {
    key.addEventListener('click', (e) => {
        const noteKey = e.target.dataset.key;
        playNote(noteKey);
    });
});

// Novos event listeners para teclado
document.addEventListener('keydown', (e) => {
    // Previne repetição ao segurar a tecla
    if (e.repeat) return;
    
    const letter = e.key.toLowerCase();
    const noteKey = keyboardMap.get(letter);
    
    if (noteKey) {
        playNote(noteKey);
    }
});
