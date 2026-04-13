export type Mood = 'peaceful' | 'seeking' | 'anxious' | 'grateful' | 'overwhelmed' | 'sad' | 'stressed' | 'confused' | 'in_pain';

export type AuthProvider = 'credentials' | 'guest';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  photoUrl?: string;
  provider: AuthProvider;
  createdAt: string;
  streak: number;
  longestStreak: number;
  lastActiveDate: string;
  totalDaysActive: number;
  completedParayanChapters: number[];
  completedAartis: number;
  journalEntries: string[];
}

export interface AartiSyncLine {
  time: number;
  text: string;
}

export interface AartiSection {
  id: string;
  title: string;
  lyrics: string;
  transliteration: string;
  translation: string;
  syncData?: AartiSyncLine[];
}

export interface Aarti {
  id: string;
  name: string;
  time: string;
  sections: AartiSection[];
  videoId?: string;
  audioUrl?: string;
}

export interface SevaSuggestion {
  id: string;
  title: string;
  budget: number;
  description: string;
  category: 'annadanam' | 'animals' | 'temple' | 'local' | 'kindness';
}

export interface Temple {
  id: string;
  name: string;
  address: string;
  distance: string;
  nextAarti: string;
  annadanamTime?: string;
  isOpen: boolean;
  crowdLevel: 'low' | 'medium' | 'high';
}

export interface ParayanPlan {
  id: string;
  goal: string;
  duration: number;
  chaptersPerDay: number[];
  currentDay: number;
  startDate: string;
}

export interface SaiAnswer {
  id: number;
  title: string;
  main_message: string;
  practical_action: string;
  mantra?: string;
  chapter_recommendation?: string;
  theme: string;
  mood_tags: string[];
  share_quote: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  type: 'answer' | 'note';
  answerId?: number;
  title: string;
  content: string;
  note?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  teaching?: string;
  action?: string;
  chapter?: string;
  mantra?: string;
}
