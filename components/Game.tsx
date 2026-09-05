import React, { useState, useEffect, useRef } from 'react';
import { GameQuestion } from '../types';
import { Star, CheckCircle2, XCircle, Play, Timer, Flame, Trophy, RotateCcw, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GameProps {
  questions: GameQuestion[];
  onGameComplete?: (score: number, total: number) => void;
}

const QUESTION_TIME_LIMIT = 15;

const Game: React.FC<GameProps> = ({ questions, onGameComplete }) => {
  const [shuffledQuestions, setShuffledQuestions] = useState<GameQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [gameStatus, setGameStatus] = useState<'start' | 'playing' | 'end'>('start');
  const [lastResult, setLastResult] = useState<'correct' | 'incorrect' | 'timeout' | null>(null);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (gameStatus === 'start') {
      const shuffled = [...questions].sort(() => 0.5 - Math.random());
      setShuffledQuestions(shuffled);
    }
  }, [gameStatus, questions]);

  // Countdown timer logic
  useEffect(() => {
    if (gameStatus === 'playing' && lastResult === null) {
      if (timeLeft > 0) {
        timerRef.current = setTimeout(() => {
          setTimeLeft(t => t - 1);
        }, 1000);
      } else {
        handleTimeout();
      }
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [gameStatus, timeLeft, lastResult]);

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setCurrentIndex(0);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setGameStatus('playing');
    setLastResult(null);
  };

  const handleTimeout = () => {
    setStreak(0);
    setLastResult('timeout');
    advanceQuestion();
  };

  const handleAnswer = (option: string) => {
    if (lastResult !== null) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    const isCorrect = option === shuffledQuestions[currentIndex].answer;
    if (isCorrect) {
      const bonus = timeLeft > 10 ? 2 : 1;
      const points = 1 + bonus;
      setScore(s => s + points);
      setStreak(st => st + 1);
      setLastResult('correct');
    } else {
      setStreak(0);
      setLastResult('incorrect');
    }

    advanceQuestion();
  };

  const advanceQuestion = () => {
    setTimeout(() => {
      setLastResult(null);
      setTimeLeft(QUESTION_TIME_LIMIT);
      if (currentIndex < shuffledQuestions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setGameStatus('end');
        if (onGameComplete) {
          onGameComplete(score, shuffledQuestions.length);
        }
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#059669', '#34d399', '#f59e0b']
        });
      }
    }, 1200);
  };

  const renderStars = () => {
    const maxPossible = questions.length * 3;
    const percentage = (score / maxPossible) * 100;
    let stars = 1;
    if (percentage >= 70) stars = 3;
    else if (percentage >= 40) stars = 2;

    return (
      <div className="flex gap-2 justify-center text-amber-400 mb-6 scale-110">
        {[1, 2, 3].map(i => (
          <Star key={i} size={40} fill={i <= stars ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} className="drop-shadow-sm" />
        ))}
      </div>
    );
  };

  if (gameStatus === 'start') {
    return (
      <div className="flex flex-col items-center justify-center p-12 sm:p-16 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-emerald-100/80 dark:border-slate-700 text-center min-h-[420px] animate-in fade-in duration-300">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/40 rounded-3xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400 shadow-md shadow-emerald-500/10">
           <Zap size={38} className="text-emerald-600" />
        </div>
        <h3 className="text-3xl font-extrabold mb-3 text-slate-800 dark:text-slate-100">Speed Theory Challenge!</h3>
        <p className="mb-8 text-slate-500 dark:text-slate-400 max-w-md text-sm sm:text-base leading-relaxed">
          Race against the 15-second clock! Match theoretical constructs, theorist names, and core axioms under pressure.
        </p>

        <div className="flex items-center gap-6 mb-8 text-xs font-semibold text-slate-400">
          <span className="flex items-center gap-1.5"><Timer size={15} /> 15s Per Question</span>
          <span className="flex items-center gap-1.5"><Flame size={15} className="text-amber-500" /> Streak Multipliers</span>
          <span className="flex items-center gap-1.5"><Trophy size={15} className="text-emerald-600" /> Earn Badges</span>
        </div>

        <button 
          onClick={startGame}
          className="px-10 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/30 transition-all hover:scale-105 flex items-center gap-2"
        >
          <Play size={18} /> Launch Challenge
        </button>
      </div>
    );
  }

  if (gameStatus === 'end') {
    return (
      <div className="flex flex-col items-center justify-center p-12 sm:p-16 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-emerald-100/80 dark:border-slate-700 text-center min-h-[420px] animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/30 text-amber-600 flex items-center justify-center mb-4">
          <Trophy size={32} />
        </div>
        <h3 className="text-3xl font-extrabold mb-4 text-emerald-800 dark:text-emerald-300">Speed Round Concluded!</h3>
        {renderStars()}
        <p className="text-xl mb-8 text-slate-700 dark:text-slate-200">
          Final Score: <span className="font-extrabold text-emerald-600 text-3xl">{score}</span> Points
        </p>
        <button 
          onClick={startGame}
          className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 hover:scale-105"
        >
          <RotateCcw size={16} /> Play Again
        </button>
      </div>
    );
  }

  const currentQ = shuffledQuestions[currentIndex] || shuffledQuestions[0];

  return (
    <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 animate-in fade-in duration-300">
      {/* Top Bar: Progress, Timer, Streak */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Question {currentIndex + 1} / {shuffledQuestions.length}
        </span>

        {/* Timer Pill */}
        <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold text-xs ${
          timeLeft <= 5 
            ? 'bg-rose-100 text-rose-700 animate-pulse' 
            : 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300'
        }`}>
          <Timer size={14} />
          <span>{timeLeft}s</span>
        </div>

        {/* Streak & Score */}
        <div className="flex items-center gap-2">
          {streak > 1 && (
            <span className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 rounded-full text-xs font-bold">
              <Flame size={13} className="text-amber-500" /> {streak}x Streak!
            </span>
          )}
          <span className="text-xs font-bold bg-emerald-50 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 px-3 py-1.5 rounded-xl border border-emerald-200/60 dark:border-emerald-800">
            Score: {score}
          </span>
        </div>
      </div>

      {/* Timer Bar */}
      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-8">
        <div 
          className={`h-full transition-all duration-1000 rounded-full ${
            timeLeft <= 5 ? 'bg-rose-500' : 'bg-emerald-500'
          }`}
          style={{ width: `${(timeLeft / QUESTION_TIME_LIMIT) * 100}%` }}
        />
      </div>

      <h3 className="text-lg sm:text-xl font-bold mb-8 text-slate-900 dark:text-slate-100 leading-relaxed min-h-[3.5rem]">
        {currentQ?.question}
      </h3>

      <div className="grid gap-3 sm:grid-cols-2">
        {currentQ?.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
            disabled={lastResult !== null}
            className={`p-4 rounded-2xl text-left transition-all font-semibold text-sm border ${
              lastResult === null 
                ? 'bg-slate-50 dark:bg-slate-900/40 hover:bg-emerald-50/50 dark:hover:bg-slate-700/60 text-slate-700 dark:text-slate-200 border-slate-200/80 dark:border-slate-700 hover:border-emerald-400' 
                : option === currentQ.answer 
                  ? 'bg-emerald-100 text-emerald-950 dark:bg-emerald-900/40 dark:text-emerald-100 ring-2 ring-emerald-500 border-emerald-500'
                  : 'bg-slate-50 dark:bg-slate-900/30 text-slate-400 opacity-50 border-slate-200 dark:border-slate-800'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Result Popups */}
      <div className={`mt-6 h-10 flex items-center justify-center transition-all duration-300 transform ${lastResult ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        {lastResult === 'correct' && (
          <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-bold text-sm bg-emerald-50 dark:bg-emerald-950/40 px-5 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="mr-1.5" size={18} /> Quick & Accurate! (+Points)
          </span>
        )}
        {lastResult === 'incorrect' && (
          <span className="flex items-center text-rose-500 dark:text-rose-400 font-bold text-sm bg-rose-50 dark:bg-rose-950/40 px-5 py-1.5 rounded-full border border-rose-200 dark:border-rose-800">
            <XCircle className="mr-1.5" size={18} /> Incorrect! Keep Going!
          </span>
        )}
        {lastResult === 'timeout' && (
          <span className="flex items-center text-amber-600 dark:text-amber-400 font-bold text-sm bg-amber-50 dark:bg-amber-950/40 px-5 py-1.5 rounded-full border border-amber-200 dark:border-amber-800">
            <Timer className="mr-1.5" size={18} /> Time Expired!
          </span>
        )}
      </div>
    </div>
  );
};

export default Game;
