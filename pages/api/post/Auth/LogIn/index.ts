import { SupabaseClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import requestIp from "request-ip";
const supabaseURL: string = process.env.SUPABASE_URL || "";
const supabaseAnonKey: any = process.env.SUPABASE_ANON_KEY;
const supabase = new SupabaseClient(supabaseURL, supabaseAnonKey);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const ip = requestIp.getClientIp(req);
  console.log(ip)
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

 
  if (error) {
    return res.status(400).json({ message: error.message });
  } else if (data.user?.identities?.length === 0) {
    return res.status(400).json({ message: "Email already exists" });
  } else {
    const token = data.session.access_token; // This is the token you'll use to set in the cookie for your users
    const refresh_token = data.session;
    res.setHeader(
      "Set-Cookie",
      serialize("auth_token", token, {
        httpOnly: false,
        maxAge: data.session.expires_in,
        path: "/",
      })
    );
    return res.status(200).json({
      message: true,
      data: {
        username: data.user?.user_metadata?.username,
      },
    });
  }
}
