import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Home, Layers, Lightbulb, Map, Book, Gamepad2, 
  CheckSquare, MessageSquare, Link as LinkIcon, Info, 
  Menu, X, Search, Moon, Sun, ChevronDown, ExternalLink, Mail, Phone, Send,
  GraduationCap, Award, Compass, Workflow, FileText, Sparkles, UserCheck, ShieldCheck,
  CheckCircle2, Circle, ArrowRight, Zap, RefreshCw, BookmarkCheck, ArrowLeft, BookOpen,
  Bookmark, Youtube
} from 'lucide-react';
import { 
  THEORY_CATEGORIES, PLANNING_MODELS, QUIZ_DATA, GAME_QUESTIONS, 
  SCENARIOS, FLASHCARDS, GLOSSARY, COMPREHENSIVE_THEORIES 
} from './constants';
import { SectionId, StudentProgress, TheoryItem } from './types';
import Flashcards from './components/Flashcards';
import Quiz from './components/Quiz';
import Game from './components/Game';
import ScenarioChallenge from './components/Scenario';
import ProgressTracker from './components/ProgressTracker';
import TheoryDecisionMatrix from './components/TheoryDecisionMatrix';
import ConstructComparisonMatrix from './components/ConstructComparisonMatrix';
import LogicModelBuilder from './components/LogicModelBuilder';
import StudySheet from './components/StudySheet';
import TheoryDetailView from './components/TheoryDetailView';
import Sidebar from './components/Sidebar';

// Initial student progress state in local storage
const INITIAL_PROGRESS: StudentProgress = {
  studentName: 'Health Promotion Scholar',
  studentId: 'HB-2026-TMU',
  university: 'Tarbiat Modares University',
  role: 'student',
  completedTheories: ['hbm', 'tpb_ibm'],
  bookmarkedTheories: ['hbm', 'sct', 'ecological_models'],
  quizScores: [{ quizId: 'general', score: 12, total: 15, date: new Date().toISOString() }],
  gameHighScore: 6,
  gamesPlayed: 3,
  completedScenarios: ['sc_smoking_cessation', 'sc_vaccination_hesitancy'],
  masteredFlashcards: ['fc_1', 'fc_2', 'fc_4', 'fc_7'],
  customNotes: {},
  studyStreakDays: 5,
  lastActiveDate: new Date().toISOString(),
  certificateUnlocked: false
};

const Card: React.FC<{ title?: string; children: React.ReactNode; className?: string; icon?: React.ReactNode }> = ({ 
  title, children, className = '', icon 
}) => (
  <div className={`bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-xs border border-slate-200/80 dark:border-slate-700/60 transition-all ${className}`}>
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
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
);

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [selectedTheoryId, setSelectedTheoryId] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Load and save student progress state
  const [progress, setProgress] = useState<StudentProgress>(() => {
    try {
      const saved = localStorage.getItem('tglance_student_progress_v3');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('tglance_student_progress_v3', JSON.stringify(progress));
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

  // Handle keyboard shortcut '/' for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectSection = (section: SectionId) => {
    setSelectedTheoryId(null);
    setActiveSection(section);
  };

  const handleSelectTheory = (theoryId: string) => {
    setSelectedTheoryId(theoryId);
    setActiveSection('keyTheories');
  };

  const handleToggleTheoryReviewed = (theoryId: string) => {
    setProgress(prev => {
      const exists = prev.completedTheories.includes(theoryId);
      const updated = exists
        ? prev.completedTheories.filter(id => id !== theoryId)
        : [...prev.completedTheories, theoryId];
      return {
        ...prev,
        completedTheories: updated,
        lastActiveDate: new Date().toISOString()
      };
    });
  };

  const handleToggleBookmark = (theoryId: string) => {
    setProgress(prev => {
      const bookmarks = prev.bookmarkedTheories || [];
      const exists = bookmarks.includes(theoryId);
      const updated = exists
        ? bookmarks.filter(id => id !== theoryId)
        : [...bookmarks, theoryId];
      return {
        ...prev,
        bookmarkedTheories: updated,
        lastActiveDate: new Date().toISOString()
      };
    });
  };

  const currentTheory = useMemo(() => {
    if (!selectedTheoryId) return null;
    return COMPREHENSIVE_THEORIES.find(t => t.id === selectedTheoryId) || null;
  }, [selectedTheoryId]);

  const filteredGlossary = useMemo(() => {
    if (!searchTerm) return GLOSSARY;
    return GLOSSARY.filter(item => 
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.relatedTheory && item.relatedTheory.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const filteredOverviewTheories = useMemo(() => {
    return COMPREHENSIVE_THEORIES.filter(t => {
      const matchesCategory = selectedCategoryFilter === 'all' || t.category === selectedCategoryFilter;
      if (!matchesCategory) return false;
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        t.title.toLowerCase().includes(term) ||
        t.shortName.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term) ||
        t.constructs.some(c => c.name.toLowerCase().includes(term))
      );
    });
  }, [selectedCategoryFilter, searchTerm]);

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
      ],
      lastActiveDate: new Date().toISOString()
    }));
  };

  const handleRecordGameScore = (score: number) => {
    setProgress(prev => ({
      ...prev,
      gameHighScore: Math.max(prev.gameHighScore, score),
      gamesPlayed: prev.gamesPlayed + 1,
      lastActiveDate: new Date().toISOString()
    }));
  };

  const handleRecordScenario = (scId: string) => {
    setProgress(prev => ({
      ...prev,
      completedScenarios: prev.completedScenarios.includes(scId) 
        ? prev.completedScenarios 
        : [...prev.completedScenarios, scId],
      lastActiveDate: new Date().toISOString()
    }));
  };

  const handleToggleFlashcardMastered = (cardId: string) => {
    setProgress(prev => {
      const exists = prev.masteredFlashcards.includes(cardId);
      return {
        ...prev,
        masteredFlashcards: exists 
          ? prev.masteredFlashcards.filter(id => id !== cardId)
          : [...prev.masteredFlashcards, cardId],
        lastActiveDate: new Date().toISOString()
      };
    });
  };

  const reviewedTheoriesCount = progress.completedTheories.length;
  const totalTheoriesCount = COMPREHENSIVE_THEORIES.length;
  const overallMasteryPct = Math.round((reviewedTheoriesCount / totalTheoriesCount) * 100);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 flex flex-col font-sans transition-colors duration-200 selection:bg-emerald-200 dark:selection:bg-emerald-900">
      
      {/* Sticky Header with Soft UI and Glassmorphic blur */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-emerald-100/80 dark:border-slate-800 transition-all">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center max-w-7xl">
          
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <button 
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors" 
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open Navigation Menu"
            >
              <Menu size={22} />
            </button>
            
            {/* Brand Logo & Title */}
            <div 
              onClick={() => {
                setSelectedTheoryId(null);
                setActiveSection('home');
              }}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-500 text-white flex items-center justify-center font-black text-lg shadow-sm shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                T
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-extrabold tracking-tight text-emerald-950 dark:text-emerald-300">Tglance</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider hidden sm:inline">
                    Academic Study Guide
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden md:inline">
                  Health Promotion & Behavioral Theories • Dr. Fatemeh Zarei (Tarbiat Modares University)
                </span>
              </div>
            </div>
          </div>

          {/* Right Header Badges & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Cram Sheet Button */}
            <button
              onClick={() => {
                setSelectedTheoryId(null);
                setActiveSection('studySheet');
              }}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60 text-xs font-bold hover:bg-amber-100 transition-colors"
            >
              <Zap size={14} className="fill-current text-amber-600" />
              <span>Cram Sheet</span>
            </button>

            {/* Student Progress Pill */}
            <button
              onClick={() => {
                setSelectedTheoryId(null);
                setActiveSection('progress');
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors"
            >
              <GraduationCap size={15} />
              <span>{overallMasteryPct}% Mastered</span>
            </button>

            {/* Theme Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors"
              title="Toggle Dark / Light Theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="container mx-auto px-4 py-6 sm:py-8 flex gap-8 relative max-w-7xl flex-1">
        
        {/* Persistent Left Sidebar Component */}
        <Sidebar 
          activeSection={activeSection}
          selectedTheoryId={selectedTheoryId}
          onSelectSection={handleSelectSection}
          onSelectTheory={handleSelectTheory}
          progress={progress}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          isMobileDrawerOpen={isSidebarOpen}
          onCloseMobileDrawer={() => setIsSidebarOpen(false)}
        />

        {/* Dynamic Main Content Workspace */}
        <main className="flex-1 min-w-0 pb-16">
          
          {/* VIEW: INDIVIDUAL THEORY DETAIL (When a theory is actively selected) */}
          {selectedTheoryId && currentTheory ? (
            <div className="space-y-6">
              {/* Back to All Theories Breadcrumb */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedTheoryId(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                >
                  <ArrowLeft size={14} />
                  <span>Back to Theories Catalog</span>
                </button>

                <span className="text-xs text-slate-400">
                  Studying: <strong className="text-slate-700 dark:text-slate-200">{currentTheory.shortName}</strong>
                </span>
              </div>

              <TheoryDetailView 
                theory={currentTheory}
                allTheories={COMPREHENSIVE_THEORIES}
                isReviewed={progress.completedTheories.includes(currentTheory.id)}
                onToggleReviewed={handleToggleTheoryReviewed}
                isBookmarked={(progress.bookmarkedTheories || []).includes(currentTheory.id)}
                onToggleBookmark={handleToggleBookmark}
                onSelectTheory={setSelectedTheoryId}
                onNavigateToSection={handleSelectSection}
              />
            </div>
          ) : (
            <>
              {/* SECTION: HOME / DASHBOARD HUB */}
              {activeSection === 'home' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  
                  {/* Hero Banner with Glassmorphism */}
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-800 to-slate-900 text-white p-7 sm:p-10 shadow-lg shadow-emerald-950/10 border border-emerald-700/30">
                    <div className="relative z-10 max-w-3xl space-y-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                        <Sparkles size={14} className="text-emerald-300" />
                        Glanz 5th Edition Study Curriculum
                      </div>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                        Interactive Health Promotion Theories & Models Study Guide
                      </h1>
                      <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
                        Designed for rapid exam review and systematic mastery of behavioral change theories, construct comparisons, PRECEDE-PROCEED logic models, and verified academic certification.
                      </p>
                      
                      <div className="flex flex-wrap gap-2.5 pt-2">
                        <button 
                          onClick={() => setActiveSection('keyTheories')}
                          className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-slate-900 font-bold rounded-xl text-xs sm:text-sm shadow-sm transition-all hover:scale-105 flex items-center gap-2"
                        >
                          <BookOpen size={16} />
                          Browse All 13 Theories
                        </button>
                        <button 
                          onClick={() => setActiveSection('studySheet')}
                          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-xl text-xs sm:text-sm shadow-sm transition-all hover:scale-105 flex items-center gap-2"
                        >
                          <Zap size={16} className="fill-current" />
                          High-Yield Cram Sheet
                        </button>
                        <button 
                          onClick={() => setActiveSection('quiz')}
                          className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs sm:text-sm backdrop-blur-md border border-white/20 transition-all flex items-center gap-2"
                        >
                          <CheckSquare size={16} />
                          Self-Assessment Quiz
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Progress & Quick Stats Card */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div 
                      onClick={() => setActiveSection('keyTheories')}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 shadow-xs cursor-pointer hover:border-emerald-400 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Theories Studied</span>
                        <BookOpen size={18} className="text-emerald-600 group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900 dark:text-slate-100">{reviewedTheoriesCount}</span>
                        <span className="text-xs text-slate-400">/ {totalTheoriesCount} complete</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${overallMasteryPct}%` }} />
                      </div>
                    </div>

                    <div 
                      onClick={() => setActiveSection('quiz')}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 shadow-xs cursor-pointer hover:border-emerald-400 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Quiz Evaluations</span>
                        <CheckSquare size={18} className="text-teal-600 group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900 dark:text-slate-100">{progress.quizScores.length}</span>
                        <span className="text-xs text-slate-400">tests completed</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                        Latest score: {progress.quizScores[progress.quizScores.length - 1]?.score || 0}/15
                      </p>
                    </div>

                    <div 
                      onClick={() => setActiveSection('flashcards')}
                      className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 shadow-xs cursor-pointer hover:border-emerald-400 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Flashcard Recall</span>
                        <Book size={18} className="text-amber-600 group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900 dark:text-slate-100">{progress.masteredFlashcards.length}</span>
                        <span className="text-xs text-slate-400">/ {FLASHCARDS.length} mastered</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                        Spaced retrieval for constructs
                      </p>
                    </div>
                  </div>

                  {/* Curated Theory Quick Links */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                        <Lightbulb size={20} className="text-emerald-600" />
                        Quick Theory Jump
                      </h3>
                      <button
                        onClick={() => setActiveSection('keyTheories')}
                        className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                      >
                        View All Categories →
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {COMPREHENSIVE_THEORIES.slice(0, 6).map((theory) => {
                        const isRev = progress.completedTheories.includes(theory.id);
                        return (
                          <div
                            key={theory.id}
                            onClick={() => handleSelectTheory(theory.id)}
                            className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-400 shadow-xs cursor-pointer transition-all flex flex-col justify-between group"
                          >
                            <div className="space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                                  {theory.category}
                                </span>
                                {isRev ? (
                                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                                    <CheckCircle2 size={12} /> Reviewed
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-slate-400">Unreviewed</span>
                                )}
                              </div>
                              <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                                {theory.title}
                              </h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                                {theory.corePremise}
                              </p>
                            </div>
                            
                            <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                              <span>{theory.constructs.length} constructs</span>
                              <span className="group-hover:translate-x-1 transition-transform">Study →</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Interactive Decision Tools Grid */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Compass size={20} className="text-emerald-600" />
                      Interactive Planning & Decision Tools
                    </h3>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div 
                        onClick={() => setActiveSection('decisionMatrix')}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 shadow-xs hover:border-emerald-400 transition-all cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <Compass size={20} />
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">
                          Theory Decision Matrix
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Step-by-step wizard to pick the right theory based on cognitive barriers and target population.
                        </p>
                      </div>

                      <div 
                        onClick={() => setActiveSection('comparisonMatrix')}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 shadow-xs hover:border-teal-400 transition-all cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <Layers size={20} />
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">
                          Construct Comparison
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Side-by-side analysis of Self-Efficacy, Norms, Barriers, and Expectancies across 6 paradigms.
                        </p>
                      </div>

                      <div 
                        onClick={() => setActiveSection('logicModelBuilder')}
                        className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/60 shadow-xs hover:border-cyan-400 transition-all cursor-pointer group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <Workflow size={20} />
                        </div>
                        <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1">
                          PRECEDE Logic Builder
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Interactive 8-phase logic model generator for community and clinical interventions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION: KEY THEORIES CATALOG / GRID OVERVIEW */}
              {activeSection === 'keyTheories' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <SectionTitle 
                    badge="Theories Curriculum" 
                    subtitle="Select any theory for in-depth constructs, operational measurement items, exam traps, and real-world trials."
                    icon={<Lightbulb size={14} />}
                  >
                    Behavioral Theories & Models Catalog
                  </SectionTitle>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {[
                      { id: 'all', label: 'All Paradigms' },
                      { id: 'individual', label: 'Individual (Intrapersonal)' },
                      { id: 'interpersonal', label: 'Interpersonal' },
                      { id: 'community', label: 'Community & Policy' },
                      { id: 'planning', label: 'Planning & Practice' },
                      { id: 'economics', label: 'Behavioral Economics' },
                    ].map((pill) => (
                      <button
                        key={pill.id}
                        onClick={() => setSelectedCategoryFilter(pill.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                          selectedCategoryFilter === pill.id
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700 hover:bg-emerald-50'
                        }`}
                      >
                        {pill.label}
                      </button>
                    ))}
                  </div>

                   {/* Theory Cards Grid */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    {filteredOverviewTheories.map((theory) => {
                      const isRev = progress.completedTheories.includes(theory.id);
                      const isBkm = (progress.bookmarkedTheories || []).includes(theory.id);
                      return (
                        <div
                          key={theory.id}
                          className="bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-xs hover:border-emerald-400 transition-all flex flex-col justify-between"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                                {theory.category} Level
                              </span>
                              
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => handleToggleBookmark(theory.id)}
                                  className={`p-1.5 rounded-lg transition-colors ${
                                    isBkm
                                      ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50'
                                      : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-700'
                                  }`}
                                  title={isBkm ? 'Remove bookmark' : 'Bookmark theory'}
                                >
                                  <Bookmark size={15} className={isBkm ? 'fill-current' : ''} />
                                </button>

                                <button
                                  onClick={() => handleToggleTheoryReviewed(theory.id)}
                                  className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                                    isRev
                                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                                  }`}
                                >
                                  {isRev ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                                  <span>{isRev ? 'Reviewed' : 'Mark Reviewed'}</span>
                                </button>
                              </div>
                            </div>

                            <div>
                              <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 mb-1">
                                <HighlightText text={theory.title} />
                              </h3>
                              {theory.keyTheorists && (
                                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium mb-2">
                                  {theory.keyTheorists}
                                </p>
                              )}
                              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                <HighlightText text={theory.description} />
                              </p>
                            </div>

                            {/* Constructs Badges */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {theory.constructs.map((c, i) => (
                                <span key={i} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded text-[11px]">
                                  <HighlightText text={c.name} />
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                            <span className="text-xs text-slate-400">
                              {theory.constructs.length} Constructs
                            </span>
                            <button
                              onClick={() => handleSelectTheory(theory.id)}
                              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5"
                            >
                              <span>Study Theory</span>
                              <ArrowRight size={13} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SECTION: PLANNING MODELS */}
              {activeSection === 'planningModels' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <SectionTitle 
                    badge="Implementation Science" 
                    subtitle="Logic models for community needs assessment, multi-level planning, and outcome evaluation."
                    icon={<Map size={14} />}
                  >
                    Planning & Implementation Frameworks
                  </SectionTitle>

                  <div className="grid gap-6">
                    {PLANNING_MODELS.map((model) => (
                      <Card key={model.id} title={model.title} className="hover:border-emerald-300 transition-all">
                        <p className="mb-4 text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                          <HighlightText text={model.description} />
                        </p>
                        
                        <div className="p-4 bg-slate-50/80 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-3">
                          <strong className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                            Core Framework Constructs & Steps
                          </strong>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {model.constructs.map((construct, cIdx) => (
                              <div key={cIdx} className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/60 dark:border-slate-700">
                                <span className="block font-bold text-xs text-emerald-800 dark:text-emerald-300 mb-0.5">
                                  {construct.name}
                                </span>
                                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                                  {construct.definition}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={() => handleSelectTheory(model.id)}
                            className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1"
                          >
                            Open Detailed Study View <ArrowRight size={13} />
                          </button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION: ACADEMIC PROGRESS & CERTIFICATION */}
              {activeSection === 'progress' && (
                <div className="animate-in fade-in duration-300">
                  <SectionTitle 
                    badge="Student Portfolio" 
                    subtitle="Monitor theory mastery, quiz scores, game high scores, and generate your printable Certificate of Academic Excellence."
                    icon={<GraduationCap size={14} />}
                  >
                    Academic Progress & Certification
                  </SectionTitle>
                  <ProgressTracker 
                    progress={progress}
                    onUpdateProgress={setProgress}
                    onNavigateToSection={handleSelectSection}
                    onSelectTheory={handleSelectTheory}
                  />
                </div>
              )}

              {/* SECTION: HIGH-YIELD STUDY SHEET */}
              {activeSection === 'studySheet' && (
                <div className="animate-in fade-in duration-300">
                  <SectionTitle 
                    badge="High-Yield Cram Sheet" 
                    subtitle="Mathematical principles, core axioms, and empirical effect sizes from Karen Glanz Health Behavior (5th Edition)."
                    icon={<FileText size={14} />}
                  >
                    High-Yield Academic Review Sheet
                  </SectionTitle>
                  <StudySheet />
                </div>
              )}

              {/* SECTION: THEORY DECISION MATRIX */}
              {activeSection === 'decisionMatrix' && (
                <div className="animate-in fade-in duration-300">
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
                <div className="animate-in fade-in duration-300">
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
                <div className="animate-in fade-in duration-300">
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

              {/* SECTION: FOUNDATIONS */}
              {activeSection === 'foundations' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <SectionTitle 
                    badge="Theoretical Fundamentals" 
                    subtitle="The role of scientific theory in analyzing health behavior, guiding intervention design, and establishing evaluation metrics."
                    icon={<Layers size={14} />}
                  >
                    Foundations of Behavioral Theory
                  </SectionTitle>
                  
                  <div className="grid gap-6">
                    <Card title="Why is Theory Indispensable in Health Promotion?">
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
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
                          <div key={i} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <span className="block font-bold text-emerald-800 dark:text-emerald-300 mb-1">{item.t}</span>
                            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.d}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              )}

              {/* SECTION: QUIZ */}
              {activeSection === 'quiz' && (
                <div className="space-y-6 animate-in fade-in duration-300">
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
                <div className="space-y-6 animate-in fade-in duration-300">
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
                <div className="space-y-6 animate-in fade-in duration-300">
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
                <div className="space-y-6 animate-in fade-in duration-300">
                  <SectionTitle 
                    badge="Spaced Retrieval" 
                    subtitle="Review definitions, related theories, and audio pronunciation for 17 high-yield behavioral constructs."
                    icon={<Book size={14} />}
                  >
                    Construct Flashcards
                  </SectionTitle>
                  <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-700/60 shadow-xs">
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
                <div className="space-y-6 animate-in fade-in duration-300">
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
                        <div key={idx} className="bg-white dark:bg-slate-800/90 p-5 rounded-2xl shadow-xs border border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-300 transition-all">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <h4 className="font-bold text-emerald-800 dark:text-emerald-300 text-sm sm:text-base">
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
                <div className="space-y-6 animate-in fade-in duration-300">
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
                <div className="space-y-6 animate-in fade-in duration-300">
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
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-1">
                        Dr. Fatemeh Zarei
                      </h3>
                      <p className="text-emerald-700 dark:text-emerald-400 mb-1 font-bold text-sm sm:text-base">
                        Associate Prof in Health Education & Health Promotion
                      </p>
                      <p className="text-slate-600 dark:text-slate-300 mb-8 font-medium text-xs sm:text-sm">
                        Faculty of Medical Sciences, Tarbiat Modares University- Tehran, Iran
                      </p>
                      
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <a 
                          href="mailto:f.zarei@modares.ac.ir" 
                          className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs hover:border-emerald-400 transition-all"
                        >
                          <div className="p-3 bg-emerald-50 dark:bg-slate-700 rounded-xl text-emerald-600 dark:text-emerald-400"><Mail size={20} /></div>
                          <div>
                            <span className="block text-[10px] text-slate-400 uppercase font-bold">University Academic Email</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">f.zarei@modares.ac.ir</span>
                          </div>
                        </a>

                        <a 
                          href="mailto:healcono@gmail.com" 
                          className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs hover:border-emerald-400 transition-all"
                        >
                          <div className="p-3 bg-emerald-50 dark:bg-slate-700 rounded-xl text-emerald-600 dark:text-emerald-400"><Mail size={20} /></div>
                          <div>
                            <span className="block text-[10px] text-slate-400 uppercase font-bold">Inquiries & Correspondence</span>
                            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">healcono@gmail.com</span>
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
                            <span className="block text-[10px] text-slate-400 uppercase font-bold">Telegram Channel</span>
                            <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">@healthcono</span>
                          </div>
                        </a>

                        <a 
                          href="https://www.youtube.com/@healcono" 
                          target="_blank" 
                          rel="noreferrer" 
                          className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs hover:border-red-400 transition-all group"
                        >
                          <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-xl text-red-600 dark:text-red-400"><Youtube size={20} /></div>
                          <div>
                            <span className="block text-[10px] text-slate-400 uppercase font-bold">YouTube Lectures & Channel</span>
                            <span className="font-bold text-red-600 dark:text-red-400 text-sm group-hover:underline">@healcono</span>
                          </div>
                        </a>

                        <a 
                          href="tel:00982182884546" 
                          className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 shadow-xs hover:border-emerald-400 transition-all"
                        >
                          <div className="p-3 bg-emerald-50 dark:bg-slate-700 rounded-xl text-emerald-600 dark:text-emerald-400"><Phone size={20} /></div>
                          <div>
                            <span className="block text-[10px] text-slate-400 uppercase font-bold">Department Office</span>
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
                <div className="space-y-6 animate-in fade-in duration-300">
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
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1">
                          <p className="font-semibold text-slate-800 dark:text-slate-200">
                            Dr. Fatemeh Zarei • Associate Prof in Health Education & Health Promotion
                          </p>
                          <p>
                            Faculty of Medical Sciences, Tarbiat Modares University- Tehran, Iran
                          </p>
                          <p className="text-emerald-700 dark:text-emerald-400 flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span>f.zarei@modares.ac.ir</span>
                            <span>•</span>
                            <span>healcono@gmail.com</span>
                            <span>•</span>
                            <a href="https://t.me/healthcono" target="_blank" rel="noreferrer" className="hover:underline">@healthcono (Telegram)</a>
                            <span>•</span>
                            <a href="https://www.youtube.com/@healcono" target="_blank" rel="noreferrer" className="hover:underline text-red-600 dark:text-red-400 flex items-center gap-1">
                              <Youtube size={12} /> @healcono (YouTube)
                            </a>
                          </p>
                        </div>
                     </div>
                  </Card>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-white/80 dark:bg-slate-900/80 text-center text-slate-500 dark:text-slate-400 text-xs border-t border-emerald-100 dark:border-slate-800 backdrop-blur-md">
        <div className="container mx-auto px-4 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-center sm:text-left">
            <span className="font-bold text-emerald-800 dark:text-emerald-300">Tglance Academic Platform</span>
            <span className="hidden sm:inline">•</span>
            <span>Dr. Fatemeh Zarei (Associate Prof, Tarbiat Modares University)</span>
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <a href="mailto:f.zarei@modares.ac.ir" className="hover:underline">f.zarei@modares.ac.ir</a>
            <span>•</span>
            <a href="https://t.me/healthcono" target="_blank" rel="noreferrer" className="hover:underline">@healthcono</a>
            <span>•</span>
            <a href="https://www.youtube.com/@healcono" target="_blank" rel="noreferrer" className="hover:underline text-red-600 dark:text-red-400 flex items-center gap-1">
              <Youtube size={13} /> @healcono
            </a>
            <span>•</span>
            <a href="mailto:healcono@gmail.com" className="hover:underline">healcono@gmail.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
