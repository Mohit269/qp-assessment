import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = "https://hkpyrhofujclrjcsiedp.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey) {
  console.error("Supabase Key is missing!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
