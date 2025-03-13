import { supabase } from "@/contexts/AuthContext";

export const insertClientData = async (data) => {
  const { data: resData, error } = await supabase
    .from("client")
    .insert([
      {
        ...data,
        dob: "234234",
        cloud_kitchen_id: null,
        website_builder_id: null,
      },
    ]) // Include user ID if necessary
    .select();

  console.log("resData", resData);
  return error;
};

export const getClientData = async () => {
  const { data: client, error } = await supabase.from("client").select("*");

  console.log("client", client, error);
};

// Add more API functions as needed
