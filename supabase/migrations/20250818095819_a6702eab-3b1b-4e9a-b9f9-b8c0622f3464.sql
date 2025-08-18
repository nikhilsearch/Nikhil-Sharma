-- Fix function search path security issue
CREATE OR REPLACE FUNCTION update_auto_save_timestamp()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.auto_save_timestamp = now();
  RETURN NEW;
END;
$$;