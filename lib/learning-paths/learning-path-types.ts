// lib/learning-paths/learning-path-types.ts

export type PathSlug = 'digital-literacy' | 'security-fundamentals' | 'professional-security';

export interface AIPrompt {
  id: string;
  title: {
    fa: string;
    en: string;
  };
  prompt: {
    fa: string;
    en: string;
  };
  purpose: {
    fa: string;
    en: string;
  };
}

export interface ArticleResource {
  title: {
    fa: string;
    en: string;
  };
  url: string;
  isInternal: boolean; // true if it's a KavLabs article
  description?: {
    fa: string;
    en: string;
  };
}

export interface BookResource {
  title: {
    fa: string;
    en: string;
  };
  author: string;
  description: {
    fa: string;
    en: string;
  };
  link?: string; // optional purchase/info link
  coverImage?: string;
}

export interface VideoResource {
  title: {
    fa: string;
    en: string;
  };
  url: string;
  platform: 'youtube' | 'aparat' | 'vimeo' | 'other';
  duration?: string;
  description?: {
    fa: string;
    en: string;
  };
}

export interface PathStep {
  id: string;
  order: number;
  title: {
    fa: string;
    en: string;
  };
  description: {
    fa: string;
    en: string;
  };
  whyImportant: {
    fa: string;
    en: string;
  };
  learningOutcomes: {
    fa: string[];
    en: string[];
  };
  estimatedTime: string; // e.g., "2 hours", "1 week"
  prompts: AIPrompt[];
  articles: ArticleResource[];
  books: BookResource[];
  videos: VideoResource[];
}

export interface LearningPath {
  slug: PathSlug;
  title: {
    fa: string;
    en: string;
  };
  description: {
    fa: string;
    en: string;
  };
  targetAudience: {
    fa: string;
    en: string;
  };
  totalSteps: number;
  estimatedTotalTime: {
    fa: string;
    en: string;
  };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  color: {
    primary: string;
    gradient: string;
    bgGradient: string;
    light: string;
  };
  icon: string; // lucide icon name
  steps: PathStep[];
  faqs: {
    question: {
      fa: string;
      en: string;
    };
    answer: {
      fa: string;
      en: string;
    };
  }[];
  tips: {
    fa: string[];
    en: string[];
  };
}

export interface PathProgress {
  pathSlug: PathSlug;
  completedSteps: string[]; // array of step IDs
  lastAccessedAt: string;
  startedAt: string;
}
