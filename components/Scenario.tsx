import React, { useState } from 'react';
import { Scenario } from '../types';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

interface ScenarioProps {
  scenarios: Scenario[];
}

const ScenarioChallenge: React.FC<ScenarioProps> = ({ scenarios }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentScenario = scenarios[currentIndex];

  const handleSubmit = () => {
    if (selectedOption) setIsSubmitted(true);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); 
    }
  };

  const isCorrect = selectedOption === currentScenario.answer;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
      <div className="p-8 bg-teal-50 dark:bg-slate-800/80 border-b border-teal-100 dark:border-slate-700">
        <h3 className="text-xs font-bold tracking-widest text-teal-600 dark:text-teal-400 uppercase mb-3">Scenario {currentIndex + 1}</h3>
        <p className="text-xl text-slate-800 dark:text-slate-100 leading-relaxed font-serif">
          "{currentScenario.scenario}"
        </p>
      </div>

      <div className="p-8">
        <p className="font-semibold mb-6 text-slate-500 dark:text-slate-400 text-sm uppercase tracking-wide">
          Select the most appropriate theory:
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {currentScenario.options.map((option) => (
            <label 
              key={option}
              className={`flex items-center p-5 rounded-xl border cursor-pointer transition-all ${
                isSubmitted 
                  ? option === currentScenario.answer 
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                    : selectedOption === option 
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20'
                      : 'border-slate-100 dark:border-slate-700 opacity-50'
                  : selectedOption === option 
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 ring-1 ring-teal-500' 
                    : 'border-slate-100 dark:border-slate-700 hover:border-teal-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
              }`}
            >
              <input
                type="radio"
                name="scenario-option"
                value={option}
                checked={selectedOption === option}
                onChange={() => !isSubmitted && setSelectedOption(option)}
                disabled={isSubmitted}
                className="hidden"
              />
              <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${selectedOption === option ? 'border-teal-500' : 'border-slate-300'}`}>
                  {selectedOption === option && <div className="w-2 h-2 bg-teal-500 rounded-full"></div>}
              </div>
              <span className={`font-medium ${selectedOption === option ? 'text-teal-900 dark:text-teal-100' : 'text-slate-700 dark:text-slate-300'}`}>{option}</span>
            </label>
          ))}
        </div>

        {isSubmitted ? (
          <div className="animate-in fade-in slide-in-from-top-4 duration-300">
             <div className={`p-6 rounded-xl mb-6 border-l-4 ${isCorrect ? 'bg-emerald-50 border-emerald-500 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-100' : 'bg-rose-50 border-rose-500 text-rose-900 dark:bg-rose-900/20 dark:text-rose-100'}`}>
                <div className="flex items-start gap-4">
                  {isCorrect ? <CheckCircle className="shrink-0 text-emerald-600" size={24} /> : <AlertCircle className="shrink-0 text-rose-600" size={24} />}
                  <div>
                    <p className="font-bold text-lg mb-1">{isCorrect ? 'Correct Analysis' : 'Not Quite'}</p>
                    <p className="leading-relaxed opacity-90">{currentScenario.feedback}</p>
                  </div>
                </div>
             </div>
             <button 
                onClick={handleNext}
                className="w-full sm:w-auto px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-lg shadow-teal-500/30 transition-all flex items-center justify-center gap-2"
              >
                {currentIndex < scenarios.length - 1 ? 'Next Scenario' : 'Restart Scenarios'} <ArrowRight size={18} />
              </button>
          </div>
        ) : (
          <div className="flex justify-end">
            <button 
              onClick={handleSubmit}
              disabled={!selectedOption}
              className="w-full sm:w-auto px-8 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-md transition-all"
            >
              Check Answer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScenarioChallenge;