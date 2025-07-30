import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Brain, Clock, Trophy, Star } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface GamingQuizProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  points: number;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Which gaming console was released first?",
    options: ["PlayStation", "Nintendo 64", "Sega Genesis", "Xbox"],
    correct: 2,
    points: 50
  },
  {
    id: 2,
    question: "What does RPG stand for in gaming?",
    options: ["Real Player Game", "Role Playing Game", "Random Player Generator", "Racing Performance Game"],
    correct: 1,
    points: 30
  },
  {
    id: 3,
    question: "Which game popularized the battle royale genre?",
    options: ["PUBG", "Fortnite", "Apex Legends", "H1Z1"],
    correct: 0,
    points: 40
  },
  {
    id: 4,
    question: "What is the maximum level in Pokémon games (original)?",
    options: ["99", "100", "120", "255"],
    correct: 1,
    points: 35
  },
  {
    id: 5,
    question: "Which company developed the game 'Valorant'?",
    options: ["Blizzard", "Valve", "Riot Games", "Epic Games"],
    correct: 2,
    points: 45
  },
  {
    id: 6,
    question: "What is the currency used in Minecraft?",
    options: ["Coins", "Gems", "Emeralds", "Diamonds"],
    correct: 2,
    points: 25
  },
  {
    id: 7,
    question: "Which game won Game of the Year 2020?",
    options: ["Cyberpunk 2077", "The Last of Us Part II", "Ghost of Tsushima", "Hades"],
    correct: 1,
    points: 55
  },
  {
    id: 8,
    question: "In League of Legends, what is the name of the jungle monster that gives a blue buff?",
    options: ["Baron Nashor", "Dragon", "Blue Sentinel", "Red Brambleback"],
    correct: 2,
    points: 60
  },
  {
    id: 9,
    question: "Which game engine does Unity use?",
    options: ["Unreal Engine", "Unity Engine", "CryEngine", "Godot"],
    correct: 1,
    points: 40
  },
  {
    id: 10,
    question: "What does FPS stand for in gaming?",
    options: ["First Person Shooter", "Frames Per Second", "Fast Paced Strategy", "All of the above"],
    correct: 3,
    points: 30
  },
  {
    id: 11,
    question: "Which game features the character Master Chief?",
    options: ["Call of Duty", "Halo", "Doom", "Destiny"],
    correct: 1,
    points: 35
  },
  {
    id: 12,
    question: "What is the highest rank in CS:GO?",
    options: ["Global Elite", "Supreme Master", "Legendary Eagle", "Master Guardian"],
    correct: 0,
    points: 65
  },
  {
    id: 13,
    question: "Which game popularized the 'sliding' mechanic in FPS games?",
    options: ["Call of Duty: Modern Warfare", "Titanfall", "Apex Legends", "Overwatch"],
    correct: 1,
    points: 50
  },
  {
    id: 14,
    question: "In which year was Steam launched?",
    options: ["2003", "2004", "2005", "2006"],
    correct: 0,
    points: 45
  },
  {
    id: 15,
    question: "What is the main currency in World of Warcraft?",
    options: ["Silver", "Gold", "Copper", "Platinum"],
    correct: 1,
    points: 30
  }
];

const GamingQuiz = ({ user, isOpen, onClose }: GamingQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [gameQuestions, setGameQuestions] = useState<Question[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isOpen && !showResult) {
      // Shuffle questions and take 5 random ones
      const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
      setGameQuestions(shuffled);
      setCurrentQuestion(0);
      setSelectedAnswers([]);
      setTimeLeft(30);
      setScore(0);
      setIsActive(true);
    }
  }, [isOpen, showResult]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0 && !showResult) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, showResult]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    // Calculate score for current question
    const question = gameQuestions[currentQuestion];
    const userAnswer = selectedAnswers[currentQuestion];
    
    if (userAnswer === question.correct) {
      setScore(prev => prev + question.points);
    }

    if (currentQuestion + 1 < gameQuestions.length) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(30);
    } else {
      endQuiz();
    }
  };

  const endQuiz = async () => {
    setIsActive(false);
    setShowResult(true);
    
    if (user && score > 0) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({ 
            points: (await getUserPoints()) + score,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (!error) {
          toast.success(`Quiz completed! +${score} points earned!`);
        }
      } catch (error) {
        console.error('Error updating points:', error);
      }
    }
  };

  const getUserPoints = async () => {
    if (!user) return 0;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('points')
        .eq('id', user.id)
        .single();

      return data?.points || 0;
    } catch (error) {
      return 0;
    }
  };

  const resetQuiz = () => {
    setShowResult(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setTimeLeft(30);
    setScore(0);
    setIsActive(false);
  };

  const handleClose = () => {
    resetQuiz();
    onClose();
  };

  if (!gameQuestions.length) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-gaming-surface border-gaming-primary/30">
        <DialogHeader>
          <DialogTitle className="text-gaming-primary flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Gaming Quiz Challenge
          </DialogTitle>
        </DialogHeader>

        {!showResult ? (
          <div className="space-y-6">
            {/* Progress and Timer */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {gameQuestions.length}
                </span>
                <Progress value={((currentQuestion + 1) / gameQuestions.length) * 100} className="w-32" />
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gaming-accent" />
                <span className={`font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-gaming-accent'}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>

            {/* Question */}
            <Card className="bg-gaming-background border-gaming-primary/20">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {gameQuestions[currentQuestion]?.question}
                </h3>
                <div className="grid gap-3">
                  {gameQuestions[currentQuestion]?.options.map((option, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      variant={selectedAnswers[currentQuestion] === index ? "default" : "outline"}
                      className={`justify-start h-auto p-4 text-left whitespace-normal ${
                        selectedAnswers[currentQuestion] === index
                          ? 'bg-gaming-primary text-white'
                          : 'border-gaming-primary/30 hover:bg-gaming-primary/10'
                      }`}
                    >
                      <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Next Button */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-gaming-secondary" />
                <span className="text-sm text-muted-foreground">
                  {gameQuestions[currentQuestion]?.points} points
                </span>
              </div>
              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="bg-gaming-primary hover:bg-gaming-primary/90"
              >
                {currentQuestion + 1 === gameQuestions.length ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <Trophy className="w-16 h-16 text-gaming-accent mx-auto" />
              <h3 className="text-2xl font-bold text-gaming-primary">Quiz Completed!</h3>
              <p className="text-muted-foreground">Great job on completing the gaming quiz!</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-gaming-background rounded-lg border border-gaming-primary/20">
                <div className="text-2xl font-bold text-gaming-primary">{score}</div>
                <div className="text-sm text-muted-foreground">Points Earned</div>
              </div>
              <div className="p-4 bg-gaming-background rounded-lg border border-gaming-secondary/20">
                <div className="text-2xl font-bold text-gaming-secondary">
                  {selectedAnswers.filter((answer, index) => answer === gameQuestions[index]?.correct).length}
                </div>
                <div className="text-sm text-muted-foreground">Correct Answers</div>
              </div>
              <div className="p-4 bg-gaming-background rounded-lg border border-gaming-accent/20">
                <div className="text-2xl font-bold text-gaming-accent">{gameQuestions.length}</div>
                <div className="text-sm text-muted-foreground">Total Questions</div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={resetQuiz}
                variant="outline"
                className="border-gaming-primary/30"
              >
                Play Again
              </Button>
              <Button
                onClick={handleClose}
                className="bg-gaming-primary hover:bg-gaming-primary/90"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GamingQuiz;