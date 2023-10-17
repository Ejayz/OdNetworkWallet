import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.status(200).json({
    info: "This api input allow you to get informations. Provide your api keys when using this API endpoint or check our docs on how to use this endpoint.",
  });
}
