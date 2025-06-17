import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fbfuacjobprvhaxwzyhy.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiZnVhY2pvYnBydmhheHd6eWh5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDE0NTI2MSwiZXhwIjoyMDY1NzIxMjYxfQ.K6ZXp6BgaEaHahq2vHlB_sHjkWryan6s9w1ptTGepB8";

export const supabase = createClient(supabaseUrl, supabaseKey);
