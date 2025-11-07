import { Users, BookOpen, Star, TrendingUp, Search } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useState } from "react";

const Trade = () => {
  const { toast } = useToast();
  const [createOfferOpen, setCreateOfferOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [offerForm, setOfferForm] = useState({
    teaches: "",
    wants: "",
    description: "",
    level: "",
    availability: "",
    credits: 10,
  });
  const skillOffers = [
    {
      name: "Priya Sharma",
      avatar: "👩‍💻",
      teaches: "React Development",
      wants: "UI/UX Design",
      rating: 4.8,
      sessions: 23,
      level: "Expert",
      color: "from-blue-400 to-cyan-500",
    },
    {
      name: "Rahul Kumar",
      avatar: "👨‍🎨",
      teaches: "Graphic Design",
      wants: "JavaScript Basics",
      rating: 4.9,
      sessions: 45,
      level: "Expert",
      color: "from-pink-400 to-purple-500",
    },
    {
      name: "Ananya Singh",
      avatar: "👩‍🔬",
      teaches: "Data Science",
      wants: "Python Basics",
      rating: 4.7,
      sessions: 18,
      level: "Advanced",
      color: "from-green-400 to-emerald-500",
    },
    {
      name: "Arjun Patel",
      avatar: "👨‍🏫",
      teaches: "Mathematics",
      wants: "Web Development",
      rating: 4.6,
      sessions: 31,
      level: "Intermediate",
      color: "from-yellow-400 to-orange-500",
    },
  ];

  const myCredits = 150;

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-b from-background to-accent/5">
      {/* Header */}
      <header className="bg-gradient-to-r from-secondary to-primary text-white p-6 shadow-elevated">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">Student Trade 🤝</h1>
              <p className="text-primary-foreground/80 text-sm mt-1">
                Exchange knowledge, grow together
              </p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
              <div className="text-xs text-primary-foreground/70">Credits</div>
              <div className="font-bold text-xl">{myCredits}</div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search skills or students..."
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
            />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        {/* Quick Stats - Start from Zero */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center hover:shadow-card transition-all">
            <div className="text-2xl font-bold text-primary mb-1">0</div>
            <div className="text-sm text-muted-foreground">Sessions Taught</div>
          </Card>
          <Card className="p-4 text-center hover:shadow-card transition-all">
            <div className="text-2xl font-bold text-secondary mb-1">0</div>
            <div className="text-sm text-muted-foreground">Skills Learned</div>
          </Card>
          <Card className="p-4 text-center hover:shadow-card transition-all">
            <div className="text-2xl font-bold text-muted-foreground mb-1">--</div>
            <div className="text-sm text-muted-foreground">Your Rating</div>
          </Card>
        </div>

        {/* Start Learning Today CTA */}
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-orange-500/10 border-accent/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1">🌟 Start Learning Today!</h3>
              <p className="text-sm text-muted-foreground">
                Share what you know and learn what you need. Your journey begins here!
              </p>
            </div>
            <Dialog open={createOfferOpen} onOpenChange={setCreateOfferOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-accent to-orange-500 hover:shadow-glow">
                  Create Offer
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create Skill Exchange Offer</DialogTitle>
                  <DialogDescription>
                    Share what you can teach and what you want to learn. Let's grow together!
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="teaches">What can you teach?</Label>
                    <Input
                      id="teaches"
                      placeholder="e.g., React Development, Python, Graphic Design..."
                      value={offerForm.teaches}
                      onChange={(e) => setOfferForm({ ...offerForm, teaches: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="wants">What do you want to learn?</Label>
                    <Input
                      id="wants"
                      placeholder="e.g., UI/UX Design, JavaScript, Data Science..."
                      value={offerForm.wants}
                      onChange={(e) => setOfferForm({ ...offerForm, wants: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Tell others about your teaching experience and learning goals..."
                      className="min-h-[100px]"
                      value={offerForm.description}
                      onChange={(e) => setOfferForm({ ...offerForm, description: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="level">Your Level</Label>
                      <Select value={offerForm.level} onValueChange={(value) => setOfferForm({ ...offerForm, level: value })}>
                        <SelectTrigger id="level">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                          <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="availability">Availability</Label>
                      <Select value={offerForm.availability} onValueChange={(value) => setOfferForm({ ...offerForm, availability: value })}>
                        <SelectTrigger id="availability">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekday-morning">Weekday Mornings</SelectItem>
                          <SelectItem value="weekday-evening">Weekday Evenings</SelectItem>
                          <SelectItem value="weekend">Weekends</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="credits">Credits per Session</Label>
                    <Input
                      id="credits"
                      type="number"
                      min="5"
                      max="50"
                      value={offerForm.credits}
                      onChange={(e) => setOfferForm({ ...offerForm, credits: parseInt(e.target.value) || 10 })}
                    />
                    <p className="text-xs text-muted-foreground">Recommended: 10-20 credits per hour session</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1" onClick={() => setCreateOfferOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-accent to-orange-500"
                    onClick={() => {
                      if (!offerForm.teaches || !offerForm.wants) {
                        toast({
                          title: "Missing Information",
                          description: "Please fill in what you can teach and what you want to learn.",
                          variant: "destructive",
                        });
                        return;
                      }
                      toast({
                        title: "Offer Created! 🎉",
                        description: "Your skill exchange offer is now live. Students will be able to connect with you.",
                      });
                      setCreateOfferOpen(false);
                      setOfferForm({
                        teaches: "",
                        wants: "",
                        description: "",
                        level: "",
                        availability: "",
                        credits: 10,
                      });
                    }}
                  >
                    Create Offer
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>

        {/* Available Skills */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Available Skills
            </h2>
            <Button variant="outline" size="sm">
              Filter
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {skillOffers.map((offer, idx) => (
              <Card
                key={idx}
                className="p-5 hover:shadow-elevated transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-14 h-14 rounded-full bg-gradient-to-br ${offer.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}
                  >
                    {offer.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="font-semibold">{offer.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {offer.level}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {offer.rating}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      {offer.sessions} sessions completed
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground">Can Teach</div>
                      <div className="font-medium text-sm">{offer.teaches}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-900">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <div className="flex-1">
                      <div className="text-xs text-muted-foreground">Wants to Learn</div>
                      <div className="font-medium text-sm">{offer.wants}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => {
                      setSelectedProfile(offer);
                      setProfileDialogOpen(true);
                    }}
                  >
                    View Profile
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-to-r from-primary to-primary-dark"
                    onClick={() => {
                      toast({
                        title: "Connection Request Sent! 🤝",
                        description: `Your request to connect with ${offer.name} has been sent. They'll be notified soon!`,
                      });
                    }}
                  >
                    Connect
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Profile Dialog */}
      <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedProfile && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${selectedProfile.color} flex items-center justify-center text-3xl`}
                  >
                    {selectedProfile.avatar}
                  </div>
                  <div>
                    <div className="text-xl">{selectedProfile.name}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">{selectedProfile.level}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {selectedProfile.rating}
                      </div>
                    </div>
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    Can Teach
                  </h3>
                  <Card className="p-4 bg-green-50 dark:bg-green-950/20 border-green-200">
                    <p className="font-medium">{selectedProfile.teaches}</p>
                  </Card>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    Wants to Learn
                  </h3>
                  <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200">
                    <p className="font-medium">{selectedProfile.wants}</p>
                  </Card>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="text-2xl font-bold text-primary mb-1">{selectedProfile.sessions}</div>
                    <div className="text-sm text-muted-foreground">Sessions Completed</div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-2xl font-bold text-secondary mb-1">{selectedProfile.rating}</div>
                    <div className="text-sm text-muted-foreground">Average Rating</div>
                  </Card>
                </div>

                <div className="bg-accent/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">About</h4>
                  <p className="text-sm text-muted-foreground">
                    Experienced {selectedProfile.level.toLowerCase()} level educator passionate about sharing knowledge 
                    and learning new skills. Has successfully completed {selectedProfile.sessions} peer learning sessions 
                    with an excellent rating of {selectedProfile.rating}/5.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setProfileDialogOpen(false)}>
                  Close
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-primary to-primary-dark"
                  onClick={() => {
                    toast({
                      title: "Connection Request Sent! 🤝",
                      description: `Your request to connect with ${selectedProfile.name} has been sent. They'll be notified soon!`,
                    });
                    setProfileDialogOpen(false);
                  }}
                >
                  Send Connection Request
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default Trade;
