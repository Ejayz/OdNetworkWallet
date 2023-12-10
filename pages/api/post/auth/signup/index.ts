import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { createBinaryUUID } from "binary-uuid";
import bcrypt from "bcrypt";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const prisma = new PrismaClient();
  try {
    const user = await prisma.users.create({
      data: {
        user_id: createBinaryUUID().buffer,
        email: email,
        password: hashedPassword,
        username: username,
        user_type: 1,
      },
    });
    return res.status(200).json({ message: "User created" });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Something went wrong" });
  } finally {
    await prisma.$disconnect();
  }
}
