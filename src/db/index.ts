import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '../config/env';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const setupDatabase = async () => {
    console.log("Setting up the database...");
};
