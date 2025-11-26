import React, { useState } from 'react';
import { FlashcardItem } from '../types';
import { ArrowLeft, ArrowRight, RefreshCw, RotateCw } from 'lucide-react';

interface FlashcardsProps {
  cards: FlashcardItem[];
}

const Flashcards: React.FC<FlashcardsProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 200);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 200);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const currentCard = cards[currentIndex];

  const speakTerm = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentCard.term);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md">
      <div 
        className="relative w-full aspect-[3/2] perspective-1000 cursor-pointer group"
        onClick={handleFlip}
      >
        <div 
          className={`relative w-full h-full duration-500 transform-style-3d transition-all ${isFlipped ? 'rotate-y-180' : ''}`}
        >
          {/* Front */}
          <div className="absolute w-full h-full backface-hidden bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col items-center justify-center p-8 text-center hover:scale-[1.02] transition-transform">
            <h3 className="text-2xl font-bold text-teal-800 dark:text-teal-100">{currentCard.term}</h3>
            <button 
              onClick={speakTerm}
              className="mt-6 p-3 rounded-full bg-teal-50 dark:bg-slate-600 hover:bg-teal-100 dark:hover:bg-slate-500 text-teal-600 dark:text-teal-200 transition-colors"
              title="Pronounce"
            >
              <RotateCw size={18} />
            </button>
            <p className="absolute bottom-6 text-xs text-slate-400 font-medium tracking-wide uppercase">Click to flip</p>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-teal-600 dark:bg-slate-800 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-center text-white">
            <p className="text-lg leading-relaxed font-medium">{currentCard.definition}</p>
            {currentCard.relatedTheory && (
              <p className="mt-6 text-xs font-semibold text-teal-200 uppercase tracking-wider">
                Related to: {currentCard.relatedTheory}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-10">
        <button 
          onClick={handlePrev}
          className="p-4 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200 rounded-full shadow-sm transition-all hover:scale-110"
        >
          <ArrowLeft size={20} />
        </button>
        <button 
          onClick={handleFlip}
          className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full shadow-lg shadow-teal-500/30 transition-all hover:-translate-y-1"
        >
          <RefreshCw size={18} /> <span className="hidden sm:inline">Flip Card</span>
        </button>
        <button 
          onClick={handleNext}
          className="p-4 bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200 rounded-full shadow-sm transition-all hover:scale-110"
        >
          <ArrowRight size={20} />
        </button>
      </div>
      <div className="mt-6 text-sm text-slate-400 font-medium">
        Card {currentIndex + 1} of {cards.length}
      </div>
    </div>
  );
};

export default Flashcards;