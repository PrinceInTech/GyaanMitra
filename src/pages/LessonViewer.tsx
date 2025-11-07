import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppData } from "@/contexts/AppDataContext";
import { toast } from "sonner";
import { useState } from "react";

const LessonViewer = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const { courses, updateCourseProgress } = useAppData();
  const [isCompleting, setIsCompleting] = useState(false);
  
  const course = courses.find(c => c.id === courseId);
  const lesson = course?.lessons.find(l => l.id === lessonId);
  
  if (!course || !lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Lesson Not Found</h2>
          <Button onClick={() => navigate("/home")}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  const currentLessonIndex = course.lessons.findIndex(l => l.id === lessonId);
  const nextLesson = currentLessonIndex < course.lessons.length - 1 
    ? course.lessons[currentLessonIndex + 1] 
    : null;

  const handleCompleteLesson = () => {
    setIsCompleting(true);
    
    // Simulate some processing time
    setTimeout(() => {
      if (courseId && lessonId) {
        updateCourseProgress(courseId, lessonId);
        toast.success(`Lesson completed! +${lesson.xpReward} XP 🎉`);
      }
      
      if (nextLesson) {
        navigate(`/course/${courseId}/lesson/${nextLesson.id}`);
      } else {
        toast.success(`Course completed! 🎓`);
        navigate(`/course/${courseId}`);
      }
      setIsCompleting(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/course/${courseId}`)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Course
            </Button>
            
            <div className="h-6 w-px bg-border" />
            
            <div>
              <div className="text-sm text-muted-foreground">
                Lesson {currentLessonIndex + 1} of {course.lessons.length}
              </div>
              <div className="font-semibold">{lesson.title}</div>
            </div>
          </div>
          
          {lesson.completed && (
            <Badge variant="secondary" className="gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Completed
            </Badge>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Video/Content Area */}
        <Card className="mb-6 overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl">{course.thumbnail}</div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{lesson.title}</h3>
                <p className="text-muted-foreground">Video content would appear here</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Lesson Content */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Lesson Overview</h2>
          <p className="text-muted-foreground mb-6">{lesson.description}</p>
          
          <div className="prose dark:prose-invert max-w-none">
            <h3>Key Concepts</h3>
            <p>{lesson.content}</p>
            
            <h3>What You'll Learn</h3>
            <ul>
              <li>Understand the core concepts thoroughly</li>
              <li>Practice with hands-on examples</li>
              <li>Apply knowledge to real-world scenarios</li>
            </ul>
            
            <h3>Practice Exercise</h3>
            <Card className="p-4 bg-muted/50 border-primary/20">
              <p className="font-semibold mb-2">Try this:</p>
              <p className="text-sm text-muted-foreground">
                Take a moment to practice what you've learned in this lesson. 
                Try implementing the concepts on your own before moving forward.
              </p>
            </Card>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">+{lesson.xpReward} XP</Badge>
            <span>•</span>
            <span>{lesson.duration}</span>
          </div>
          
          <div className="flex gap-3">
            {currentLessonIndex > 0 && (
              <Button
                variant="outline"
                onClick={() => navigate(`/course/${courseId}/lesson/${course.lessons[currentLessonIndex - 1].id}`)}
              >
                Previous Lesson
              </Button>
            )}
            
            {!lesson.completed ? (
              <Button
                onClick={handleCompleteLesson}
                disabled={isCompleting}
                className="bg-gradient-to-r from-primary to-primary-dark"
              >
                {isCompleting ? "Completing..." : "Mark as Complete"}
                <CheckCircle2 className="w-4 h-4 ml-2" />
              </Button>
            ) : nextLesson ? (
              <Button
                onClick={() => navigate(`/course/${courseId}/lesson/${nextLesson.id}`)}
                className="bg-gradient-to-r from-primary to-primary-dark"
              >
                Next Lesson
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={() => navigate(`/course/${courseId}`)}
                className="bg-gradient-to-r from-green-500 to-emerald-600"
              >
                Finish Course 🎓
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewer;
