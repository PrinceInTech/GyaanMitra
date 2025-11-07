import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Course, Quiz, Badge, Project, TradeOffer, Activity, LeaderboardEntry, Tournament, MiniProject } from '@/types';
import { useAuth } from './AuthContext';

interface AppDataContextType {
  courses: Course[];
  enrolledCourses: Course[];
  quizzes: Quiz[];
  badges: Badge[];
  projects: Project[];
  tradeOffers: TradeOffer[];
  activities: Activity[];
  leaderboard: LeaderboardEntry[];
  tournaments: Tournament[];
  miniProjects: MiniProject[];
  
  enrollCourse: (courseId: string) => void;
  updateCourseProgress: (courseId: string, lessonId: string) => void;
  completeQuiz: (quizId: string, score: number) => void;
  earnBadge: (badge: Badge) => void;
  createProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  createTradeOffer: (offer: Omit<TradeOffer, 'id'>) => void;
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};

interface AppDataProviderProps {
  children: ReactNode;
}

export const AppDataProvider: React.FC<AppDataProviderProps> = ({ children }) => {
  const { user, addXP, addCredits } = useAuth();
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tradeOffers, setTradeOffers] = useState<TradeOffer[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [miniProjects, setMiniProjects] = useState<MiniProject[]>([]);

  // Initialize demo data
  useEffect(() => {
    initializeDemoData();
    loadUserData();
  }, []);

  const loadUserData = () => {
    const storedProjects = localStorage.getItem('gyaanmitra_projects');
    const storedActivities = localStorage.getItem('gyaanmitra_activities');
    const storedBadges = localStorage.getItem('gyaanmitra_badges');
    
    if (storedProjects) setProjects(JSON.parse(storedProjects));
    if (storedActivities) setActivities(JSON.parse(storedActivities));
    if (storedBadges) setBadges(JSON.parse(storedBadges));
  };

  const initializeDemoData = () => {
    // Demo Courses
    const demoCourses: Course[] = [
      {
        id: 'course_1',
        title: 'JavaScript Fundamentals',
        description: 'Master the basics of JavaScript programming with hands-on projects',
        category: 'Programming',
        difficulty: 'Beginner',
        thumbnail: '💻',
        color: 'from-yellow-400 to-orange-500',
        instructor: {
          name: 'Prof. Sharma',
          avatar: '👨‍🏫',
          rating: 4.9,
        },
        lessons: [
          {
            id: 'lesson_1_1',
            courseId: 'course_1',
            title: 'Introduction to JavaScript',
            description: 'Learn what JavaScript is and why it\'s important',
            duration: '15 min',
            type: 'video',
            content: 'JavaScript is a versatile programming language...',
            completed: false,
            xpReward: 20,
            order: 1,
          },
          {
            id: 'lesson_1_2',
            courseId: 'course_1',
            title: 'Variables and Data Types',
            description: 'Understanding variables, strings, numbers, and more',
            duration: '20 min',
            type: 'video',
            content: 'Variables are containers for storing data...',
            completed: false,
            xpReward: 25,
            order: 2,
          },
          {
            id: 'lesson_1_3',
            courseId: 'course_1',
            title: 'Functions and Scope',
            description: 'Master functions and understand scope',
            duration: '25 min',
            type: 'video',
            content: 'Functions are reusable blocks of code...',
            completed: false,
            xpReward: 30,
            order: 3,
          },
        ],
        duration: '8 hours',
        enrolled: false,
        progress: 0,
        rating: 4.8,
        studentsCount: 1234,
        tags: ['JavaScript', 'Programming', 'Web Dev'],
        xpReward: 500,
      },
      {
        id: 'course_2',
        title: 'UI/UX Design Basics',
        description: 'Learn the fundamentals of user interface and experience design',
        category: 'Design',
        difficulty: 'Beginner',
        thumbnail: '🎨',
        color: 'from-pink-400 to-purple-500',
        instructor: {
          name: 'Ms. Patel',
          avatar: '👩‍🎨',
          rating: 4.7,
        },
        lessons: [
          {
            id: 'lesson_2_1',
            courseId: 'course_2',
            title: 'Design Principles',
            description: 'Core principles of great design',
            duration: '18 min',
            type: 'video',
            content: 'Good design is invisible...',
            completed: false,
            xpReward: 20,
            order: 1,
          },
          {
            id: 'lesson_2_2',
            courseId: 'course_2',
            title: 'Color Theory',
            description: 'Understanding colors and their psychology',
            duration: '22 min',
            type: 'video',
            content: 'Colors evoke emotions and create meaning...',
            completed: false,
            xpReward: 25,
            order: 2,
          },
        ],
        duration: '6 hours',
        enrolled: false,
        progress: 0,
        rating: 4.6,
        studentsCount: 856,
        tags: ['Design', 'UI/UX', 'Creative'],
        xpReward: 400,
      },
      {
        id: 'course_3',
        title: 'React Development',
        description: 'Build modern web applications with React',
        category: 'Programming',
        difficulty: 'Intermediate',
        thumbnail: '⚛️',
        color: 'from-blue-400 to-cyan-500',
        instructor: {
          name: 'Dr. Kumar',
          avatar: '👨‍💻',
          rating: 4.9,
        },
        lessons: [],
        duration: '12 hours',
        enrolled: false,
        progress: 0,
        rating: 4.9,
        studentsCount: 2341,
        tags: ['React', 'JavaScript', 'Frontend'],
        xpReward: 750,
      },
    ];

    // Demo Quizzes
    const demoQuizzes: Quiz[] = [
      {
        id: 'quiz_1',
        title: 'JavaScript Basics Challenge',
        description: 'Test your JavaScript fundamentals in 5 minutes',
        category: 'Programming',
        difficulty: 'Easy',
        timeLimit: 300,
        xpReward: 100,
        color: 'from-yellow-400 to-orange-500',
        questions: [
          {
            id: 'q1',
            question: 'What does JS stand for?',
            options: ['JavaScript', 'JavaSource', 'JustScript', 'JScript'],
            correctAnswer: 0,
            explanation: 'JS is short for JavaScript, the programming language of the web.',
          },
          {
            id: 'q2',
            question: 'Which symbol is used for single-line comments in JavaScript?',
            options: ['#', '//', '/*', '<!--'],
            correctAnswer: 1,
            explanation: '// is used for single-line comments in JavaScript.',
          },
          {
            id: 'q3',
            question: 'What is the correct way to declare a variable in JavaScript?',
            options: ['variable x = 5', 'let x = 5', 'v x = 5', 'declare x = 5'],
            correctAnswer: 1,
            explanation: 'In modern JavaScript, we use let, const, or var to declare variables.',
          },
          {
            id: 'q4',
            question: 'What does === operator do in JavaScript?',
            options: ['Assignment', 'Comparison', 'Strict equality check', 'Not equal'],
            correctAnswer: 2,
            explanation: '=== checks for strict equality (both value and type must match).',
          },
          {
            id: 'q5',
            question: 'Which method is used to print something in the console?',
            options: ['print()', 'console.log()', 'log()', 'write()'],
            correctAnswer: 1,
            explanation: 'console.log() is the standard method to output data to the console.',
          },
        ],
      },
      {
        id: 'quiz_2',
        title: 'React Fundamentals',
        description: 'Test your React knowledge',
        category: 'Programming',
        difficulty: 'Medium',
        timeLimit: 300,
        xpReward: 150,
        color: 'from-blue-400 to-cyan-500',
        questions: [
          {
            id: 'q1',
            question: 'What is JSX?',
            options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JavaScript Extension'],
            correctAnswer: 0,
            explanation: 'JSX stands for JavaScript XML, allowing us to write HTML in React.',
          },
          {
            id: 'q2',
            question: 'Which hook is used to manage state in functional components?',
            options: ['useEffect', 'useState', 'useContext', 'useReducer'],
            correctAnswer: 1,
            explanation: 'useState is the primary hook for managing state in functional components.',
          },
          {
            id: 'q3',
            question: 'What is the Virtual DOM?',
            options: ['A copy of HTML DOM', 'A programming concept', 'A lightweight copy of DOM', 'A browser feature'],
            correctAnswer: 2,
            explanation: 'Virtual DOM is a lightweight copy of the actual DOM used for efficient updates.',
          },
          {
            id: 'q4',
            question: 'What is a React Component?',
            options: ['A function or class', 'A JavaScript file', 'An HTML element', 'A CSS class'],
            correctAnswer: 0,
            explanation: 'A component is a function or class that returns React elements.',
          },
          {
            id: 'q5',
            question: 'What does npm stand for?',
            options: ['Node Package Manager', 'New Project Manager', 'Node Programming Module', 'Network Package Manager'],
            correctAnswer: 0,
            explanation: 'npm stands for Node Package Manager, used to install JavaScript packages.',
          },
        ],
      },
    ];

    // Demo Trade Offers
    const demoTradeOffers: TradeOffer[] = [
      {
        id: 'trade_1',
        userId: 'user_demo_1',
        userName: 'Priya Sharma',
        userAvatar: '👩‍💻',
        userRating: 4.8,
        teaches: 'React Development',
        wants: 'UI/UX Design',
        level: 'Expert',
        sessionsCompleted: 23,
        availability: ['Monday', 'Wednesday', 'Friday'],
        description: 'I can teach React basics to advanced concepts',
        tags: ['React', 'JavaScript', 'Frontend'],
        color: 'from-blue-400 to-cyan-500',
        credits: 30,
      },
      {
        id: 'trade_2',
        userId: 'user_demo_2',
        userName: 'Rahul Kumar',
        userAvatar: '👨‍🎨',
        userRating: 4.9,
        teaches: 'Graphic Design',
        wants: 'JavaScript Basics',
        level: 'Expert',
        sessionsCompleted: 45,
        availability: ['Tuesday', 'Thursday', 'Saturday'],
        description: 'Professional graphic designer ready to teach',
        tags: ['Design', 'Photoshop', 'Illustrator'],
        color: 'from-pink-400 to-purple-500',
        credits: 35,
      },
    ];

    // Demo Leaderboard
    const demoLeaderboard: LeaderboardEntry[] = [
      { rank: 1, userId: 'user_1', userName: 'Priya Sharma', userAvatar: '👑', xp: 8450, level: 12, streak: 45 },
      { rank: 2, userId: 'user_2', userName: 'Rahul Kumar', userAvatar: '🌟', xp: 7820, level: 11, streak: 38 },
      { rank: 3, userId: 'user_3', userName: 'Ananya Singh', userAvatar: '⚡', xp: 7350, level: 11, streak: 32 },
      { rank: 4, userId: 'user_4', userName: 'Arjun Patel', userAvatar: '🎯', xp: 6890, level: 10, streak: 28 },
    ];

    // Demo Tournaments
    const demoTournaments: Tournament[] = [
      {
        id: 'tournament_1',
        title: 'Web Development Championship',
        description: 'Compete with 500+ students across India',
        category: 'Programming',
        prizePool: 10000,
        participants: 250,
        maxParticipants: 500,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'live',
        difficulty: 'Medium',
        entryFee: 0,
        rules: ['Fair play', 'No plagiarism', 'Respect other participants'],
        prizes: [
          { position: 1, reward: 'Cash Prize', amount: 5000 },
          { position: 2, reward: 'Cash Prize', amount: 3000 },
          { position: 3, reward: 'Cash Prize', amount: 2000 },
        ],
      },
    ];

    // Demo Mini Projects
    const demoMiniProjects: MiniProject[] = [
      {
        id: 'mini_1',
        title: 'Calculator App',
        description: 'Build a functional calculator with basic operations',
        difficulty: 'Beginner',
        estimatedTime: '2 hours',
        icon: '🔢',
        tags: ['HTML', 'CSS', 'JavaScript'],
        xpReward: 100,
        color: 'from-blue-400 to-cyan-500',
        steps: [
          { id: 'step_1', title: 'Setup HTML structure', description: 'Create the calculator layout', completed: false, order: 1 },
          { id: 'step_2', title: 'Style with CSS', description: 'Make it look beautiful', completed: false, order: 2 },
          { id: 'step_3', title: 'Add JavaScript logic', description: 'Implement calculator functions', completed: false, order: 3 },
        ],
      },
    ];

    setCourses(demoCourses);
    setQuizzes(demoQuizzes);
    setTradeOffers(demoTradeOffers);
    setLeaderboard(demoLeaderboard);
    setTournaments(demoTournaments);
    setMiniProjects(demoMiniProjects);
  };

  const enrolledCourses = courses.filter(c => c.enrolled);

  const enrollCourse = (courseId: string) => {
    setCourses(prev => prev.map(course => 
      course.id === courseId ? { ...course, enrolled: true } : course
    ));
    
    addActivity({
      type: 'course_completed',
      title: 'Enrolled in Course',
      description: `Started learning ${courses.find(c => c.id === courseId)?.title}`,
      xpGained: 0,
      icon: '📚',
    });
  };

  const updateCourseProgress = (courseId: string, lessonId: string) => {
    setCourses(prev => prev.map(course => {
      if (course.id !== courseId) return course;
      
      const updatedLessons = course.lessons.map(lesson =>
        lesson.id === lessonId ? { ...lesson, completed: true } : lesson
      );
      
      const completedCount = updatedLessons.filter(l => l.completed).length;
      const progress = (completedCount / updatedLessons.length) * 100;
      
      const lesson = course.lessons.find(l => l.id === lessonId);
      if (lesson && !lesson.completed) {
        addXP(lesson.xpReward);
        addActivity({
          type: 'lesson_completed',
          title: 'Lesson Completed',
          description: lesson.title,
          xpGained: lesson.xpReward,
          icon: '✅',
        });
      }
      
      return { ...course, lessons: updatedLessons, progress };
    }));
  };

  const completeQuiz = (quizId: string, score: number) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) return;
    
    const xpGained = Math.floor((score / 100) * quiz.xpReward);
    addXP(xpGained);
    
    addActivity({
      type: 'quiz_won',
      title: 'Quiz Completed',
      description: `Scored ${score}% on ${quiz.title}`,
      xpGained,
      icon: '🏆',
    });
  };

  const earnBadge = (badge: Badge) => {
    setBadges(prev => [...prev, badge]);
    localStorage.setItem('gyaanmitra_badges', JSON.stringify([...badges, badge]));
    
    addActivity({
      type: 'badge_earned',
      title: 'Badge Earned',
      description: badge.name,
      xpGained: 50,
      icon: badge.emoji,
    });
    
    addXP(50);
  };

  const createProject = (projectData: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...projectData,
      id: 'project_' + Date.now(),
    };
    
    setProjects(prev => {
      const updated = [...prev, newProject];
      localStorage.setItem('gyaanmitra_projects', JSON.stringify(updated));
      return updated;
    });
    
    addActivity({
      type: 'project_created',
      title: 'Project Created',
      description: newProject.title,
      xpGained: 100,
      icon: '🚀',
    });
    
    addXP(100);
  };

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(prev => {
      const updated = prev.map(project =>
        project.id === projectId ? { ...project, ...updates } : project
      );
      localStorage.setItem('gyaanmitra_projects', JSON.stringify(updated));
      return updated;
    });
  };

  const createTradeOffer = (offerData: Omit<TradeOffer, 'id'>) => {
    const newOffer: TradeOffer = {
      ...offerData,
      id: 'trade_' + Date.now(),
    };
    
    setTradeOffers(prev => [...prev, newOffer]);
  };

  const addActivity = (activityData: Omit<Activity, 'id' | 'timestamp'>) => {
    const newActivity: Activity = {
      ...activityData,
      id: 'activity_' + Date.now(),
      timestamp: new Date().toISOString(),
    };
    
    setActivities(prev => {
      const updated = [newActivity, ...prev].slice(0, 50); // Keep last 50
      localStorage.setItem('gyaanmitra_activities', JSON.stringify(updated));
      return updated;
    });
  };

  const value: AppDataContextType = {
    courses,
    enrolledCourses,
    quizzes,
    badges,
    projects,
    tradeOffers,
    activities,
    leaderboard,
    tournaments,
    miniProjects,
    enrollCourse,
    updateCourseProgress,
    completeQuiz,
    earnBadge,
    createProject,
    updateProject,
    createTradeOffer,
    addActivity,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};
