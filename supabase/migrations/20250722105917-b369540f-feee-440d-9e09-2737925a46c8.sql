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
$function$;