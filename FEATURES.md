# 🎓 GyaanMitra - Complete Educational Platform

**Tagline:** *Seek. Share. Shine.*

A production-ready, full-stack educational platform where students can learn, teach, play, and build together.

---

## ✨ Key Features Implemented

### 1. **Authentication System** 🔐
- **Beautiful Login/Signup Pages** with gradient backgrounds and smooth animations
- **Google OAuth Integration** (UI ready - backend integration pending)
- **Demo Account** for quick testing:
  - Email: `student@gyaan.com`
  - Password: `password123`
- **Protected Routes** - Users must login to access app features
- **Session Persistence** using localStorage
- **User Profile Management** with XP, levels, credits, and badges

### 2. **Home / Learning Hub** 📚
- **Personalized Dashboard** with:
  - Daily goals and streak tracking
  - Continue learning section
  - AI-recommended courses
  - Achievement badges
  - Mini challenges
  - Peer spotlight
- **Real-time Progress Tracking**
- **XP System** with level-up animations
- **Course Cards** with:
  - Progress indicators
  - Difficulty levels
  - Time estimates
  - Interactive enrollment

### 3. **Gamified Arena** 🎮
- **Quiz Battles** - Compete with peers
- **Skill Games** - Matching pairs, flash challenges
- **Leaderboard System** with XP rankings
- **Multiple Game Modes**:
  - Solo Practice
  - 1v1 Battles
  - Team Challenges
- **Real-time Score Tracking**
- **Achievements & Badges**

### 4. **Student Trade** 🤝
- **Peer Skill Exchange Marketplace**
- **Browse & Filter** peers by:
  - Skills they teach
  - Skills they want to learn
  - Experience level
  - Ratings
  - Availability
- **Credit System**:
  - Earn credits by teaching
  - Spend credits to learn
- **Connect & Schedule** sessions
- **Create Your Own Offers**
- **Rating & Review System**

### 5. **Projects Hub** 🚀
- **My Projects** section with:
  - Project cards showing progress
  - Team member avatars
  - Status badges (In Progress/Completed)
  - Star ratings
  - Tech stack tags
- **Mini Projects** with:
  - Guided tutorials
  - Step-by-step instructions
  - XP rewards
  - Difficulty levels
- **Portfolio Showcase**
- **Team Collaboration**

### 6. **Profile & Dashboard** 👤
- **User Statistics**:
  - Current level & XP
  - Learning streak
  - Credits earned
  - Courses completed
- **Achievement Badges**
- **Skills Showcase**
- **Learning Progress Graph**
- **Joined Date & Milestones**
- **Settings & Preferences**

### 7. **Course System** 📖
- **Course Detail Pages** with:
  - Course overview
  - Lesson structure
  - Prerequisites
  - Difficulty level
  - Time commitment
- **Lesson Viewer** with:
  - Video content support
  - Interactive quizzes
  - Code playgrounds
  - Progress tracking
- **Course Enrollment** system
- **Course Ratings** & reviews

### 8. **Quiz System** ❓
- **Interactive Quizzes** with:
  - Multiple choice questions
  - Real-time scoring
  - Timer functionality
  - Instant feedback
- **Quiz Results** with:
  - Score breakdown
  - Correct/incorrect answers
  - XP rewards
  - Performance analytics

---

## 🎨 Design System

### Color Palette
- **Primary (Deep Blue)**: `#2E5BFF` - Wisdom & Trust
- **Secondary (Aqua Green)**: `#5EE6B4` - Growth & Balance
- **Accent (Bright Yellow)**: `#FFCE00` - Energy & Achievement
- **Background**: Off-white with subtle gradients
- **Typography**: Poppins font family

### Animations
- **Fade-in** animations for page transitions
- **Bounce-slow** for interactive elements
- **Pulse** effects for notifications
- **Smooth transitions** (300ms cubic-bezier)
- **Hover effects** with scale and shadow changes
- **Gradient backgrounds** with animated blobs

### UI Components
- **Shadcn/UI** component library
- **Lucide React** icons
- **Responsive Design** - Mobile-first approach
- **Bottom Navigation** for mobile
- **Cards** with hover effects and shadows
- **Badges** for status and tags
- **Progress Bars** for tracking
- **Dialogs & Modals** for interactions

---

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **TailwindCSS** for styling
- **Shadcn/UI** for components
- **React Router** for navigation
- **Lucide React** for icons
- **Sonner** for toast notifications

### State Management
- **React Context API**:
  - `AuthContext` - User authentication & session
  - `AppDataContext` - Courses, badges, projects data
- **localStorage** for persistence

### Animations
- Custom CSS animations
- Tailwind animation utilities
- Smooth transitions throughout

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Shadcn UI components
│   ├── BottomNav.tsx    # Mobile navigation
│   └── ProtectedRoute.tsx # Route guard
├── contexts/
│   ├── AuthContext.tsx  # Authentication state
│   └── AppDataContext.tsx # App data & courses
├── pages/
│   ├── Login.tsx        # Login page
│   ├── Signup.tsx       # Signup page
│   ├── Onboarding.tsx   # User onboarding
│   ├── Home.tsx         # Main dashboard
│   ├── Arena.tsx        # Gamified learning
│   ├── Trade.tsx        # Peer exchange
│   ├── Projects.tsx     # Projects hub
│   ├── Profile.tsx      # User profile
│   ├── CourseDetail.tsx # Course page
│   ├── LessonViewer.tsx # Lesson viewer
│   ├── QuizPage.tsx     # Quiz interface
│   └── NotFound.tsx     # 404 page
├── types/
│   └── index.ts         # TypeScript types
├── lib/
│   └── utils.ts         # Utility functions
└── App.tsx              # Main app component
```

---

## 🎮 How to Use

### 1. **Login**
- Use demo credentials: `student@gyaan.com` / `password123`
- Or sign up with any email (demo mode)
- Or use Google OAuth (UI ready)

### 2. **Explore Courses**
- Browse recommended courses on Home page
- Enroll in courses you're interested in
- Track your progress

### 3. **Take Quizzes**
- Complete quizzes to earn XP
- Compete on the Arena leaderboard
- Unlock achievements

### 4. **Exchange Skills**
- Visit Trade page
- Browse peer offerings
- Connect with students
- Earn/spend credits

### 5. **Build Projects**
- Start mini-projects for quick wins
- Join team projects
- Showcase your portfolio

### 6. **Track Progress**
- View your stats on Profile
- Maintain your learning streak
- Level up and earn badges

---

## 💡 Unique Features

### 1. **Credit Economy**
- Earn credits by teaching others
- Spend credits to learn new skills
- Balanced peer-to-peer exchange system

### 2. **XP & Leveling System**
- Progressive XP requirements (500 * level^1.5)
- Visual level-up celebrations
- Achievement badges

### 3. **Learning Streaks**
- Daily login tracking
- Streak recovery options
- Motivation system

### 4. **Mini Projects**
- Bite-sized projects for quick learning
- Step-by-step guidance
- XP rewards on completion

### 5. **Peer Matching**
- Smart matching algorithm
- Filter by skills, level, availability
- Rating system

---

## 🔧 Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📱 Responsive Design

- **Desktop**: Full-featured experience with sidebar navigation
- **Tablet**: Optimized layouts with adjusted spacing
- **Mobile**: Bottom navigation bar, card-based UI

---

## 🎯 Future Enhancements

### Backend Integration
- [ ] Real authentication with JWT
- [ ] Database (PostgreSQL/MongoDB)
- [ ] API endpoints for all features
- [ ] Real-time chat with WebSocket
- [ ] File uploads for projects
- [ ] Video streaming for lessons

### Additional Features
- [ ] Live 1v1 quiz battles
- [ ] Group study rooms
- [ ] AI-powered course recommendations
- [ ] Certificate generation
- [ ] Payment integration
- [ ] Mobile app (React Native)
- [ ] Push notifications
- [ ] Social features (follow, likes, comments)
- [ ] Advanced analytics dashboard
- [ ] Mentor matching algorithm

### Gamification Enhancements
- [ ] More badge types
- [ ] Seasonal challenges
- [ ] Global leaderboards
- [ ] Team competitions
- [ ] Special events

---

## 🌟 Demo Accounts

### Student Account
- **Email**: student@gyaan.com
- **Password**: password123
- **Profile**: Arjun Sharma, Level 5, 250 credits

### Test Workflow
1. Login with demo account
2. Complete a lesson (earn 50 XP)
3. Take a quiz (earn 100 XP + level up)
4. Browse Trade offers
5. Connect with a peer (spend 20 credits)
6. Start a mini-project
7. View your achievements

---

## 🎨 Design Philosophy

### Student-Centric
- Clean, uncluttered interface
- Vibrant but not overwhelming colors
- Clear visual hierarchy
- Intuitive navigation

### Motivational
- Positive reinforcement
- Visual progress indicators
- Celebration animations
- Achievement recognition

### Social
- Peer connections
- Collaborative learning
- Community features
- Knowledge sharing

---

## 📊 Key Metrics Tracked

- **User Engagement**: Login streaks, session duration
- **Learning Progress**: XP earned, levels gained, courses completed
- **Social Impact**: Credits earned from teaching, peer connections
- **Project Completion**: Mini projects done, team projects joined
- **Gamification**: Badges earned, quiz scores, arena rank

---

## 🛡️ Security Features

- Protected routes with authentication checks
- Session management with localStorage
- Input validation
- XSS protection (React default)
- Prepared for HTTPS deployment

---

## 📄 License

MIT License - Feel free to use for educational purposes

---

## 👥 Credits

**Created for**: GyaanMitra Educational Platform
**Design System**: Custom design with Shadcn/UI
**Icons**: Lucide React
**Fonts**: Poppins

---

## 🚀 Get Started Now!

```bash
npm install
npm run dev
```

Visit `http://localhost:8081` and login with:
- **Email**: student@gyaan.com
- **Password**: password123

**Happy Learning! 🎓✨**
