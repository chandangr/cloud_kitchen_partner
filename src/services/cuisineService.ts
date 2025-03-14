import { supabase } from "@/contexts/AuthContext";

export const fetchCuisineCategories = async () => {
  const { data, error } = await supabase.from("cuisine_category").select("*");
  if (error) {
    console.error("Error fetching cuisine categories:", error);
    return [];
  }
  return data;
};
