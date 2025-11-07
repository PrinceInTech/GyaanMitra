import { Target, BookOpen, Trophy, Award, Zap, TrendingUp, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { useAppData } from "@/contexts/AppDataContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { enrolledCourses, courses, badges } = useAppData();
  
  // Get enrolled courses or use mock data for display
  const continueLearningSections = enrolledCourses.length > 0 
    ? enrolledCourses.map(course => ({
        id: course.id,
        title: course.title,
        progress: course.progress,
        color: course.color,
      }))
    : [
        { id: 'demo_1', title: "JavaScript Fundamentals", progress: 0, color: "from-yellow-400 to-orange-500" },
        { id: 'demo_2', title: "UI/UX Design Basics", progress: 0, color: "from-pink-400 to-purple-500" },
        { id: 'demo_3', title: "Data Structures", progress: 0, color: "from-blue-400 to-cyan-500" },
      ];

  // Get recommendations based on user interests
  const recommendations = courses
    .filter(c => !c.enrolled)
    .slice(0, 3)
    .map(course => ({
      id: course.id,
      title: course.title,
      category: course.category,
      difficulty: course.difficulty,
    }));
  
  // Get recent badges
  const recentBadges = badges.slice(0, 4);
  const defaultBadges = [
    { emoji: "🏆", label: "First Course", color: "from-yellow-400 to-orange-500" },
    { emoji: "⚡", label: "Speed Learner", color: "from-blue-400 to-cyan-500" },
    { emoji: "🎯", label: "7-Day Streak", color: "from-pink-400 to-purple-500" },
    { emoji: "🌟", label: "Top Student", color: "from-green-400 to-emerald-500" },
  ];
  
  const displayBadges = recentBadges.length > 0
    ? recentBadges.map(badge => ({
        emoji: badge.emoji,
        label: badge.name,
        color: "from-yellow-400 to-orange-500",
      }))
    : defaultBadges;

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-b from-background to-primary/5">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary-dark text-white p-6 shadow-elevated">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Welcome back{user ? `, ${user.name.split(' ')[0]}` : ''}! 👋</h1>
              <p className="text-primary-foreground/80 text-sm mt-1">Let's make today count</p>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Zap className="w-5 h-5 text-accent" />
              <span className="font-bold text-lg">{user?.xp || 0} XP</span>
            </div>
          </div>
          
          {/* Streak */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-2xl animate-bounce-subtle">
              🔥
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold">{user?.streak || 0} Day Streak!</span>
                <span className="text-sm text-primary-foreground/80">Keep it going!</span>
              </div>
              <Progress value={((user?.streak || 0) % 10) * 10} className="h-2 bg-white/20" />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        {/* AI Advice - Start Learning Today */}
        <section>
          <Card className="p-8 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 border-purple-300/30 hover:shadow-elevated transition-all">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl shadow-lg animate-bounce-slow">
                🤖
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    AI Learning Guru Says
                  </h2>
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  "Hey there, future genius! 🌟 Ready to start your learning journey? I've analyzed the best courses for beginners. 
                  <span className="font-semibold text-purple-600 dark:text-purple-400"> JavaScript Fundamentals</span> is perfect for you - 
                  it's beginner-friendly, practical, and will unlock amazing opportunities!"
                </p>
                <div className="flex items-center gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl backdrop-blur-sm border border-purple-200/50 mb-4">
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">💡 Quick Tip</div>
                    <div className="font-medium">Start with just 15 minutes today. Small steps lead to big wins!</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => {
                      const jsCourse = courses.find(c => c.title === "JavaScript Fundamentals");
                      if (jsCourse) navigate(`/course/${jsCourse.id}`);
                    }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all"
                    size="lg"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    Start JavaScript Course
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/20"
                  >
                    Browse All Courses
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Recommended for You */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Recommended for You</h2>
          </div>
          <div className="space-y-3">
            {recommendations.map((rec, idx) => (
              <Card
                key={idx}
                onClick={() => navigate(`/course/${rec.id}`)}
                className="p-4 hover:shadow-card transition-all cursor-pointer hover:bg-primary/5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{rec.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {rec.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{rec.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Start
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Achievements Preview */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold">Recent Achievements</h2>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {displayBadges.map((badge, idx) => (
              <Card
                key={idx}
                className={`p-4 bg-gradient-to-br ${badge.color} text-white hover:scale-105 transition-all cursor-pointer`}
              >
                <div className="text-center space-y-2">
                  <div className="text-4xl">{badge.emoji}</div>
                  <p className="text-xs font-medium">{badge.label}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="pb-4">
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-1">Ready for a challenge?</h3>
                <p className="text-sm text-muted-foreground">Test your skills in the Arena!</p>
              </div>
              <Button 
                onClick={() => navigate("/arena")}
                className="bg-gradient-to-r from-primary to-primary-dark hover:shadow-glow"
              >
                Go to Arena 🎮
              </Button>
            </div>
          </Card>
        </section>
      </div>

      <BottomNav />
    </div>
  );
};

export default Home;
