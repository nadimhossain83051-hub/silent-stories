
export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
  PREFER_NOT_TO_SAY = 'Prefer not to say'
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  gender: Gender;
  displayName?: string;
  isAdmin: boolean;
  isBlocked: boolean;
  createdAt: number;
}

export interface Reaction {
  type: 'learned' | 'relatable';
  count: number;
}

export interface Comment {
  id: string;
  storyId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: number;
  isFlagged: boolean;
}

export interface Story {
  id: string;
  userId: string;
  authorName: string; // Anonymous or Display Name
  authorGender: Gender;
  category: string;
  mistake: string;
  reason: string;
  outcome: string;
  lessons: string;
  advice: string;
  is18Plus: boolean;
  allowComments: boolean;
  isFlagged: boolean;
  status: 'published' | 'hidden' | 'pending';
  createdAt: number;
  reactions: {
    learned: string[]; // User IDs
    relatable: string[]; // User IDs
  };
  adminNotes?: string;
  aiInsights?: AIInsight;
}

export interface AIInsight {
  keyTakeaways: string[];
  mistakesToAvoid: string[];
  futureAdvice: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}
