import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const backendUrl = 'http://localhost:5000'; 

const App = () => {
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleCellClick = (row, col) => {
    console.log("backendUrl",backendUrl)
    if (!winner && board[row][col] === '') {
      axios.post(`${backendUrl}/makeMove`, { row, col })
        .then(response => {
          const { winner, currentPlayer, board } = response.data;
          setWinner(winner);
          setCurrentPlayer(currentPlayer);
          setBoard(board);
        })
        .catch(error => {
          console.error('Error making move:', error);
        });
    }
  };

  const resetGame = () => {
    console.log("backendUrl",`${backendUrl}/reset`)

    axios.post(`${backendUrl}/reset`,{  })
      .then(response => {
        console.log("first",response)
        setWinner(null);
        setCurrentPlayer('X');
        setBoard(response.data.board); 
      })
      .catch(error => {
        console.error('Error resetting game:', error);
      });
  };

  const renderBoard = () => {
    return (
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className={`cell ${cell.toLowerCase()}`} onClick={() => handleCellClick(rowIndex, colIndex)}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };
  

  return (
    <div className="App">
      <h1 className="title">AP's XO Game</h1>
      <div >
        {renderBoard()}
      </div>
      <div className="status">
        {winner ? (
          <p>{winner === 'draw' ? 'It\'s a draw!' : `Player ${winner} wins!`}</p>
        ) : (
          <p>Current Turn: Player {currentPlayer}</p>
        )}
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
};

export default App;
