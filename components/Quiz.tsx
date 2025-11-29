import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface QuizProps {
  questions: QuizQuestion[];
}

const Quiz: React.FC<QuizProps> = ({ questions }) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, string | boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (index: number, value: string | boolean) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [index]: value }));
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.answer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
  };

  return (
    <div className="space-y-6">
      {questions.map((q, index) => {
        const isCorrect = userAnswers[index] === q.answer;
        const hasAnswered = userAnswers[index] !== undefined;
        
        return (
          <div key={index} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-bold mb-6 text-slate-800 dark:text-slate-100">
              <span className="text-teal-500 mr-2">{index + 1}.</span> {q.question}
            </h3>
            
            {q.type === 'identifyFigure' && q.figureUrl && (
              <img src={q.figureUrl} alt="Quiz Figure" className="mb-6 rounded-xl max-h-60 object-contain mx-auto shadow-sm" />
            )}

            <div className="space-y-3">
              {q.type === 'truefalse' ? (
                <>
                  <label className={`flex items-center p-4 rounded-xl border transition-all cursor-pointer group ${
                    userAnswers[index] === true 
                      ? 'bg-teal-50 border-teal-300 dark:bg-teal-900/30 dark:border-teal-700 shadow-sm' 
                      : 'border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${userAnswers[index] === true ? 'border-teal-500 bg-teal-500' : 'border-slate-300 dark:border-slate-500'}`}>
                        {userAnswers[index] === true && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <input 
                      type="radio" 
                      name={`question-${index}`} 
                      checked={userAnswers[index] === true}
                      onChange={() => handleAnswerChange(index, true)}
                      disabled={isSubmitted}
                      className="hidden"
                    />
                    <span className={`ml-4 font-medium ${userAnswers[index] === true ? 'text-teal-800 dark:text-teal-200' : 'text-slate-600 dark:text-slate-300'}`}>True</span>
                  </label>
                  <label className={`flex items-center p-4 rounded-xl border transition-all cursor-pointer group ${
                    userAnswers[index] === false 
                      ? 'bg-teal-50 border-teal-300 dark:bg-teal-900/30 dark:border-teal-700 shadow-sm' 
                      : 'border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}>
                     <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${userAnswers[index] === false ? 'border-teal-500 bg-teal-500' : 'border-slate-300 dark:border-slate-500'}`}>
                        {userAnswers[index] === false && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <input 
                      type="radio" 
                      name={`question-${index}`} 
                      checked={userAnswers[index] === false}
                      onChange={() => handleAnswerChange(index, false)}
                      disabled={isSubmitted}
                      className="hidden"
                    />
                    <span className={`ml-4 font-medium ${userAnswers[index] === false ? 'text-teal-800 dark:text-teal-200' : 'text-slate-600 dark:text-slate-300'}`}>False</span>
                  </label>
                </>
              ) : (
                q.options?.map((option) => (
                  <label key={option} className={`flex items-center p-4 rounded-xl border transition-all cursor-pointer group ${
                    userAnswers[index] === option 
                      ? 'bg-teal-50 border-teal-300 dark:bg-teal-900/30 dark:border-teal-700 shadow-sm' 
                      : 'border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}>
                    <div className={`w-5 h-5 shrink-0 rounded-full border flex items-center justify-center transition-colors ${userAnswers[index] === option ? 'border-teal-500 bg-teal-500' : 'border-slate-300 dark:border-slate-500'}`}>
                        {userAnswers[index] === option && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <input 
                      type="radio" 
                      name={`question-${index}`} 
                      value={option}
                      checked={userAnswers[index] === option}
                      onChange={() => handleAnswerChange(index, option)}
                      disabled={isSubmitted}
                      className="hidden"
                    />
                    <span className={`ml-4 font-medium ${userAnswers[index] === option ? 'text-teal-800 dark:text-teal-200' : 'text-slate-600 dark:text-slate-300'}`}>{option}</span>
                  </label>
                ))
              )}
            </div>

            {isSubmitted && (
              <div className={`mt-6 p-5 rounded-xl border-l-4 ${
                isCorrect 
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200' 
                  : hasAnswered
                    ? 'bg-rose-50 border-rose-500 text-rose-800 dark:bg-rose-900/20 dark:text-rose-200'
                    : 'bg-amber-50 border-amber-500 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200'
              }`}>
                <div className="flex items-start gap-3">
                  {isCorrect ? <CheckCircle size={22} className="mt-0.5" /> : hasAnswered ? <XCircle size={22} className="mt-0.5" /> : <AlertCircle size={22} className="mt-0.5" />}
                  <div>
                    <p className="font-bold text-lg mb-1">
                      {isCorrect ? 'Correct!' : hasAnswered ? 'Incorrect.' : 'Not answered.'}
                    </p>
                    {!isCorrect && <p className="mb-2">The correct answer is: <strong>{q.answer.toString()}</strong></p>}
                    <p className="text-sm opacity-90 leading-relaxed">{q.feedback}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="sticky bottom-4 flex flex-col items-center justify-center p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 mt-8">
        {!isSubmitted ? (
          <button 
            onClick={handleSubmit}
            className="px-10 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-500/30 transition-all hover:-translate-y-1"
          >
            Submit Answers
          </button>
        ) : (
          <div className="text-center w-full">
            <p className="text-3xl font-bold mb-6 text-slate-800 dark:text-slate-200">
              Your Score: <span className="text-teal-600 dark:text-teal-400">{score}</span> / {questions.length}
            </p>
            <button 
              onClick={handleReset}
              className="px-8 py-3 bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-medium rounded-xl shadow-md transition-colors w-full sm:w-auto"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;