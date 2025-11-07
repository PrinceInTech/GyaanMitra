// GyaanMitra - TypeScript Type Definitions

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  class: string;
  stream: string;
  interests: string[];
  streak: number;
  credits: number;
  rating: number;
  joinedDate: string;
  badges: Badge[];
  skills: Skill[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  color: string;
  instructor: {
    name: string;
    avatar: string;
    rating: number;
  };
  lessons: Lesson[];
  duration: string;
  enrolled: boolean;
  progress: number;
  rating: number;
  studentsCount: number;
  tags: string[];
  xpReward: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'practice';
  content: string;
  completed: boolean;
  xpReward: number;
  order: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: Question[];
  timeLimit?: number;
  xpReward: number;
  color: string;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  earnedDate: string;
  category: string;
}

export interface Skill {
  name: string;
  level: number;
  maxLevel: number;
  color: string;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  status: 'Planning' | 'In Progress' | 'Completed' | 'Archived';
  progress: number;
  team: TeamMember[];
  tags: string[];
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  startDate: string;
  endDate?: string;
  rating?: number;
  reviews: Review[];
  color: string;
  isPublic: boolean;
  repositoryUrl?: string;
  liveUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface TradeOffer {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userRating: number;
  teaches: string;
  wants: string;
  level: 'Beginner' | 'Intermediate' | 'Expert';
  sessionsCompleted: number;
  availability: string[];
  description: string;
  tags: string[];
  color: string;
  credits: number;
}

export interface Activity {
  id: string;
  type: 'course_completed' | 'lesson_completed' | 'quiz_won' | 'project_created' | 'badge_earned' | 'taught_session' | 'learned_session' | 'level_up';
  title: string;
  description: string;
  xpGained: number;
  timestamp: string;
  icon: string;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  userName: string;
  userAvatar: string;
  xp: number;
  level: number;
  streak: number;
  isCurrentUser?: boolean;
}

export interface Tournament {
  id: string;
  title: string;
  description: string;
  category: string;
  prizePool: number;
  participants: number;
  maxParticipants: number;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'live' | 'ended';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  entryFee: number;
  rules: string[];
  prizes: Prize[];
}

export interface Prize {
  position: number;
  reward: string;
  amount: number;
}

export interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'achievement';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface DailyGoal {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  xpReward: number;
  completed: boolean;
  date: string;
}

export interface MiniProject {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  icon: string;
  tags: string[];
  steps: ProjectStep[];
  xpReward: number;
  color: string;
}

export interface ProjectStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  order: number;
}

export interface Session {
  id: string;
  teacherId: string;
  learnerId: string;
  subject: string;
  scheduledDate: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  rating?: number;
  feedback?: string;
  creditsEarned: number;
}
