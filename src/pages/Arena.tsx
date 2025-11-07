import { Trophy, Zap, Target, Crown, Star, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { useAppData } from "@/contexts/AppDataContext";
import { useNavigate } from "react-router-dom";

const Arena = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { leaderboard: appLeaderboard, quizzes } = useAppData();

  // Combine app leaderboard with current user
  const leaderboard = user 
    ? [
        ...appLeaderboard,
        { 
          rank: appLeaderboard.length + 1, 
          userId: user.id,
          userName: user.name, 
          userAvatar: user.avatar,
          xp: user.xp, 
          level: user.level,
          streak: user.streak,
          isCurrentUser: true 
        }
      ].sort((a, b) => b.xp - a.xp).map((entry, idx) => ({ ...entry, rank: idx + 1 }))
    : appLeaderboard;

  const gameModes = [
    {
      title: "Quick Quiz",
      description: "Fast-paced 5-minute challenge",
      icon: Zap,
      color: "from-yellow-400 to-orange-500",
      xp: "+50 XP",
      action: () => quizzes.length > 0 && navigate(`/quiz/${quizzes[0].id}`),
    },
    {
      title: "Topic Battle",
      description: "Challenge peers on specific subjects",
      icon: Target,
      color: "from-blue-400 to-cyan-500",
      xp: "+100 XP",
      action: () => quizzes.length > 0 && navigate(`/quiz/${quizzes[0].id}`),
    },
    {
      title: "Skill Tournament",
      description: "Weekly competitions with prizes",
      icon: Trophy,
      color: "from-pink-400 to-purple-500",
      xp: "+500 XP",
      action: () => navigate("/arena"),
    },
  ];

  const userRank = leaderboard.findIndex(entry => entry.isCurrentUser) + 1;

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-b from-background to-secondary/5">
      {/* Header */}
      <header className="bg-gradient-to-r from-accent via-orange-500 to-accent text-white p-6 shadow-elevated">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Arena 🎮</h1>
              <p className="text-accent-foreground/80 text-sm mt-1">
                Test your skills & climb the leaderboard
              </p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
              <Trophy className="w-6 h-6 mx-auto mb-1" />
              <div className="font-bold">Rank #{userRank}</div>
            </div>
          </div>

          {/* XP Progress */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Level {user?.level || 1}</span>
              <span className="text-sm">{user?.xp || 0} / {user?.xpToNextLevel || 500} XP</span>
            </div>
            <Progress value={((user?.xp || 0) / (user?.xpToNextLevel || 500)) * 100} className="h-2 bg-white/20" />
            <p className="text-xs mt-2 text-accent-foreground/70">{(user?.xpToNextLevel || 500) - (user?.xp || 0)} XP to Level {(user?.level || 1) + 1}</p>
          </Card>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        {/* Game Modes */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Choose Your Challenge
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {gameModes.map((mode, idx) => (
              <Card
                key={idx}
                className="p-6 hover:shadow-elevated transition-all cursor-pointer group hover:scale-105"
              >
                <div className="space-y-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center group-hover:animate-bounce-subtle`}
                  >
                    <mode.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{mode.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{mode.description}</p>
                    <Badge className={`bg-gradient-to-r ${mode.color} text-white border-0`}>
                      {mode.xp}
                    </Badge>
                  </div>
                  <Button 
                    onClick={mode.action}
                    className="w-full bg-gradient-to-r from-primary to-primary-dark"
                  >
                    Start Challenge
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Active Tournaments */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Crown className="w-5 h-5 text-accent" />
            Active Tournaments
          </h2>
          <Card className="p-6 bg-gradient-to-br from-accent/10 to-orange-500/10 border-accent/20">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge className="bg-accent text-accent-foreground mb-3">Live Now</Badge>
                <h3 className="text-xl font-bold mb-2">Web Development Championship</h3>
                <p className="text-muted-foreground text-sm">
                  Compete with 500+ students across India
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Prize Pool</div>
                <div className="text-2xl font-bold text-accent">₹10,000</div>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>250 participants</span>
                  <span>Ends in 2 days</span>
                </div>
                <Progress value={50} className="h-2 bg-accent/20" />
              </div>
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-accent to-orange-500 hover:shadow-glow"
              onClick={() => quizzes.length > 1 && navigate(`/quiz/${quizzes[1].id}`)}
            >
              Join Tournament
            </Button>
          </Card>
        </section>

        {/* Leaderboard */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Leaderboard
          </h2>
          <Card className="divide-y divide-border">
            {leaderboard.map((player) => (
              <div
                key={player.userId}
                className={`p-4 flex items-center justify-between hover:bg-muted/50 transition-colors ${
                  player.isCurrentUser ? "bg-primary/5" : ""
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                      player.rank === 1
                        ? "bg-gradient-to-br from-yellow-400 to-orange-500 text-white"
                        : player.rank === 2
                        ? "bg-gradient-to-br from-gray-300 to-gray-400 text-white"
                        : player.rank === 3
                        ? "bg-gradient-to-br from-orange-400 to-orange-600 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {player.rank}
                  </div>
                  <div className="text-2xl">{player.userAvatar}</div>
                  <div>
                    <div className="font-semibold">{player.userName}{player.isCurrentUser && " (You)"}</div>
                    <div className="text-sm text-muted-foreground">{player.xp.toLocaleString()} XP</div>
                  </div>
                </div>
                {player.rank <= 3 && (
                  <Badge
                    variant="outline"
                    className={
                      player.rank === 1
                        ? "border-yellow-500 text-yellow-700"
                        : player.rank === 2
                        ? "border-gray-400 text-gray-700"
                        : "border-orange-500 text-orange-700"
                    }
                  >
                    Top {player.rank}
                  </Badge>
                )}
              </div>
            ))}
          </Card>
        </section>

        {/* Today's Challenges */}
        <section>
          <h2 className="text-xl font-bold mb-4">Today's Challenges</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-5 hover:shadow-card transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-blue-500">+30 XP</Badge>
              </div>
              <h3 className="font-semibold mb-2">JavaScript Speed Round</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Answer 10 questions in 3 minutes
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => quizzes.length > 0 && navigate(`/quiz/${quizzes[0].id}`)}
              >
                Start Challenge
              </Button>
            </Card>

            <Card className="p-5 hover:shadow-card transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <Badge className="bg-purple-500">+50 XP</Badge>
              </div>
              <h3 className="font-semibold mb-2">Design Principles Quiz</h3>
              <p className="text-sm text-muted-foreground mb-4">Test your design knowledge</p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => quizzes.length > 0 && navigate(`/quiz/${quizzes[0].id}`)}
              >
                Start Challenge
              </Button>
            </Card>
          </div>
        </section>
      </div>

      <BottomNav />
    </div>
  );
};

export default Arena;
