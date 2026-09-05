export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'truefalse' | 'identifyFigure';
  category: 'individual' | 'interpersonal' | 'community' | 'planning' | 'economics';
  question: string;
  options?: string[];
  answer: string | boolean;
  feedback: string;
  bookReference?: string;
  figureUrl?: string;
}

export interface GameQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  hint?: string;
  category: string;
}

export interface Scenario {
  id: string;
  title: string;
  targetAudience: string;
  setting: string;
  scenario: string;
  keyChallenge: string;
  options: string[];
  answer: string;
  feedback: string;
  recommendedConstructs: string[];
  theoreticalRationale: string;
  bookCaseStudy?: string;
}

export interface FlashcardItem {
  id: string;
  term: string;
  definition: string;
  category: 'foundations' | 'individual' | 'interpersonal' | 'community' | 'planning' | 'economics';
  relatedTheory?: string;
  keyAuthors?: string;
  practicalExample?: string;
}

export interface TheoryConstruct {
  name: string;
  definition: string;
  measurementExample?: string;
  interventionStrategy?: string;
}

export interface TheoryItem {
  id: string;
  title: string;
  shortName: string;
  category: 'individual' | 'interpersonal' | 'community' | 'planning' | 'economics';
  originYear?: string;
  keyTheorists?: string;
  description: string;
  corePremise: string;
  constructs: TheoryConstruct[];
  empiricalSupport: string;
  classicApplications: string[];
  strengths: string[];
  limitations: string[];
}

export interface GlossaryItem {
  term: string;
  definition: string;
  category: string;
  keyTheorists?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
}

export interface StudentProgress {
  studentName: string;
  studentId: string;
  university: string;
  role: 'student' | 'researcher' | 'practitioner' | 'instructor';
  completedTheories: string[];
  masteredFlashcards: string[];
  quizScores: { quizId: string; score: number; total: number; date: string }[];
  gameHighScore: number;
  gamesPlayed: number;
  completedScenarios: string[];
  customNotes: Record<string, string>;
  studyStreakDays: number;
  lastActiveDate: string;
  certificateUnlocked: boolean;
}

export type SectionId = 
  | 'home' 
  | 'progress'
  | 'foundations' 
  | 'keyTheories' 
  | 'planningModels' 
  | 'decisionMatrix'
  | 'comparisonMatrix'
  | 'logicModelBuilder'
  | 'quiz' 
  | 'game' 
  | 'scenarioChallenge' 
  | 'flashcards' 
  | 'studySheet'
  | 'glossary' 
  | 'usefulSources' 
  | 'contactUs' 
  | 'about';
