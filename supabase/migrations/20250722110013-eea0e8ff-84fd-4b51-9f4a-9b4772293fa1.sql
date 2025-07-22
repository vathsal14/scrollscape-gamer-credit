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
$function$;