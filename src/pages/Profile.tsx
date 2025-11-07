import { Award, BookOpen, Trophy, TrendingUp, Star, Target, Users, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { useAppData } from "@/contexts/AppDataContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { badges: userBadges, activities, projects, enrolledCourses } = useAppData();
  const { toast } = useToast();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsForm, setSettingsForm] = useState({
    name: user?.name || "",
    class: user?.class || "",
    stream: user?.stream || "",
    avatar: user?.avatar || "🎓",
  });

  // Use real badges or demo badges
  const badges = userBadges.length > 0 ? userBadges : [
    { id: '1', emoji: "🏆", name: "First Course", description: "Complete your first course", rarity: "Common" as const, earnedDate: "2 days ago", category: "Learning" },
    { id: '2', emoji: "⚡", name: "Speed Learner", description: "Complete 5 lessons in one day", rarity: "Rare" as const, earnedDate: "5 days ago", category: "Achievement" },
    { id: '3', emoji: "🎯", name: "7-Day Streak", description: "Maintain a 7-day learning streak", rarity: "Epic" as const, earnedDate: "Today", category: "Streak" },
    { id: '4', emoji: "🌟", name: "Top Student", description: "Reach top 10 on leaderboard", rarity: "Legendary" as const, earnedDate: "1 week ago", category: "Competition" },
  ];

  // Use real skills based on user interests or demo skills
  const skills = user?.interests.length ? user.interests.slice(0, 4).map((interest, idx) => ({
    name: interest.charAt(0).toUpperCase() + interest.slice(1),
    level: 50 + (idx * 10),
    maxLevel: 100,
    color: ["from-yellow-400 to-orange-500", "from-pink-400 to-purple-500", "from-blue-400 to-cyan-500", "from-green-400 to-emerald-500"][idx % 4],
    category: "Learning"
  })) : [
    { name: "JavaScript", level: 75, maxLevel: 100, color: "from-yellow-400 to-orange-500", category: "Programming" },
    { name: "UI/UX Design", level: 60, maxLevel: 100, color: "from-pink-400 to-purple-500", category: "Design" },
    { name: "Python", level: 45, maxLevel: 100, color: "from-blue-400 to-cyan-500", category: "Programming" },
    { name: "React", level: 80, maxLevel: 100, color: "from-green-400 to-emerald-500", category: "Programming" },
  ];

  // Use real activities or demo activities
  const recentActivity = activities.length > 0 ? activities.slice(0, 5) : [
    { id: '1', type: 'lesson_completed' as const, title: "Completed JavaScript Arrays", description: "JavaScript Arrays", xpGained: 50, timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), icon: '✅' },
    { id: '2', type: 'course_completed' as const, title: "Started React Hooks Course", description: "React Hooks Course", xpGained: 0, timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), icon: '📚' },
    { id: '3', type: 'quiz_won' as const, title: "Won Quiz Battle", description: "Quiz Battle", xpGained: 100, timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), icon: '🏆' },
  ];

  const formatTimeAgo = (timestamp: string) => {
    const seconds = Math.floor((Date.now() - new Date(timestamp).getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-b from-background to-secondary/5">
      {/* Profile Header */}
      <header className="bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 text-white p-6 shadow-elevated">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center text-5xl border-4 border-white/20 animate-pulse-glow">
              {user?.avatar || '🎓'}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-1">{user?.name || 'Student Name'}</h1>
              <p className="text-primary-foreground/80 text-sm mb-3">{user?.class || 'Class 12'}{user?.stream ? `, ${user.stream}` : ''}</p>
              <div className="flex gap-3">
                <Badge className="bg-white/20 border-white/30">Level {user?.level || 1}</Badge>
                <Badge className="bg-accent text-accent-foreground">{user?.xp || 0} XP</Badge>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 hover:bg-white/20"
              onClick={() => setSettingsOpen(true)}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <div className="text-xl font-bold">{enrolledCourses.length}</div>
              <div className="text-xs text-primary-foreground/70">Courses</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <div className="text-xl font-bold">{projects.length}</div>
              <div className="text-xs text-primary-foreground/70">Projects</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <div className="text-xl font-bold">{badges.length}</div>
              <div className="text-xs text-primary-foreground/70">Badges</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <div className="text-xl font-bold">{user?.rating.toFixed(1) || '0.0'}★</div>
              <div className="text-xs text-primary-foreground/70">Rating</div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        {/* XP Progress to Next Level */}
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-orange-500/10 border-accent/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-accent" />
              <div>
                <h3 className="font-bold">Level {user?.level || 1} → Level {(user?.level || 1) + 1}</h3>
                <p className="text-sm text-muted-foreground">{(user?.xpToNextLevel || 500) - (user?.xp || 0)} XP to go!</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-accent">{user?.xp || 0}</div>
              <div className="text-xs text-muted-foreground">/ {user?.xpToNextLevel || 500} XP</div>
            </div>
          </div>
          <Progress value={((user?.xp || 0) / (user?.xpToNextLevel || 500)) * 100} className="h-3 bg-accent/20" />
        </Card>

        {/* Skills & Progress */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            My Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {skills.map((skill, idx) => (
              <Card key={idx} className="p-5 hover:shadow-card transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{skill.name}</h3>
                  <Badge variant="outline">{Math.floor((skill.level / skill.maxLevel) * 100)}%</Badge>
                </div>
                <div className="space-y-2">
                  <Progress value={(skill.level / skill.maxLevel) * 100} className="h-2" />
                  <div className={`h-1 rounded-full bg-gradient-to-r ${skill.color} opacity-60`}></div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Badges & Achievements */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Badges & Achievements
            </h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {badges.slice(0, 6).map((badge) => (
              <Card
                key={badge.id}
                className="p-4 text-center hover:shadow-card transition-all cursor-pointer group hover:scale-105"
              >
                <div className="text-4xl mb-2 group-hover:animate-bounce-subtle">{badge.emoji}</div>
                <div className="text-xs font-medium mb-1">{badge.name}</div>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    badge.rarity === "Legendary"
                      ? "border-yellow-500 text-yellow-700"
                      : badge.rarity === "Epic"
                      ? "border-purple-500 text-purple-700"
                      : badge.rarity === "Rare"
                      ? "border-blue-500 text-blue-700"
                      : "border-gray-400 text-gray-700"
                  }`}
                >
                  {badge.rarity}
                </Badge>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Recent Activity
          </h2>
          <Card className="divide-y divide-border">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === "lesson_completed" || activity.type === "course_completed"
                        ? "bg-green-100 dark:bg-green-950 text-green-600"
                        : activity.type === "quiz_won"
                        ? "bg-yellow-100 dark:bg-yellow-950 text-yellow-600"
                        : activity.type === "taught_session"
                        ? "bg-blue-100 dark:bg-blue-950 text-blue-600"
                        : "bg-purple-100 dark:bg-purple-950 text-purple-600"
                    }`}
                  >
                    {activity.type.includes("lesson") || activity.type.includes("course") ? (
                      <BookOpen className="w-5 h-5" />
                    ) : activity.type === "quiz_won" ? (
                      <Trophy className="w-5 h-5" />
                    ) : activity.type === "taught_session" ? (
                      <Users className="w-5 h-5" />
                    ) : (
                      <Star className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">
                      {activity.title}
                    </div>
                    <div className="text-sm text-muted-foreground">{formatTimeAgo(activity.timestamp)}</div>
                  </div>
                </div>
                {activity.xpGained > 0 && (
                  <Badge className="bg-accent text-accent-foreground">+{activity.xpGained} XP</Badge>
                )}
              </div>
            ))}
          </Card>
        </section>

        {/* Portfolio Preview */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">My Portfolio</h2>
            <Button variant="outline" size="sm">
              View Full Portfolio
            </Button>
          </div>
          <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Showcase Your Best Work</h3>
            <p className="text-muted-foreground mb-4">
              Add projects to build an impressive portfolio
            </p>
            <Button className="bg-gradient-to-r from-primary to-primary-dark">
              Add to Portfolio
            </Button>
          </Card>
        </section>
      </div>

      {/* Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Profile Settings</DialogTitle>
            <DialogDescription>
              Update your profile information and preferences.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Your name"
                value={settingsForm.name}
                onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select 
                  value={settingsForm.class} 
                  onValueChange={(value) => setSettingsForm({ ...settingsForm, class: value })}
                >
                  <SelectTrigger id="class">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Class 9">Class 9</SelectItem>
                    <SelectItem value="Class 10">Class 10</SelectItem>
                    <SelectItem value="Class 11">Class 11</SelectItem>
                    <SelectItem value="Class 12">Class 12</SelectItem>
                    <SelectItem value="College">College</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stream">Stream (Optional)</Label>
                <Select 
                  value={settingsForm.stream} 
                  onValueChange={(value) => setSettingsForm({ ...settingsForm, stream: value })}
                >
                  <SelectTrigger id="stream">
                    <SelectValue placeholder="Select stream" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Commerce">Commerce</SelectItem>
                    <SelectItem value="Arts">Arts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Choose Avatar</Label>
              <div className="grid grid-cols-8 gap-3">
                {['🎓', '👨‍💻', '👩‍💻', '👨‍🎓', '👩‍🎓', '🧑‍💼', '👨‍🏫', '👩‍🏫', '🧑‍🔬', '👨‍🔬', '👩‍🔬', '🧑‍🎨', '👨‍🎨', '👩‍🎨', '🦸‍♂️', '🦸‍♀️'].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => setSettingsForm({ ...settingsForm, avatar: emoji })}
                    className={`w-12 h-12 rounded-lg text-2xl flex items-center justify-center transition-all hover:scale-110 ${
                      settingsForm.avatar === emoji 
                        ? 'bg-primary text-white ring-2 ring-primary ring-offset-2' 
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-3">Account Actions</h4>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    toast({
                      title: "Email Preferences",
                      description: "Email notification settings will open here.",
                    });
                  }}
                >
                  📧 Email Notifications
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    toast({
                      title: "Privacy Settings",
                      description: "Privacy and data settings will open here.",
                    });
                  }}
                >
                  🔒 Privacy Settings
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-600 hover:text-red-700"
                  onClick={() => {
                    toast({
                      title: "Change Password",
                      description: "Password change form will open here.",
                    });
                  }}
                >
                  🔑 Change Password
                </Button>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setSettingsOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-primary to-secondary"
              onClick={() => {
                if (!settingsForm.name || !settingsForm.class) {
                  toast({
                    title: "Missing Information",
                    description: "Please provide your name and class.",
                    variant: "destructive",
                  });
                  return;
                }
                toast({
                  title: "Settings Updated! ✅",
                  description: "Your profile has been updated successfully.",
                });
                setSettingsOpen(false);
              }}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default Profile;
