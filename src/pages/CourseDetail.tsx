import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Play, CheckCircle2, Lock, BookOpen, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppData } from "@/contexts/AppDataContext";
import { toast } from "sonner";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { courses, enrollCourse } = useAppData();
  
  const course = courses.find(c => c.id === courseId);
  
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
          <Button onClick={() => navigate("/home")}>Go Back Home</Button>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    enrollCourse(course.id);
    toast.success(`Enrolled in ${course.title}! 🎉`);
  };

  const handleStartLesson = (lessonId: string) => {
    if (!course.enrolled) {
      toast.error("Please enroll in the course first");
      return;
    }
    navigate(`/course/${courseId}/lesson/${lessonId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5 pb-6">
      {/* Header */}
      <div className={`bg-gradient-to-r ${course.color} text-white p-6 shadow-elevated`}>
        <div className="max-w-6xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mb-4 text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-5xl">
              {course.thumbnail}
            </div>
            
            <div className="flex-1">
              <Badge className="mb-3 bg-white/20 border-white/30">
                {course.category}
              </Badge>
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <p className="text-white/90 mb-4">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{course.studentsCount.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  <span>{course.rating} rating</span>
                </div>
                <Badge variant="outline" className="border-white/30 text-white">
                  {course.difficulty}
                </Badge>
              </div>
            </div>
            
            <div>
              {!course.enrolled ? (
                <Button
                  onClick={handleEnroll}
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Enroll Now
                </Button>
              ) : (
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold">Enrolled</div>
                  <div className="text-sm mt-1">{Math.floor(course.progress)}% Complete</div>
                </div>
              )}
            </div>
          </div>
          
          {course.enrolled && (
            <div className="mt-6">
              <Progress value={course.progress} className="h-2 bg-white/20" />
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs defaultValue="lessons" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
          </TabsList>
          
          <TabsContent value="lessons" className="mt-6">
            <Card className="divide-y divide-border">
              {course.lessons.map((lesson, idx) => (
                <div
                  key={lesson.id}
                  className="p-5 hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => handleStartLesson(lesson.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        lesson.completed
                          ? 'bg-green-100 dark:bg-green-950 text-green-600'
                          : course.enrolled
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {lesson.completed ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : course.enrolled ? (
                          <Play className="w-5 h-5" />
                        ) : (
                          <Lock className="w-5 h-5" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-muted-foreground">Lesson {idx + 1}</span>
                          {lesson.completed && (
                            <Badge variant="secondary" className="text-xs">Completed</Badge>
                          )}
                        </div>
                        <h3 className="font-semibold">{lesson.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{lesson.description}</p>
                        
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {lesson.duration}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            +{lesson.xpReward} XP
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {course.enrolled && !lesson.completed && (
                      <Button variant="ghost" size="sm">
                        Start
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </Card>
          </TabsContent>
          
          <TabsContent value="overview" className="mt-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">About This Course</h3>
              <p className="text-muted-foreground mb-6">{course.description}</p>
              
              <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Master the fundamentals and advanced concepts</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Build real-world projects from scratch</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Get hands-on practice with exercises</span>
                </li>
              </ul>
              
              <h3 className="text-xl font-bold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {course.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="instructor" className="mt-6">
            <Card className="p-6">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl">
                  {course.instructor.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{course.instructor.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{course.instructor.rating} rating</span>
                  </div>
                  <p className="text-muted-foreground">
                    Expert instructor with years of experience in teaching and industry practice.
                    Passionate about helping students achieve their learning goals.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CourseDetail;
