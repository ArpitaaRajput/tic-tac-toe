const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const resetScoreBtn = document.getElementById('resetScore');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');
const scoreTEl = document.getElementById('scoreT');

let board = Array(9).fill(null);
let xIsNext = true;
let scores = { X: 0, O: 0, T: 0 };

const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function createBoard() {
    boardEl.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleClick);
        boardEl.appendChild(cell);
    }
}

function handleClick(e) {
    const index = e.target.dataset.index;
    if (board[index] || checkWinner()) 
        return;
    board[index] = xIsNext ? 'X' : 'O';
    xIsNext = !xIsNext;
    render();
    const result = checkWinner();
    if (result) finishGame(result);
    else if (board.every(cell => cell)) finishGame('T');
}

function checkWinner() {
    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { player: board[a], combo };
        }
    }
    return null;
}

function finishGame(result) {
    if (result === 'T') {
        statusEl.textContent = 'It\'s a Draw!';
        scores.T++;
    } else {
        statusEl.textContent = `${result.player} Wins!`;
        scores[result.player]++;
        result.combo.forEach(i => {
            const cell = boardEl.querySelector(`[data-index='${i}']`);
            cell.classList.add('winner');
        });
    }
    updateScores();
}

function render() {
    const cells = boardEl.children;
    for (let i = 0; i < 9; i++) {
        cells[i].textContent = board[i] || '';
        cells[i].classList.remove('x', 'o');
        if (board[i]) cells[i].classList.add(board[i].toLowerCase());
    }
    statusEl.textContent = `Turn: ${xIsNext ? 'X' : 'O'}`;
}

function updateScores() {
    scoreXEl.textContent = scores.X;
    scoreOEl.textContent = scores.O;
    scoreTEl.textContent = scores.T;
}

restartBtn.addEventListener('click', () => {
    board = Array(9).fill(null);
    xIsNext = true;
    createBoard();
    render();
});

resetScoreBtn.addEventListener('click', () => {
    scores = { X: 0, O: 0, T: 0 };
    updateScores();
});

createBoard();
updateScores();