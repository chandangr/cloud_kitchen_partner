import { SignupData } from "@/components/AuthTabs";
import { supabase } from "@/contexts/AuthContext";
import { Session } from "@supabase/supabase-js";
import console from "console";
import { authorizeUser } from "./utils";

export async function createClientAfterSignUp(
  clientData: SignupData,
  session?: Session
) {
  const { data, error } = await supabase
    .from("client")
    .insert([
      {
        name: clientData.name,
        email: clientData.email,
        age: clientData?.age,
        nationality: clientData?.nationality,
        phone_number: clientData.phone_number,
        gender: clientData?.gender,
        marital_status: clientData?.marital_status,
        dob: clientData.dob,
        user_id: session?.user?.id,
        cloud_kitchen_website_id: null,
      },
    ])
    .select();
  if (error) {
    console.error("Error creating client:", error);
    throw new Error(error.message);
  }
  return data;
}

export const updateClientWebsiteId = async (cloudKitchenId: string) => {
  const userDetails = authorizeUser();
  if (!userDetails) return;
  const { error } = await supabase
    .from("client")
    .update({ cloud_kitchen_website_id: cloudKitchenId, is_first_time: false })
    .eq("user_id", userDetails?.id); // Update the client where user_id matches

  if (error) {
    console.error("Error updating client:", error);
    throw new Error(error.message);
  }
};
