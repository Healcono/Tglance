import React, { useState, useMemo } from 'react';
import { StudentProgress, Badge, TheoryItem } from '../types';
import { BADGES, COMPREHENSIVE_THEORIES, THEORY_CATEGORIES } from '../constants';
import { 
  Award, CheckCircle2, Flame, GraduationCap, 
  Printer, Sparkles, BookOpen, Clock, FileText, UserCheck, ShieldCheck, Download,
  Bookmark, ArrowRight, Trash2, ExternalLink, Star, Layers, Youtube, Send, Mail
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProgressTrackerProps {
  progress: StudentProgress;
  onUpdateProgress: (updater: (prev: StudentProgress) => StudentProgress) => void;
  onNavigateToSection: (section: any) => void;
  onSelectTheory?: (theoryId: string) => void;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ 
  progress, 
  onUpdateProgress, 
  onNavigateToSection,
  onSelectTheory
}) => {
  const [editingProfile, setEditingProfile] = useState(false);
  const [nameInput, setNameInput] = useState(progress.studentName);
  const [uniInput, setUniInput] = useState(progress.university);
  const [roleInput, setRoleInput] = useState(progress.role);
  const [showCertificate, setShowCertificate] = useState(false);
  const [favoriteCategoryFilter, setFavoriteCategoryFilter] = useState<string>('all');

  // Compute stats
  const totalTheories = COMPREHENSIVE_THEORIES.length;
  const completedTheoriesCount = progress.completedTheories.length;
  const theoryProgressPct = Math.round((completedTheoriesCount / totalTheories) * 100);

  const bookmarkedTheoriesList: TheoryItem[] = COMPREHENSIVE_THEORIES.filter(t => 
    (progress.bookmarkedTheories || []).includes(t.id)
  );

  // Group bookmarked theories by category
  const categoryOrder = [
    { key: 'individual', title: 'Individual (Intrapersonal) Level', badge: 'Intrapersonal', color: 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300' },
    { key: 'interpersonal', title: 'Interpersonal Level', badge: 'Interpersonal', color: 'border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-950/20 text-teal-800 dark:text-teal-300' },
    { key: 'community', title: 'Community & Environmental Level', badge: 'Community & Policy', color: 'border-cyan-200 dark:border-cyan-800 bg-cyan-50/50 dark:bg-cyan-950/20 text-cyan-800 dark:text-cyan-300' },
    { key: 'planning', title: 'Planning & Implementation Models', badge: 'Planning Models', color: 'border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-800 dark:text-indigo-300' },
    { key: 'economics', title: 'Behavioral Economics & Choice Architecture', badge: 'Behavioral Economics', color: 'border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300' }
  ];

  const groupedFavorites = useMemo(() => {
    const groups: { [key: string]: TheoryItem[] } = {};
    categoryOrder.forEach(cat => {
      groups[cat.key] = bookmarkedTheoriesList.filter(t => t.category === cat.key);
    });
    return groups;
  }, [bookmarkedTheoriesList]);

  const totalQuizzesTaken = progress.quizScores.length;
  const latestQuiz = progress.quizScores[progress.quizScores.length - 1];
  const avgQuizScore = totalQuizzesTaken > 0
    ? Math.round((progress.quizScores.reduce((acc, q) => acc + (q.score / q.total), 0) / totalQuizzesTaken) * 100)
    : 0;

  const scenariosCompletedCount = progress.completedScenarios.length;
  const flashcardsMasteredCount = progress.masteredFlashcards.length;

  // Calculate overall mastery score
  const overallMastery = Math.min(100, Math.round(
    (theoryProgressPct * 0.3) + 
    (avgQuizScore * 0.3) + 
    (Math.min(100, (scenariosCompletedCount / 5) * 100) * 0.2) + 
    (Math.min(100, (flashcardsMasteredCount / 15) * 100) * 0.2)
  ));

  const isEligibleForCertificate = overallMastery >= 60;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProgress(prev => ({
      ...prev,
      studentName: nameInput || 'Student',
      university: uniInput || 'Academic Institution',
      role: roleInput
    }));
    setEditingProfile(false);
  };

  const handleTriggerCertificate = () => {
    setShowCertificate(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0d9488', '#10b981', '#059669', '#34d399', '#6ee7b7']
    });
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const handleToggleBookmark = (theoryId: string) => {
    onUpdateProgress(prev => {
      const current = prev.bookmarkedTheories || [];
      const updated = current.includes(theoryId)
        ? current.filter(id => id !== theoryId)
        : [...current, theoryId];
      return {
        ...prev,
        bookmarkedTheories: updated
      };
    });
  };

  const handleStudyTheory = (theoryId: string) => {
    if (onSelectTheory) {
      onSelectTheory(theoryId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigateToSection('keyTheories');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Profile & Mastery Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-teal-800 to-slate-900 text-white p-8 md:p-10 shadow-xl shadow-teal-900/10 border border-emerald-700/30">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              <GraduationCap size={14} className="text-emerald-300" />
              <span>Academic Portfolio & Progress</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              {progress.studentName}
            </h2>
            <p className="text-emerald-100/80 text-sm sm:text-base font-normal max-w-xl">
              {progress.university} • <span className="capitalize">{progress.role}</span> in Health Promotion & Behavioral Science
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setEditingProfile(!editingProfile)}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium transition-all backdrop-blur-md border border-white/20"
            >
              {editingProfile ? 'Close Edit' : 'Edit Profile'}
            </button>
            {isEligibleForCertificate && (
              <button
                onClick={handleTriggerCertificate}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-900 text-xs sm:text-sm font-bold shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2 hover:scale-105"
              >
                <Award size={16} className="text-slate-900" />
                View Certificate
              </button>
            )}
          </div>
        </div>

        {/* Profile Edit Form */}
        {editingProfile && (
          <form onSubmit={handleSaveProfile} className="relative z-10 mt-6 pt-6 border-t border-emerald-500/30 grid sm:grid-cols-3 gap-4 bg-emerald-950/40 p-5 rounded-2xl backdrop-blur-md">
            <div>
              <label className="block text-xs font-medium text-emerald-200 mb-1">Your Full Name</label>
              <input
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                placeholder="e.g. Dr. Jane Smith"
                className="w-full px-3.5 py-2 bg-slate-900/80 border border-emerald-600/40 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-emerald-200 mb-1">University / Organization</label>
              <input
                type="text"
                value={uniInput}
                onChange={e => setUniInput(e.target.value)}
                placeholder="e.g. Tarbiat Modares University"
                className="w-full px-3.5 py-2 bg-slate-900/80 border border-emerald-600/40 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-emerald-200 mb-1">Academic Role</label>
              <select
                value={roleInput}
                onChange={e => setRoleInput(e.target.value as any)}
                className="w-full px-3.5 py-2 bg-slate-900/80 border border-emerald-600/40 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="student">Student / Researcher</option>
                <option value="practitioner">Health Promotion Practitioner</option>
                <option value="instructor">Instructor / Faculty</option>
              </select>
            </div>
            <div className="sm:col-span-3 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl text-sm transition-all"
              >
                Save Details
              </button>
            </div>
          </form>
        )}

        {/* High-level Metric Pills */}
        <div className="relative z-10 mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-medium mb-1">
              <Sparkles size={13} /> Overall Mastery
            </div>
            <p className="text-xl sm:text-2xl font-black text-white">{overallMastery}%</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-medium mb-1">
              <BookOpen size={13} /> Studied
            </div>
            <p className="text-xl sm:text-2xl font-black text-white">{completedTheoriesCount} / {totalTheories}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-1.5 text-amber-300 text-xs font-medium mb-1">
              <Bookmark size={13} className="fill-current" /> Favorites
            </div>
            <p className="text-xl sm:text-2xl font-black text-white">{bookmarkedTheoriesList.length} Saved</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-medium mb-1">
              <CheckCircle2 size={13} /> Avg Quiz Score
            </div>
            <p className="text-xl sm:text-2xl font-black text-white">{avgQuizScore}%</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md col-span-2 sm:col-span-1">
            <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-medium mb-1">
              <Flame size={13} className="text-amber-400" /> Study Streak
            </div>
            <p className="text-xl sm:text-2xl font-black text-white">{progress.studyStreakDays} Days</p>
          </div>
        </div>
      </div>

      {/* FAVORITE THEORIES SECTION - GROUPED BY CATEGORY */}
      <div className="bg-gradient-to-br from-amber-50/70 via-white to-emerald-50/40 dark:from-slate-900/90 dark:via-slate-800/90 dark:to-slate-900/90 rounded-3xl p-6 sm:p-8 shadow-xs border border-amber-200/80 dark:border-amber-800/40 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Bookmark size={20} className="text-amber-500 fill-amber-500" />
              Favorite Theories ({bookmarkedTheoriesList.length})
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Your saved high-yield theoretical frameworks, organized hierarchically by ecological level.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => onNavigateToSection('keyTheories')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
            >
              <span>Browse All Catalog</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {bookmarkedTheoriesList.length > 0 ? (
          <div className="space-y-6">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setFavoriteCategoryFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  favoriteCategoryFilter === 'all'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 hover:bg-amber-50'
                }`}
              >
                <Layers size={13} />
                <span>All Levels ({bookmarkedTheoriesList.length})</span>
              </button>

              {categoryOrder.map(cat => {
                const count = (groupedFavorites[cat.key] || []).length;
                if (count === 0 && favoriteCategoryFilter !== cat.key) return null;
                const isSelected = favoriteCategoryFilter === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setFavoriteCategoryFilter(cat.key)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'bg-white/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 hover:bg-amber-50'
                    }`}
                  >
                    <span>{cat.badge}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-amber-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Categorized Groups */}
            <div className="space-y-6">
              {categoryOrder
                .filter(cat => favoriteCategoryFilter === 'all' || favoriteCategoryFilter === cat.key)
                .map(cat => {
                  const theoriesInCat = groupedFavorites[cat.key] || [];
                  if (theoriesInCat.length === 0) return null;

                  return (
                    <div 
                      key={cat.key} 
                      className="rounded-2xl p-4 sm:p-5 bg-white/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 space-y-3.5 backdrop-blur-xs"
                    >
                      {/* Category Header */}
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider border ${cat.color}`}>
                            {cat.badge} Level
                          </span>
                          <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base">
                            {cat.title}
                          </h4>
                        </div>
                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/80 px-2 py-0.5 rounded-lg">
                          {theoriesInCat.length} {theoriesInCat.length === 1 ? 'saved theory' : 'saved theories'}
                        </span>
                      </div>

                      {/* Theory Cards in this Category */}
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                        {theoriesInCat.map((theory) => {
                          const isMastered = progress.completedTheories.includes(theory.id);
                          return (
                            <div
                              key={theory.id}
                              className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-amber-200/70 dark:border-slate-700 shadow-xs hover:border-amber-400 transition-all flex flex-col justify-between group"
                            >
                              <div className="space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                                      {theory.shortName}
                                    </span>
                                    <h5 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base mt-1.5 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                                      {theory.title}
                                    </h5>
                                  </div>
                                  <button
                                    onClick={() => handleToggleBookmark(theory.id)}
                                    className="p-1.5 rounded-lg text-amber-500 hover:bg-amber-50 dark:hover:bg-slate-700 transition-colors shrink-0"
                                    title="Remove from Favorites"
                                    aria-label="Remove bookmark"
                                  >
                                    <Bookmark size={16} className="fill-current" />
                                  </button>
                                </div>

                                {theory.keyTheorists && (
                                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                                    <strong>Theorists:</strong> {theory.keyTheorists}
                                  </p>
                                )}

                                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                                  "{theory.corePremise}"
                                </p>
                              </div>

                              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                                <button
                                  onClick={() => {
                                    onUpdateProgress(prev => {
                                      const exists = prev.completedTheories.includes(theory.id);
                                      return {
                                        ...prev,
                                        completedTheories: exists 
                                          ? prev.completedTheories.filter(id => id !== theory.id)
                                          : [...prev.completedTheories, theory.id]
                                      };
                                    });
                                  }}
                                  className={`text-[11px] font-semibold flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all ${
                                    isMastered
                                      ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300'
                                      : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                                  }`}
                                >
                                  <CheckCircle2 size={13} className={isMastered ? 'text-emerald-600' : 'text-slate-400'} />
                                  <span>{isMastered ? 'Mastered' : 'Mark Done'}</span>
                                </button>

                                <button
                                  onClick={() => handleStudyTheory(theory.id)}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-xs transition-all hover:scale-105"
                                >
                                  <span>Study View</span>
                                  <ArrowRight size={13} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white/60 dark:bg-slate-800/40 border border-dashed border-amber-200 dark:border-slate-700 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Bookmark size={22} />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">No Favorite Theories Bookmarked Yet</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Click the <strong>Bookmark</strong> button while reviewing any theory in the study view to save and organize it here by ecological category.
              </p>
            </div>
            <button
              onClick={() => onNavigateToSection('keyTheories')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-xs transition-all inline-flex items-center gap-1.5"
            >
              <BookOpen size={14} />
              <span>Explore Theories to Bookmark</span>
            </button>
          </div>
        )}
      </div>

      {/* Progress Breakdown Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Module Mastery Card */}
        <div className="md:col-span-2 bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-700/60">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-2">
            <BookOpen size={20} className="text-teal-600 dark:text-teal-400" />
            Theoretical Framework Mastery
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            Track your understanding of individual, interpersonal, community, and planning paradigms.
          </p>

          <div className="space-y-4">
            {COMPREHENSIVE_THEORIES.map((theory) => {
              const isRead = progress.completedTheories.includes(theory.id);
              return (
                <div 
                  key={theory.id}
                  className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 transition-all hover:border-emerald-200 dark:hover:border-emerald-800"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-sm sm:text-base truncate">
                        {theory.title}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
                        {theory.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {theory.corePremise}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onUpdateProgress(prev => {
                        const exists = prev.completedTheories.includes(theory.id);
                        return {
                          ...prev,
                          completedTheories: exists 
                            ? prev.completedTheories.filter(id => id !== theory.id)
                            : [...prev.completedTheories, theory.id]
                        };
                      });
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                      isRead
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    <CheckCircle2 size={14} className={isRead ? 'text-white' : 'text-slate-400'} />
                    {isRead ? 'Mastered' : 'Mark Studied'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Badges and Quick Actions Card */}
        <div className="space-y-6">
          {/* Achievements / Badges */}
          <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-700/60">
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1 flex items-center gap-2">
              <Award size={18} className="text-amber-500" />
              Academic Badges
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Unlock milestones as you quiz, game, and analyze cases.
            </p>

            <div className="space-y-3">
              {BADGES.map((badge) => {
                let unlocked = false;
                if (badge.id === 'b_explorer' && completedTheoriesCount >= 3) unlocked = true;
                if (badge.id === 'b_scholar' && avgQuizScore >= 80) unlocked = true;
                if (badge.id === 'b_speedster' && progress.gameHighScore >= 5) unlocked = true;
                if (badge.id === 'b_strategist' && scenariosCompletedCount >= 3) unlocked = true;
                if (badge.id === 'b_memory' && flashcardsMasteredCount >= 10) unlocked = true;
                if (badge.id === 'b_architect' && (completedTheoriesCount >= 1)) unlocked = true;

                return (
                  <div
                    key={badge.id}
                    className={`p-3.5 rounded-2xl flex items-center gap-3.5 transition-all ${
                      unlocked
                        ? 'bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50'
                        : 'bg-slate-50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800 opacity-60'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      unlocked 
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' 
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-400'
                    }`}>
                      <Award size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
                          {badge.title}
                        </p>
                        {unlocked && (
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                            Unlocked
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Study Tools Navigation */}
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50/70 dark:from-slate-800/80 dark:to-slate-900/80 rounded-3xl p-6 border border-emerald-100 dark:border-slate-700">
            <h4 className="text-sm font-bold text-teal-900 dark:text-teal-200 uppercase tracking-wider mb-3">
              Fast Study Hub
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => onNavigateToSection('decisionMatrix')}
                className="p-3 bg-white dark:bg-slate-800 rounded-xl text-left border border-teal-100/60 dark:border-slate-700 shadow-sm hover:border-teal-400 transition-all text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                🎯 Theory Wizard
              </button>
              <button
                onClick={() => onNavigateToSection('comparisonMatrix')}
                className="p-3 bg-white dark:bg-slate-800 rounded-xl text-left border border-teal-100/60 dark:border-slate-700 shadow-sm hover:border-teal-400 transition-all text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                📊 Compare Constructs
              </button>
              <button
                onClick={() => onNavigateToSection('logicModelBuilder')}
                className="p-3 bg-white dark:bg-slate-800 rounded-xl text-left border border-teal-100/60 dark:border-slate-700 shadow-sm hover:border-teal-400 transition-all text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                🧩 Logic Model Tool
              </button>
              <button
                onClick={() => onNavigateToSection('studySheet')}
                className="p-3 bg-white dark:bg-slate-800 rounded-xl text-left border border-teal-100/60 dark:border-slate-700 shadow-sm hover:border-teal-400 transition-all text-xs font-semibold text-slate-700 dark:text-slate-200"
              >
                📑 High-Yield Sheet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-6 sm:p-10 border-8 border-emerald-800/10 text-slate-900 animate-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            {/* Close / Action Top Bar */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100 print:hidden">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <ShieldCheck size={18} className="text-emerald-600" />
                Verified Academic Certificate of Completion
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrintCertificate}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all"
                >
                  <Printer size={15} /> Print / PDF
                </button>
                <button
                  onClick={() => setShowCertificate(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Printable Certificate Frame */}
            <div className="p-8 sm:p-12 border-4 border-emerald-900/20 rounded-2xl bg-gradient-to-b from-emerald-50/20 via-white to-emerald-50/30 text-center relative overflow-hidden">
              {/* Seal Background Stamp */}
              <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none">
                <GraduationCap size={160} className="text-emerald-900" />
              </div>

              <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-100 text-emerald-800 mb-4">
                <Award size={36} />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 uppercase tracking-widest font-serif mb-2">
                Certificate of Academic Excellence
              </h2>
              <p className="text-xs sm:text-sm font-semibold tracking-wider text-emerald-700 uppercase mb-8">
                Health Behavior Theories & Intervention Planning
              </p>

              <p className="text-sm text-slate-600 mb-2">This is to certify that</p>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 border-b-2 border-emerald-600/30 inline-block px-8 pb-2 mb-4 font-serif">
                {progress.studentName}
              </h3>
              <p className="text-sm font-medium text-slate-600 mb-6 max-w-lg mx-auto leading-relaxed">
                has successfully demonstrated proficiency and mastery in core behavioral theories, interpersonal mechanisms, socioecological models, and PRECEDE-PROCEED intervention mapping.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto mb-10 text-xs">
                <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <span className="block font-bold text-emerald-900">{overallMastery}%</span>
                  <span className="text-slate-500">Overall Score</span>
                </div>
                <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <span className="block font-bold text-emerald-900">{completedTheoriesCount} / {totalTheories}</span>
                  <span className="text-slate-500">Theories</span>
                </div>
                <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <span className="block font-bold text-emerald-900">{scenariosCompletedCount} Cases</span>
                  <span className="text-slate-500">Simulations</span>
                </div>
                <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <span className="block font-bold text-emerald-900">Glanz 5th Ed.</span>
                  <span className="text-slate-500">Framework</span>
                </div>
              </div>

              {/* Signatures & Seal */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="text-left">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Academic Advisor & Developer</p>
                  <p className="font-bold text-slate-900 text-sm">Dr. Fatemeh Zarei</p>
                  <p className="text-xs font-medium text-emerald-800">Associate Prof in Health Education & Health Promotion</p>
                  <p className="text-[11px] text-slate-500">Faculty of Medical Sciences, Tarbiat Modares University- Tehran, Iran</p>
                  <p className="text-[10.5px] text-slate-600 mt-1 flex flex-wrap items-center gap-1.5">
                    <span>f.zarei@modares.ac.ir</span>
                    <span>•</span>
                    <span className="text-sky-700 font-semibold">Telegram: @healthcono</span>
                    <span>•</span>
                    <span className="text-red-700 font-semibold">YouTube: @healcono</span>
                    <span>•</span>
                    <span>healcono@gmail.com</span>
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full border-2 border-dashed border-emerald-700 flex items-center justify-center text-emerald-800 font-bold text-[10px] uppercase">
                    SEAL
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1">Verified Tglance ID: {progress.studentId || 'HB-2026-X'}</span>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Date of Certification</p>
                  <p className="font-bold text-slate-900 text-sm">
                    {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-xs text-slate-500">Academic Year 2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;
