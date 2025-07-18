import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Shuffle, Clock, Trophy, Star, RotateCcw } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface WordScrambleProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

interface Word {
  word: string;
  hint: string;
  points: number;
}

const words: Word[] = [
  { word: "GAMING", hint: "Playing video games", points: 30 },
  { word: "CONSOLE", hint: "Gaming device for TV", points: 40 },
  { word: "CONTROLLER", hint: "Input device for games", points: 50 },
  { word: "STREAMER", hint: "Person who broadcasts games", points: 45 },
  { word: "ESPORTS", hint: "Competitive gaming", points: 40 },
  { word: "MULTIPLAYER", hint: "Games with multiple players", points: 60 },
  { word: "DOWNLOAD", hint: "Getting files from internet", points: 45 },
  { word: "KEYBOARD", hint: "Computer input device", points: 45 },
  { word: "HEADSET", hint: "Audio device for gaming", points: 40 },
  { word: "PIXEL", hint: "Smallest unit of digital image", points: 35 },
  { word: "VIRTUAL", hint: "Computer simulated", points: 40 },
  { word: "CHAMPION", hint: "Winner of competition", points: 45 },
  { word: "STRATEGY", hint: "Game planning approach", points: 50 },
  { word: "ADVENTURE", hint: "Story-driven game genre", points: 55 },
  { word: "GRAPHICS", hint: "Visual elements in games", points: 45 },
  { word: "JOYSTICK", hint: "Gaming control stick", points: 45 },
  { word: "NETWORK", hint: "Connected system", points: 40 },
  { word: "AVATAR", hint: "Player character representation", points: 40 },
  { word: "QUEST", hint: "Game mission or task", points: 35 },
  { word: "LEVEL", hint: "Game stage or difficulty", points: 30 }
];

const WordScramble = ({ user, isOpen, onClose }: WordScrambleProps) => {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [scrambledWord, setScrambledWord] = useState('');
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [wordsCompleted, setWordsCompleted] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [usedWords, setUsedWords] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen && !showResult) {
      startNewGame();
    }
  }, [isOpen, showResult]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0 && !showResult) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, showResult]);

  const scrambleWord = (word: string): string => {
    const letters = word.split('');
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join('');
  };

  const startNewGame = () => {
    setScore(0);
    setWordsCompleted(0);
    setTimeLeft(60);
    setIsActive(true);
    setUsedWords([]);
    getNewWord();
  };

  const getNewWord = () => {
    const availableWords = words.filter(w => !usedWords.includes(w.word));
    if (availableWords.length === 0) {
      // All words used, reset the used words
      setUsedWords([]);
      return getNewWord();
    }
    
    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    setCurrentWord(randomWord);
    
    let scrambled = scrambleWord(randomWord.word);
    // Make sure scrambled word is different from original
    while (scrambled === randomWord.word && randomWord.word.length > 1) {
      scrambled = scrambleWord(randomWord.word);
    }
    
    setScrambledWord(scrambled);
    setUserInput('');
    setUsedWords(prev => [...prev, randomWord.word]);
  };

  const checkAnswer = () => {
    if (!currentWord) return;
    
    if (userInput.toUpperCase() === currentWord.word) {
      setScore(prev => prev + currentWord.points);
      setWordsCompleted(prev => prev + 1);
      toast.success(`Correct! +${currentWord.points} points`);
      getNewWord();
    } else {
      toast.error('Incorrect! Try again.');
      setUserInput('');
    }
  };

  const handleSkip = () => {
    getNewWord();
  };

  const endGame = async () => {
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
          toast.success(`Game completed! +${score} points earned!`);
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

  const resetGame = () => {
    setShowResult(false);
    setIsActive(false);
  };

  const handleClose = () => {
    resetGame();
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-gaming-surface border-gaming-primary/30">
        <DialogHeader>
          <DialogTitle className="text-gaming-primary flex items-center gap-2">
            <Shuffle className="w-6 h-6" />
            Word Scramble
          </DialogTitle>
        </DialogHeader>

        {!showResult ? (
          <div className="space-y-6">
            {/* Game Stats */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gaming-accent" />
                  <span className={`font-bold ${timeLeft <= 15 ? 'text-red-500' : 'text-gaming-accent'}`}>
                    {timeLeft}s
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-gaming-secondary" />
                  <span className="font-bold text-gaming-secondary">{score}</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                Words: {wordsCompleted}
              </div>
            </div>

            {currentWord && (
              <div className="space-y-4">
                {/* Scrambled Word */}
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">Unscramble this word:</div>
                  <div className="text-3xl font-bold tracking-wider text-gaming-primary bg-gaming-background p-4 rounded-lg border border-gaming-primary/30">
                    {scrambledWord}
                  </div>
                </div>

                {/* Hint */}
                <div className="text-center p-3 bg-gaming-primary/10 rounded-lg border border-gaming-primary/20">
                  <div className="text-sm text-muted-foreground">Hint:</div>
                  <div className="font-medium text-gaming-primary">{currentWord.hint}</div>
                </div>

                {/* Points */}
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-gaming-secondary/20 rounded-full border border-gaming-secondary/30">
                    <Trophy className="w-4 h-4 text-gaming-secondary" />
                    <span className="text-sm font-medium text-gaming-secondary">
                      {currentWord.points} points
                    </span>
                  </div>
                </div>

                {/* Input */}
                <div className="space-y-3">
                  <Input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your answer..."
                    className="text-center text-lg font-medium bg-gaming-background border-gaming-primary/30"
                    autoFocus
                  />
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={checkAnswer}
                      disabled={!userInput.trim()}
                      className="flex-1 bg-gaming-primary hover:bg-gaming-primary/90"
                    >
                      Submit
                    </Button>
                    <Button
                      onClick={handleSkip}
                      variant="outline"
                      className="border-gaming-primary/30"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <Trophy className="w-16 h-16 text-gaming-accent mx-auto" />
              <h3 className="text-2xl font-bold text-gaming-primary">Time's Up!</h3>
              <p className="text-muted-foreground">Great job playing Word Scramble!</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gaming-background rounded-lg border border-gaming-primary/20">
                <div className="text-2xl font-bold text-gaming-primary">{score}</div>
                <div className="text-sm text-muted-foreground">Points Earned</div>
              </div>
              <div className="p-4 bg-gaming-background rounded-lg border border-gaming-secondary/20">
                <div className="text-2xl font-bold text-gaming-secondary">{wordsCompleted}</div>
                <div className="text-sm text-muted-foreground">Words Solved</div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={resetGame}
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

export default WordScramble;