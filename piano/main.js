const keys = document.querySelectorAll('.piano-keys');

// Criar um pool de áudio para permitir múltiplos sons
const audioPool = new Map();

// Função para tocar a nota
function playNote(noteKey) {
    // Se o áudio dessa nota ainda não existe no pool, cria um novo
    if (!audioPool.has(noteKey)) {
        audioPool.set(noteKey, new Audio(`./mp3/Piano.ff.${noteKey}.ogg`));
    }

    const audio = audioPool.get(noteKey);
    
    // Reset o áudio se já estiver tocando
    audio.currentTime = 0;
    
    // Toca o som
    audio.play().catch(error => {
        console.error(`Erro ao tocar nota ${noteKey}:`, error);
    });

    // Adiciona feedback visual
    const key = document.querySelector(`.piano-keys[data-key="${noteKey}"]`);
    if (key) {
        key.classList.add('active');
        setTimeout(() => key.classList.remove('active'), 150);
    }
}

// Event listeners para as teclas do piano
keys.forEach((key) => {
    key.addEventListener('click', (e) => {
        const noteKey = e.target.dataset.key;
        playNote(noteKey);
    });
});
