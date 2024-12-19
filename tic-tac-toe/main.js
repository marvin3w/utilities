const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("game-status");
const currentPlayerText = document.getElementById("current-player");
const resetButton = document.getElementById("reset-button");
const scoreX = document.getElementById("score-x");
const scoreO = document.getElementById("score-o");

// Constantes para strings repetidas
const PLAYER_X = "X";
const PLAYER_O = "O";
const EMPTY_CELL = "";

// Estado do jogo
let currentPlayer = PLAYER_X;
let board = Array(9).fill(EMPTY_CELL);
let scores = { [PLAYER_X]: 0, [PLAYER_O]: 0 };
let isGameActive = true;

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
  [0, 4, 8], [2, 4, 6]             // Diagonais
];

const checkWinner = () => {
  for (const condition of winningConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      highlightWinner(condition);
      updateScore();
      statusText.innerHTML = `Jogador <span>${currentPlayer}</span> venceu!`;
      isGameActive = false;
      return true;
    }
  }

  if (!board.includes(EMPTY_CELL)) {
    statusText.innerHTML = "Empate!";
    isGameActive = false;
    return true;
  }
  return false;
};

const highlightWinner = (winningCells) => {
  winningCells.forEach((index) => {
    cells[index].style.backgroundColor = "#d4edda";
    cells[index].style.transform = "scale(1.1)";
  });
};

const updateScore = () => {
  scores[currentPlayer]++;
  if (currentPlayer === PLAYER_X) {
    scoreX.textContent = scores[PLAYER_X];
  } else {
    scoreO.textContent = scores[PLAYER_O];
  }
};

const resetGame = () => {
  board = Array(9).fill(EMPTY_CELL);
  cells.forEach((cell) => {
    cell.textContent = EMPTY_CELL;
    cell.className = "cell";
    cell.style.backgroundColor = "";
    cell.style.transform = "";
  });
  isGameActive = true;
  currentPlayer = PLAYER_X;
  currentPlayerText.textContent = currentPlayer;
  statusText.innerHTML = `Próximo jogador: <span id="current-player">${PLAYER_X}</span>`;
};

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (isGameActive && !board[index]) {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add(currentPlayer.toLowerCase());
      
      if (!checkWinner() && isGameActive) {
        currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
        currentPlayerText.textContent = currentPlayer;
        statusText.innerHTML = `Próximo jogador: <span id="current-player">${currentPlayer}</span>`;
      }
    }
  });
});

resetButton.addEventListener("click", resetGame);
