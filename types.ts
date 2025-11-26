export interface QuizQuestion {
  type: 'mcq' | 'truefalse' | 'identifyFigure';
  question: string;
  options?: string[];
  answer: string | boolean;
  feedback: string;
  figureUrl?: string;
}

export interface GameQuestion {
  question: string;
  options: string[];
  answer: string;
}

export interface Scenario {
  scenario: string;
  options: string[];
  answer: string;
  feedback: string;
}

export interface FlashcardItem {
  term: string;
  definition: string;
  relatedTheory?: string;
}

export interface TheoryItem {
  title: string;
  description: string;
  concepts: string[];
}

export interface GlossaryItem {
  term: string;
  definition: string;
}

export type SectionId = 
  | 'home' 
  | 'foundations' 
  | 'keyTheories' 
  | 'planningModels' 
  | 'quiz' 
  | 'game' 
  | 'scenarioChallenge' 
  | 'flashcards' 
  | 'glossary' 
  | 'usefulSources' 
  | 'contactUs' 
  | 'about';
