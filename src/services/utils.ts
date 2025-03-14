import { supabase } from "@/contexts/AuthContext";

export function authorizeUser() {
  const userRes = supabase.auth.storage?.getItem("user"); // Assuming you have access to the token
  const userDetails = userRes ? JSON.parse(userRes) : undefined;

  if (!userDetails) {
    window.location.href = "/login"; // Navigate to login page
    return false;
  }
  return userDetails;
}
