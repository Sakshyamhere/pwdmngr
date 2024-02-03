
import passSchema from "@/modal/passSchema";
import connectDB from "../../lib/connectDB";

export default async function handler(req, res) {
    connectDB()
  const id = req.query.id;
  if (req.method === "DELETE") {
    try {
      const result = await passSchema.deleteOne({_id : id});
      res.status(200).send(result);
    } catch (error) {
      console.log(`Error: ${error}`);
      res.status(500).send(`Error: ${error}`);
    }
  }
}