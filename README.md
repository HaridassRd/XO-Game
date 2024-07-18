# XO-Game
 # Frontend (React)
   Dependencies:
	1)React for building the UI.
        2)Axios for making API requests to the backend.

	State Management:
	1)board: Represents the Tic-Tac-Toe board as a 3x3 array.
	2)currentPlayer: Tracks whose turn it is ('X' or 'O').
	3)winner: Stores the winner ('X', 'O', or 'draw') or null if the game is ongoing.
   Functions:
	1)handleCellClick(row, col): Called when a cell on the board is clicked. Sends a request to the backend to make a move and updates 	the board accordingly.
	2)resetGame(): Resets the game board by sending a request to the backend to reset the game state.

 # Backend (Node.js with Express)
   Dependencies:
	1)Express for handling API endpoints.
	2)Body-parser for parsing incoming request bodies.
	3)Cors for enabling Cross-Origin Resource Sharing (CORS).

   State Management:
	1)currentPlayer: Tracks the current player ('X' or 'O').
	2)gameBoard: 3x3 array representing the Tic-Tac-Toe board.
   
   Endpoints:
	1)/makeMove (POST): Handles player moves, updates the board, checks for a winner, and responds with the updated game state.
	2)/reset (POST): Resets the game board and returns the reset board state.

   Game Logic:
	1)checkWinner(board): Checks for a winner or if the game is a draw based on the current board state.
	2)resetGame(): Resets the game board and sets currentPlayer back to 'X'.

 # Flow:
	1)Initialization: React initializes with an empty board and starts with 'X' as the first player.
	2)Game Play: Players click on empty cells to make moves. Each move triggers a request to the backend (/makeMove).
	3)Backend Processing: Upon receiving a move request, the backend updates the board, checks for a winner, and sends the updated 		  game state back to React.
	4)Winning/Drawing: If a player wins or the game is a draw, React updates the UI to show the result.
	5)Resetting the Game: Clicking the "Reset Game" button triggers a request to /reset, which resets the game state on both frontend 	  and backend.

