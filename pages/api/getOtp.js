
import connectDB from "../../lib/connectDB";
import otpSchema from "@/modal/otpSchema";

export default async function handler(req, res) {
    connectDB()
  const queryEmail = req.query.user;
  const email = queryEmail;
  if (req.method === "GET") {
    try {
      const result = await otpSchema.find({ email: email });
      res.status(200).send(result);
    } catch (error) {
      console.log(`Error: ${error}`);
      res.status(500).send(`Error: ${error}`);
    }
  }
}