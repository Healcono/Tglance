import React, { useState, useEffect, useMemo } from 'react';
import { 
  Home, Layers, Lightbulb, Map, Book, Gamepad2, 
  CheckSquare, MessageSquare, Link as LinkIcon, Info, 
  Menu, X, Search, Moon, Sun, ChevronDown, ExternalLink, Mail, Phone, Send,
  GraduationCap, Award, Compass, Workflow, FileText, Sparkles, UserCheck, ShieldCheck
} from 'lucide-react';
import { 
  THEORY_CATEGORIES, PLANNING_MODELS, QUIZ_DATA, GAME_QUESTIONS, 
  SCENARIOS, FLASHCARDS, GLOSSARY, COMPREHENSIVE_THEORIES 
} from './constants';
import { SectionId, StudentProgress } from './types';
import Flashcards from './components/Flashcards';
import Quiz from './components/Quiz';
import Game from './components/Game';
import ScenarioChallenge from './components/Scenario';
import ProgressTracker from './components/ProgressTracker';
import TheoryDecisionMatrix from './components/TheoryDecisionMatrix';
import ConstructComparisonMatrix from './components/ConstructComparisonMatrix';
import LogicModelBuilder from './components/LogicModelBuilder';
import StudySheet from './components/StudySheet';

// Initial local storage progress state
const INITIAL_PROGRESS: StudentProgress = {
  studentName: 'Health Promotion Scholar',
  studentId: 'HB-2026-TMU',
  university: 'Tarbiat Modares University',
  role: 'student',
  completedTheories: ['hbm', 'tpb_ibm'],
  quizScores: [{ quizId: 'general', score: 12, total: 15, date: new Date().toISOString() }],
  gameHighScore: 6,
  completedScenarios: ['sc_smoking_cessation', 'sc_vaccination_hesitancy'],
  masteredFlashcards: ['fc_1', 'fc_2', 'fc_4', 'fc_7'],
  unlockedBadgeIds: ['b_explorer', 'b_speedster'],
  studyStreakDays: 5,
  lastStudyDate: new Date().toISOString()
};

const Card: React.FC<{ title?: string; children: React.ReactNode; className?: string; icon?: React.ReactNode }> = ({ 
  title, children, className = '', icon 
}) => (
  <div className={`bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-700/60 transition-all ${className}`}>
    {title && (
      <h3 className="text-xl font-bold mb-4 text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
        {icon}
        {title}
      </h3>
    )}
    {children}
  </div>
);

const SectionTitle: React.FC<{ children: React.ReactNode; subtitle?: string; badge?: string; icon?: React.ReactNode }> = ({ 
  children, subtitle, badge, icon 
}) => (
  <div className="mb-8">
    {badge && (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
        {icon}
        <span>{badge}</span>
      </div>
    )}
    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
      {children}
    </h2>
    {subtitle && (
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
        {subtitle}
      </p>
    )}
  </div>
);

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTheories, setExpandedTheories] = useState<Record<string, boolean>>({
    individual: true
  });

  // Load and save student academic progress
  const [progress, setProgress] = useState<StudentProgress>(() => {
    try {
      const saved = localStorage.getItem('tglance_student_progress_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('tglance_student_progress_v2', JSON.stringify(progress));
    } catch (e) {
      console.error(e);
    }
  }, [progress]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheory = (key: string) => {
    setExpandedTheories(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredGlossary = useMemo(() => {
    if (!searchTerm) return GLOSSARY;
    return GLOSSARY.filter(item => 
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.relatedTheory && item.relatedTheory.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const HighlightText: React.FC<{ text: string }> = ({ text }) => {
    if (!searchTerm) return <>{text}</>;
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === searchTerm.toLowerCase() 
            ? <span key={i} className="bg-emerald-200 dark:bg-emerald-800/60 dark:text-emerald-100 rounded px-1">{part}</span> 
            : part
        )}
      </>
    );
  };

  const handleRecordQuizScore = (score: number, total: number) => {
    setProgress(prev => ({
      ...prev,
      quizScores: [
        ...prev.quizScores,
        { quizId: 'quiz_' + Date.now(), score, total, date: new Date().toISOString() }
      ]
    }));
  };

  const handleRecordGameScore = (score: number) => {
    setProgress(prev => ({
      ...prev,
      gameHighScore: Math.max(prev.gameHighScore, score)
    }));
  };

  const handleRecordScenario = (scId: string) => {
    setProgress(prev => ({
      ...prev,
      completedScenarios: prev.completedScenarios.includes(scId) 
        ? prev.completedScenarios 
        : [...prev.completedScenarios, scId]
    }));
  };

  const handleToggleFlashcardMastered = (cardId: string) => {
    setProgress(prev => {
      const exists = prev.masteredFlashcards.includes(cardId);
      return {
        ...prev,
        masteredFlashcards: exists 
          ? prev.masteredFlashcards.filter(id => id !== cardId)
          : [...prev.masteredFlashcards, cardId]
      };
    });
  };

  const navGroups = [
    {
      group: 'Academic Dashboard',
      items: [
        { id: 'home' as SectionId, icon: <Home size={18} />, label: 'Overview & Hub' },
        { id: 'progressTracker' as SectionId, icon: <GraduationCap size={18} />, label: 'Academic Progress & Certificate', badge: 'Tracker' },
      ]
    },
    {
      group: 'Theory & Planning Curricula',
      items: [
        { id: 'foundations' as SectionId, icon: <Layers size={18} />, label: 'Foundations of Theory' },
        { id: 'keyTheories' as SectionId, icon: <Lightbulb size={18} />, label: 'Key Behavioral Theories' },
        { id: 'planningModels' as SectionId, icon: <Map size={18} />, label: 'Planning & Implementation Models' },
        { id: 'studySheet' as SectionId, icon: <FileText size={18} />, label: 'High-Yield Study Sheet', badge: 'Formulas' },
      ]
    },
    {
      group: 'Interactive Decision Tools',
      items: [
        { id: 'decisionMatrix' as SectionId, icon: <Compass size={18} />, label: 'Theory Decision Matrix', badge: 'Wizard' },
        { id: 'comparisonMatrix' as SectionId, icon: <Layers size={18} />, label: 'Construct Comparison Matrix' },
        { id: 'logicModelBuilder' as SectionId, icon: <Workflow size={18} />, label: 'PRECEDE-PROCEED Logic Builder' },
      ]
    },
    {
      group: 'Self-Assessment & Games',
      items: [
        { id: 'quiz' as SectionId, icon: <CheckSquare size={18} />, label: 'Academic Mastery Quiz' },
        { id: 'game' as SectionId, icon: <Gamepad2 size={18} />, label: 'Speed Theory Challenge' },
        { id: 'scenarioChallenge' as SectionId, icon: <Award size={18} />, label: 'Case Study Simulations' },
        { id: 'flashcards' as SectionId, icon: <Book size={18} />, label: 'Construct Flashcards' },
        { id: 'glossary' as SectionId, icon: <Book size={18} />, label: 'Academic Glossary' },
      ]
    },
    {
      group: 'Resources & Academic Contact',
      items: [
        { id: 'usefulSources' as SectionId, icon: <LinkIcon size={18} />, label: 'Seminal Publications' },
        { id: 'contactUs' as SectionId, icon: <MessageSquare size={18} />, label: 'Contact & Faculty Info' },
        { id: 'about' as SectionId, icon: <Info size={18} />, label: 'About Tglance' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/20 to-slate-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-200 flex flex-col font-sans transition-colors duration-200 selection:bg-emerald-200 dark:selection:bg-emerald-900">
      
      {/* Sticky Header with Glassmorphism */}
      <header className="sticky top-0 z-50 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-emerald-100 dark:border-slate-800 transition-all">
        <div className="container mx-auto px-4 py-3.5 flex justify-between items-center max-w-7xl">
          <div className="flex items-center gap-3">
            <button 
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800" 
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open Navigation Menu"
            >
              <Menu size={22} />
            </button>
            
            <div 
              onClick={() => setActiveSection('home')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-700 to-teal-500 text-white flex items-center justify-center font-black text-xl shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                T
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-emerald-950 dark:text-emerald-300">Tglance</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                    Academic Tracker
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
                  Health Promotion & Behavioral Theories • Dr. Fatemeh Zarei
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveSection('progressTracker')}
              className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors"
            >
              <GraduationCap size={16} />
              <span>{progress.studentName.split(' ')[0]}'s Progress</span>
            </button>

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Layout */}
      <div className="container mx-auto px-4 py-8 flex gap-8 relative max-w-7xl">
        
        {/* Desktop Sidebar with Glassmorphism */}
        <aside className="hidden md:block w-72 shrink-0">
          <div className="sticky top-24 space-y-6 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 pb-8 scrollbar-thin">
            {/* Global Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input 
                type="text" 
                placeholder="Search theories, constructs..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-xs"
              />
            </div>

            {/* Nav Groups */}
            <nav className="space-y-6">
              {navGroups.map((group, gIdx) => (
                <div key={gIdx} className="space-y-1">
                  <span className="block px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                    {group.group}
                  </span>
                  {group.items.map((item) => {
                    const active = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveSection(item.id);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all duration-200 text-xs font-semibold ${
                          active 
                            ? 'bg-emerald-600 text-white shadow-md shadow-emerald-700/20' 
                            : 'text-slate-600 dark:text-slate-400 hover:bg-emerald-50/70 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {item.icon}
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className={`px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase ${
                            active ? 'bg-white/20 text-white' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </nav>

            {/* Developer Contact Quick Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50/60 dark:from-slate-800 dark:to-slate-900 border border-emerald-100 dark:border-slate-700/80 text-xs space-y-1.5">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                Academic Developer
              </span>
              <p className="font-bold text-slate-800 dark:text-slate-200">Dr. Fatemeh Zarei</p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px]">Tarbiat Modares University</p>
              <div className="pt-2 flex items-center justify-between text-emerald-700 dark:text-emerald-400 font-semibold text-[11px]">
                <a href="https://t.me/healthcono" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                  <Send size={11} /> @healthcono
                </a>
                <a href="mailto:healcono@gmail.com" className="hover:underline flex items-center gap-1">
                  <Mail size={11} /> Email
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
            <div className="relative w-4/5 max-w-xs bg-white dark:bg-slate-900 h-full shadow-2xl p-6 flex flex-col border-r border-slate-200 dark:border-slate-800 animate-in slide-in-from-left duration-200 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base">
                    T
                  </div>
                  <h2 className="font-bold text-lg text-emerald-950 dark:text-emerald-300">Tglance</h2>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="text-slate-500"><X size={20} /></button>
              </div>

              <div className="mb-6 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Search content..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs"
                />
              </div>

              <div className="space-y-6 flex-1">
                {navGroups.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-1">
                    <span className="block px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                      {group.group}
                    </span>
                    {group.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveSection(item.id);
                          setIsSidebarOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold ${
                          activeSection === item.id
                            ? 'bg-emerald-600 text-white'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Content View Area */}
        <main className="flex-1 min-w-0 pb-16">
          
          {/* SECTION: HOME / DASHBOARD HUB */}
          {activeSection === 'home' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Hero Banner with Glassmorphism */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-800 to-slate-900 text-white p-8 sm:p-12 shadow-xl shadow-emerald-950/10 border border-emerald-700/30">
                <div className="relative z-10 max-w-3xl space-y-4">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                    <Sparkles size={14} className="text-emerald-300" />
                    Glanz 5th Edition Curriculum & Progress Hub
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    Academic Health Promotion & Behavioral Theories Guide
                  </h1>
                  <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-normal">
                    An advanced interactive platform to study health behavior paradigms, compare theoretical constructs, design PRECEDE-PROCEED logic models, and earn verified academic certification.
                  </p>
                  
                  <div className="flex flex-wrap gap-3 pt-4">
                    <button 
                      onClick={() => setActiveSection('progressTracker')}
                      className="px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-bold rounded-2xl text-xs sm:text-sm shadow-md transition-all hover:scale-105 flex items-center gap-2"
                    >
                      <GraduationCap size={18} />
                      Academic Progress Tracker
                    </button>
                    <button 
                      onClick={() => setActiveSection('decisionMatrix')}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
                    >
                      <Compass size={18} />
                      Theory Selection Wizard
                    </button>
                    <button 
                      onClick={() => setActiveSection('logicModelBuilder')}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
                    >
                      <Workflow size={18} />
                      PRECEDE-PROCEED Builder
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Feature Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div 
                  onClick={() => setActiveSection('keyTheories')}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Lightbulb size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">
                    Behavioral Theories
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    HBM, TPB/IBM, TTM, SCT, Social Support, Ecological Models, and Behavioral Economics.
                  </p>
                </div>

                <div 
                  onClick={() => setActiveSection('comparisonMatrix')}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Layers size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">
                    Construct Matrix
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Side-by-side comparative analysis of self-efficacy, norms, barriers, expectancies, and cues.
                  </p>
                </div>

                <div 
                  onClick={() => setActiveSection('quiz')}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-600 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <CheckSquare size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">
                    Mastery Evaluations
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    15 categorized scenario quizzes with immediate diagnostic feedback and citations.
                  </p>
                </div>
              </div>

              {/* Progress Tracker Embedded Preview */}
              <ProgressTracker 
                progress={progress}
                onUpdateProgress={setProgress}
                onNavigateToSection={setActiveSection}
              />
            </div>
          )}

          {/* SECTION: ACADEMIC PROGRESS TRACKER */}
          {activeSection === 'progressTracker' && (
            <div className="animate-in fade-in duration-500">
              <SectionTitle 
                badge="Student Portfolio" 
                subtitle="Monitor theory mastery, quiz scores, game high scores, earned badges, and generate your printable Certificate of Academic Excellence."
                icon={<GraduationCap size={14} />}
              >
                Academic Progress & Mastery Tracker
              </SectionTitle>
              <ProgressTracker 
                progress={progress}
                onUpdateProgress={setProgress}
                onNavigateToSection={setActiveSection}
              />
            </div>
          )}

          {/* SECTION: THEORY DECISION MATRIX */}
          {activeSection === 'decisionMatrix' && (
            <div className="animate-in fade-in duration-500">
              <SectionTitle 
                badge="Interactive Research Tool" 
                subtitle="Select the optimal theoretical framework for your health intervention based on target behavior, ecological level, and primary cognitive barriers."
                icon={<Compass size={14} />}
              >
                Theory Decision Matrix
              </SectionTitle>
              <TheoryDecisionMatrix />
            </div>
          )}

          {/* SECTION: CONSTRUCT COMPARISON MATRIX */}
          {activeSection === 'comparisonMatrix' && (
            <div className="animate-in fade-in duration-500">
              <SectionTitle 
                badge="Cross-Paradigmatic Analysis" 
                subtitle="Examine how foundational behavioral constructs are defined, operationalized, and measured across competing theoretical models."
                icon={<Layers size={14} />}
              >
                Construct Comparison Matrix
              </SectionTitle>
              <ConstructComparisonMatrix />
            </div>
          )}

          {/* SECTION: PRECEDE-PROCEED LOGIC MODEL BUILDER */}
          {activeSection === 'logicModelBuilder' && (
            <div className="animate-in fade-in duration-500">
              <SectionTitle 
                badge="Intervention Architecture" 
                subtitle="Design and customize an evidence-based PRECEDE-PROCEED and Intervention Mapping logic model for clinical, community, or school interventions."
                icon={<Workflow size={14} />}
              >
                PRECEDE-PROCEED & Logic Model Builder
              </SectionTitle>
              <LogicModelBuilder />
            </div>
          )}

          {/* SECTION: HIGH-YIELD STUDY SHEET */}
          {activeSection === 'studySheet' && (
            <div className="animate-in fade-in duration-500">
              <SectionTitle 
                badge="Fast Review Sheet" 
                subtitle="Mathematical principles, core axioms, and empirical effect sizes from Karen Glanz Health Behavior (5th Edition)."
                icon={<FileText size={14} />}
              >
                High-Yield Academic Review Sheet
              </SectionTitle>
              <StudySheet />
            </div>
          )}

          {/* SECTION: FOUNDATIONS */}
          {activeSection === 'foundations' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <SectionTitle 
                badge="Theoretical Fundamentals" 
                subtitle="The role of scientific theory in analyzing health behavior, guiding intervention design, and establishing evaluation metrics."
                icon={<Layers size={14} />}
              >
                Foundations of Behavioral Theory
              </SectionTitle>
              
              <div className="grid gap-6">
                <Card title="Why is Theory Indispensable in Health Promotion?">
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                    <HighlightText text="Effective health promotion requires behavior change across individual, interpersonal, organizational, community, and policy levels. Theory provides a systematic roadmap to identify determinants of health, formulate hypothesis-driven interventions, and measure intermediate behavioral endpoints rather than relying on intuition." />
                  </p>
                </Card>

                <Card title="Core Terminology: Concepts, Constructs, Variables & Models">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { t: 'Concept', d: 'The foundational idea or generalized notion (e.g., personal confidence, social influence).' },
                      { t: 'Construct', d: 'A concept deliberately adopted and operationalized for a specific theory (e.g., Perceived Self-Efficacy, Injunctive Norms).' },
                      { t: 'Variable', d: 'The practical, measurable operational form of a construct measured on a standardized survey scale.' },
                      { t: 'Model', d: 'A multi-theoretical synthesis or framework designed for practical planning (e.g., PRECEDE-PROCEED, Intervention Mapping).' }
                    ].map((item, i) => (
                      <div key={i} className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                        <span className="block font-bold text-emerald-800 dark:text-emerald-300 mb-1">{item.t}</span>
                        <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.d}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* SECTION: KEY THEORIES */}
          {activeSection === 'keyTheories' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <SectionTitle 
                badge="Theoretical Paradigms" 
                subtitle="Complete compendium of individual, interpersonal, community, and behavioral economic models from Glanz 5th Ed."
                icon={<Lightbulb size={14} />}
              >
                Key Behavioral Theories & Models
              </SectionTitle>

              <div className="space-y-4">
                {Object.entries(THEORY_CATEGORIES).map(([key, category]) => (
                  <div key={key} className="bg-white dark:bg-slate-800/90 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-700/60 overflow-hidden transition-all duration-300">
                    <button 
                      onClick={() => toggleTheory(key)}
                      className="w-full flex justify-between items-center p-6 sm:p-8 text-left hover:bg-emerald-50/40 dark:hover:bg-slate-700/30 transition-colors"
                    >
                      <div>
                         <span className="block text-xl font-bold text-slate-900 dark:text-slate-100">{category.title}</span>
                         {!expandedTheories[key] && <span className="text-xs text-slate-500 mt-1 line-clamp-1">{category.description}</span>}
                      </div>
                      <div className={`p-2 rounded-xl bg-slate-100 dark:bg-slate-700 transition-transform duration-300 ${expandedTheories[key] ? 'rotate-180 bg-emerald-100 text-emerald-800 dark:bg-emerald-950' : ''}`}>
                        <ChevronDown size={18} />
                      </div>
                    </button>
                    
                    {expandedTheories[key] && (
                      <div className="px-6 pb-6 pt-0 sm:px-8 sm:pb-8 animate-in slide-in-from-top-2">
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">{category.description}</p>
                        <div className="grid gap-4">
                          {category.items.map((item, idx) => (
                            <div key={idx} className="bg-slate-50/70 dark:bg-slate-900/40 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 hover:border-emerald-300 transition-all">
                              <h4 className="font-bold text-lg text-emerald-800 dark:text-emerald-300 mb-2">
                                <HighlightText text={item.title} />
                              </h4>
                              <p className="text-slate-600 dark:text-slate-300 mb-4 text-xs sm:text-sm leading-relaxed">
                                <HighlightText text={item.description} />
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {item.concepts.map((concept, cIdx) => (
                                  <span key={cIdx} className="px-2.5 py-1 bg-white dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700">
                                    <HighlightText text={concept} />
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: PLANNING MODELS */}
          {activeSection === 'planningModels' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <SectionTitle 
                badge="Program Implementation" 
                subtitle="Systematic models for needs assessment, multi-level intervention design, and impact evaluation."
                icon={<Map size={14} />}
              >
                Planning & Implementation Models
              </SectionTitle>

              <div className="grid gap-6">
                {PLANNING_MODELS.map((model, idx) => (
                  <Card key={idx} title={model.title} className="hover:border-emerald-300 transition-all">
                    <p className="mb-6 text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                      <HighlightText text={model.description} />
                    </p>
                    <div className="bg-slate-50/80 dark:bg-slate-900/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
                      <strong className="block mb-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Phases & Core Concepts
                      </strong>
                      <div className="flex flex-wrap gap-1.5">
                        {model.concepts.map((concept, cIdx) => (
                          <span key={cIdx} className="px-3 py-1 bg-white dark:bg-slate-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs">
                            <HighlightText text={concept} />
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: QUIZ */}
          {activeSection === 'quiz' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <SectionTitle 
                badge="Self-Evaluation" 
                subtitle="15 rigorous questions mapped directly to health behavior theory constructs and clinical scenarios."
                icon={<CheckSquare size={14} />}
              >
                Academic Mastery Quiz
              </SectionTitle>
              <Quiz 
                questions={QUIZ_DATA} 
                onQuizComplete={handleRecordQuizScore}
              />
            </div>
          )}

          {/* SECTION: SPEED CHALLENGE GAME */}
          {activeSection === 'game' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <SectionTitle 
                badge="Gamified Learning" 
                subtitle="Race against the 15-second clock to test your rapid recall of behavioral constructs and theorists."
                icon={<Gamepad2 size={14} />}
              >
                Speed Theory Challenge
              </SectionTitle>
              <Game 
                questions={GAME_QUESTIONS} 
                onGameComplete={handleRecordGameScore}
              />
            </div>
          )}

          {/* SECTION: SCENARIO CHALLENGE */}
          {activeSection === 'scenarioChallenge' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <SectionTitle 
                badge="Case-Based Reasoning" 
                subtitle="Analyze real-world public health scenarios and select the optimal theoretical framework to guide intervention design."
                icon={<Award size={14} />}
              >
                Public Health Case Study Simulations
              </SectionTitle>
              <ScenarioChallenge 
                scenarios={SCENARIOS}
                completedScenarioIds={progress.completedScenarios}
                onCompleteScenario={handleRecordScenario}
              />
            </div>
          )}

          {/* SECTION: FLASHCARDS */}
          {activeSection === 'flashcards' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <SectionTitle 
                badge="Spaced Retrieval" 
                subtitle="Review definitions, related theories, and audio pronunciation for 17 high-yield behavioral constructs."
                icon={<Book size={14} />}
              >
                Construct Flashcards
              </SectionTitle>
              <div className="bg-slate-100/70 dark:bg-slate-800/40 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-700">
                <Flashcards 
                  cards={FLASHCARDS}
                  masteredIds={progress.masteredFlashcards}
                  onToggleMastered={handleToggleFlashcardMastered}
                />
              </div>
            </div>
          )}

          {/* SECTION: GLOSSARY */}
          {activeSection === 'glossary' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <SectionTitle 
                badge="Academic Lexicon" 
                subtitle="44 comprehensive terms and construct definitions from the Health Behavior and Health Promotion literature."
                icon={<Book size={14} />}
              >
                Academic Glossary & Construct Index
              </SectionTitle>
              
              <div className="grid gap-4 sm:grid-cols-2">
                {filteredGlossary.length > 0 ? (
                  filteredGlossary.map((item, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-800/90 p-6 rounded-2xl shadow-xs hover:shadow-md transition-all border border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-300">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h4 className="font-bold text-emerald-800 dark:text-emerald-300 text-base">
                          <HighlightText text={item.term} />
                        </h4>
                        {item.relatedTheory && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 shrink-0">
                            {item.relatedTheory}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
                        <HighlightText text={item.definition} />
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16 text-slate-400 text-sm">
                    No glossary terms match your search.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION: USEFUL SOURCES */}
          {activeSection === 'usefulSources' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <SectionTitle 
                badge="Academic Citations" 
                subtitle="Seminal textbooks, journal meta-analyses, and global health guidelines in behavioral science."
                icon={<LinkIcon size={14} />}
              >
                Seminal Academic Publications
              </SectionTitle>

              <Card>
                <ul className="space-y-3">
                  {[
                    { title: 'Health Behavior: Theory, Research, and Practice (5th Edition)', authors: 'Karen Glanz, Barbara K. Rimer, K. Viswanath (2015)', link: 'https://www.wiley.com/en-us/Health+Behavior:+Theory,+Research,+and+Practice,+5th+Edition-p-9781118628980', desc: 'The definitive gold-standard graduate textbook in health behavior and health education.' },
                    { title: 'Planning Health Promotion Programs: An Intervention Mapping Approach (4th Ed.)', authors: 'L. Kay Bartholomew Eldredge et al. (2016)', link: 'https://www.wiley.com/en-us/Planning+Health+Promotion+Programs:+An+Intervention+Mapping+Approach,+4th+Edition-p-9781119035497', desc: 'Step-by-step methodology for translating behavioral science theories into operational clinical and community programs.' },
                    { title: 'Social Relationships and Mortality Risk: A Meta-analytic Review', authors: 'Julianne Holt-Lunstad, Timothy B. Smith, J. Bradley Layton (PLoS Medicine, 2010)', link: 'https://doi.org/10.1371/journal.pmed.1000316', desc: 'Landmark meta-analysis demonstrating a 50% increased likelihood of survival for individuals with stronger social relationships.' },
                    { title: 'Theory at a Glance: A Guide For Health Promotion Practice (2nd Ed.)', authors: 'Barbara K. Rimer & Karen Glanz (National Cancer Institute, NIH Pub 05-3896)', link: 'https://cancercontrol.cancer.gov/sites/default/files/2020-06/theory.pdf', desc: 'Foundational NIH practitioner monograph summarizing individual, interpersonal, and community frameworks.' }
                  ].map((source, i) => (
                    <li key={i} className="group">
                      <a 
                        href={source.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="block p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-900/40 hover:bg-emerald-50 dark:hover:bg-slate-700/50 border border-slate-100 dark:border-slate-800 transition-all"
                      >
                        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm mb-1 group-hover:underline">
                           {source.title} <ExternalLink size={14} />
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">{source.authors}</p>
                        <p className="text-xs text-slate-600 dark:text-slate-300">{source.desc}</p>
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          )}

          {/* SECTION: CONTACT US */}
          {activeSection === 'contactUs' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <SectionTitle 
                badge="Academic Developer" 
                subtitle="Connect with the developer, faculty advisor, and health promotion research team."
                icon={<MessageSquare size={14} />}
              >
                Contact & Faculty Information
              </SectionTitle>
              
              <Card>
                <div className="bg-gradient-to-br from-emerald-50 via-teal-50/40 to-slate-50 dark:from-slate-800 dark:to-slate-900 p-8 rounded-3xl border border-emerald-100 dark:border-slate-700">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider rounded-full">
                      Lead Academic Developer & Researcher
                    </span>
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-1">
                    Dr. Fatemeh Zarei
                  </h3>
                  <p className="text-emerald-700 dark:text-emerald-400 mb-8 font-semibold text-sm sm:text-base">
                    Associate Professor in Health Education and Health Promotion<br/>
                    Faculty of Medical Sciences, Tarbiat Modares University
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <a 
                      href="mailto:healcono@gmail.com" 
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs hover:border-emerald-400 transition-all"
                    >
                      <div className="p-3 bg-emerald-50 dark:bg-slate-700 rounded-xl text-emerald-600 dark:text-emerald-400"><Mail size={20} /></div>
                      <div>
                        <span className="block text-[11px] text-slate-400 uppercase font-bold">Inquiries & Feedback</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">healcono@gmail.com</span>
                      </div>
                    </a>

                    <a 
                      href="mailto:f.zarei@modares.ac.ir" 
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs hover:border-emerald-400 transition-all"
                    >
                      <div className="p-3 bg-emerald-50 dark:bg-slate-700 rounded-xl text-emerald-600 dark:text-emerald-400"><Mail size={20} /></div>
                      <div>
                        <span className="block text-[11px] text-slate-400 uppercase font-bold">University Academic Email</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">f.zarei@modares.ac.ir</span>
                      </div>
                    </a>

                    <a 
                      href="https://t.me/healthcono" 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs hover:border-emerald-400 transition-all"
                    >
                      <div className="p-3 bg-emerald-50 dark:bg-slate-700 rounded-xl text-emerald-600 dark:text-emerald-400"><Send size={20} /></div>
                      <div>
                        <span className="block text-[11px] text-slate-400 uppercase font-bold">Telegram Channel</span>
                        <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">@healthcono</span>
                      </div>
                    </a>

                    <a 
                      href="tel:00982182884546" 
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs hover:border-emerald-400 transition-all"
                    >
                      <div className="p-3 bg-emerald-50 dark:bg-slate-700 rounded-xl text-emerald-600 dark:text-emerald-400"><Phone size={20} /></div>
                      <div>
                        <span className="block text-[11px] text-slate-400 uppercase font-bold">Department Office</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">+98 21 8288 4546</span>
                      </div>
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* SECTION: ABOUT */}
          {activeSection === 'about' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <SectionTitle 
                badge="Academic Pedigree" 
                subtitle="Design rationale and theoretical lineage of the Tglance platform."
                icon={<Info size={14} />}
              >
                About Tglance
              </SectionTitle>
              
              <Card>
                 <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4 text-xs sm:text-sm">
                    <p>
                      <strong>Tglance</strong> is an academic platform designed to empower students, researchers, and public health practitioners in mastering behavioral change paradigms and designing evidence-based interventions.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border-l-4 border-emerald-500">
                      <p className="font-bold text-slate-900 dark:text-white text-base">Theoretical Framework Foundations</p>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        Synthesized from <em>Health Behavior: Theory, Research, and Practice</em> (Glanz, Rimer, & Viswanath, 5th Ed.) and the NIH National Cancer Institute monograph <em>Theory at a Glance</em> (2nd Ed.).
                      </p>
                    </div>
                    <p>
                      <strong>Interactive Architecture:</strong> Includes real-time student mastery tracking, dynamic theory decision matrices, PRECEDE-PROCEED logic builders, flashcard retrieval practice, and verified academic certification.
                    </p>
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400">
                      Developed by Dr. Fatemeh Zarei • Tarbiat Modares University • @healthcono • healcono@gmail.com
                    </div>
                 </div>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-white/80 dark:bg-slate-900/80 text-center text-slate-500 dark:text-slate-400 text-xs border-t border-emerald-100 dark:border-slate-800 backdrop-blur-md">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-800 dark:text-emerald-300">Tglance Academic Platform</span>
            <span>•</span>
            <span>Dr. Fatemeh Zarei</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <a href="https://t.me/healthcono" target="_blank" rel="noreferrer" className="hover:underline">@healthcono</a>
            <span>•</span>
            <a href="mailto:healcono@gmail.com" className="hover:underline">healcono@gmail.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
