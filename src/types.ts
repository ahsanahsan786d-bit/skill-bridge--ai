export type UserRole = 'worker' | 'client' | 'admin';

export type Category = 
  | 'Electrician'
  | 'Solar Technician'
  | 'Plumber'
  | 'Tailor & Fashion'
  | 'Auto Mechanic'
  | 'AC & Refrigeration'
  | 'Freelance Web Dev'
  | 'Graphic Designer'
  | 'Video Editor'
  | 'Carpenter'
  | 'Painter & Decorator'
  | 'Tutor & Educator';

export type City = 
  | 'Lahore'
  | 'Karachi'
  | 'Islamabad'
  | 'Rawalpindi'
  | 'Peshawar'
  | 'Faisalabad'
  | 'Multan'
  | 'Quetta'
  | 'Sialkot'
  | 'Gujranwala';

export interface Worker {
  id: string;
  name: string;
  tagline: string;
  category: Category;
  city: City;
  area: string;
  avatar: string;
  hourlyRatePKR: number;
  fixedRatePKR?: number;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  aiBadge?: string;
  bio: string;
  skills: string[];
  languages: string[];
  completedJobs: number;
  responseTime: string;
  portfolio: {
    title: string;
    description: string;
    image: string;
  }[];
  reviews: {
    id: string;
    clientName: string;
    rating: number;
    date: string;
    comment: string;
    jobTitle: string;
  }[];
}

export interface Job {
  id: string;
  title: string;
  category: Category;
  clientName: string;
  clientAvatar: string;
  city: City;
  area: string;
  budgetPKR: number;
  urgency: 'Immediate' | 'Within 3 Days' | 'Flexible';
  postedTime: string;
  description: string;
  requiredSkills: string[];
  proposalsCount: number;
  status: 'Open' | 'In Progress' | 'Completed';
  aiEnhanced?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isAiTranslated?: boolean;
  originalText?: string;
  targetLanguage?: string;
}

export interface Conversation {
  id: string;
  participantName: string;
  participantAvatar: string;
  participantRole: string;
  workerId?: string;
  jobTitle: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
  aiSummary?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'match' | 'proposal' | 'system' | 'review';
  read: boolean;
  actionUrl?: string;
}

export interface AIMatchScore {
  workerId: string;
  matchPercentage: number;
  rationale: string;
  keyStrengths: string[];
  locationMatch: boolean;
  budgetMatch: boolean;
}

export interface AIResumeData {
  fullName: string;
  title: string;
  phone: string;
  city: string;
  category: Category;
  summary: string;
  keySkills: string[];
  experienceList: {
    role: string;
    period: string;
    highlights: string[];
  }[];
  certifications: string[];
  aiRecommendationNote: string;
}
