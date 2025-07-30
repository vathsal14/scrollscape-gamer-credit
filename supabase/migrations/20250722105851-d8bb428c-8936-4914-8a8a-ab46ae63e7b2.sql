-- Add status column to referrals table
ALTER TABLE public.referrals ADD COLUMN status text DEFAULT 'pending';