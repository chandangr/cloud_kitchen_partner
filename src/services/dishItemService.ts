import { supabase } from "@/contexts/AuthContext";
import { authorizeUser } from "./utils";

export const insertDishItem = async (data) => {
  const userDetails = authorizeUser();
  if (!userDetails) return;
  const { error } = await supabase
    .from("dish_item")
    .insert([{ ...data, user_id: userDetails?.id }]);
  if (error) {
    console.error("Error inserting dish item:", error);
    throw new Error("Failed to insert dish item");
  }
};

export const updateDishItem = async (id, data) => {
  const userDetails = authorizeUser();
  if (!userDetails) return;
  const { error } = await supabase
    .from("dish_item")
    .update({ ...data })
    .eq("id", id)
    .eq("user_id", userDetails?.id);
  if (error) {
    console.error("Error updating dish item:", error);
    throw new Error("Failed to update dish item");
  }
};

export const fetchDishItems = async () => {
  const userDetails = authorizeUser();
  if (!userDetails) return;
  const { data, error } = await supabase
    .from("dish_item")
    .select("*")
    .eq("user_id", userDetails?.id);
  if (error) {
    console.error("Error fetching dish items:", error);
    return [];
  }
  return data;
};
export const deleteDishItem = async (id: string) => {
  const userDetails = authorizeUser();
  if (!userDetails) return;

  const { error } = await supabase
    .from("dish_item")
    .delete()
    .eq("id", id)
    .eq("user_id", userDetails?.id);

  if (error) {
    console.error("Error deleting dish item:", error);
    throw new Error("Failed to delete dish item");
  }
};
