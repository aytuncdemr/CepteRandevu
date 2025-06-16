import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dokgdcmyyfjyfcxrjmkl.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRva2dkY215eWZqeWZjeHJqbWtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzE3MTYsImV4cCI6MjA2NTY0NzcxNn0.fxYxVx6Zpx34RuNsCVmL3C5oa5ZnMNIBpERuu0bTL8Q";
export const supabase = createClient(supabaseUrl, supabaseKey);
