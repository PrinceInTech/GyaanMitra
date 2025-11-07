import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Clock, CheckCircle2, XCircle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAppData } from "@/contexts/AppDataContext";
import { toast } from "sonner";

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { quizzes, completeQuiz } = useAppData();
  
  const quiz = quizzes.find(q => q.id === quizId);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  
  useEffect(() => {
    if (quiz?.timeLimit) {
      setTimeLeft(quiz.timeLimit);
    }
  }, [quiz]);
  
  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quiz?.timeLimit && !showResults && selectedAnswers.length > 0) {
      // Only auto-finish if user has answered at least one question
      handleFinish();
    }
  }, [timeLeft, showResults, selectedAnswers]);
  
  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Quiz Not Found</h2>
          <Button onClick={() => navigate("/arena")}>Go Back to Arena</Button>
        </div>
      </div>
    );
  }
  
  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };
  
  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleFinish = () => {
    // Don't allow finishing if no answers selected
    if (selectedAnswers.length === 0) {
      toast.error("Please answer at least one question before finishing!");
      return;
    }

    const correctAnswers = quiz.questions.filter(
      (q, idx) => selectedAnswers[idx] === q.correctAnswer
    ).length;
    
    const score = Math.floor((correctAnswers / quiz.questions.length) * 100);
    completeQuiz(quiz.id, score);
    setShowResults(true);
    
    // Show XP earned toast
    const xpEarned = Math.floor((score / 100) * (quiz.xpReward || 100));
    if (xpEarned > 0) {
      toast.success(`🎉 Quiz Complete! +${xpEarned} XP Earned`);
    }
  };
  
  const calculateScore = () => {
    const correctAnswers = quiz.questions.filter(
      (q, idx) => selectedAnswers[idx] === q.correctAnswer
    ).length;
    return {
      correct: correctAnswers,
      total: quiz.questions.length,
      percentage: Math.floor((correctAnswers / quiz.questions.length) * 100),
    };
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (showResults) {
    const score = calculateScore();
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full p-8 text-center">
          <div className={`w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center ${
            score.percentage >= 70 
              ? 'bg-gradient-to-br from-green-400 to-emerald-500' 
              : score.percentage >= 50
              ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
              : 'bg-gradient-to-br from-red-400 to-pink-500'
          }`}>
            <Trophy className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold mb-2">
            {score.percentage >= 70 ? 'Excellent Work! 🎉' : score.percentage >= 50 ? 'Good Effort! 👍' : 'Keep Practicing! 💪'}
          </h2>
          <p className="text-muted-foreground mb-6">Quiz Completed</p>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-primary">{score.correct}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold">{score.total - score.correct}</div>
              <div className="text-sm text-muted-foreground">Wrong</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-accent">{score.percentage}%</div>
              <div className="text-sm text-muted-foreground">Score</div>
            </div>
          </div>
          
          <Badge className="mb-6 text-lg py-2 px-4 bg-accent text-accent-foreground">
            +{Math.floor((score.percentage / 100) * quiz.xpReward)} XP Earned
          </Badge>
          
          <div className="space-y-4">
            {quiz.questions.map((q, idx) => (
              <Card key={q.id} className="p-4 text-left">
                <div className="flex items-start gap-3">
                  {selectedAnswers[idx] === q.correctAnswer ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-semibold mb-2">{q.question}</p>
                    {selectedAnswers[idx] !== undefined ? (
                      <>
                        <p className="text-sm text-muted-foreground">
                          Your answer: <span className={selectedAnswers[idx] === q.correctAnswer ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                            {q.options[selectedAnswers[idx]]}
                          </span>
                        </p>
                        {selectedAnswers[idx] !== q.correctAnswer && (
                          <p className="text-sm text-green-600 mt-1 font-medium">
                            Correct answer: {q.options[q.correctAnswer]}
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-gray-500 italic">
                          Your answer: Not answered
                        </p>
                        <p className="text-sm text-green-600 mt-1 font-medium">
                          Correct answer: {q.options[q.correctAnswer]}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="flex gap-3 mt-8">
            <Button variant="outline" onClick={() => navigate("/arena")} className="flex-1">
              Back to Arena
            </Button>
            <Button onClick={() => window.location.reload()} className="flex-1 bg-gradient-to-r from-primary to-primary-dark">
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }
  
  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      {/* Header */}
      <div className={`bg-gradient-to-r ${quiz.color} text-white p-4 shadow-elevated`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/arena")}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Exit Quiz
            </Button>
            
            {quiz.timeLimit && (
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-5 h-5" />
                <span className="font-bold">{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm">Question {currentQuestion + 1} of {quiz.questions.length}</span>
            <Badge className="bg-white/20 border-white/30">{quiz.difficulty}</Badge>
          </div>
          <Progress value={progress} className="h-2 bg-white/20" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">{question.question}</h2>
          
          <RadioGroup
            value={selectedAnswers[currentQuestion]?.toString()}
            onValueChange={(value) => handleSelectAnswer(parseInt(value))}
            className="space-y-4"
          >
            {question.options.map((option, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                <Label
                  htmlFor={`option-${idx}`}
                  className="flex-1 p-4 rounded-lg border-2 cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </Card>
        
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <div className="flex gap-2">
            {quiz.questions.map((_, idx) => (
              <div
                key={idx}
                className={`w-3 h-3 rounded-full ${
                  idx === currentQuestion
                    ? 'bg-primary'
                    : selectedAnswers[idx] !== undefined
                    ? 'bg-primary/50'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
          
          {currentQuestion === quiz.questions.length - 1 ? (
            <Button
              onClick={handleFinish}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="bg-gradient-to-r from-green-500 to-emerald-600"
            >
              Finish Quiz
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="bg-gradient-to-r from-primary to-primary-dark"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
