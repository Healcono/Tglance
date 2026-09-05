import React, { useState } from 'react';
import { FlashcardItem } from '../types';
import { 
  ArrowLeft, ArrowRight, RefreshCw, Volume2, 
  CheckCircle2, Shuffle, BookmarkCheck, Sparkles, Filter 
} from 'lucide-react';

interface FlashcardsProps {
  cards: FlashcardItem[];
  masteredIds?: string[];
  onToggleMastered?: (cardId: string) => void;
}

const Flashcards: React.FC<FlashcardsProps> = ({ 
  cards, 
  masteredIds = [], 
  onToggleMastered 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cardOrder, setCardOrder] = useState<number[]>(cards.map((_, i) => i));

  const categories = ['all', 'individual', 'interpersonal', 'community', 'planning', 'economics'];

  const filteredIndices = cardOrder.filter(idx => {
    const card = cards[idx];
    return selectedCategory === 'all' || card?.category === selectedCategory;
  });

  const activeIndex = filteredIndices[currentIndex] ?? filteredIndices[0] ?? 0;
  const currentCard = cards[activeIndex] || cards[0];
  const isMastered = masteredIds.includes(currentCard?.id);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredIndices.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + filteredIndices.length) % filteredIndices.length);
    }, 150);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...cardOrder].sort(() => Math.random() - 0.5);
    setCardOrder(shuffled);
    setCurrentIndex(0);
  };

  const speakTerm = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window && currentCard) {
      const utterance = new SpeechSynthesisUtterance(currentCard.term);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!currentCard) {
    return (
      <div className="text-center py-12 text-slate-500">
        No flashcards found for the selected filter.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto space-y-6 animate-in fade-in duration-500">
      {/* Category Pills & Controls */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700 shadow-sm">
        <div className="flex flex-wrap gap-1.5">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => {
                setSelectedCategory(c);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all ${
                selectedCategory === c
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {c === 'all' ? 'All Cards' : c}
            </button>
          ))}
        </div>

        <button
          onClick={handleShuffle}
          className="p-2 rounded-xl text-slate-500 hover:text-emerald-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-all flex items-center gap-1.5 text-xs font-semibold"
          title="Shuffle Deck"
        >
          <Shuffle size={14} /> Shuffle
        </button>
      </div>

      {/* 3D Flip Card Container */}
      <div 
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] perspective-1000 cursor-pointer select-none"
        onClick={handleFlip}
      >
        <div 
          className={`relative w-full h-full duration-500 transform-style-3d transition-all ${isFlipped ? 'rotate-y-180' : ''}`}
        >
          {/* Front Face */}
          <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-white to-emerald-50/30 dark:from-slate-800 dark:to-slate-900 border-2 border-emerald-100/80 dark:border-slate-700 rounded-3xl shadow-xl shadow-emerald-950/5 flex flex-col justify-between p-8 text-center transition-all hover:border-emerald-300 dark:hover:border-emerald-700">
            <div className="flex items-center justify-between w-full">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
                {currentCard.category || 'Theoretical Construct'}
              </span>
              <button 
                onClick={speakTerm}
                className="p-2 rounded-full bg-emerald-50 dark:bg-slate-700 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 transition-colors"
                title="Pronounce Term"
              >
                <Volume2 size={16} />
              </button>
            </div>

            <div className="my-auto">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                {currentCard.term}
              </h3>
              {currentCard.relatedTheory && (
                <p className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {currentCard.relatedTheory}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between w-full text-xs text-slate-400 font-medium">
              <span>Card {currentIndex + 1} of {filteredIndices.length}</span>
              <span className="uppercase tracking-widest text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Tap to reveal definition ↺</span>
            </div>
          </div>

          {/* Back Face */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-emerald-800 via-teal-800 to-slate-900 rounded-3xl shadow-xl flex flex-col justify-between p-8 text-center text-white border border-emerald-600/30">
            <div className="flex items-center justify-between w-full">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-emerald-200 backdrop-blur-md">
                Theoretical Concept
              </span>
              <span className="text-xs text-emerald-200/80 font-semibold">{currentCard.term}</span>
            </div>

            <div className="my-auto px-2">
              <p className="text-sm sm:text-base leading-relaxed font-medium text-emerald-50">
                {currentCard.definition}
              </p>
            </div>

            <div className="flex items-center justify-between w-full text-xs text-emerald-200/80">
              <span>{currentCard.relatedTheory}</span>
              <span className="uppercase tracking-widest text-[10px] font-bold">Tap to flip back</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Controls & Navigation */}
      <div className="flex items-center justify-between w-full gap-4">
        <button 
          onClick={handlePrev}
          className="p-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:scale-105"
          title="Previous Card"
        >
          <ArrowLeft size={18} />
        </button>

        {onToggleMastered && (
          <button
            onClick={() => onToggleMastered(currentCard.id)}
            className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm ${
              isMastered
                ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-700'
            }`}
          >
            <CheckCircle2 size={16} className={isMastered ? 'text-white' : 'text-slate-400'} />
            {isMastered ? 'Mastered Concept' : 'Mark as Mastered'}
          </button>
        )}

        <button 
          onClick={handleNext}
          className="p-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:scale-105"
          title="Next Card"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Flashcards;
