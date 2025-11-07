import { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, BookOpen, Lightbulb, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIGuruBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI Learning Guru 🎓 How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    { icon: BookOpen, label: 'Recommend a course', action: 'recommend_course' },
    { icon: Lightbulb, label: 'Study tips', action: 'study_tips' },
    { icon: Target, label: 'Set learning goals', action: 'set_goals' },
    { icon: Sparkles, label: 'Career guidance', action: 'career_guidance' },
  ];

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Course recommendations
    if (lowerMessage.includes('course') || lowerMessage.includes('learn') || lowerMessage.includes('recommend')) {
      return "Based on your interests, I recommend starting with:\n\n1. **JavaScript Fundamentals** - Great for beginners\n2. **React Development** - Build modern web apps\n3. **Python Basics** - Versatile and beginner-friendly\n\nWhich one sounds interesting to you?";
    }

    // Study tips
    if (lowerMessage.includes('study') || lowerMessage.includes('tip') || lowerMessage.includes('focus')) {
      return "Here are some effective study tips:\n\n✅ **Pomodoro Technique**: Study for 25 mins, break for 5 mins\n✅ **Active Recall**: Test yourself instead of re-reading\n✅ **Spaced Repetition**: Review material at increasing intervals\n✅ **Teach Others**: Use the Trade feature to teach and reinforce learning\n\nKeep your streak going! 🔥";
    }

    // Learning goals
    if (lowerMessage.includes('goal') || lowerMessage.includes('plan') || lowerMessage.includes('roadmap')) {
      return "Let's create a learning roadmap! 🎯\n\n**Week 1-2**: Master the basics\n**Week 3-4**: Build mini-projects\n**Week 5-6**: Collaborate with peers\n**Week 7-8**: Complete a major project\n\nStart by enrolling in a course that matches your goals!";
    }

    // Career guidance
    if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('future')) {
      return "Great question! Here's my advice:\n\n💼 **Web Development**: High demand, great pay\n💼 **Data Science**: Future-focused field\n💼 **UI/UX Design**: Creative and technical\n💼 **Mobile Development**: Growing market\n\nFocus on building projects and networking through our Trade feature!";
    }

    // XP and leveling
    if (lowerMessage.includes('xp') || lowerMessage.includes('level') || lowerMessage.includes('point')) {
      return "Want to level up faster? Here's how:\n\n⭐ Complete quizzes: 100 XP each\n⭐ Finish lessons: 50 XP each\n⭐ Win arena battles: 200 XP\n⭐ Complete mini-projects: 150-400 XP\n\nKeep going! You're doing great! 🚀";
    }

    // Credit system
    if (lowerMessage.includes('credit') || lowerMessage.includes('teach') || lowerMessage.includes('trade')) {
      return "Credits are your teaching currency! 💰\n\n**Earn credits by:**\n• Teaching peers (20-50 credits/session)\n• Completing advanced courses (30 credits)\n• Winning competitions (50 credits)\n\n**Spend credits to:**\n• Learn from experts (15-30 credits/session)\n• Unlock premium content\n\nCheck out the Trade section to get started!";
    }

    // Projects
    if (lowerMessage.includes('project') || lowerMessage.includes('build') || lowerMessage.includes('create')) {
      return "Projects are the best way to learn! 🚀\n\n**Start with Mini Projects:**\n• Calculator App (2 hrs, 100 XP)\n• Todo List (3 hrs, 150 XP)\n• Quiz App (5 hrs, 250 XP)\n\nThen join team projects to collaborate with others!\n\nHead to the Projects section to get started!";
    }

    // Motivation
    if (lowerMessage.includes('motivat') || lowerMessage.includes('tired') || lowerMessage.includes('difficult')) {
      return "I believe in you! 💪\n\nRemember:\n• Every expert was once a beginner\n• Small progress is still progress\n• Your streak shows dedication: keep it going! 🔥\n• Learning with friends makes it easier - use Trade!\n\nYou've got this! Take a short break and come back stronger! 🌟";
    }

    // Default response
    return "I'm here to help you learn better! You can ask me about:\n\n📚 Course recommendations\n💡 Study tips\n🎯 Learning goals\n💼 Career guidance\n⭐ Earning XP and credits\n🚀 Project ideas\n\nWhat would you like to know?";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(inputMessage),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      recommend_course: 'Can you recommend a course for me?',
      study_tips: 'What are some good study tips?',
      set_goals: 'Help me set learning goals',
      career_guidance: 'What career should I pursue?',
    };

    setInputMessage(actionMessages[action] || '');
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 w-14 h-14 rounded-full shadow-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 z-50 animate-bounce-slow"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] shadow-2xl z-50 flex flex-col animate-fade-in">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold">AI Learning Guru</h3>
                <p className="text-xs text-white/80">Always here to help you learn</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="p-3 border-b flex flex-wrap gap-2">
            {quickActions.map((action, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.action)}
                className="text-xs"
              >
                <action.icon className="w-3 h-3 mr-1" />
                {action.label}
              </Button>
            ))}
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything..."
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-purple-500 to-pink-500"
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default AIGuruBot;
