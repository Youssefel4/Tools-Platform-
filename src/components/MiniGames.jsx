import React, { useState, useEffect } from 'react';

const MiniGames = () => {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    { id: 'tictactoe', name: 'Tic-Tac-Toe', icon: '⭕', description: 'Classic two-player game' },
    { id: 'numberguess', name: 'Number Guessing', icon: '🔢', description: 'Guess the secret number' },
    { id: 'snake', name: 'Snake Game', icon: '🐍', description: 'Classic snake game' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Mini Games
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Play fun games to relax and have fun
          </p>
        </div>

        {!activeGame ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {games.map((game) => (
              <div
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4 text-center">{game.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {game.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  {game.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <button
              onClick={() => setActiveGame(null)}
              className="mb-6 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              ← Back to Games
            </button>
            {activeGame === 'tictactoe' && <TicTacToe />}
            {activeGame === 'numberguess' && <NumberGuessing />}
            {activeGame === 'snake' && <SnakeGame />}
          </div>
        )}

        <div className="mt-8">
          <ins className="adsbygoogle"
               style={{ display: 'block', width: '100%', height: '250px' }}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot="XXXXXXXXXX"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>
      </div>
    </div>
  );
};

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (board[i] || winner) return;

    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const isBoardFull = board.every(square => square !== null);
  const status = winner ? `Winner: ${winner}` : isBoardFull ? 'Draw!' : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Tic-Tac-Toe
      </h2>
      
      <div className="text-center mb-6">
        <div className={`text-lg font-semibold ${
          winner === 'X' ? 'text-blue-600' : 
          winner === 'O' ? 'text-red-600' : 
          'text-gray-700 dark:text-gray-300'
        }`}>
          {status}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {board.map((square, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`h-20 w-20 text-3xl font-bold rounded-lg transition-colors ${
              square === 'X' ? 'bg-blue-100 text-blue-600' : 
              square === 'O' ? 'bg-red-100 text-red-600' : 
              'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {square}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
      >
        New Game
      </button>
    </div>
  );
};

const NumberGuessing = () => {
  const [targetNumber, setTargetNumber] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  const handleGuess = () => {
    const guessNum = parseInt(guess);
    if (isNaN(guessNum) || guessNum < 1 || guessNum > 100) {
      alert('Please enter a number between 1 and 100');
      return;
    }

    const newAttempt = {
      number: guessNum,
      message: guessNum === targetNumber ? '🎉 Correct!' : 
               guessNum < targetNumber ? '📈 Too low!' : '📉 Too high!',
      isCorrect: guessNum === targetNumber
    };

    setAttempts([...attempts, newAttempt]);
    
    if (guessNum === targetNumber) {
      setGameWon(true);
    }
    
    setGuess('');
  };

  const resetGame = () => {
    setTargetNumber(Math.floor(Math.random() * 100) + 1);
    setAttempts([]);
    setGameWon(false);
    setGuess('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleGuess();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Number Guessing Game
      </h2>
      
      <div className="text-center mb-6">
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          Guess a number between 1 and 100
        </p>
        {gameWon && (
          <div className="text-green-600 font-semibold text-lg">
            🎉 Congratulations! You won in {attempts.length} attempts!
          </div>
        )}
      </div>

      <div className="flex space-x-2 mb-6">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={gameWon}
          min="1"
          max="100"
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Enter your guess"
        />
        <button
          onClick={handleGuess}
          disabled={gameWon}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300"
        >
          Guess
        </button>
      </div>

      {attempts.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Attempts ({attempts.length})
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {attempts.map((attempt, index) => (
              <div
                key={index}
                className={`p-2 rounded ${
                  attempt.isCorrect 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="font-mono">{attempt.number}</span> - {attempt.message}
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={resetGame}
        className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
      >
        New Game
      </button>
    </div>
  );
};

const SnakeGame = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const gridSize = 20;
  const cellSize = 20;

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameInterval = setInterval(() => {
      moveSnake();
    }, 100);

    return () => clearInterval(gameInterval);
  }, [snake, direction, isPlaying, gameOver]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isPlaying || gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, isPlaying, gameOver]);

  const moveSnake = () => {
    if (direction.x === 0 && direction.y === 0) return;

    const newSnake = [...snake];
    const head = { ...newSnake[0] };
    head.x += direction.x;
    head.y += direction.y;

    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
      setGameOver(true);
      return;
    }

    for (let segment of newSnake) {
      if (head.x === segment.x && head.y === segment.y) {
        setGameOver(true);
        return;
      }
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      setScore(score + 1);
      generateFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const generateFood = () => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize)
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    setFood(newFood);
  };

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection({ x: 0, y: 0 });
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
        Snake Game
      </h2>
      
      <div className="text-center mb-4">
        <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Score: {score}
        </div>
        {gameOver && (
          <div className="text-red-600 font-semibold">
            Game Over! Final Score: {score}
          </div>
        )}
      </div>

      <div className="flex justify-center mb-6">
        <div 
          className="relative border-2 border-gray-300 dark:border-gray-600"
          style={{
            width: gridSize * cellSize,
            height: gridSize * cellSize
          }}
        >
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`absolute ${index === 0 ? 'bg-green-600' : 'bg-green-400'}`}
              style={{
                left: segment.x * cellSize,
                top: segment.y * cellSize,
                width: cellSize - 2,
                height: cellSize - 2
              }}
            />
          ))}
          <div
            className="absolute bg-red-500"
            style={{
              left: food.x * cellSize,
              top: food.y * cellSize,
              width: cellSize - 2,
              height: cellSize - 2
            }}
          />
        </div>
      </div>

      <div className="text-center mb-4">
        {!isPlaying ? (
          <button
            onClick={startGame}
            className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Start Game
          </button>
        ) : (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Use arrow keys to control the snake
          </div>
        )}
      </div>

      {gameOver && (
        <button
          onClick={startGame}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export default MiniGames;
