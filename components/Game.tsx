import React, { useState, useEffect } from 'react';
import { GameQuestion } from '../types';
import { Star, CheckCircle, XCircle, Play } from 'lucide-react';

interface GameProps {
  questions: GameQuestion[];
}

const Game: React.FC<GameProps> = ({ questions }) => {
  const [shuffledQuestions, setShuffledQuestions] = useState<GameQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState<'start' | 'playing' | 'end'>('start');
  const [lastResult, setLastResult] = useState<'correct' | 'incorrect' | null>(null);

  useEffect(() => {
    if (gameStatus === 'start') {
      const shuffled = [...questions].sort(() => 0.5 - Math.random());
      setShuffledQuestions(shuffled);
    }
  }, [gameStatus, questions]);

  const startGame = () => {
    setScore(0);
    setCurrentIndex(0);
    setGameStatus('playing');
    setLastResult(null);
  };

  const handleAnswer = (option: string) => {
    const isCorrect = option === shuffledQuestions[currentIndex].answer;
    if (isCorrect) setScore(s => s + 1);
    setLastResult(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      setLastResult(null);
      if (currentIndex < shuffledQuestions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setGameStatus('end');
      }
    }, 1500);
  };

  const renderStars = () => {
    const percentage = (score / questions.length) * 100;
    let stars = 0;
    if (percentage >= 80) stars = 3;
    else if (percentage >= 50) stars = 2;
    else if (percentage > 0) stars = 1;

    return (
      <div className="flex gap-2 justify-center text-yellow-400 mb-6 scale-110">
        {[1, 2, 3].map(i => (
          <Star key={i} size={40} fill={i <= stars ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} className="drop-shadow-sm" />
        ))}
      </div>
    );
  };

  if (gameStatus === 'start') {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center min-h-[400px]">
        <div className="w-20 h-20 bg-teal-50 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-6 text-teal-600 dark:text-teal-400">
           <Play size={40} fill="currentColor" />
        </div>
        <h3 className="text-3xl font-bold mb-4 text-slate-800 dark:text-slate-100">Theory Challenge!</h3>
        <p className="mb-10 text-slate-500 dark:text-slate-400 max-w-sm">Think fast! Test your knowledge of health theories against the clock.</p>
        <button 
          onClick={startGame}
          className="px-10 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-500/30 transition-all hover:scale-105"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (gameStatus === 'end') {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center min-h-[400px]">
        <h3 className="text-3xl font-bold mb-8 text-teal-700 dark:text-teal-400">Challenge Complete!</h3>
        {renderStars()}
        <p className="text-2xl mb-10 text-slate-700 dark:text-slate-200">
          You scored <span className="font-bold text-teal-600">{score}</span> out of {questions.length}
        </p>
        <button 
          onClick={() => setGameStatus('start')}
          className="px-8 py-3 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 text-white font-medium rounded-xl shadow-md transition-colors"
        >
          Play Again
        </button>
      </div>
    );
  }

  const currentQ = shuffledQuestions[currentIndex];

  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
      <div className="flex justify-between items-center mb-8">
        <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Question {currentIndex + 1} / {questions.length}</span>
        <span className="text-sm font-bold bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-full">Score: {score}</span>
      </div>

      <h3 className="text-2xl font-bold mb-10 text-slate-800 dark:text-slate-100 min-h-[4rem]">
        {currentQ.question}
      </h3>

      <div className="grid gap-4">
        {currentQ.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            disabled={lastResult !== null}
            className={`p-5 rounded-xl text-left transition-all font-medium ${
              lastResult === null 
                ? 'bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-transparent hover:border-teal-200' 
                : option === currentQ.answer 
                  ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100 ring-2 ring-emerald-500'
                  : 'bg-slate-50 dark:bg-slate-900/50 text-slate-400 opacity-50'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className={`mt-8 h-12 flex items-center justify-center transition-all duration-300 transform ${lastResult ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {lastResult === 'correct' && (
          <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-xl bg-emerald-50 dark:bg-emerald-900/20 px-6 py-2 rounded-full">
            <CheckCircle className="mr-2" size={24} /> Correct!
          </span>
        )}
        {lastResult === 'incorrect' && (
          <span className="flex items-center text-rose-500 dark:text-rose-400 font-bold text-xl bg-rose-50 dark:bg-rose-900/20 px-6 py-2 rounded-full">
            <XCircle className="mr-2" size={24} /> Incorrect!
          </span>
        )}
      </div>
    </div>
  );
};

export default Game;