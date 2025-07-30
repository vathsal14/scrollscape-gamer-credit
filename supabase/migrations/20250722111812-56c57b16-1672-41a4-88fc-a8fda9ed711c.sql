-- Update process_referral function to limit maximum 3 referrals per referrer
CREATE OR REPLACE FUNCTION public.process_referral(referred_user_id uuid, referral_code text)
RETURNS void
LANGUAGE plpgsql
AS $function$
BEGIN
  -- Find the referrer and create referral record only if they have less than 3 referrals
  INSERT INTO referrals (referrer_id, referred_id, referral_code, status)
  SELECT p.id, referred_user_id, process_referral.referral_code, 'pending'
  FROM profiles p
  WHERE p.referral_code = process_referral.referral_code
  AND NOT EXISTS (
    SELECT 1 FROM referrals r 
    WHERE r.referrer_id = p.id AND r.referred_id = referred_user_id
  )
  AND (
    SELECT COUNT(*) FROM referrals r2 
    WHERE r2.referrer_id = p.id
  ) < 3;
END;
$function$;