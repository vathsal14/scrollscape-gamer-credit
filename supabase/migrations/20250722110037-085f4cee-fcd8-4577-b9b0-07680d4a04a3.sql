-- Create the trigger
DROP TRIGGER IF EXISTS trigger_process_referral_bonus ON public.referrals;
CREATE TRIGGER trigger_process_referral_bonus
  BEFORE INSERT ON public.referrals
  FOR EACH ROW
  EXECUTE FUNCTION public.process_referral_bonus();