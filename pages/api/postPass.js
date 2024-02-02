import passSchema from "@/modal/passSchema";
import connectDB from "../../lib/connectDB";

export default async function handler(req, res) {
  connectDB();
  if (req.method == "POST") {
    try {
      const { email , site , username , password , desc} = req.body.dueData;
      const pass = new passSchema({
        email : email,
        site : site,
        icon : `${site}/favicon.ico`,
        username : username,
        password : password,
        description : desc
      });
      await pass.save();
      res.status(200).json({ done: true, pass: pass });
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  }
}