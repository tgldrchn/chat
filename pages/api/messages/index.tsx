import request from "@/utils/request";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  text: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      const resultOne = await request("insertOne", {
        document: { text: req.body },
      });
      res.status(200).json(resultOne);
      break;
    case "GET":
      const result = await request("find", {});
      res.status(200).json(result);
      break;
    default:
      res.status(400).end();
      return;
  }
}
