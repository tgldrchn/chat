import request from "@/utils/request";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "DELETE":
      const result = await request("deleteOne", {
        filter: { _id: { $oid: req.query.id } },
      });
      res.status(200).json(result);
      break;
    case "GET":
      break;
    case "UPDATE":
      const id = req.query._id;
      const text = req.body.text;
      const resultOne = await request("updateOne", {
        filter: { _id: { $oid: id } },
        update: { $set: { text: text } },
      });
      res.status(200).json(resultOne);
      break;
    default:
      res.status(400).end();
      return;
  }
}
