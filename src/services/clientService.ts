import { SignupData } from "@/components/AuthTabs";
import { supabase } from "@/contexts/AuthContext";
import { Session } from "@supabase/supabase-js";

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
        website_builder_id: null,
        cloud_kitchen_id: null,
      },
    ])
    .select();

  if (error) {
    console.error("Error creating client:", error);
    throw new Error(error.message);
  }

  return data;
}
