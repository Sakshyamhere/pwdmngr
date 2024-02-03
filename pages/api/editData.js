
import passSchema from "@/modal/passSchema";
import connectDB from "../../lib/connectDB";

export default async function handler(req, res) {
    connectDB()
  const id = req.query.id;
  const {uname , pass , desc} = req.body.data
  if (req.method === "PUT") {
    try {
      const result = await passSchema.findByIdAndUpdate({_id : id} , {username : uname , password : pass , description : desc});
      res.status(200).send(result);
    } catch (error) {
      console.log(`Error: ${error}`);
      res.status(500).send(`Error: ${error}`);
    }
  }
}