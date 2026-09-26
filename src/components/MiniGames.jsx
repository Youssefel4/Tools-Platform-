import React, { useState, useEffect, useCallback } from 'react';
import { 
  LuGamepad2, LuArrowLeft, LuHash, LuTarget, LuMousePointer, 
  LuTrophy, LuRotateCcw, LuPlay, LuArrowUp, LuArrowDown, 
  LuArrowRight, LuTrendingUp, LuTrendingDown, LuCircleCheck 
} from 'react-icons/lu';
import ToolLayout from './ToolLayout';

const MiniGames = () => {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    { id: 'tictactoe', name: 'Tic-Tac-Toe', icon: LuTarget, description: 'Classic two-player game of X and O' },
    { id: 'numberguess', name: 'Number Guessing', icon: LuHash, description: 'Guess the hidden secret number from 1 to 100' },
    { id: 'snake', name: 'Snake Game', icon: LuMousePointer, description: 'Classic arcade snake game with score tracking' }
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
            {games.map((game) => {
              const GameIcon = game.icon;
              return (
                <div
                  key={game.id}
                  onClick={() => setActiveGame(game.id)}
                  className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-[#804DF2] hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 text-center group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#804DF2] text-white flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-[#804DF2]/20">
                    <GameIcon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#804DF2] dark:group-hover:text-[#a782f7] transition-colors">
                    {game.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    {game.description}
                  </p>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/40 text-[#804DF2] dark:text-[#a782f7] font-bold text-xs">
                    Play Now →
                  </span>
                </div>
              );
            })}
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
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 rounded-3xl max-w-lg mx-auto shadow-xl">
      <h2 className="text-3xl font-extrabold text-center text-slate-900 dark:text-white mb-2">
        Tic-Tac-<span className="text-[#804DF2]">Toe</span>
      </h2>
      
      <div className="text-center mb-8">
        <div className={`inline-block px-6 py-2 rounded-full font-bold text-sm tracking-wide ${
          winner === 'X' ? 'bg-purple-100 text-[#804DF2] dark:bg-purple-900/30 dark:text-[#a782f7]' : 
          winner === 'O' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' : 
          isBoardFull ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
          'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
        } transition-colors shadow-sm`}>
          {status}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8 bg-slate-100 dark:bg-slate-800/60 p-3 md:p-4 rounded-2xl">
        {board.map((square, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            disabled={square || winner}
            className={`aspect-square text-4xl md:text-5xl font-black rounded-xl transition-all duration-200 flex items-center justify-center shadow-sm ${
              square === 'X' ? 'bg-white dark:bg-slate-800 text-[#804DF2] dark:text-[#a782f7] transform scale-105' : 
              square === 'O' ? 'bg-white dark:bg-slate-800 text-rose-500 dark:text-rose-400 transform scale-105' : 
              'bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 cursor-pointer disabled:cursor-default'
            }`}
          >
            <span>{square}</span>
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="w-full px-6 py-3.5 bg-[#804DF2] hover:bg-[#6c3bde] text-white font-bold rounded-2xl shadow-lg hover:shadow-[#804DF2]/20 transition-all text-base uppercase tracking-wider flex items-center justify-center gap-2"
      >
        <LuRotateCcw size={18} /> Restart Game
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

    const isMatch = guessNum === targetNumber;
    const newAttempt = {
      number: guessNum,
      message: isMatch ? 'Correct!' : guessNum < targetNumber ? 'Too low!' : 'Too high!',
      direction: isMatch ? 'correct' : guessNum < targetNumber ? 'low' : 'high',
      isCorrect: isMatch
    };

    setAttempts([...attempts, newAttempt]);
    
    if (isMatch) {
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
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 rounded-3xl max-w-lg mx-auto shadow-xl">
      <h2 className="text-3xl font-extrabold text-center text-slate-900 dark:text-white mb-2">
        Number <span className="text-[#804DF2]">Guessing</span>
      </h2>
      
      <div className="text-center mb-8">
        <p className="text-slate-600 dark:text-slate-400 font-medium mb-3">
          I'm thinking of a number between <span className="font-bold text-slate-900 dark:text-white">1</span> and <span className="font-bold text-slate-900 dark:text-white">100</span>
        </p>
        
        {gameWon && (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-purple-50 dark:bg-purple-900/30 text-[#804DF2] dark:text-[#a782f7] font-bold rounded-2xl shadow-sm">
            <LuTrophy size={18} /> You won in {attempts.length} attempts!
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-8">
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={gameWon}
          min="1"
          max="100"
          className="flex-1 px-5 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#804DF2] text-center text-2xl font-bold text-slate-900 dark:text-white disabled:opacity-50"
          placeholder="?"
        />
        <button
          onClick={handleGuess}
          disabled={gameWon || !guess}
          className="px-8 py-3.5 bg-[#804DF2] hover:bg-[#6c3bde] text-white font-bold rounded-2xl shadow-lg hover:shadow-[#804DF2]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base w-full sm:w-auto"
        >
          Guess
        </button>
      </div>

      {attempts.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4 text-center">
            Attempt History
          </h3>
          <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
            {attempts.map((attempt, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  attempt.isCorrect 
                    ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800/50' 
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${attempt.isCorrect ? 'bg-[#804DF2] text-white' : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'}`}>#{index + 1}</span>
                  <span className={`text-xl font-black ${attempt.isCorrect ? 'text-[#804DF2] dark:text-[#a782f7]' : 'text-slate-900 dark:text-white'}`}>{attempt.number}</span>
                </div>
                <span className={`font-semibold text-sm flex items-center gap-1.5 ${attempt.isCorrect ? 'text-[#804DF2] dark:text-[#a782f7]' : 'text-slate-600 dark:text-slate-400'}`}>
                  {attempt.isCorrect && <LuCircleCheck size={16} />}
                  {attempt.direction === 'low' && <LuTrendingUp size={16} className="text-blue-500" />}
                  {attempt.direction === 'high' && <LuTrendingDown size={16} className="text-amber-500" />}
                  {attempt.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={resetGame}
        className="w-full px-6 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 font-bold rounded-2xl transition-all text-sm flex items-center justify-center gap-2"
      >
        <LuRotateCcw size={16} /> {gameWon ? 'Play Again' : 'Reset Game'}
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
  const cellSize = 18;

  const moveSnake = useCallback(() => {
    if (direction.x === 0 && direction.y === 0) return;

    setSnake((prevSnake) => {
      const head = { ...prevSnake[0] };
      head.x += direction.x;
      head.y += direction.y;

      if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      for (let segment of prevSnake) {
        if (head.x === segment.x && head.y === segment.y) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }
      }

      const newSnake = [head, ...prevSnake];

      if (head.x === food.x && head.y === food.y) {
        setScore((prev) => prev + 1);
        let newFood;
        do {
          newFood = {
            x: Math.floor(Math.random() * gridSize),
            y: Math.floor(Math.random() * gridSize)
          };
        } while (newSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
        setFood(newFood);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gridSize]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const gameInterval = setInterval(() => {
      moveSnake();
    }, 120);

    return () => clearInterval(gameInterval);
  }, [isPlaying, gameOver, moveSnake]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isPlaying || gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          setDirection((prev) => (prev.y === 0 ? { x: 0, y: -1 } : prev));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setDirection((prev) => (prev.y === 0 ? { x: 0, y: 1 } : prev));
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setDirection((prev) => (prev.x === 0 ? { x: -1, y: 0 } : prev));
          break;
        case 'ArrowRight':
          e.preventDefault();
          setDirection((prev) => (prev.x === 0 ? { x: 1, y: 0 } : prev));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, gameOver]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection({ x: 1, y: 0 });
    setGameOver(false);
    setScore(0);
    setIsPlaying(true);
  };

  const handlePadDirection = (newDir) => {
    if (!isPlaying) return;
    setDirection((prev) => {
      if (newDir.x !== 0 && prev.x !== 0) return prev;
      if (newDir.y !== 0 && prev.y !== 0) return prev;
      return newDir;
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 rounded-3xl max-w-lg mx-auto shadow-xl">
      <h2 className="text-3xl font-extrabold text-center text-slate-900 dark:text-white mb-2 flex items-center justify-center gap-2">
        <LuMousePointer className="text-[#804DF2]" size={26} />
        Snake <span className="text-[#804DF2]">Game</span>
      </h2>
      
      <div className="text-center mb-6 flex justify-center items-center gap-6">
        <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-0.5">Score</span>
          <span className="text-3xl font-black text-slate-900 dark:text-white">{score}</span>
        </div>
      </div>

      {gameOver && (
        <div className="mb-6 p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800/50 rounded-2xl text-center">
          <p className="text-rose-700 dark:text-rose-400 font-bold text-lg mb-1">Game Over!</p>
          <p className="text-rose-600 dark:text-rose-500 font-medium text-sm">Final Score: {score}</p>
        </div>
      )}

      <div className="flex justify-center mb-6">
        <div 
          className="relative bg-slate-950 rounded-2xl overflow-hidden border-2 border-slate-800"
          style={{
            width: gridSize * cellSize,
            height: gridSize * cellSize
          }}
        >
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`absolute rounded-sm ${
                index === 0 ? 'bg-[#804DF2] z-10' : 'bg-[#a782f7]'
              }`}
              style={{
                left: segment.x * cellSize,
                top: segment.y * cellSize,
                width: cellSize - 1,
                height: cellSize - 1,
                borderRadius: index === 0 ? '4px' : '2px'
              }}
            />
          ))}
          <div
            className="absolute rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]"
            style={{
              left: food.x * cellSize + 2,
              top: food.y * cellSize + 2,
              width: cellSize - 4,
              height: cellSize - 4
            }}
          />
        </div>
      </div>

      <div className="text-center">
        {!isPlaying ? (
          <button
            onClick={startGame}
            className="w-full px-6 py-3.5 bg-[#804DF2] hover:bg-[#6c3bde] text-white font-bold rounded-2xl shadow-lg hover:shadow-[#804DF2]/20 transition-all text-base uppercase tracking-wider flex items-center justify-center gap-2"
          >
            {gameOver ? <><LuRotateCcw size={18} /> Play Again</> : <><LuPlay size={18} /> Start Game</>}
          </button>
        ) : (
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Controls</p>
            <div className="grid grid-cols-3 gap-2 max-w-[150px] mx-auto">
              <div></div>
              <button onClick={() => handlePadDirection({ x: 0, y: -1 })} className="bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-xl p-2.5 flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-sm border border-slate-200 dark:border-slate-600">
                <LuArrowUp size={18} />
              </button>
              <div></div>
              <button onClick={() => handlePadDirection({ x: -1, y: 0 })} className="bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-xl p-2.5 flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-sm border border-slate-200 dark:border-slate-600">
                <LuArrowLeft size={18} />
              </button>
              <button onClick={() => handlePadDirection({ x: 0, y: 1 })} className="bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-xl p-2.5 flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-sm border border-slate-200 dark:border-slate-600">
                <LuArrowDown size={18} />
              </button>
              <button onClick={() => handlePadDirection({ x: 1, y: 0 })} className="bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-xl p-2.5 flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-sm border border-slate-200 dark:border-slate-600">
                <LuArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniGames;
