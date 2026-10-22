// 1. Variables using 'const' to select elements using querySelector()
const themeButton = document.querySelector('#theme-btn');
const statusText = document.querySelector('#status-text');

// 2. A function that handles the theme switching logic
function toggleTheme() {
    // Toggles the dark-mode class on the body element
    document.body.classList.toggle('dark-mode');

    // 3. An 'if/else' statement to check if dark mode is currently active
    if (document.body.classList.contains('dark-mode')) {
        // 4. Modifying the webpage text content
        statusText.textContent = "The current theme is Dark Mode.";
    } else {
        // Modifying the webpage text content back to default
        statusText.textContent = "The current theme is Light Mode.";

        // Modifying webpage styling back to default (Blue in Light Mode)
        themeButton.style.backgroundColor = '#007bff';
        themeButton.style.color = '#ffffff';
    }
    
}

// 5. A click event listener attached to the existing button ID
themeButton.addEventListener('click', toggleTheme);

const gameCells = document.querySelectorAll('.tic-tac-toe-cell');
const gameStatus = document.querySelector('#game-status');
const resetGameButton = document.querySelector('#reset-game-btn');
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let board = Array(9).fill('');
let currentPlayer = 'X';
let gameOver = false;

function updateGameStatus(message) {
    gameStatus.textContent = message;
}

function playMove(event) {
    const cell = event.currentTarget;
    const cellIndex = Number(cell.dataset.index);

    if (gameOver || board[cellIndex] !== '') {
        return;
    }

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.setAttribute('aria-label', `Cell ${cellIndex + 1}, ${currentPlayer}`);
    cell.disabled = true;

    const winningCombination = winningCombinations.find(combination =>
        combination.every(index => board[index] === currentPlayer)
    );

    if (winningCombination) {
        winningCombination.forEach(index => gameCells[index].classList.add('winning-cell'));
        gameOver = true;
        gameCells.forEach(gameCell => {
            gameCell.disabled = true;
        });
        updateGameStatus(`${currentPlayer} wins!`);
        return;
    }

    if (board.every(value => value !== '')) {
        gameOver = true;
        updateGameStatus("It's a draw!");
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateGameStatus(`${currentPlayer}'s turn.`);
}

function resetGame() {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameOver = false;
    gameCells.forEach((cell, index) => {
        cell.textContent = '';
        cell.disabled = false;
        cell.classList.remove('winning-cell');
        cell.setAttribute('aria-label', `Cell ${index + 1}, empty`);
    });
    updateGameStatus("X's turn.");
}

gameCells.forEach(cell => cell.addEventListener('click', playMove));
resetGameButton.addEventListener('click', resetGame);

const scrollProgress = document.querySelector('.scroll-progress');
const scrollProgressBar = document.querySelector('#scroll-progress-bar');
const backToTopButton = document.querySelector('#back-to-top-btn');

function updateScrollProgress() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0
        ? Math.min(Math.max(window.scrollY / scrollableHeight * 100, 0), 100)
        : 0;
    const roundedProgress = Math.round(progress);

    scrollProgressBar.style.width = `${progress}%`;
    scrollProgress.setAttribute('aria-valuenow', String(roundedProgress));
    backToTopButton.hidden = window.scrollY < 300;
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('resize', updateScrollProgress);
backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'auto' });
});

updateScrollProgress();
