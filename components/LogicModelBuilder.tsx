import React, { useState } from 'react';
import { 
  Workflow, Sparkles, Plus, Trash2, ArrowRight, 
  Download, Printer, RefreshCw, CheckCircle2, BookOpen, Layers
} from 'lucide-react';

interface LogicModelStep {
  title: string;
  subtitle: string;
  items: string[];
  placeholder: string;
}

const TEMPLATES: Record<string, { name: string; description: string; data: LogicModelStep[] }> = {
  catch: {
    name: 'Childhood Obesity Prevention (CATCH Model)',
    description: 'School, cafeteria, PE, and family multi-component intervention based on SCT (Perry, Kelder, Luepker).',
    data: [
      {
        title: 'Phase 1 & 2: Health & Quality of Life Outcome',
        subtitle: 'Epidemiological targets & distal health outcomes',
        items: [
          'Reduce child obesity & cardiovascular risk factors in elementary students',
          'Lower blood cholesterol and improve lifelong physical fitness',
          'Enhance school academic attendance and vitality'
        ],
        placeholder: 'Add health outcome...'
      },
      {
        title: 'Phase 2: Target Behaviors & Environmental Conditions',
        subtitle: 'Observable lifestyle behaviors & settings',
        items: [
          'Students select GO foods over SLOW and WHOA foods in cafeteria',
          'Students engage in ≥50% moderate-to-vigorous physical activity during PE',
          'Cafeterias reformulate meal recipes to lower saturated fat and sodium',
          'Families prepare healthy home snacks and limit sedentary screen time'
        ],
        placeholder: 'Add behavior / setting...'
      },
      {
        title: 'Phase 3: Educational & Ecological Determinants',
        subtitle: 'Predisposing, Enabling, Reinforcing factors',
        items: [
          'Predisposing: Knowledge of GO/SLOW/WHOA food classifications and outcome expectations',
          'Enabling: Cooking skills, accessible fruits/vegetables, active PE curricula',
          'Reinforcing: Peer norms for activity, teacher praise, family goal-setting missions'
        ],
        placeholder: 'Add determinant...'
      },
      {
        title: 'Phase 4: Theory-Based Change Methods (Active Ingredients)',
        subtitle: 'Operational intervention techniques (SCT / IM)',
        items: [
          'Observational Learning: "Hearty Heart & Dynamite Diet" story character role models',
          'Guided Practice: Classroom healthy snack preparation and PE active skill games',
          'Environmental Cues: Point-of-purchase cafeteria labels and posters',
          'Incentives: School-wide celebration rewards for achieving weekly GO lunch targets'
        ],
        placeholder: 'Add change method...'
      },
      {
        title: 'Phase 5-8: Implementation & Evaluation Plan',
        subtitle: 'Process, Impact, and Outcome milestones',
        items: [
          'Process: Teacher training fidelity, cafeteria recipe audits, PE activity duration',
          'Impact: 14-item dietary knowledge scale, self-efficacy scales, 24-month food recall',
          'Outcome: Longitudinal BMI measurement, blood lipid profiles, 3-year maintenance'
        ],
        placeholder: 'Add evaluation metric...'
      }
    ]
  },
  tobacco: {
    name: 'Comprehensive Youth Tobacco Prevention (ASSIST / MYTRI)',
    description: 'Multi-level ecological and social network intervention to prevent adolescent smoking initiation.',
    data: [
      {
        title: 'Phase 1 & 2: Health & Quality of Life Outcome',
        subtitle: 'Epidemiological targets & distal health outcomes',
        items: [
          'Eliminate adolescent tobacco initiation (cigarettes, bidi, e-cigarettes)',
          'Reduce long-term risk of cardiovascular disease, lung cancer, and nicotine addiction',
          'Enhance respiratory health and athletic stamina'
        ],
        placeholder: 'Add health outcome...'
      },
      {
        title: 'Phase 2: Target Behaviors & Environmental Conditions',
        subtitle: 'Observable lifestyle behaviors & settings',
        items: [
          'Students refuse offers of tobacco from peers and older siblings',
          'Schools enforce strict 100% smoke-free campus policies',
          'Local retailers comply with laws banning tobacco sales to minors'
        ],
        placeholder: 'Add behavior / setting...'
      },
      {
        title: 'Phase 3: Educational & Ecological Determinants',
        subtitle: 'Predisposing, Enabling, Reinforcing factors',
        items: [
          'Predisposing: Perceived severity of addiction, resistance self-efficacy, refusal skills',
          'Enabling: Enforcement of youth access bans, availability of cessation support',
          'Reinforcing: Peer opinion leader anti-smoking norms, non-smoking social identity'
        ],
        placeholder: 'Add determinant...'
      },
      {
        title: 'Phase 4: Theory-Based Change Methods (Active Ingredients)',
        subtitle: 'Operational intervention techniques (SNT / SCT)',
        items: [
          'Social Network Analysis: Identify and train central peer opinion leaders (ASSIST trial)',
          'Behavioral Inoculation: Role-play resistance skills against peer pressure',
          'Mass Media Counter-Advertising: Unmask tobacco industry deceptive marketing',
          'Policy Advocacy: Student-led presentations to city council for smoke-free public parks'
        ],
        placeholder: 'Add change method...'
      },
      {
        title: 'Phase 5-8: Implementation & Evaluation Plan',
        subtitle: 'Process, Impact, and Outcome milestones',
        items: [
          'Process: Peer leader conversation logs, school policy compliance inspections',
          'Impact: Intentions to smoke, perceived peer smoking norms, refusal self-efficacy',
          'Outcome: Salivary cotinine biomarker testing, 2-year longitudinal smoking onset rates'
        ],
        placeholder: 'Add evaluation metric...'
      }
    ]
  },
  hpv: {
    name: 'Adolescent HPV Vaccination Uptake (HBM / Communication)',
    description: 'Clinic and communication-tailored intervention to increase HPV vaccination initiation and 3-dose completion.',
    data: [
      {
        title: 'Phase 1 & 2: Health & Quality of Life Outcome',
        subtitle: 'Epidemiological targets & distal health outcomes',
        items: [
          'Prevent cervical, oropharyngeal, anal, and penile HPV-related cancers',
          'Reduce incidence of HPV viral strains 16, 18, 6, and 11',
          'Achieve 80%+ vaccination coverage among adolescents aged 11-12'
        ],
        placeholder: 'Add health outcome...'
      },
      {
        title: 'Phase 2: Target Behaviors & Environmental Conditions',
        subtitle: 'Observable lifestyle behaviors & settings',
        items: [
          'Parents schedule and complete the 3-dose HPV vaccination series',
          'Pediatricians deliver strong, bundled presumptive recommendations at 11-year visits',
          'Clinics establish standing orders and automated reminder/recall protocols'
        ],
        placeholder: 'Add behavior / setting...'
      },
      {
        title: 'Phase 3: Educational & Ecological Determinants',
        subtitle: 'Predisposing, Enabling, Reinforcing factors',
        items: [
          'Predisposing: Framing vaccine as cancer prevention rather than sexual behavior; reducing perceived barriers',
          'Enabling: Zero out-of-pocket vaccine cost (Vaccines for Children program), school clinics',
          'Reinforcing: Strong physician recommendation (Cue to Action), partner support'
        ],
        placeholder: 'Add determinant...'
      },
      {
        title: 'Phase 4: Theory-Based Change Methods (Active Ingredients)',
        subtitle: 'Operational intervention techniques (HBM / Behavioral Economics)',
        items: [
          'Gain-Framing: "Vaccinate today to protect against 6 cancers in the future"',
          'Default Opt-Out Scheduling: Bundling HPV vaccine with Tdap and Meningococcal shots',
          'Automated Recall Cues: SMS text notifications for Dose 2 and Dose 3 timing',
          'Physician Communication Training: Handling parental hesitancy with empathic validation'
        ],
        placeholder: 'Add change method...'
      },
      {
        title: 'Phase 5-8: Implementation & Evaluation Plan',
        subtitle: 'Process, Impact, and Outcome milestones',
        items: [
          'Process: Provider recommendation rate, reminder SMS delivery and click rate',
          'Impact: Parental vaccine confidence, perceived susceptibility, reduced safety concerns',
          'Outcome: Electronic health record audit of Dose 1 initiation and series completion'
        ],
        placeholder: 'Add evaluation metric...'
      }
    ]
  }
};

const LogicModelBuilder: React.FC = () => {
  const [selectedTemplateKey, setSelectedTemplateKey] = useState<string>('catch');
  const [steps, setSteps] = useState<LogicModelStep[]>(TEMPLATES.catch.data);
  const [newItemTexts, setNewItemTexts] = useState<Record<number, string>>({});

  const handleSelectTemplate = (key: string) => {
    setSelectedTemplateKey(key);
    setSteps(TEMPLATES[key].data);
  };

  const handleAddItem = (stepIdx: number) => {
    const text = newItemTexts[stepIdx]?.trim();
    if (!text) return;
    setSteps(prev => {
      const updated = [...prev];
      updated[stepIdx] = {
        ...updated[stepIdx],
        items: [...updated[stepIdx].items, text]
      };
      return updated;
    });
    setNewItemTexts(prev => ({ ...prev, [stepIdx]: '' }));
  };

  const handleDeleteItem = (stepIdx: number, itemIdx: number) => {
    setSteps(prev => {
      const updated = [...prev];
      updated[stepIdx] = {
        ...updated[stepIdx],
        items: updated[stepIdx].items.filter((_, i) => i !== itemIdx)
      };
      return updated;
    });
  };

  const handleResetToTemplate = () => {
    setSteps(TEMPLATES[selectedTemplateKey].data);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-800 shadow-sm border border-emerald-100/80 dark:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Workflow size={14} /> Interactive Intervention Architect
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">
              PRECEDE-PROCEED & Intervention Mapping Builder
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Build and customize a logic model of change from needs assessment to theory methods and evaluation.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleResetToTemplate}
              className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5"
            >
              <RefreshCw size={13} /> Reset Template
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <Printer size={13} /> Print Logic Model
            </button>
          </div>
        </div>

        {/* Template Selector Buttons */}
        <div className="mb-8">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Load Pre-Configured Evidence-Based Case Studies:
          </label>
          <div className="grid sm:grid-cols-3 gap-3">
            {Object.entries(TEMPLATES).map(([key, t]) => (
              <button
                key={key}
                onClick={() => handleSelectTemplate(key)}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  selectedTemplateKey === key
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                    : 'bg-slate-50/70 dark:bg-slate-900/30 border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-100/80 dark:hover:bg-slate-800'
                }`}
              >
                <span className="block font-bold text-sm text-slate-800 dark:text-slate-200 mb-1">
                  {t.name}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {t.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Sequential Flow Columns */}
        <div className="space-y-6">
          {steps.map((step, stepIdx) => (
            <div
              key={stepIdx}
              className="p-6 rounded-2xl bg-slate-50/60 dark:bg-slate-900/30 border border-slate-200/80 dark:border-slate-700/60 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-700">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                      {stepIdx + 1}
                    </span>
                    <h3 className="font-bold text-base sm:text-lg text-slate-800 dark:text-slate-100">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 ml-8">
                    {step.subtitle}
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-lg self-start sm:self-auto ml-8 sm:ml-0">
                  {step.items.length} Component(s)
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-2.5 mb-4 ml-0 sm:ml-8">
                {step.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/80 shadow-xs flex items-center justify-between gap-3 group hover:border-emerald-200 dark:hover:border-emerald-800 transition-all"
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <CheckCircle2 size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                        {item}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteItem(stepIdx, itemIdx)}
                      className="text-slate-300 hover:text-rose-500 transition-colors p-1 shrink-0"
                      title="Delete item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Item Input */}
              <div className="flex gap-2 ml-0 sm:ml-8">
                <input
                  type="text"
                  placeholder={step.placeholder}
                  value={newItemTexts[stepIdx] || ''}
                  onChange={e => setNewItemTexts(prev => ({ ...prev, [stepIdx]: e.target.value }))}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddItem(stepIdx);
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={() => handleAddItem(stepIdx)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1 shrink-0"
                >
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogicModelBuilder;
