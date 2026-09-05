import React, { useState } from 'react';
import { Layers, Search, Filter, Check, ArrowRight, BookOpen } from 'lucide-react';

interface MatrixRow {
  construct: string;
  category: string;
  hbm: string;
  tpb_ibm: string;
  ttm: string;
  sct: string;
  ecological: string;
  behavioralEcon: string;
}

const COMPARISON_DATA: MatrixRow[] = [
  {
    construct: 'Self-Efficacy / Personal Agency',
    category: 'Agency & Control',
    hbm: 'Added in 1988: Confidence in performing the specific recommended action (e.g., getting a colonoscopy).',
    tpb_ibm: 'Personal Agency: Combines perceived control (external ease) and self-efficacy (confidence under challenges).',
    ttm: 'Situation-specific confidence to resist relapse across temptations (negative affect, social events, cravings).',
    sct: 'Core seminal construct: Enhanced via mastery experiences, vicarious modeling, social persuasion, and arousal management.',
    ecological: 'Intrapersonal determinant that interacts with environmental features (e.g., sidewalks enable walking efficacy).',
    behavioralEcon: 'Often distorted by overoptimism (false hope syndrome) regarding future self-control and willpower.'
  },
  {
    construct: 'Social Norms & Social Influence',
    category: 'Social Influence',
    hbm: 'Indirectly addressed via external Cues to Action (physician recommendation, peer encouragement).',
    tpb_ibm: 'Injunctive Norms (what others approve) & Descriptive Norms (what others do), weighted by motivation to comply.',
    ttm: 'Social Liberation (environmental opportunities) & Helping Relationships (supportive social ties).',
    sct: 'Normative beliefs & Observational Learning: imitation of desirable peer role models and perceived social consequences.',
    ecological: 'Interpersonal, organizational, and cultural norms across multiple community systems.',
    behavioralEcon: 'Social proof and peer competition (e.g. team incentives, comparing household energy consumption).'
  },
  {
    construct: 'Perceived Barriers & Costs',
    category: 'Barriers & Friction',
    hbm: 'Perceived Barriers: Tangible (cost, travel) and psychological (pain, shame). Empirically strongest single predictor.',
    tpb_ibm: 'Control Beliefs & Environmental Constraints: Factors making behavioral performance difficult or impossible.',
    ttm: 'Cons of Changing: Weighing disadvantages in Decisional Balance; must decrease ~0.5 SD from PC to Action.',
    sct: 'Cognitive & Environmental Impediments: Physical infrastructure gaps, crime, lack of supportive resources.',
    ecological: 'Physical environment barriers: Lack of bike paths, unsafe streets, high-density fast food outlets.',
    behavioralEcon: 'Friction and immediate costs: Present bias causes people to overweight immediate friction and procrastinate.'
  },
  {
    construct: 'Outcome Expectations & Benefits',
    category: 'Expectancy & Value',
    hbm: 'Perceived Benefits: Belief in the efficacy of the health action to reduce disease threat or severity.',
    tpb_ibm: 'Behavioral Beliefs & Instrumental Attitudes: Expected positive and negative attributes of performing the behavior.',
    ttm: 'Pros of Changing: Advantages of behavior; must increase ~1.0 SD from Precontemplation to Action.',
    sct: 'Outcome Expectations: Physical outcomes (health), social outcomes (approval), and self-evaluative pride.',
    ecological: 'Multi-level outcomes: Individual health, community economic vitality, and environmental sustainability.',
    behavioralEcon: 'Prospect Theory: Subjective value calculation; framing as gains vs avoided losses changes decisions.'
  },
  {
    construct: 'Triggers, Cues & Prompts',
    category: 'Activation & Cues',
    hbm: 'Cues to Action: Internal bodily symptoms or external physician letters/media campaigns that activate readiness.',
    tpb_ibm: 'Salience & Cues: Behavior must be salient in memory, especially for infrequent actions like annual screening.',
    ttm: 'Stimulus Control: Removing unhealthy cues (ashtrays) and adding prompts for healthy alternatives.',
    sct: 'Environmental Opportunities & Social Prompts: Reminders, signs, and point-of-choice cues.',
    ecological: 'Point-of-decision prompts (e.g., stairwell prompts, warning labels on cigarette packaging).',
    behavioralEcon: 'Choice Architecture Nudges: Default options (opt-out), timely reminders, and lottery eligibility notifications.'
  },
  {
    construct: 'Readiness & Change Process',
    category: 'Temporal Stages',
    hbm: 'Static value-expectancy calculation; does not specify sequential stages of change over time.',
    tpb_ibm: 'Intention-to-behavior continuum: Linear causal path from beliefs -> attitudes/norms/control -> intention -> behavior.',
    ttm: '6 Qualitative Stages: Precontemplation -> Contemplation -> Preparation -> Action -> Maintenance -> Termination.',
    sct: 'Dynamic continuous self-regulation: Self-monitoring, goal setting, feedback, and corrective adjustments.',
    ecological: 'Systems diffusion and institutionalization over years (e.g. S-shaped adoption curve).',
    behavioralEcon: 'Intertemporal choice and hyperbolic discounting: Shifting preferences depending on time distance.'
  }
];

const ConstructComparisonMatrix: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Agency & Control', 'Social Influence', 'Barriers & Friction', 'Expectancy & Value', 'Activation & Cues', 'Temporal Stages'];

  const filteredData = COMPARISON_DATA.filter(row => {
    const matchesCategory = selectedCategory === 'all' || row.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      row.construct.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.hbm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.tpb_ibm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.ttm.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.sct.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.ecological.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.behavioralEcon.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 shadow-sm border border-emerald-100/80 dark:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Layers size={14} /> Cross-Theoretical Construct Matrix
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
              Comparative Matrix of Core Constructs
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Compare how foundational concepts are conceptualized and operationalized across major paradigms.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search constructs or terms..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all capitalize ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat === 'all' ? 'All Constructs' : cat}
            </button>
          ))}
        </div>

        {/* Matrix Cards for Mobile / Responsive Table */}
        <div className="space-y-6">
          {filteredData.map((row, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-700/60 transition-all hover:border-emerald-300 dark:hover:border-emerald-700 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-300">
                  {row.construct}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 self-start sm:self-auto">
                  {row.category}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <span className="block font-bold text-teal-700 dark:text-teal-400 mb-1">Health Belief Model (HBM)</span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{row.hbm}</p>
                </div>
                <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <span className="block font-bold text-teal-700 dark:text-teal-400 mb-1">TPB / Integrated Model (IBM)</span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{row.tpb_ibm}</p>
                </div>
                <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <span className="block font-bold text-teal-700 dark:text-teal-400 mb-1">Transtheoretical Model (TTM)</span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{row.ttm}</p>
                </div>
                <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <span className="block font-bold text-emerald-700 dark:text-emerald-400 mb-1">Social Cognitive Theory (SCT)</span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{row.sct}</p>
                </div>
                <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <span className="block font-bold text-emerald-700 dark:text-emerald-400 mb-1">Ecological & Policy Models</span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{row.ecological}</p>
                </div>
                <div className="p-3.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <span className="block font-bold text-emerald-700 dark:text-emerald-400 mb-1">Behavioral Economics</span>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{row.behavioralEcon}</p>
                </div>
              </div>
            </div>
          ))}

          {filteredData.length === 0 && (
            <div className="text-center py-12 text-slate-400 text-sm">
              No theoretical constructs match your filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConstructComparisonMatrix;
