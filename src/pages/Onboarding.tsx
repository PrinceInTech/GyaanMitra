import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BookOpen, Code, Palette, Music, Beaker, Globe, Brain } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const interests = [
  { id: "coding", label: "Coding", icon: Code },
  { id: "design", label: "Design", icon: Palette },
  { id: "science", label: "Science", icon: Beaker },
  { id: "music", label: "Music", icon: Music },
  { id: "languages", label: "Languages", icon: Globe },
  { id: "math", label: "Mathematics", icon: Brain },
  { id: "literature", label: "Literature", icon: BookOpen },
  { id: "arts", label: "Arts", icon: Sparkles },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isOnboarded, completeOnboarding, signup } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already onboarded
  useEffect(() => {
    if (isAuthenticated && isOnboarded) {
      navigate("/home");
    }
  }, [isAuthenticated, isOnboarded, navigate]);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleNext = async () => {
    if (step === 1) {
      // Create a demo user if not authenticated
      if (!isAuthenticated) {
        setIsLoading(true);
        try {
          await signup("Student Demo", "demo@gyaanmitra.com", "demo123");
          toast.success("Welcome to GyaanMitra! 🎉");
        } catch (error) {
          toast.error("Something went wrong. Please try again.");
        } finally {
          setIsLoading(false);
        }
      }
      setStep(2);
    } else if (step === 2 && selectedInterests.length > 0) {
      setIsLoading(true);
      try {
        completeOnboarding(selectedInterests);
        toast.success("Your learning journey begins now! 🚀");
        navigate("/home");
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
      {/* Welcome Step */}
      {step === 1 && (
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center animate-pulse-glow">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Welcome to GyaanMitra
            </h1>
            <p className="text-xl text-muted-foreground font-medium">
              Seek. Share. Shine. ✨
            </p>
          </div>

          <Card className="p-8 space-y-4 shadow-elevated border-2 border-primary/10">
            <h2 className="text-2xl font-semibold text-center">Your Digital Gurukul</h2>
            <p className="text-muted-foreground text-center leading-relaxed">
              Where knowledge meets friendship and learning becomes a game. Let's embark on an
              amazing journey together!
            </p>
            <div className="pt-4">
              <Button
                onClick={handleNext}
                disabled={isLoading}
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary-dark hover:shadow-glow transition-all"
              >
                {isLoading ? "Loading..." : "Let's Begin 🚀"}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Interests Selection Step */}
      {step === 2 && (
        <div className="w-full max-w-2xl space-y-6 animate-fade-in">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">What interests you?</h2>
            <p className="text-muted-foreground">
              Select topics you'd love to explore (choose at least one)
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {interests.map((interest) => (
              <Card
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                className={`p-6 cursor-pointer transition-all hover:scale-105 hover:shadow-card ${
                  selectedInterests.includes(interest.id)
                    ? "bg-primary/10 border-primary shadow-card border-2"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex flex-col items-center gap-3 text-center">
                  <interest.icon
                    className={`w-8 h-8 ${
                      selectedInterests.includes(interest.id)
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                  <span
                    className={`font-medium ${
                      selectedInterests.includes(interest.id)
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {interest.label}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1 h-12 text-base"
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={selectedInterests.length === 0 || isLoading}
              className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary-dark hover:shadow-glow transition-all disabled:opacity-50"
            >
              {isLoading ? "Setting up..." : "Start Learning 🎓"}
            </Button>
          </div>

          <div className="flex justify-center gap-2 pt-2">
            <div className="w-2 h-2 rounded-full bg-primary/30"></div>
            <div className="w-2 h-2 rounded-full bg-primary"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
