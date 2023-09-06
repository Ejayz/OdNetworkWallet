import { SupabaseClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
const supabaseURL: string = process.env.SUPABASE_URL || "";
const supabaseAnonKey: any = process.env.SUPABASE_ANON_KEY;
const supabase = new SupabaseClient(supabaseURL, supabaseAnonKey);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password, username } = req.body;
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        username: username,
      },
      emailRedirectTo: "/localhost:3000/welcome",
    },
  });
  console.log(data, error);
  if (error) {
    return res.status(400).json({ message: error.message });
  } else if (data.user?.identities?.length === 0) {
    return res.status(400).json({ message: "Email already exists" });
  } else {
    return res.status(200).json({ message: data });
  }
}
