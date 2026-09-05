import React, { useState } from 'react';
import { TheoryItem } from '../types';
import { 
  CheckCircle2, Circle, ArrowLeft, ArrowRight, BookOpen, 
  HelpCircle, Target, Award, Sparkles, ChevronDown, ChevronUp,
  AlertTriangle, Lightbulb, Bookmark, Layers, Check, Share2, 
  Eye, RefreshCw, Zap, Clock, ShieldCheck, FileText, Compass
} from 'lucide-react';

interface TheoryDetailViewProps {
  theory: TheoryItem;
  allTheories: TheoryItem[];
  isReviewed: boolean;
  onToggleReviewed: (theoryId: string) => void;
  isBookmarked?: boolean;
  onToggleBookmark?: (theoryId: string) => void;
  onSelectTheory: (theoryId: string) => void;
  onNavigateToSection: (sectionId: any) => void;
}

// High-Yield Exam Callouts and Traps for each theory based on Glanz 5th Ed.
const EXAM_TIPS: Record<string, {
  whyTested: string;
  commonTraps: string[];
  formulaOrRule?: string;
  questionArchetype: string;
}> = {
  hbm: {
    whyTested: "The Health Belief Model is the most frequently tested intrapersonal theory on public health and CHES/CPH exams because of its clear cognitive value-expectancy structure.",
    commonTraps: [
      "Perceived Barriers is empirically the SINGLE STRONGEST predictor across meta-analyses (Janz & Becker, Carpenter 2010), not Perceived Severity or Susceptibility.",
      "Self-efficacy was NOT in the original 1950s model—it was formally added in 1988 by Rosenstock, Strecher, & Becker for complex lifestyle behaviors.",
      "Perceived Threat is a composite formed by multiplying or combining Perceived Susceptibility and Perceived Severity."
    ],
    formulaOrRule: "Perceived Threat = Perceived Susceptibility + Perceived Severity | Likelihood of Action = Perceived Benefits - Perceived Barriers + (Self-Efficacy & Cues)",
    questionArchetype: "Scenario giving a patient who knows cancer is deadly (High Severity) but believes they are young and immune (Low Susceptibility) and complains about exam cost/pain (High Barriers)."
  },
  tpb_ibm: {
    whyTested: "Tests understanding of deliberative, rational decision-making and how attitudes, norms, and agency combine to form behavioral intention.",
    commonTraps: [
      "Injunctive Norm (what others think I should do + motivation to comply) vs. Descriptive Norm (what others actually do).",
      "Experiential Attitude (emotional/affective feeling) vs. Instrumental Attitude (cognitive evaluation of outcome benefits).",
      "IBM distinguishes between factors shaping Intention vs direct moderators of behavior (Knowledge/Skills, Salience, Environmental Constraints, Habit)."
    ],
    formulaOrRule: "Intention = w1(Attitude) + w2(Perceived Norm) + w3(Personal Agency) | Behavior = Intention (moderated by Skills, Salience, Environment, Habit)",
    questionArchetype: "Questions testing which construct to target when a group has positive attitudes toward exercise but their friends mock them (target Perceived Norms)."
  },
  ttm: {
    whyTested: "TTM is heavily tested for its stage-matching logic and the empirical Strong and Weak principles of progress.",
    commonTraps: [
      "Precontemplation (no intent within 6 months) vs Contemplation (intent within 6 months) vs Preparation (intent within 30 days + past-year action attempt).",
      "Consciousness Raising and Dramatic Relief are EXPERIENTIAL processes for early stages; Stimulus Control and Reinforcement are BEHAVIORAL processes for Action/Maintenance.",
      "The Strong Principle: Pros of changing increase ~1.0 Standard Deviation from PC to Action. The Weak Principle: Cons decrease ~0.5 Standard Deviation from PC to Action."
    ],
    formulaOrRule: "Strong Principle: Δ Pros ≈ +1.0 SD (PC → Action) | Weak Principle: Δ Cons ≈ -0.5 SD (PC → Action)",
    questionArchetype: "Identifying the correct stage of a client who joined a gym last week (Preparation/Action) or targeting stage-matched processes (e.g., using experiential processes for contemplators)."
  },
  sct: {
    whyTested: "Tests triadic reciprocal determinism, self-efficacy sources, and observational learning in multi-level school and community interventions.",
    commonTraps: [
      "Reciprocal Determinism is TRIADIC (Person/Cognition ↔ Environment ↔ Behavior)—all three mutually cause each other.",
      "Four sources of Self-Efficacy ranked by strength: 1. Mastery Experiences (strongest), 2. Vicarious Modeling, 3. Verbal Persuasion, 4. Physiological/Emotional State management.",
      "Collective Efficacy is distinct from individual self-efficacy—it is the group's shared belief in concerted action."
    ],
    formulaOrRule: "Behavior ⇄ Personal Factors (Cognition/Affect) ⇄ Environmental Contexts",
    questionArchetype: "Selecting how to design a school nutrition program using CATCH model (peer modeling + cafeteria food change + classroom skill mastery)."
  },
  social_support_networks: {
    whyTested: "Tests sociometric network properties (degree centrality, homophily, bridging) and distinctions between functional types of support.",
    commonTraps: [
      "Perceived Support (feeling loved/supported) consistently predicts better health, while Received Support can sometimes cause psychological reactance or stress if controlling.",
      "Social Network Analysis: 'Betweenness Centrality' identifies bridges across structural holes; 'Degree Centrality' identifies popular opinion leaders.",
      "Holt-Lunstad 2010 meta-analysis: social relationships confer a 50% increase in survival odds (comparable to quitting smoking)."
    ],
    formulaOrRule: "Odds Ratio of Survival for High Social Integration ≈ 1.50 (Holt-Lunstad et al., 2010)",
    questionArchetype: "Differentiating Emotional support (empathy) from Instrumental/Tangible support (giving a ride or loan) and Informational support (giving advice)."
  },
  stress_coping: {
    whyTested: "Tests cognitive appraisal theory and matching problem-focused vs emotion-focused vs meaning-based coping to stressor controllability.",
    commonTraps: [
      "Primary Appraisal = 'Am I in trouble or being challenged?' (Threat vs Harm vs Challenge).",
      "Secondary Appraisal = 'What can I do about it?' (Coping resources and perceived control).",
      "Problem-focused coping is effective for CONTROLLABLE stressors; Emotion-focused and meaning-based coping are adaptive for UNCONTROLLABLE stressors."
    ],
    formulaOrRule: "Stress Reaction = Perceived Demands / (Perceived Coping Resources × Perceived Control)",
    questionArchetype: "Scenario of a newly diagnosed oncology patient: identifying whether joining a support group is emotion-focused, problem-focused, or meaning-based coping."
  },
  interpersonal_communication: {
    whyTested: "Tests direct vs indirect pathways linking doctor-patient communication functions to intermediate self-management and distal clinical outcomes.",
    commonTraps: [
      "Direct pathway (e.g. physician explains medication regimen clearly → patient understands → takes pill).",
      "Indirect pathway (e.g. physician builds therapeutic alliance → patient feels validated → increased trust and adherence → reduced HbA1c).",
      "Six core communication functions: healing relationship, emotion validation, info exchange, shared decision-making, enabling self-care, uncertainty management."
    ],
    questionArchetype: "Classifying a doctor's use of open-ended questions and reflective listening into relational vs task-driven functions."
  },
  ecological_models: {
    whyTested: "Core meta-framework of public health explaining why individual education fails if the built environment and policies contradict healthy behavior.",
    commonTraps: [
      "Five levels: Intrapersonal → Interpersonal → Organizational/Institutional → Community → Public Policy.",
      "Principle of Behavior-Specificity: ecological models must be tailored to the exact behavior (e.g., walking for transport vs walking for recreation).",
      "Multi-level interventions (education + bike paths + tax policy) always achieve higher and more sustainable impact than single-level interventions."
    ],
    formulaOrRule: "Multi-Level Impact: Intrapersonal + Interpersonal + Environment + Policy > Single-Level Interventions",
    questionArchetype: "Identifying the ecological level of a soda tax (Policy) vs a hospital cafeteria redesign (Institutional) vs walking groups (Interpersonal)."
  },
  community_engagement_cbpr: {
    whyTested: "Tests principles of participatory research, co-learning, and Rothman's three models of community organization.",
    commonTraps: [
      "CBPR is a research PARADIGM/ORIENTATION, not a single qualitative method.",
      "Rothman's Typology: 1. Locality/Capacity Development (consensus, self-help), 2. Social Planning (data-driven policy by experts), 3. Social Action/Advocacy (confrontation to shift power).",
      "Freire's Critical Consciousness involves iterative Praxis (Reflection ↔ Action) and problem-posing popular education."
    ],
    questionArchetype: "Choosing between locality development vs social action when a disenfranchised neighborhood faces an illegal toxic waste facility."
  },
  diffusion_cfir: {
    whyTested: "High exam frequency for Rogers innovation characteristics, adopter categories, and CFIR implementation science domains.",
    commonTraps: [
      "Five Innovation Attributes: Relative Advantage, Compatibility, Simplicity (Complexity), Trialability, Observability.",
      "Adopter distribution S-Curve: Innovators (2.5%), Early Adopters (13.5% - Opinion leaders), Early Majority (34%), Late Majority (34%), Laggards (16%).",
      "CFIR 5 Domains: 1. Intervention Characteristics, 2. Outer Setting, 3. Inner Setting, 4. Individual Characteristics, 5. Implementation Process."
    ],
    formulaOrRule: "Adopter S-Curve: Innovators (2.5%) → Early Adopters (13.5%) → Early Maj (34%) → Late Maj (34%) → Laggards (16%)",
    questionArchetype: "A clinic tries a new electronic record; staff want to test it on 5 patients first. Which Rogers attribute is this? (Trialability)."
  },
  precede_proceed_im: {
    whyTested: "The gold standard planning model tested in every major public health and health education board certification exam.",
    commonTraps: [
      "Educational & Ecological Assessment (Phase 3) constructs: 1. Predisposing (knowledge, attitudes, values), 2. Enabling (skills, access, resources, policy), 3. Reinforcing (feedback, peer approval, rewards).",
      "PRECEDE works BACKWARD from Social/Quality of Life (Phase 1) to Epidemiological/Behavioral (Phase 2) to Educational (Phase 3).",
      "Intervention Mapping Step 2 creates Matrices of Change Objectives crossing Performance Objectives with Determinants."
    ],
    formulaOrRule: "PRECEDE (Phases 1-4: Diagnostic Assessment) → PROCEED (Phases 5-8: Implementation & Evaluation)",
    questionArchetype: "Classifying a free bus pass to a clinic as an Enabling factor, a doctor's praise as a Reinforcing factor, and fear of cancer as a Predisposing factor."
  },
  behavioral_economics: {
    whyTested: "Modern additions to health behavior testing heuristics, loss aversion, choice architecture, and financial deposit contracts.",
    commonTraps: [
      "Loss Aversion: Losses are felt 1.5x to 2.5x more intensely than equivalent gains (Kahneman & Tversky Prospect Theory).",
      "Present Bias / Hyperbolic Discounting: Overweighting immediate gratification over distant health benefits.",
      "Defaults / Status Quo Bias: Opt-out programs achieve dramatically higher uptake than opt-in programs without restricting freedom (Nudge)."
    ],
    formulaOrRule: "Loss Aversion Ratio ≈ 2.0 (Losses loom twice as large as gains) | Value(x) is S-shaped, concave for gains, convex for losses",
    questionArchetype: "Designing a smoking cessation incentive where participants deposit $100 of their own money refunded only upon passing cotinine tests (Deposit Contract leveraging Loss Aversion)."
  },
  social_marketing: {
    whyTested: "Tests the 4 Ps marketing mix, voluntary value exchange, and psychographic audience segmentation in health campaigns.",
    commonTraps: [
      "Product in health promotion is NOT just a physical item—it is the core bundle of benefits and experiential value of the behavior.",
      "Price includes psychological, social, time, and physical effort costs, not just monetary fees.",
      "Place refers to convenient access channels where the behavior is practiced or materials obtained.",
      "Promotion is the persuasive communication strategy tailored to segmented sub-audiences."
    ],
    formulaOrRule: "Marketing Mix = Product (Core Benefit) + Price (Total Cost) + Place (Access) + Promotion (Channel/Message)",
    questionArchetype: "An adolescent condom campaign sets up discreet dispensers in clubs (Place) and highlights peer coolness (Product/Promotion)."
  }
};

export const TheoryDetailView: React.FC<TheoryDetailViewProps> = ({
  theory,
  allTheories,
  isReviewed,
  onToggleReviewed,
  isBookmarked = false,
  onToggleBookmark,
  onSelectTheory,
  onNavigateToSection
}) => {
  const [activeTab, setActiveTab] = useState<'constructs' | 'examTips' | 'applications' | 'cramCard'>('constructs');
  const [studyMode, setStudyMode] = useState<'detailed' | 'cram'>('detailed');
  const [expandedConstructIndex, setExpandedConstructIndex] = useState<number | null>(0);
  const [isCramCardFlipped, setIsCramCardFlipped] = useState(false);

  // Find index and next/prev theories for linear studying
  const currentIndex = allTheories.findIndex(t => t.id === theory.id);
  const prevTheory = currentIndex > 0 ? allTheories[currentIndex - 1] : null;
  const nextTheory = currentIndex < allTheories.length - 1 ? allTheories[currentIndex + 1] : null;

  const examInfo = EXAM_TIPS[theory.id] || {
    whyTested: "Fundamental behavioral paradigm in health promotion and intervention planning.",
    commonTraps: [
      "Ensure precise understanding of distinct theoretical constructs.",
      "Match intervention activities directly to underlying determinants."
    ],
    questionArchetype: "Application to population-level or clinical case scenarios."
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'individual': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'interpersonal': return 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200 dark:border-teal-800';
      case 'community': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800';
      case 'planning': return 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'economics': return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/60 shadow-xs relative overflow-hidden">
        
        {/* Progress & Category Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100 dark:border-slate-700/60">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getCategoryColor(theory.category)}`}>
              {theory.category} Level
            </span>
            {theory.originYear && (
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                <Clock size={12} className="inline mr-1" />
                {theory.originYear}
              </span>
            )}
            <span className="text-xs text-slate-400 font-medium">
              Theory {currentIndex + 1} of {allTheories.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Bookmark / Favorite Button */}
            <button
              onClick={() => onToggleBookmark?.(theory.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isBookmarked
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 hover:bg-amber-100 dark:hover:bg-amber-900/30'
              }`}
              title={isBookmarked ? 'Remove from Favorite Theories' : 'Save to Favorite Theories'}
              aria-label="Bookmark Theory"
            >
              <Bookmark size={14} className={isBookmarked ? 'fill-current' : ''} />
              <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>

            {/* Rapid Cram Mode Toggle */}
            <button
              onClick={() => setStudyMode(prev => prev === 'detailed' ? 'cram' : 'detailed')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                studyMode === 'cram' 
                  ? 'bg-emerald-700 text-white shadow-xs' 
                  : 'bg-slate-100 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
              title="Toggle Rapid Cramming Mode vs Deep Academic Mode"
            >
              <Zap size={14} className={studyMode === 'cram' ? 'fill-current' : ''} />
              <span>{studyMode === 'cram' ? 'Cram Mode (Active)' : 'Cram Mode'}</span>
            </button>

            {/* Mark as Reviewed Button */}
            <button
              onClick={() => onToggleReviewed(theory.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isReviewed
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
              }`}
            >
              {isReviewed ? <CheckCircle2 size={15} /> : <Circle size={15} />}
              <span>{isReviewed ? 'Reviewed' : 'Mark as Reviewed'}</span>
            </button>
          </div>
        </div>

        {/* Theory Title & Theorists */}
        <div className="max-w-3xl space-y-2">
          <div className="flex items-baseline gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              {theory.title}
            </h1>
          </div>
          
          {theory.keyTheorists && (
            <p className="text-xs sm:text-sm font-medium text-emerald-700 dark:text-emerald-400">
              <strong>Key Theorists:</strong> {theory.keyTheorists}
            </p>
          )}

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
            {theory.description}
          </p>
        </div>

        {/* One-Line Core Premise Callout */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/50 to-slate-50 dark:from-slate-900/80 dark:via-slate-800/80 dark:to-slate-900/80 border-l-4 border-emerald-500 dark:border-emerald-400">
          <div className="flex items-start gap-3">
            <Lightbulb size={20} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
                Core Theoretical Premise
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
                "{theory.corePremise}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CRAM MODE: High-Speed Summary View */}
      {studyMode === 'cram' && (
        <div className="bg-amber-50/80 dark:bg-amber-950/20 border-2 border-amber-300 dark:border-amber-700 rounded-3xl p-6 sm:p-8 space-y-6 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold text-lg">
              <Zap size={20} className="text-amber-600 fill-current" />
              <span>High-Yield Cram Card: {theory.shortName}</span>
            </div>
            <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100">
              Exam Focus
            </span>
          </div>

          {examInfo.formulaOrRule && (
            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-amber-200 dark:border-amber-800 font-mono text-xs text-amber-950 dark:text-amber-200">
              <strong className="block text-[10px] text-amber-700 uppercase font-sans mb-1 font-bold">Key Formula / Mathematical Rule:</strong>
              {examInfo.formulaOrRule}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-amber-100 dark:border-amber-800/60 space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                Essential Constructs ({theory.constructs.length})
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {theory.constructs.map((c, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span><strong>{c.name}:</strong> {c.definition.split('.')[0]}.</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-amber-100 dark:border-amber-800/60 space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-amber-800 dark:text-amber-300 block">
                Top Exam Pitfalls & Traps
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {examInfo.commonTraps.map((trap, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <AlertTriangle size={13} className="text-amber-600 shrink-0 mt-0.5" />
                    <span>{trap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                setActiveTab('cramCard');
                setStudyMode('detailed');
              }}
              className="text-xs font-bold text-amber-800 dark:text-amber-300 hover:underline flex items-center gap-1"
            >
              Open Interactive Flashcard Flip Mode <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Tab Navigation for Detailed Study */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200 dark:border-slate-700/80">
        {[
          { id: 'constructs', label: `Core Constructs (${theory.constructs.length})`, icon: <Layers size={16} /> },
          { id: 'examTips', label: 'Why It\'s Tested & Exam Traps', icon: <Target size={16} />, badge: 'High Yield' },
          { id: 'applications', label: 'Real-World Evidence & Classic Trials', icon: <BookOpen size={16} /> },
          { id: 'cramCard', label: 'Quick Self-Test Flashcard', icon: <Sparkles size={16} /> },
        ].map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 rounded-t-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all whitespace-nowrap border-b-2 ${
                active
                  ? 'border-emerald-600 text-emerald-800 dark:text-emerald-300 bg-white dark:bg-slate-800 shadow-xs'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 uppercase">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: CORE CONSTRUCTS & OPERATIONAL DEFINITIONS */}
      {activeTab === 'constructs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>Click any construct card to expand its survey measurement item and intervention strategy.</span>
            <span className="font-semibold">{theory.constructs.length} total constructs</span>
          </div>

          <div className="grid gap-3.5">
            {theory.constructs.map((construct, idx) => {
              const isExpanded = expandedConstructIndex === idx;
              return (
                <div
                  key={idx}
                  className={`bg-white dark:bg-slate-800/90 rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isExpanded 
                      ? 'border-emerald-400 dark:border-emerald-600 shadow-sm ring-1 ring-emerald-400/20' 
                      : 'border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-300'
                  }`}
                >
                  <button
                    onClick={() => setExpandedConstructIndex(isExpanded ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100">
                          {construct.name}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
                        {construct.definition}
                      </p>
                    </div>

                    <div className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-500 shrink-0">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>

                  {/* Expanded Measurement and Strategy Details */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-0 sm:px-6 sm:pb-6 pl-13 border-t border-slate-100 dark:border-slate-700/60 mt-1 pt-4 space-y-3 bg-slate-50/50 dark:bg-slate-900/30">
                      {construct.measurementExample && (
                        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700">
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            Survey Operationalization & Measurement Item
                          </span>
                          <p className="text-xs text-slate-700 dark:text-slate-200 font-mono italic">
                            {construct.measurementExample}
                          </p>
                        </div>
                      )}

                      {construct.interventionStrategy && (
                        <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/60">
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-1">
                            Recommended Intervention Strategy
                          </span>
                          <p className="text-xs text-emerald-900 dark:text-emerald-200 font-medium">
                            {construct.interventionStrategy}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick Matrix CTA */}
          <div className="mt-6 p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-emerald-900 dark:text-emerald-200">
              <Compass size={18} className="text-emerald-600 shrink-0" />
              <span>Want to see how <strong>{theory.shortName}</strong> constructs compare to other theories?</span>
            </div>
            <button
              onClick={() => onNavigateToSection('comparisonMatrix')}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs whitespace-nowrap transition-colors"
            >
              Open Construct Matrix
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: EXAM RELEVANCE, FORMULAS & TRAPS */}
      {activeTab === 'examTips' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/60 shadow-xs space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Target size={14} />
                Why This Theory is Tested
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Core Examination Rationale
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {examInfo.whyTested}
              </p>
            </div>

            {examInfo.formulaOrRule && (
              <div className="p-5 rounded-2xl bg-slate-900 text-emerald-300 font-mono text-xs sm:text-sm border border-slate-800 shadow-md">
                <span className="text-[10px] text-slate-400 font-sans uppercase font-bold tracking-wider block mb-1">
                  Axiomatic Principle & Mathematical Formulation
                </span>
                {examInfo.formulaOrRule}
              </div>
            )}

            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <AlertTriangle size={15} className="text-amber-500" />
                Critical Exam Traps & Common Points of Confusion
              </h4>
              <div className="grid gap-3">
                {examInfo.commonTraps.map((trap, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-amber-50/60 dark:bg-slate-900/50 border border-amber-200/70 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      !
                    </span>
                    <p className="leading-relaxed">{trap}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-700 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Typical Exam Scenario Archetype
              </span>
              <p className="text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 italic leading-relaxed">
                "{examInfo.questionArchetype}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: REAL-WORLD APPLICATIONS & EMPIRICAL EVIDENCE */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-700/60 shadow-xs space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block mb-1">
                Empirical Meta-Analytic Support
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Scientific Validation & Effect Sizes
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                {theory.empiricalSupport}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Seminal & Classic Field Trials
              </h4>
              <div className="grid gap-3">
                {theory.classicApplications.map((app, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-slate-900/30 border border-emerald-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-3">
                    <BookOpen size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed font-medium">{app}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Limitations Grid */}
            <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-slate-900/40 border border-emerald-100 dark:border-slate-800 space-y-2">
                <span className="font-bold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-300 block">
                  Theoretical Strengths
                </span>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  {theory.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <Check size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-slate-900/40 border border-rose-100 dark:border-slate-800 space-y-2">
                <span className="font-bold text-xs uppercase tracking-wider text-rose-800 dark:text-rose-300 block">
                  Methodological Limitations
                </span>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                  {theory.limitations.map((lim, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{lim}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: QUICK SELF-TEST FLASHCARD FLIP */}
      {activeTab === 'cramCard' && (
        <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-700/60 shadow-xs text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Rapid Retrieval Practice
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
              Test Yourself on {theory.shortName}
            </h3>
            <p className="text-xs text-slate-500">
              Can you recite the core premise and primary constructs before flipping the card?
            </p>
          </div>

          <div 
            onClick={() => setIsCramCardFlipped(!isCramCardFlipped)}
            className="w-full max-w-xl mx-auto min-h-[260px] p-8 rounded-3xl bg-gradient-to-br from-emerald-700 via-teal-800 to-slate-900 text-white cursor-pointer shadow-xl transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between text-left select-none relative"
          >
            <div className="flex items-center justify-between text-xs text-emerald-200">
              <span>{isCramCardFlipped ? 'BACK: RECALL SUMMARY' : 'FRONT: QUESTION / PROMPT'}</span>
              <span className="flex items-center gap-1 font-bold">
                <RefreshCw size={12} /> Click to Flip
              </span>
            </div>

            {!isCramCardFlipped ? (
              <div className="space-y-3 py-6">
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-300">
                  {theory.category} Level
                </span>
                <h4 className="text-2xl font-black">{theory.title}</h4>
                <p className="text-sm text-emerald-100/90">
                  What is the foundational premise, and what are the main constructs you must remember on an exam?
                </p>
              </div>
            ) : (
              <div className="space-y-3 py-4 text-xs sm:text-sm">
                <p className="font-bold text-emerald-200">
                  Core: "{theory.corePremise}"
                </p>
                <div className="pt-2 border-t border-white/20">
                  <span className="text-[10px] font-bold uppercase text-emerald-300 block mb-1">Key Constructs:</span>
                  <div className="flex flex-wrap gap-1">
                    {theory.constructs.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white/10 text-[11px]">
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="text-[11px] text-emerald-300/80 text-center font-medium">
              {isCramCardFlipped ? 'Tap to view question prompt again' : 'Tap to verify your recall'}
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Navigation Bar for Linear Exam Progression */}
      <div className="sticky bottom-4 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-lg max-w-4xl mx-auto flex items-center justify-between gap-3">
        {prevTheory ? (
          <button
            onClick={() => {
              onSelectTheory(prevTheory.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Previous:</span>
            <span className="font-bold">{prevTheory.shortName}</span>
          </button>
        ) : (
          <div className="text-xs text-slate-400 pl-2">First Theory</div>
        )}

        <div className="flex items-center gap-2">
          {/* Bookmark Button */}
          <button
            onClick={() => onToggleBookmark?.(theory.id)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isBookmarked 
                ? 'bg-amber-500 text-white' 
                : 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 hover:bg-amber-100'
            }`}
            title={isBookmarked ? 'Remove from Favorite Theories' : 'Save to Favorite Theories'}
          >
            <Bookmark size={14} className={isBookmarked ? 'fill-current' : ''} />
            <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          <button
            onClick={() => onToggleReviewed(theory.id)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              isReviewed 
                ? 'bg-emerald-600 text-white' 
                : 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-200'
            }`}
          >
            {isReviewed ? <CheckCircle2 size={15} /> : <Circle size={15} />}
            <span className="hidden sm:inline">{isReviewed ? 'Reviewed' : 'Mark Reviewed'}</span>
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-bold"
            title="Scroll to Top"
          >
            ↑ Top
          </button>
        </div>

        {nextTheory ? (
          <button
            onClick={() => {
              onSelectTheory(nextTheory.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-all hover:scale-105"
          >
            <span className="hidden sm:inline">Next:</span>
            <span className="font-bold">{nextTheory.shortName}</span>
            <ArrowRight size={14} />
          </button>
        ) : (
          <button
            onClick={() => onNavigateToSection('quiz')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-all hover:scale-105"
          >
            <span>Take Mastery Quiz</span>
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TheoryDetailView;
