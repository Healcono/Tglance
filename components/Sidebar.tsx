import React, { useState } from 'react';
import { 
  Home, GraduationCap, Layers, Lightbulb, Map, FileText, 
  Compass, Workflow, CheckSquare, Gamepad2, Award, Book, 
  Link as LinkIcon, MessageSquare, Info, Search, CheckCircle2, 
  Circle, ChevronDown, ChevronRight, X, Sparkles, Send, Mail,
  Zap, BookmarkCheck, Clock, ShieldCheck, Bookmark, Youtube
} from 'lucide-react';
import { SectionId, TheoryItem, StudentProgress } from '../types';
import { COMPREHENSIVE_THEORIES, THEORY_CATEGORIES } from '../constants';

interface SidebarProps {
  activeSection: SectionId;
  selectedTheoryId: string | null;
  onSelectSection: (section: SectionId) => void;
  onSelectTheory: (theoryId: string) => void;
  progress: StudentProgress;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  isMobileDrawerOpen: boolean;
  onCloseMobileDrawer: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  selectedTheoryId,
  onSelectSection,
  onSelectTheory,
  progress,
  searchTerm,
  onSearchChange,
  isMobileDrawerOpen,
  onCloseMobileDrawer
}) => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    individual: true,
    interpersonal: true,
    community: false,
    planning: false,
    economics: false
  });

  const toggleCategory = (catKey: string) => {
    setOpenCategories(prev => ({ ...prev, [catKey]: !prev[catKey] }));
  };

  const reviewedCount = progress.completedTheories.length;
  const totalTheories = COMPREHENSIVE_THEORIES.length;
  const progressPercent = Math.round((reviewedCount / totalTheories) * 100);

  // Filter theories based on search
  const filteredTheories = COMPREHENSIVE_THEORIES.filter(t => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      t.title.toLowerCase().includes(term) ||
      t.shortName.toLowerCase().includes(term) ||
      t.category.toLowerCase().includes(term) ||
      t.description.toLowerCase().includes(term) ||
      t.constructs.some(c => c.name.toLowerCase().includes(term))
    );
  });

  const handleNavClick = (section: SectionId) => {
    onSelectSection(section);
    onCloseMobileDrawer();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTheoryClick = (theoryId: string) => {
    onSelectTheory(theoryId);
    onCloseMobileDrawer();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const content = (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Search Filter Box */}
      <div className="relative shrink-0">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
        <input 
          type="text" 
          placeholder="Search theories, constructs..." 
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-8 py-2.5 bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-xs transition-all text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
        />
        {searchTerm && (
          <button 
            onClick={() => onSearchChange('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Progress Summary Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50/40 to-slate-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 border border-emerald-100 dark:border-emerald-800/50 space-y-2 shrink-0">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
            <BookmarkCheck size={14} className="text-emerald-600" />
            Curriculum Progress
          </span>
          <span className="font-bold text-slate-700 dark:text-slate-300">
            {reviewedCount}/{totalTheories}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-emerald-100/80 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-emerald-600 dark:bg-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 pt-0.5">
          <span>{progressPercent}% Exam Ready</span>
          <button 
            onClick={() => handleNavClick('progress')}
            className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
          >
            View Portfolio →
          </button>
        </div>
      </div>

      {/* Main Nav Items and Theory Tree */}
      <nav className="space-y-6 flex-1 overflow-y-auto pr-1 scrollbar-thin">
        
        {/* Core Sections */}
        <div className="space-y-1">
          <span className="block px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
            Academic Navigation
          </span>
          
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeSection === 'home' && !selectedTheoryId
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-emerald-50/70 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Home size={16} />
              <span>Overview & Hub</span>
            </div>
          </button>

          <button
            onClick={() => handleNavClick('progress')}
            className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeSection === 'progress' && !selectedTheoryId
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-emerald-50/70 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <GraduationCap size={16} />
              <span>Progress & Certificate</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 uppercase">
              {progressPercent}%
            </span>
          </button>

          <button
            onClick={() => handleNavClick('studySheet')}
            className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeSection === 'studySheet' && !selectedTheoryId
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-emerald-50/70 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-300'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText size={16} />
              <span>High-Yield Study Sheet</span>
            </div>
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 uppercase">
              Cram
            </span>
          </button>
        </div>

        {/* Theories & Models Table of Contents Tree */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-3 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Theories Curriculum ({filteredTheories.length})
            </span>
            <button
              onClick={() => handleNavClick('keyTheories')}
              className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
            >
              All Overview
            </button>
          </div>

          {searchTerm ? (
            /* Flattened search result list */
            <div className="space-y-1">
              {filteredTheories.map((theory) => {
                const isSelected = selectedTheoryId === theory.id;
                const isReviewed = progress.completedTheories.includes(theory.id);
                const isBookmarked = (progress.bookmarkedTheories || []).includes(theory.id);
                return (
                  <button
                    key={theory.id}
                    onClick={() => handleTheoryClick(theory.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all text-left ${
                      isSelected
                        ? 'bg-emerald-600 text-white font-bold shadow-xs'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {isReviewed ? (
                        <CheckCircle2 size={13} className={isSelected ? 'text-white' : 'text-emerald-600 shrink-0'} />
                      ) : (
                        <Circle size={13} className="text-slate-300 dark:text-slate-600 shrink-0" />
                      )}
                      <span className="truncate">{theory.shortName}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {isBookmarked && (
                        <Bookmark size={11} className={isSelected ? 'text-amber-200 fill-current' : 'text-amber-500 fill-current'} />
                      )}
                      <span className="text-[9px] opacity-70 uppercase font-mono">{theory.category.substring(0, 3)}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            /* Categorized Theory Accordions */
            <div className="space-y-2.5">
              {Object.entries(THEORY_CATEGORIES).map(([catKey, category]) => {
                const isOpen = openCategories[catKey] ?? true;
                const catTheories = category.items;
                const catReviewed = catTheories.filter(t => progress.completedTheories.includes(t.id)).length;

                return (
                  <div key={catKey} className="rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 overflow-hidden">
                    <button
                      onClick={() => toggleCategory(catKey)}
                      className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {isOpen ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />}
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 capitalize">
                          {catKey} Level
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">
                        {catReviewed}/{catTheories.length}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-1.5 pb-1.5 space-y-0.5">
                        {catTheories.map((theory) => {
                          const isSelected = selectedTheoryId === theory.id;
                          const isReviewed = progress.completedTheories.includes(theory.id);
                          const isBookmarked = (progress.bookmarkedTheories || []).includes(theory.id);

                          return (
                            <button
                              key={theory.id}
                              onClick={() => handleTheoryClick(theory.id)}
                              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all text-left ${
                                isSelected
                                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                                  : 'text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-slate-700/50 hover:text-emerald-800 dark:hover:text-emerald-200'
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                {isReviewed ? (
                                  <CheckCircle2 size={13} className={isSelected ? 'text-white' : 'text-emerald-600 shrink-0'} />
                                ) : (
                                  <Circle size={13} className="text-slate-300 dark:text-slate-600 shrink-0" />
                                )}
                                <span className="truncate">{theory.shortName}</span>
                              </div>
                              {isBookmarked && (
                                <Bookmark size={11} className={isSelected ? 'text-amber-200 fill-current' : 'text-amber-500 fill-current shrink-0'} />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Interactive Tools & Self-Assessment */}
        <div className="space-y-1">
          <span className="block px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
            Interactive Tools & Quizzes
          </span>

          {[
            { id: 'decisionMatrix' as SectionId, icon: <Compass size={16} />, label: 'Theory Decision Matrix', badge: 'Wizard' },
            { id: 'comparisonMatrix' as SectionId, icon: <Layers size={16} />, label: 'Construct Comparison Matrix' },
            { id: 'logicModelBuilder' as SectionId, icon: <Workflow size={16} />, label: 'PRECEDE Logic Builder' },
            { id: 'quiz' as SectionId, icon: <CheckSquare size={16} />, label: 'Academic Mastery Quiz' },
            { id: 'game' as SectionId, icon: <Gamepad2 size={16} />, label: 'Speed Recall Game' },
            { id: 'scenarioChallenge' as SectionId, icon: <Award size={16} />, label: 'Case Study Simulations' },
            { id: 'flashcards' as SectionId, icon: <Book size={16} />, label: 'Construct Flashcards' },
            { id: 'glossary' as SectionId, icon: <Book size={16} />, label: 'Academic Glossary' },
          ].map((tool) => {
            const active = activeSection === tool.id && !selectedTheoryId;
            return (
              <button
                key={tool.id}
                onClick={() => handleNavClick(tool.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-emerald-50/70 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {tool.icon}
                  <span>{tool.label}</span>
                </div>
                {tool.badge && (
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                    active ? 'bg-white/20 text-white' : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                  }`}>
                    {tool.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Resources & Contact */}
        <div className="space-y-1">
          <span className="block px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5">
            Academic Attribution
          </span>

          {[
            { id: 'usefulSources' as SectionId, icon: <LinkIcon size={16} />, label: 'Seminal Publications' },
            { id: 'contactUs' as SectionId, icon: <MessageSquare size={16} />, label: 'Contact & Faculty Info' },
            { id: 'about' as SectionId, icon: <Info size={16} />, label: 'About Tglance' },
          ].map((item) => {
            const active = activeSection === item.id && !selectedTheoryId;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-emerald-50/70 dark:hover:bg-slate-800 hover:text-emerald-700 dark:hover:text-emerald-300'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Developer Faculty Card */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 text-xs space-y-1.5 shrink-0">
        <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
          Academic Developer & Advisor
        </span>
        <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">Dr. Fatemeh Zarei</p>
        <p className="text-emerald-800 dark:text-emerald-400 font-semibold text-[11px] leading-snug">
          Associate Prof in Health Education & Health Promotion
        </p>
        <p className="text-slate-500 dark:text-slate-400 text-[10.5px] leading-tight">
          Faculty of Medical Sciences, Tarbiat Modares University- Tehran, Iran
        </p>
        <div className="pt-2 mt-1 flex flex-col gap-1.5 border-t border-slate-200/60 dark:border-slate-700/60 text-[10.5px]">
          <div className="flex items-center justify-between text-xs font-medium">
            <a href="https://t.me/healthcono" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1 text-sky-600 dark:text-sky-400 font-semibold">
              <Send size={11} className="text-sky-500" /> @healthcono
            </a>
            <a href="https://www.youtube.com/@healcono" target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1 text-red-600 dark:text-red-400 font-semibold">
              <Youtube size={11} /> @healcono
            </a>
          </div>
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <a href="mailto:f.zarei@modares.ac.ir" className="hover:underline flex items-center gap-1">
              <Mail size={10} /> f.zarei@modares.ac.ir
            </a>
            <a href="mailto:healcono@gmail.com" className="hover:underline flex items-center gap-1">
              <Mail size={10} /> healcono@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:block w-72 shrink-0">
        <div className="sticky top-20 h-[calc(100vh-6rem)] overflow-hidden">
          {content}
        </div>
      </aside>

      {/* Mobile Drawer */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div 
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm animate-in fade-in" 
            onClick={onCloseMobileDrawer} 
          />
          <div className="relative w-4/5 max-w-xs bg-white dark:bg-slate-900 h-full shadow-2xl p-5 flex flex-col border-r border-slate-200 dark:border-slate-800 animate-in slide-in-from-left duration-200">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-base">
                  T
                </div>
                <h2 className="font-bold text-lg text-emerald-950 dark:text-emerald-300">Tglance</h2>
              </div>
              <button 
                onClick={onCloseMobileDrawer} 
                className="p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                <X size={20} />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
