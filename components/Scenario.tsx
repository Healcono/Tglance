import React, { useState } from 'react';
import { Scenario } from '../types';
import { 
  ArrowRight, CheckCircle2, AlertCircle, Sparkles, 
  BookOpen, Target, Users, RotateCcw 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScenarioProps {
  scenarios: Scenario[];
  completedScenarioIds?: string[];
  onCompleteScenario?: (scenarioId: string) => void;
}

const ScenarioChallenge: React.FC<ScenarioProps> = ({ 
  scenarios, 
  completedScenarioIds = [],
  onCompleteScenario 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentScenario = scenarios[currentIndex];
  if (!currentScenario) return null;

  const isCompleted = completedScenarioIds.includes(currentScenario.id);

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsSubmitted(true);

    if (selectedOption === currentScenario.answer) {
      if (onCompleteScenario) {
        onCompleteScenario(currentScenario.id);
      }
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.6 },
        colors: ['#10b981', '#059669', '#34d399', '#0d9488']
      });
    }
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
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Scenario Header Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-2">
          {scenarios.map((s, idx) => {
            const done = completedScenarioIds.includes(s.id);
            const active = idx === currentIndex;
            return (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setSelectedOption(null);
                  setIsSubmitted(false);
                }}
                className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                  active 
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-400 shadow-sm'
                    : done
                      ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {done ? '✓' : idx + 1}
              </button>
            );
          })}
        </div>

        <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
          Case {currentIndex + 1} of {scenarios.length}
        </span>
      </div>

      {/* Main Scenario Case Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 overflow-hidden">
        <div className="p-6 sm:p-8 bg-gradient-to-br from-emerald-50/70 via-teal-50/40 to-slate-50 dark:from-slate-800 dark:to-slate-900 border-b border-emerald-100 dark:border-slate-700">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
              Case Simulation #{currentIndex + 1}
            </span>
            {currentScenario.targetPopulation && (
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                <Users size={13} className="text-emerald-600" /> {currentScenario.targetPopulation}
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            {currentScenario.title || `Public Health Case Study ${currentIndex + 1}`}
          </h3>

          <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-emerald-100/80 dark:border-slate-700 shadow-xs">
            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-serif italic">
              "{currentScenario.scenario}"
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="font-bold mb-4 text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wide flex items-center gap-1.5">
            <Target size={16} className="text-emerald-600" />
            Select the most appropriate theoretical framework for this scenario:
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {currentScenario.options.map((option) => {
              const isSelected = selectedOption === option;
              const isAnswer = option === currentScenario.answer;

              let style = 'border-slate-200/80 dark:border-slate-700 hover:border-emerald-300 hover:bg-slate-50 dark:hover:bg-slate-700/50';

              if (isSubmitted) {
                if (isAnswer) {
                  style = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 ring-1 ring-emerald-500 text-emerald-900 dark:text-emerald-200';
                } else if (isSelected) {
                  style = 'border-rose-500 bg-rose-50/80 dark:bg-rose-950/40 ring-1 ring-rose-500 text-rose-900 dark:text-rose-200';
                } else {
                  style = 'border-slate-100 dark:border-slate-800 opacity-50';
                }
              } else if (isSelected) {
                style = 'border-emerald-500 bg-emerald-50/80 dark:bg-emerald-950/40 ring-1 ring-emerald-500 text-emerald-900 dark:text-emerald-200 shadow-sm';
              }

              return (
                <label 
                  key={option}
                  className={`flex items-center p-5 rounded-2xl border transition-all cursor-pointer ${style}`}
                >
                  <input
                    type="radio"
                    name="scenario-option"
                    value={option}
                    checked={isSelected}
                    onChange={() => !isSubmitted && setSelectedOption(option)}
                    disabled={isSubmitted}
                    className="hidden"
                  />
                  <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center shrink-0 ${
                    isSelected || (isSubmitted && isAnswer)
                      ? 'border-emerald-600 bg-emerald-600 text-white' 
                      : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {(isSelected || (isSubmitted && isAnswer)) && <CheckCircle2 size={12} />}
                  </div>
                  <span className="font-semibold text-sm leading-relaxed">{option}</span>
                </label>
              );
            })}
          </div>

          {/* Feedback & Next Button */}
          {isSubmitted ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-top-3 duration-300">
              <div className={`p-6 rounded-2xl border-l-4 ${
                isCorrect 
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-200' 
                  : 'bg-rose-50 border-rose-500 text-rose-950 dark:bg-rose-950/30 dark:text-rose-200'
              }`}>
                <div className="flex items-start gap-4">
                  {isCorrect ? (
                    <CheckCircle2 className="shrink-0 text-emerald-600 mt-0.5" size={24} />
                  ) : (
                    <AlertCircle className="shrink-0 text-rose-600 mt-0.5" size={24} />
                  )}
                  <div className="space-y-2">
                    <p className="font-bold text-base sm:text-lg">
                      {isCorrect ? 'Outstanding Theoretical Diagnosis!' : 'Alternative Theoretical Approach Required'}
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed opacity-95">
                      {currentScenario.feedback}
                    </p>
                    {currentScenario.optimalIntervention && (
                      <div className="mt-3 pt-3 border-t border-emerald-200/60 dark:border-emerald-800/40 text-xs">
                        <strong className="block text-emerald-800 dark:text-emerald-300 mb-0.5">Recommended Intervention Strategy:</strong>
                        <p>{currentScenario.optimalIntervention}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={handleNext}
                  className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-105"
                >
                  {currentIndex < scenarios.length - 1 ? 'Next Scenario' : 'Restart Case Simulations'} 
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-end">
              <button 
                onClick={handleSubmit}
                disabled={!selectedOption}
                className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 dark:disabled:bg-slate-700 text-white font-bold rounded-xl text-sm shadow-md transition-all hover:scale-105"
              >
                Evaluate Selection
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScenarioChallenge;
