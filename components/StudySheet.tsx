import React, { useState } from 'react';
import { COMPREHENSIVE_THEORIES } from '../constants';
import { Printer, BookOpen, CheckCircle, FileText, Sparkles, Filter } from 'lucide-react';

const HIGH_YIELD_FORMULAS = [
  {
    title: 'HBM Perceived Threat Formula',
    formula: 'Perceived Threat = Perceived Susceptibility × Perceived Severity',
    note: 'Multiplicative model (Lewis 1994): If either susceptibility or severity is zero, perceived threat is zero.'
  },
  {
    title: 'TTM Strong Principle of Progress',
    formula: 'PC → Action ≈ +1.00 SD (↑ Pros)',
    note: 'Progress from Precontemplation to Action requires a 1 Standard Deviation (~15 points) increase in benefits (Hall & Rossi 2008).'
  },
  {
    title: 'TTM Weak Principle of Progress',
    formula: 'PC → Action ≈ -0.50 SD (↓ Cons)',
    note: 'Pros of changing must increase about twice as much as Cons decrease for a person to move across stages.'
  },
  {
    title: 'Theory of Planned Behavior (TPB) Expectancy Equation',
    formula: 'Attitude = Σ (Behavioral Belief_i × Outcome Evaluation_i)',
    note: 'Multiplied on bipolar (-3 to +3) scales to capture the positive contribution of avoiding negative outcomes.'
  },
  {
    title: 'Population Impact Metric',
    formula: 'Impact = Participation Rate (%) × Efficacy / Action Rate (%)',
    note: 'A program with 25% efficacy and 60% participation achieves 15% population impact (10x greater than 30% efficacy with 5% reach).'
  },
  {
    title: 'Social Support Longevity Effect Size',
    formula: 'Odds Ratio (OR) of Survival = 1.50 (50% increase in odds of survival)',
    note: 'Equivalent magnitude to smoking cessation (<15 cigs/day) and exceeding physical inactivity or obesity (Holt-Lunstad et al., 2010).'
  }
];

const StudySheet: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'individual', 'interpersonal', 'community', 'planning', 'economics'];

  const filteredTheories = COMPREHENSIVE_THEORIES.filter(t => 
    selectedCategory === 'all' || t.category === selectedCategory
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 shadow-sm border border-emerald-100/80 dark:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <FileText size={14} /> High-Yield Academic Review
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
              Exam & Research Fast-Reference Sheet
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Core mathematical principles, construct definitions, and evidence summaries from Glanz 5th Edition.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Printer size={15} /> Print Study Guide
            </button>
          </div>
        </div>

        {/* High-Yield Formulas Section */}
        <div className="mb-10 p-6 rounded-2xl bg-gradient-to-br from-emerald-900 to-slate-900 text-white shadow-md">
          <h3 className="text-lg font-bold text-emerald-300 mb-4 flex items-center gap-2">
            <Sparkles size={18} /> High-Yield Mathematical & Empirical Principles
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HIGH_YIELD_FORMULAS.map((f, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/10 border border-white/10 backdrop-blur-md">
                <span className="block text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">
                  {f.title}
                </span>
                <p className="font-mono text-sm font-bold text-white bg-slate-950/60 p-2 rounded-lg my-2 border border-white/5">
                  {f.formula}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {f.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                selectedCategory === c
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {c === 'all' ? 'All Models' : c}
            </button>
          ))}
        </div>

        {/* Quick Review Cards */}
        <div className="space-y-6">
          {filteredTheories.map(t => (
            <div
              key={t.id}
              className="p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-700/60"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t.title}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 capitalize">
                    {t.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {t.originYear}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                <strong>Key Figures:</strong> {t.keyTheorists}
              </p>

              <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 mb-4">
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                  <strong>Core Premise:</strong> {t.corePremise}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 text-xs mb-4">
                <div className="p-3.5 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100/60 dark:border-emerald-900/30">
                  <strong className="block text-emerald-900 dark:text-emerald-300 font-bold mb-1">Key Constructs:</strong>
                  <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                    {t.constructs.map((c, idx) => (
                      <li key={idx}>
                        <span className="font-semibold">{c.name}:</span> {c.definition}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-teal-50/50 dark:bg-teal-950/20 rounded-xl border border-teal-100/60 dark:border-teal-900/30">
                  <strong className="block text-teal-900 dark:text-teal-300 font-bold mb-1">Empirical Evidence & Applications:</strong>
                  <p className="text-slate-700 dark:text-slate-300 mb-2 leading-relaxed">{t.empiricalSupport}</p>
                  <div className="pt-2 border-t border-teal-100/60 dark:border-teal-900/30">
                    <strong className="block text-slate-700 dark:text-slate-200 mb-1">Classic Benchmark Cases:</strong>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-600 dark:text-slate-400">
                      {t.classicApplications.map((app, aIdx) => (
                        <li key={aIdx}>{app}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudySheet;
