-- Add status column to referrals table
ALTER TABLE public.referrals ADD COLUMN status text DEFAULT 'pending';

-- Update the process_referral function to work with the current table structure
CREATE OR REPLACE FUNCTION public.process_referral(referred_user_id uuid, referral_code text)
RETURNS void
LANGUAGE plpgsql
AS $function$
BEGIN
  -- Find the referrer and create referral record
  INSERT INTO referrals (referrer_id, referred_id, referral_code, status)
  SELECT p.id, referred_user_id, referral_code, 'pending'
  FROM profiles p
  WHERE p.referral_code = process_referral.referral_code
  AND NOT EXISTS (
    SELECT 1 FROM referrals r 
    WHERE r.referrer_id = p.id AND r.referred_id = referred_user_id
  );
END;
$function$

-- Create trigger to process referral bonus when referral is created
CREATE OR REPLACE FUNCTION public.process_referral_bonus()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  -- Check if this is a new referral (not an update to an existing one)
  IF TG_OP = 'INSERT' THEN
    -- Add 1 spin to the referrer's account
    UPDATE public.profiles
    SET 
      spins = COALESCE(spins, 0) + 1,
      updated_at = NOW()
    WHERE id = NEW.referrer_id;
    
    -- Update the referral status to 'completed'
    NEW.status := 'completed';
  END IF;
  
  RETURN NEW;
END;
$function$

-- Create the trigger
DROP TRIGGER IF EXISTS trigger_process_referral_bonus ON public.referrals;
CREATE TRIGGER trigger_process_referral_bonus
  BEFORE INSERT ON public.referrals
  FOR EACH ROW
  EXECUTE FUNCTION public.process_referral_bonus();