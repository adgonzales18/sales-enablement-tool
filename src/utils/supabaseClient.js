import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseApiKey = import.meta.env.VITE_SUPABASE_API_KEY;

const supabase =
  supabaseUrl && supabaseApiKey && createClient(supabaseUrl, supabaseApiKey);

export default supabase;
