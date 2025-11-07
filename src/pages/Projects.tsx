import { FolderKanban, Plus, Star, Users, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";
import { useAppData } from "@/contexts/AppDataContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const Projects = () => {
  const { user } = useAuth();
  const { projects: userProjects, miniProjects: appMiniProjects } = useAppData();
  const { toast } = useToast();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    tags: "",
  });

  // Start with 0 projects - user needs to create their own
  const projects = userProjects.length > 0 ? userProjects : [];

  const miniProjects = appMiniProjects.length > 0 ? appMiniProjects : [
    { id: "mini_1", title: "Calculator App", difficulty: "Beginner" as const, estimatedTime: "2 hours", icon: "🔢", tags: ["HTML", "CSS", "JS"], steps: [], xpReward: 100, color: "from-blue-400 to-cyan-500", description: "Build a functional calculator" },
    { id: "mini_2", title: "Todo List", difficulty: "Beginner" as const, estimatedTime: "3 hours", icon: "✅", tags: ["React"], steps: [], xpReward: 150, color: "from-green-400 to-emerald-500", description: "Create a todo list app" },
    { id: "mini_3", title: "Quiz App", difficulty: "Intermediate" as const, estimatedTime: "5 hours", icon: "❓", tags: ["React", "TypeScript"], steps: [], xpReward: 250, color: "from-purple-400 to-pink-500", description: "Build an interactive quiz" },
    { id: "mini_4", title: "Chat Interface", difficulty: "Advanced" as const, estimatedTime: "8 hours", icon: "💬", tags: ["React", "WebSocket"], steps: [], xpReward: 400, color: "from-yellow-400 to-orange-500", description: "Real-time chat application" },
  ];

  const completedProjects = projects.filter(p => p.status === "Completed").length;

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-b from-background to-primary/5">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary via-secondary to-primary text-white p-6 shadow-elevated">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Projects 🚀</h1>
              <p className="text-primary-foreground/80 text-sm mt-1">
                Build, collaborate, and showcase
              </p>
            </div>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20">
                  <Plus className="w-5 h-5 mr-2" />
                  New Project
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Project</DialogTitle>
                  <DialogDescription>
                    Start building your next amazing project. Share your progress and collaborate with others!
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., E-commerce Website, Weather App..."
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what your project does and what you'll build..."
                      className="min-h-[100px]"
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select value={projectForm.category} onValueChange={(value) => setProjectForm({ ...projectForm, category: value })}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">Web Development</SelectItem>
                          <SelectItem value="mobile">Mobile App</SelectItem>
                          <SelectItem value="data">Data Science</SelectItem>
                          <SelectItem value="ai">AI/ML</SelectItem>
                          <SelectItem value="game">Game Development</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty Level</Label>
                      <Select value={projectForm.difficulty} onValueChange={(value) => setProjectForm({ ...projectForm, difficulty: value })}>
                        <SelectTrigger id="difficulty">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Technologies (comma-separated)</Label>
                    <Input
                      id="tags"
                      placeholder="e.g., React, Node.js, MongoDB"
                      value={projectForm.tags}
                      onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setShowCreateDialog(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-primary to-secondary"
                    onClick={() => {
                      if (!projectForm.title || !projectForm.description) {
                        toast({
                          title: "Missing Information",
                          description: "Please provide a title and description for your project.",
                          variant: "destructive",
                        });
                        return;
                      }
                      toast({
                        title: "Project Created! 🚀",
                        description: "Your project has been created. Start building and track your progress!",
                      });
                      setShowCreateDialog(false);
                      setProjectForm({
                        title: "",
                        description: "",
                        category: "",
                        difficulty: "",
                        tags: "",
                      });
                    }}
                  >
                    Create Project
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats - Start from Zero */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">0</div>
              <div className="text-xs text-primary-foreground/70">Total Projects</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">0</div>
              <div className="text-xs text-primary-foreground/70">Completed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
              <div className="text-2xl font-bold">--</div>
              <div className="text-xs text-primary-foreground/70">Avg Rating</div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        {/* My Projects */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-primary" />
              My Projects
            </h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          {/* Show "Start Creating Today" message when no projects */}
          {projects.length === 0 ? (
            <Card className="p-12 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-2">Start Creating Today!</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Turn your ideas into reality. Start with a mini-project or create your own custom project.
              </p>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-primary to-secondary"
                onClick={() => setShowCreateDialog(true)}
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Project
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {projects.map((project, idx) => (
              <Card
                key={idx}
                className="p-5 hover:shadow-elevated transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    <FolderKanban className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {project.description}
                        </p>
                      </div>
                      <Badge
                        variant={project.status === "Completed" ? "default" : "secondary"}
                        className={
                          project.status === "Completed"
                            ? "bg-green-500"
                            : "bg-yellow-500 text-yellow-900"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.map((tag, tagIdx) => (
                        <Badge key={tagIdx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <div className="flex -space-x-2">
                            {project.team.map((member, avatarIdx) => (
                              <div
                                key={avatarIdx}
                                className="w-7 h-7 rounded-full bg-white dark:bg-gray-800 border-2 border-card flex items-center justify-center text-sm"
                                title={member.name}
                              >
                                {member.avatar}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{project.rating}</span>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          {project.progress}% Complete
                        </div>
                      </div>

                      <Button variant="ghost" size="sm" className="gap-2">
                        View <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            </div>
          )}
        </section>

        {/* Mini Projects */}
        <section>
          <h2 className="text-xl font-bold mb-4">Guided Mini Projects</h2>
          <p className="text-muted-foreground mb-4">
            Start small, build confidence, then tackle bigger challenges
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {miniProjects.map((mini, idx) => (
              <Card
                key={idx}
                className="p-5 hover:shadow-card transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform">
                    {mini.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {mini.title}
                    </h3>
                    <div className="flex items-center gap-3 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {mini.difficulty}
                        </Badge>
                        <span className="text-xs text-muted-foreground">⏱ {mini.estimatedTime}</span>
                      </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        toast({
                          title: `Starting ${mini.title}! 🎯`,
                          description: `Get ready to build! Estimated time: ${mini.estimatedTime}. You'll earn ${mini.xpReward} XP upon completion.`,
                        });
                      }}
                    >
                      Start Building
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Ready to Build Something Amazing?</h3>
              <p className="text-muted-foreground">
                Start a new project or join a team to collaborate
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button 
                className="bg-gradient-to-r from-primary to-primary-dark"
                onClick={() => setShowCreateDialog(true)}
              >
                Create Project
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  toast({
                    title: "Coming Soon! 👥",
                    description: "Team browsing feature is under development. Stay tuned!",
                  });
                }}
              >
                Browse Teams
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Projects;
