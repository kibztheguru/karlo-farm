import { supabase } from "@/lib/supabase";

export async function getSettings() {
  const { data, error } = await supabase
    .from("website_settings")
    .select("*")
    .single();

  if (error) {
    console.error("Settings fetch error:", error);
    return null;
  }

  return data;
}