import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { User } from '@supabase/supabase-js';

interface SurveyModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const SurveyModal = ({ user, isOpen, onClose }: SurveyModalProps) => {
  const [currentSection, setCurrentSection] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ageGroup: '',
    isGamer: '',
    gamingFrequency: '',
    monthlySpending: '',
    interestedFeatures: [] as string[],
    preferredRewards: '',
    primaryCard: '',
    suggestions: ''
  });

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        interestedFeatures: [...prev.interestedFeatures, feature]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        interestedFeatures: prev.interestedFeatures.filter(f => f !== feature)
      }));
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Please sign in to submit the survey');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('surveys')
        .insert({
          user_id: user.id,
          age_group: formData.ageGroup,
          is_gamer: formData.isGamer,
          gaming_frequency: formData.gamingFrequency,
          monthly_spending: formData.monthlySpending,
          interested_features: formData.interestedFeatures,
          preferred_rewards: formData.preferredRewards,
          primary_card: formData.primaryCard,
          suggestions: formData.suggestions
        });

      if (error) throw error;

      // Award survey points
      const { error: pointsError } = await supabase.rpc('award_survey_points', {
        user_id: user.id
      });

      if (pointsError) {
        console.error('Error awarding points:', pointsError);
      } else {
        toast.success('Survey submitted! +500 points awarded!');
      }

      onClose();
    } catch (error: any) {
      if (error.code === '23505') {
        toast.error('You have already submitted the survey!');
      } else {
        toast.error('Failed to submit survey');
      }
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    if (currentSection === 1) {
      return formData.ageGroup && formData.isGamer && formData.gamingFrequency && formData.monthlySpending;
    }
    return formData.interestedFeatures.length > 0 && formData.preferredRewards && formData.primaryCard;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gaming-surface border-gaming-primary/30 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-gaming-primary text-xl">
            Help Us Serve You Better
          </DialogTitle>
          <p className="text-muted-foreground">
            Share your gaming preferences and financial needs to help us create the perfect credit card for you.
          </p>
        </DialogHeader>

        {currentSection === 1 && (
          <div className="space-y-6">
            <div className="text-lg font-semibold text-gaming-primary">Section 1: About You</div>
            
            <div>
              <Label className="text-sm font-medium mb-3 block">1. What is your age group?</Label>
              <RadioGroup value={formData.ageGroup} onValueChange={(value) => setFormData(prev => ({ ...prev, ageGroup: value }))}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="under-18" id="under-18" />
                  <Label htmlFor="under-18">Under 18</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="18-24" id="18-24" />
                  <Label htmlFor="18-24">18-24</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="25-34" id="25-34" />
                  <Label htmlFor="25-34">25-34</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="35-44" id="35-44" />
                  <Label htmlFor="35-44">35-44</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="45+" id="45plus" />
                  <Label htmlFor="45plus">45+</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">2. Are you a gamer?</Label>
              <RadioGroup value={formData.isGamer} onValueChange={(value) => setFormData(prev => ({ ...prev, isGamer: value }))}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="gamer-yes" />
                  <Label htmlFor="gamer-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="gamer-no" />
                  <Label htmlFor="gamer-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">3. How often do you play games?</Label>
              <RadioGroup value={formData.gamingFrequency} onValueChange={(value) => setFormData(prev => ({ ...prev, gamingFrequency: value }))}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily">Daily</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly">Weekly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly">Monthly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="rarely" id="rarely" />
                  <Label htmlFor="rarely">Rarely</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">4. How much do you spend on gaming monthly?</Label>
              <RadioGroup value={formData.monthlySpending} onValueChange={(value) => setFormData(prev => ({ ...prev, monthlySpending: value }))}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="less-500" id="less-500" />
                  <Label htmlFor="less-500">Less than ₹500</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="500-1000" id="500-1000" />
                  <Label htmlFor="500-1000">₹500 - ₹1,000</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1000-5000" id="1000-5000" />
                  <Label htmlFor="1000-5000">₹1,000 - ₹5,000</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5000-10000" id="5000-10000" />
                  <Label htmlFor="5000-10000">₹5,000 - ₹10,000</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="10000+" id="10000plus" />
                  <Label htmlFor="10000plus">₹10,000+</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={() => setCurrentSection(2)}
                disabled={!canProceed()}
                className="bg-gaming-primary hover:bg-gaming-primary/90"
              >
                Next Section <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {currentSection === 2 && (
          <div className="space-y-6">
            <div className="text-lg font-semibold text-gaming-primary">Section 2: Aqube Gaming Credit Card Interest</div>
            
            <div>
              <Label className="text-sm font-medium mb-3 block">5. What features of the Aqube Gaming Credit Card interest you the most? (Select all that apply)</Label>
              <div className="space-y-3">
                {[
                  'Cashback on gaming purchases',
                  'Exclusive gaming rewards',
                  'Referral bonuses',
                  'Free lifetime card option'
                ].map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={formData.interestedFeatures.includes(feature)}
                      onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                    />
                    <Label htmlFor={feature}>{feature}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">6. What kind of rewards would excite you the most?</Label>
              <RadioGroup value={formData.preferredRewards} onValueChange={(value) => setFormData(prev => ({ ...prev, preferredRewards: value }))}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gaming-accessories" id="gaming-accessories" />
                  <Label htmlFor="gaming-accessories">Free gaming accessories</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="discounted-games" id="discounted-games" />
                  <Label htmlFor="discounted-games">Discounted game purchases</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="in-game-currency" id="in-game-currency" />
                  <Label htmlFor="in-game-currency">In-game currencies or credits</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cashback-discounts" id="cashback-discounts" />
                  <Label htmlFor="cashback-discounts">Cashback or discounts on online stores</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">7. Would you consider using the Aqube Gaming Credit Card as your primary credit card?</Label>
              <RadioGroup value={formData.primaryCard} onValueChange={(value) => setFormData(prev => ({ ...prev, primaryCard: value }))}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="primary-yes" />
                  <Label htmlFor="primary-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="primary-no" />
                  <Label htmlFor="primary-no">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-sure" id="primary-not-sure" />
                  <Label htmlFor="primary-not-sure">Not sure yet</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">8. Do you have any suggestions or comments for us?</Label>
              <Textarea
                placeholder="Share your thoughts, suggestions, or any feedback..."
                value={formData.suggestions}
                onChange={(e) => setFormData(prev => ({ ...prev, suggestions: e.target.value }))}
                className="bg-gaming-background border-gaming-primary/30"
                rows={4}
              />
            </div>

            <div className="flex justify-between">
              <Button
                onClick={() => setCurrentSection(1)}
                variant="outline"
                className="border-gaming-primary/30"
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Previous Section
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!canProceed() || loading}
                className="bg-gaming-primary hover:bg-gaming-primary/90"
              >
                {loading ? 'Submitting...' : 'Submit Survey'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SurveyModal;