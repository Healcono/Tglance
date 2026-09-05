import React, { useState } from 'react';
import { COMPREHENSIVE_THEORIES } from '../constants';
import { 
  Compass, ArrowRight, RotateCcw, CheckCircle2, 
  Sparkles, Layers, Lightbulb, Map, FileText, ChevronRight, BookOpen
} from 'lucide-react';

const QUESTIONS = [
  {
    id: 'level',
    title: '1. What is your primary unit of intervention?',
    description: 'Select the ecological level where your behavior change effort primarily operates.',
    options: [
      { value: 'individual', label: 'Individual (Intrapersonal)', desc: 'Focus on personal beliefs, risk perception, attitudes, readiness stage, or skills.' },
      { value: 'interpersonal', label: 'Interpersonal (Dyad / Social Network)', desc: 'Focus on family modeling, clinician-patient communication, peers, or coping partners.' },
      { value: 'organizational', label: 'Organizational & Community', desc: 'Focus on schools, workplaces, healthcare clinics, or community coalitions.' },
      { value: 'policy', label: 'Policy, Built Environment & Macro Systems', desc: 'Focus on laws, taxes, zoning, infrastructure, or mass media communications.' }
    ]
  },
  {
    id: 'behaviorType',
    title: '2. What is the nature of the target health behavior?',
    description: 'Different behavioral types are best served by distinct theoretical mechanisms.',
    options: [
      { value: 'screening', label: 'Periodic / One-Time Detection (e.g., Cancer Screening, Vaccination)', desc: 'Asymptomatic individuals requiring a decisive action or reminder cue.' },
      { value: 'habitual', label: 'Daily Habitual Practice (e.g., Diet, Physical Activity, Medication Refills)', desc: 'Requires repeated execution and long-term maintenance over months and years.' },
      { value: 'cessation', label: 'Addictive Habit Extinction (e.g., Smoking, Alcohol Cessation)', desc: 'Involves withdrawal, intense relapse temptations, and variable stages of readiness.' },
      { value: 'innovation', label: 'Adoption of a New Clinical or Community Practice / Technology', desc: 'Disseminating an evidence-based guideline, digital app, or clinical tool.' }
    ]
  },
  {
    id: 'barrier',
    title: '3. What is the primary barrier or cognitive bottleneck identified in your audience?',
    description: 'Select the primary factor that prevents the target audience from adopting the behavior.',
    options: [
      { value: 'threat_barrier', label: 'Underestimating Disease Threat & Overestimating Action Costs', desc: 'Patients do not feel at risk or perceive the screening/vaccine as painful or expensive.' },
      { value: 'normative_peer', label: 'Social & Peer Norm Pressure / Stigma', desc: 'Fear of peer disapproval, partner resistance, or social network stigma.' },
      { value: 'readiness_resistance', label: 'Low Motivation & Unreadiness for Immediate Action', desc: 'Majority of audience is unmotivated or demoralized by previous failed attempts.' },
      { value: 'present_bias', label: 'Present Bias & Short-Term Gratification Errors', desc: 'Future health benefits seem distant and uncertain; immediate effort feels burdensome.' },
      { value: 'structural_access', label: 'Environmental & Policy Constraints', desc: 'Lack of sidewalks, inaccessible healthy foods, or absence of institutional mandates.' }
    ]
  },
  {
    id: 'setting',
    title: '4. What is your primary delivery setting?',
    description: 'The physical or communication setting where messages and interventions are delivered.',
    options: [
      { value: 'clinical', label: 'Healthcare Systems / Medical Encounters', desc: 'Doctor-patient consultations, clinics, hospital discharge protocols.' },
      { value: 'school_worksite', label: 'Schools or Worksites', desc: 'Structured group curricula, cafeteria meal policies, physical education.' },
      { value: 'community_broad', label: 'Community Grassroots & Faith-based Coalitions', desc: 'Churches, neighborhood associations, participatory action research.' },
      { value: 'digital_mhealth', label: 'Digital, Mobile & Mass Media Channels', desc: 'SMS text tailoring, mobile apps, social media, radio/TV broadcasts.' }
    ]
  }
];

const TheoryDecisionMatrix: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleSelectOption = (questionId: string, optionValue: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionValue }));
  };

  const handleNext = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResult(false);
  };

  // Determine optimal theory recommendation based on decision logic
  const getRecommendation = () => {
    const { level, behaviorType, barrier, setting } = answers;

    let primaryTheoryId = 'hbm';
    let secondaryTheoryId = 'precede_proceed_im';
    let rationale = '';

    if (barrier === 'present_bias') {
      primaryTheoryId = 'behavioral_economics';
      secondaryTheoryId = 'sct';
      rationale = 'Behavioral economics specifically targets hyperbolic discounting, present bias, and status-quo inertia using asymmetric paternalism, lottery incentives, and default architecture.';
    } else if (barrier === 'readiness_resistance' || behaviorType === 'cessation') {
      primaryTheoryId = 'ttm';
      secondaryTheoryId = 'behavioral_economics';
      rationale = 'The Transtheoretical Model (Stages of Change) is uniquely engineered for populations with low readiness, matching consciousness raising to early stages and behavioral processes to action stages.';
    } else if (behaviorType === 'screening' || barrier === 'threat_barrier') {
      primaryTheoryId = 'hbm';
      secondaryTheoryId = 'tpb_ibm';
      rationale = 'The Health Belief Model is the gold standard for periodic prevention and screening behaviors, focusing on perceived susceptibility, severity, benefits, barriers, and cues to action.';
    } else if (barrier === 'normative_peer' || behaviorType === 'habitual') {
      if (level === 'interpersonal') {
        primaryTheoryId = 'sct';
        secondaryTheoryId = 'social_support_networks';
        rationale = 'Social Cognitive Theory addresses reciprocal determinism, role modeling, and self-efficacy, supported by Social Network Analysis to identify peer leaders.';
      } else {
        primaryTheoryId = 'tpb_ibm';
        secondaryTheoryId = 'social_marketing';
        rationale = 'The Integrated Behavioral Model (IBM) allows precise mapping of injunctive and descriptive norms with experiential and instrumental attitudes to drive behavioral intentions.';
      }
    } else if (behaviorType === 'innovation' || level === 'organizational') {
      primaryTheoryId = 'diffusion_cfir';
      secondaryTheoryId = 'precede_proceed_im';
      rationale = 'Diffusion of Innovations and the Consolidated Framework for Implementation Research (CFIR) provide the required institutional tools to analyze innovation attributes and organizational climate.';
    } else if (level === 'policy' || setting === 'community_broad') {
      primaryTheoryId = 'ecological_models';
      secondaryTheoryId = 'community_engagement_cbpr';
      rationale = 'Ecological Models and CBPR combine multi-level built environment changes and community empowerment to ensure sustainable population-wide impact.';
    }

    const primary = COMPREHENSIVE_THEORIES.find(t => t.id === primaryTheoryId) || COMPREHENSIVE_THEORIES[0];
    const secondary = COMPREHENSIVE_THEORIES.find(t => t.id === secondaryTheoryId) || COMPREHENSIVE_THEORIES[1];

    return { primary, secondary, rationale };
  };

  const currentQ = QUESTIONS[currentStep];
  const isSelected = !!answers[currentQ?.id];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 shadow-sm border border-emerald-100/80 dark:border-slate-700">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass size={14} /> Theory Decision Matrix Wizard
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
              Select the Best Behavioral Framework
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Answer 4 questions regarding your public health problem to receive an evidence-based theoretical match.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <RotateCcw size={14} /> Reset Wizard
          </button>
        </div>

        {/* Wizard Progress Indicator */}
        {!showResult && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <span>Step {currentStep + 1} of {QUESTIONS.length}</span>
              <span>{Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}% Completed</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 rounded-full"
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Step Content */}
        {!showResult ? (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                {currentQ.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {currentQ.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {currentQ.options.map((opt) => {
                const checked = answers[currentQ.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectOption(currentQ.id, opt.value)}
                    className={`p-5 rounded-2xl text-left transition-all border ${
                      checked
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                        : 'bg-slate-50/60 dark:bg-slate-900/30 border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-100/80 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <span className={`font-bold text-base ${checked ? 'text-emerald-900 dark:text-emerald-200' : 'text-slate-800 dark:text-slate-200'}`}>
                        {opt.label}
                      </span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${checked ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300 dark:border-slate-600'}`}>
                        {checked && <CheckCircle2 size={12} />}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {opt.desc}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-700/50">
              <button
                onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                disabled={currentStep === 0}
                className="px-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
              >
                Back
              </button>

              <button
                onClick={handleNext}
                disabled={!isSelected}
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 dark:disabled:bg-slate-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2"
              >
                {currentStep === QUESTIONS.length - 1 ? 'Generate Recommendations' : 'Next Question'}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ) : (
          /* Result Card */
          <div className="space-y-6">
            {(() => {
              const { primary, secondary, rationale } = getRecommendation();
              return (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40">
                    <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm mb-2">
                      <Sparkles size={18} /> Theoretical Assessment Rationale
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                      {rationale}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Primary Theory Match */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-500 shadow-md">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                          Primary Recommended Theory
                        </span>
                        <span className="text-xs text-slate-400">{primary.originYear}</span>
                      </div>
                      <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {primary.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                        Key Theorists: {primary.keyTheorists}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                        {primary.description}
                      </p>

                      <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Priority Constructs to Target:
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {primary.constructs.map((c, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-300 text-xs font-medium rounded-lg">
                              {c.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Secondary / Complementary Framework */}
                    <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
                          Complementary Planning Framework
                        </span>
                        <span className="text-xs text-slate-400">{secondary.originYear}</span>
                      </div>
                      <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {secondary.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                        Key Theorists: {secondary.keyTheorists}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                        {secondary.description}
                      </p>

                      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Recommended Planning Methods:
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {secondary.constructs.map((c, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700">
                              {c.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Implementation Guidelines Box */}
                  <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-md">
                    <h5 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <BookOpen size={16} /> Evidence-Based Implementation Roadmap
                    </h5>
                    <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
                      <li>Conduct qualitative open-ended elicitation interviews to identify population-specific beliefs.</li>
                      <li>Develop standardized 5- or 7-point bipolar survey measures for key constructs.</li>
                      <li>Perform regression/mediation modeling to isolate which specific beliefs predict behavioral intention.</li>
                      <li>Match theory-based change methods (modeling, guided practice, smart defaults) directly to change objectives.</li>
                    </ul>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default TheoryDecisionMatrix;
