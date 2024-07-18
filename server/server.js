const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let currentPlayer = 'X'; 
let gameBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

function checkWinner(board) {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return board[i][0];
    }
    if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      return board[0][i];
    }
  }
  if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return board[0][0];
  }
  if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return board[0][2];
  }
  let draw = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') {
        draw = false;
        break;
      }
    }
    if (!draw) break;
  }
  if (draw) {
    return 'draw';
  }
  return null;
}

function resetGame() {
  currentPlayer = 'X';
  gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  return gameBoard; 
}

app.post('/makeMove', (req, res) => {
  const { row, col } = req.body;
  if (gameBoard[row][col] === '') {
    gameBoard[row][col] = currentPlayer;
    const winner = checkWinner(gameBoard);
    if (winner) {
      res.json({ winner, board: gameBoard });
      resetGame(); 
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      res.json({ currentPlayer, board: gameBoard });
    }
  } else {
    res.status(400).json({ error: 'Invalid move' });
  }
});

app.post('/reset', (req, res) => {
  try {
    gameBoard = resetGame(); 
    res.json({ board: gameBoard }); 
  } catch (error) {
    console.error('Error resetting game:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
