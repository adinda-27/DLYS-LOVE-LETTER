export type MomentCategory =
  | 'all'
  | 'love-letter'
  | 'anniversary'
  | 'birthday'
  | 'proposal'
  | 'our-story'
  | 'digital-gift';

export interface MomentType {
  id: MomentCategory;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  iconName: string;
  badge: string;
  highlightFeatures: string[];
  gradient: string;
  accentBg: string;
  accentBorder: string;
}

export interface Template {
  id: string;
  title: string;
  category: MomentCategory;
  categoryLabel: string;
  mood: string;
  badge?: string;
  description: string;
  thumbnailUrl: string;
  themeStyle: {
    bgClass: string;
    cardClass: string;
    accentClass: string;
    fontStyle: 'serif' | 'handwriting' | 'sans';
  };
  sampleRecipient: string;
  sampleSender: string;
  sampleHeadline: string;
  sampleMessage: string;
  sampleSong: {
    title: string;
    artist: string;
    url?: string;
  };
  interactiveFeatures: string[];
  estimatedMinutesToMake: number;
}

export interface CustomizationData {
  templateId: string;
  recipientName: string;
  senderName: string;
  headline: string;
  message: string;
  specialDate: string; // YYYY-MM-DD
  song: {
    title: string;
    artist: string;
    url?: string;
  };
  photos: string[]; // URLs or base64 data URLs
  questionPrompt: {
    question: string;
    acceptButton: string;
    secondButton: string;
  };
  psNote?: string;
}

export interface PricingPackage {
  id: 'standard' | 'custom-theme' | 'romance-novel';
  name: string;
  tagline: string;
  price: string;
  originalPrice: string;
  badge?: string;
  isPopular?: boolean;
  description: string;
  features: string[];
}
