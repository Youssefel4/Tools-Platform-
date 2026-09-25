import React, { useState } from 'react';
import { LuGamepad2, LuArrowLeft } from 'react-icons/lu';
import ToolLayout from './ToolLayout';

const MiniGames = () => {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    { id: 'tictactoe', name: 'Tic-Tac-Toe', icon: '⭕', description: 'Classic two-player game of X and O' },
    { id: 'numberguess', name: 'Number Guessing', icon: '🔢', description: 'Guess the hidden secret number from 1 to 100' },
    { id: 'snake', name: 'Snake Game', icon: '🐍', description: 'Classic arcade snake game with score tracking' }
  ];

  const faqs = [
    {
      question: "Are these mini games free to play?",
      answer: "Yes, all mini games are 100% free with unlimited replays, no advertisements, and zero downloads required."
    },
    {
      question: "Can I play these games on mobile?",
      answer: "Yes! The games feature touch-friendly controls that work smoothly on iPhone, Android, and tablets."
    }
  ];

  const howToUse = [
    { title: "Select a Game", desc: "Choose from Tic-Tac-Toe, Number Guessing, or Snake." },
    { title: "Play in Browser", desc: "Interact via mouse, keyboard arrow keys, or on-screen touch controls." },
    { title: "Switch & Restart", desc: "Use the Back to Games button at any time to try another classic game." }
  ];

  const features = [
    { title: "3 Classic Games", desc: "Timeless strategy, arcade, and puzzle games in one responsive hub." },
    { title: "Instant Play", desc: "Runs directly in your browser with zero installation or account requirements." },
    { title: "Responsive Layout", desc: "Optimized for mobile touchscreens and desktop keyboards." }
  ];

  return (
    <ToolLayout
      title="Classic Mini Games Online"
      subtitle="Take a mental break with classic retro browser games: Tic-Tac-Toe, Snake, and Number Guessing."
      category="timers"
      categoryName="Timers & Productivity"
      icon={LuGamepad2}
      badge="Games"
      seoDescription="Play free classic mini games online. Play Tic-Tac-Toe, Snake, and Number Guessing right in your browser with no installation."
      seoKeywords="mini games, online games, tic tac toe online, snake game, number guessing game, free browser games"
      howToUse={howToUse}
      features={features}
      faqs={faqs}
      relatedToolIds={['dice-roller', 'random-picker', 'pomodoro-timer']}
    >
      <div>
        {!activeGame ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {games.map((game) => (
              <div
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-blue-500 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 text-center group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{game.icon}</div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {game.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  {game.description}
                </p>
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold text-xs">
                  Play Now →
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <button
              onClick={() => setActiveGame(null)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors border border-slate-200 dark:border-slate-700"
            >
              <LuArrowLeft size={14} /> Back to Games
            </button>
            <div className="pt-2">
              {activeGame === 'tictactoe' && <TicTacToe />}
              {activeGame === 'numberguess' && <NumberGuessing />}
              {activeGame === 'snake' && <SnakeGame />}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
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
    <div className="glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden max-w-lg mx-auto shadow-xl">
      <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -ml-16 -mt-16 pointer-events-none"></div>
      
      <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-2 relative z-10">
        Tic-Tac-<span className="text-indigo-600 dark:text-indigo-400">Toe</span>
      </h2>
      
      <div className="text-center mb-8 relative z-10">
        <div className={`inline-block px-6 py-2 rounded-full font-bold text-sm tracking-wide ${
          winner === 'X' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 
          winner === 'O' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
          isBoardFull ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
          'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
        } transition-colors shadow-sm`}>
          {status}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8 bg-gray-200/50 dark:bg-gray-700/50 p-3 md:p-4 rounded-2xl relative z-10 backdrop-blur-sm">
        {board.map((square, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            disabled={square || winner}
            className={`aspect-square text-4xl md:text-5xl font-black rounded-xl transition-all duration-300 flex items-center justify-center shadow-sm ${
              square === 'X' ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 transform scale-105' : 
              square === 'O' ? 'bg-white dark:bg-gray-800 text-red-500 dark:text-red-400 transform scale-105' : 
              'bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 cursor-pointer disabled:cursor-default disabled:hover:bg-white/80 dark:disabled:hover:bg-gray-800/80'
            }`}
          >
            <span className={square ? 'animate-fade-in' : ''}>{square}</span>
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1 relative z-10 text-lg uppercase tracking-wider"
      >
        Restart Game
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
    <div className="glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden max-w-lg mx-auto shadow-xl">
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
      
      <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-2 relative z-10">
        Number <span className="text-amber-500 dark:text-amber-400">Guessing</span>
      </h2>
      
      <div className="text-center mb-8 relative z-10">
        <p className="text-gray-600 dark:text-gray-400 font-medium mb-3">
          I'm thinking of a number between <span className="font-bold text-gray-900 dark:text-white">1</span> and <span className="font-bold text-gray-900 dark:text-white">100</span>
        </p>
        
        {gameWon && (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-bold rounded-2xl shadow-sm animate-bounce-short">
            <span>🏆</span> You won in {attempts.length} attempts!
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-8 relative z-10">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={gameWon}
          min="1"
          max="100"
          className="flex-1 px-5 py-4 bg-white/60 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-center text-2xl font-bold text-gray-900 dark:text-white shadow-inner disabled:opacity-50"
          placeholder="?"
        />
        <button
          onClick={handleGuess}
          disabled={gameWon || !guess}
          className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed text-lg w-full sm:w-auto"
        >
          Guess
        </button>
      </div>

      {attempts.length > 0 && (
        <div className="mb-8 relative z-10">
          <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4 text-center">
            Attempt History
          </h3>
          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar perspective-1000">
            {attempts.map((attempt, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all animate-fade-in shadow-sm ${
                  attempt.isCorrect 
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/50 transform scale-105' 
                    : 'bg-white/70 dark:bg-gray-800/70 border-gray-100 dark:border-gray-700/50'
                }`}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${attempt.isCorrect ? 'bg-emerald-200 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-100' : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}`}>#{index + 1}</span>
                  <span className={`text-2xl font-black ${attempt.isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>{attempt.number}</span>
                </div>
                <span className={`font-medium ${attempt.isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500 dark:text-gray-400'}`}>{attempt.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={resetGame}
        className="w-full px-6 py-4 bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600 font-bold rounded-2xl shadow-sm transition-all duration-300 relative z-10 text-lg"
      >
        {gameWon ? 'Play Again' : 'Reset Game'}
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
    <div className="glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden max-w-lg mx-auto shadow-xl">
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -ml-16 -mt-16 pointer-events-none"></div>
      
      <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-2 relative z-10 flex items-center justify-center gap-3">
        <span>🐍</span> Snake <span className="text-green-600 dark:text-green-500">Game</span>
      </h2>
      
      <div className="text-center mb-6 relative z-10 flex justify-center items-center gap-6">
        <div className="bg-white/50 dark:bg-gray-800/50 px-6 py-3 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-inner">
          <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-1">Score</span>
          <span className="text-3xl font-black text-gray-900 dark:text-white">{score}</span>
        </div>
      </div>

      {gameOver && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 rounded-2xl text-center relative z-10 animate-fade-in-up">
          <p className="text-red-700 dark:text-red-400 font-bold text-lg mb-1">Game Over!</p>
          <p className="text-red-600 dark:text-red-500 font-medium">Final Score: {score}</p>
        </div>
      )}

      <div className="flex justify-center mb-8 relative z-10">
        <div 
          className="relative bg-gray-900/90 dark:bg-black/90 rounded-xl overflow-hidden shadow-inner border-4 border-gray-800 dark:border-gray-700"
          style={{
            width: gridSize * cellSize,
            height: gridSize * cellSize,
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
          }}
        >
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`absolute rounded-sm transition-all duration-75 ${
                index === 0 
                  ? 'bg-gradient-to-br from-green-400 to-green-600 z-10' 
                  : 'bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.3)]'
              }`}
              style={{
                left: segment.x * cellSize,
                top: segment.y * cellSize,
                width: cellSize,
                height: cellSize,
                transform: index === 0 ? 'scale(1.1)' : 'scale(0.9)',
                borderRadius: index === 0 ? '4px' : '2px'
              }}
            >
              {index === 0 && (
                 <div className="absolute inset-0 flex items-center justify-center opacity-50">
                    <div className="w-1 h-1 bg-black rounded-full"></div>
                 </div>
              )}
            </div>
          ))}
          <div
            className="absolute rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)] animate-pulse"
            style={{
              left: food.x * cellSize,
              top: food.y * cellSize,
              width: cellSize,
              height: cellSize,
              transform: 'scale(0.8)'
            }}
          />
        </div>
      </div>

      <div className="text-center relative z-10">
        {!isPlaying ? (
          <button
            onClick={startGame}
            className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1 text-lg uppercase tracking-wider"
          >
            {gameOver ? 'Play Again 🔄' : 'Start Game ▶️'}
          </button>
        ) : (
          <div className="bg-white/40 dark:bg-gray-800/40 p-4 rounded-2xl border border-gray-100 dark:border-gray-700/50">
            <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Controls</p>
            <div className="grid grid-cols-3 gap-2 max-w-[150px] mx-auto text-xl opacity-60">
              <div></div>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-2 text-center">⬆️</div>
              <div></div>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-2 text-center">⬅️</div>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-2 text-center">⬇️</div>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-2 text-center">➡️</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniGames;
