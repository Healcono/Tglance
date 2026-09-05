import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, AlertCircle, RefreshCw, Award, BookOpen, Clock, Filter } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizProps {
  questions: QuizQuestion[];
  onQuizComplete?: (score: number, total: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onQuizComplete }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userAnswers, setUserAnswers] = useState<Record<string, string | boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const categories = ['all', 'individual', 'interpersonal', 'community', 'planning', 'economics'];

  const filteredQuestions = questions.filter(q => 
    selectedCategory === 'all' || q.category === selectedCategory
  );

  const handleAnswerChange = (qId: string, value: string | boolean) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    filteredQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.answer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setIsSubmitted(true);

    if (onQuizComplete) {
      onQuizComplete(calculatedScore, filteredQuestions.length);
    }

    if (calculatedScore / filteredQuestions.length >= 0.8) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#059669', '#34d399', '#14b8a6']
      });
    }
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  const answeredCount = filteredQuestions.filter(q => userAnswers[q.id] !== undefined).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Quiz Header & Category Filters */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-emerald-100/80 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
            Self-Assessment Evaluation
          </span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Academic Mastery Quiz
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Answer the questions to assess your understanding of behavior change constructs.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => {
                setSelectedCategory(c);
                handleReset();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                selectedCategory === c
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {c === 'all' ? 'All Questions' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((q, index) => {
          const userAnswer = userAnswers[q.id];
          const isCorrect = userAnswer === q.answer;
          const hasAnswered = userAnswer !== undefined;

          return (
            <div 
              key={q.id} 
              className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 transition-all hover:border-emerald-200 dark:hover:border-emerald-800"
            >
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full uppercase tracking-wider">
                  Question {index + 1} of {filteredQuestions.length} • {q.category}
                </span>
                {q.bookReference && (
                  <span className="text-[11px] text-slate-400 font-medium hidden sm:inline flex items-center gap-1">
                    <BookOpen size={12} /> {q.bookReference}
                  </span>
                )}
              </div>

              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mb-6 leading-relaxed">
                {q.question}
              </h4>

              {q.type === 'identifyFigure' && q.figureUrl && (
                <img src={q.figureUrl} alt="Quiz diagram" className="mb-6 rounded-2xl max-h-60 object-contain mx-auto shadow-sm border border-slate-200 dark:border-slate-700" />
              )}

              {/* Options */}
              <div className="space-y-3">
                {q.type === 'truefalse' ? (
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[true, false].map((val) => {
                      const selected = userAnswer === val;
                      return (
                        <label 
                          key={String(val)} 
                          className={`flex items-center p-4 rounded-2xl border transition-all cursor-pointer ${
                            selected
                              ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500 shadow-sm'
                              : 'border-slate-200/80 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                          } ${isSubmitted ? 'cursor-default' : ''}`}
                        >
                          <input 
                            type="radio" 
                            name={`question-${q.id}`} 
                            checked={selected}
                            onChange={() => handleAnswerChange(q.id, val)}
                            disabled={isSubmitted}
                            className="hidden"
                          />
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 shrink-0 ${selected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 dark:border-slate-600'}`}>
                            {selected && <CheckCircle2 size={12} />}
                          </div>
                          <span className={`font-semibold text-sm ${selected ? 'text-emerald-900 dark:text-emerald-200' : 'text-slate-700 dark:text-slate-300'}`}>
                            {val ? 'True' : 'False'}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {q.options?.map((option) => {
                      const selected = userAnswer === option;
                      return (
                        <label 
                          key={option} 
                          className={`flex items-center p-4 rounded-2xl border transition-all cursor-pointer ${
                            selected
                              ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500 shadow-sm'
                              : 'border-slate-200/80 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                          } ${isSubmitted ? 'cursor-default' : ''}`}
                        >
                          <input 
                            type="radio" 
                            name={`question-${q.id}`} 
                            value={option}
                            checked={selected}
                            onChange={() => handleAnswerChange(q.id, option)}
                            disabled={isSubmitted}
                            className="hidden"
                          />
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 shrink-0 ${selected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 dark:border-slate-600'}`}>
                            {selected && <CheckCircle2 size={12} />}
                          </div>
                          <span className={`font-medium text-sm leading-relaxed ${selected ? 'text-emerald-900 dark:text-emerald-200' : 'text-slate-700 dark:text-slate-300'}`}>
                            {option}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Feedback after Submission */}
              {isSubmitted && (
                <div className={`mt-6 p-5 rounded-2xl border-l-4 animate-in fade-in duration-300 ${
                  isCorrect 
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200' 
                    : hasAnswered
                      ? 'bg-rose-50 border-rose-500 text-rose-900 dark:bg-rose-950/30 dark:text-rose-200'
                      : 'bg-amber-50 border-amber-500 text-amber-900 dark:bg-amber-950/30 dark:text-amber-200'
                }`}>
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle2 size={22} className="mt-0.5 text-emerald-600 shrink-0" />
                    ) : hasAnswered ? (
                      <XCircle size={22} className="mt-0.5 text-rose-600 shrink-0" />
                    ) : (
                      <AlertCircle size={22} className="mt-0.5 text-amber-600 shrink-0" />
                    )}
                    <div>
                      <p className="font-bold text-sm sm:text-base mb-1">
                        {isCorrect ? 'Correct Analysis!' : hasAnswered ? 'Incorrect Answer' : 'Question Skipped'}
                      </p>
                      {!isCorrect && (
                        <p className="text-xs mb-1.5 font-semibold">
                          Correct Answer: <span className="underline">{String(q.answer)}</span>
                        </p>
                      )}
                      <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                        {q.feedback}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Action Bar */}
      <div className="sticky bottom-4 z-40 p-5 rounded-2xl bg-white/95 dark:bg-slate-800/95 backdrop-blur-md shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          {!isSubmitted ? (
            <span>Answered <strong>{answeredCount}</strong> of <strong>{filteredQuestions.length}</strong> questions</span>
          ) : (
            <span className="text-base font-bold text-slate-900 dark:text-white">
              Score: <strong className="text-emerald-600 dark:text-emerald-400 text-xl">{score}</strong> / {filteredQuestions.length} ({Math.round((score / filteredQuestions.length) * 100)}%)
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={answeredCount === 0}
              className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm shadow-md transition-all hover:scale-105"
            >
              Submit Evaluation
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-8 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={15} /> Retake Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
