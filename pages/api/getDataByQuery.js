
import passSchema from "@/modal/passSchema";
import connectDB from "../../lib/connectDB";

export default async function handler(req, res) {
    connectDB()
  const queryEmail = req.query.user;
  const search = req.query.search
  const email = queryEmail;
  if (req.method === "GET") {
    try {
      const result = await passSchema.find({ email: email , site: { $regex: `${search}`}});
      res.status(200).send(result);
    } catch (error) {
      console.log(`Error: ${error}`);
      res.status(500).send(`Error: ${error}`);
    }
  }
}