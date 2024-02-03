import userSchema from "@/modal/userSchema";
import connectDB from "../../lib/connectDB";
import otpSchema from "@/modal/otpSchema";
const nodemailer = require("nodemailer");
export default async function handler(req, res) {
  connectDB();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PWD,
    },
  });
  const randomOtp = Math.ceil(Math.random() * 100000);
  if (req.method == "POST") {
    try {
      const { email } = req.body;
      const userExist = await userSchema.findOne({ email: email });
      if (userExist) {
        const otp =await otpSchema.findOneAndUpdate(
          { email: email },
          { $set: { otp: randomOtp } },
          { new: true }
        );
        // await otp.save();
        res.status(200).json({ done: true, otp: otp });
       await transporter.sendMail({
          from: '"pongdomgr@manager.com"<pongdomgr@manager.com>',
          to: email,
          subject: "Pongdo Manager",
          text: `Your otp is <a>${randomOtp}</a>`,
          html: `<h1>Your otp is ${randomOtp}</h1><br/><b>This otp expires in 2 minutes</b>`,
        });
      } else {
        const user = new userSchema({
          email: email,
        });
        await user.save();
        const otp = new otpSchema({
          email: email,
          otp: randomOtp,
        });
        await otp.save();
        res.status(200).json({ done: true, otp: otp, user: user });
       await transporter.sendMail({
          from: '"pongdomgr@manager.com"<pongdomgr@manager.com>',
          to: email,
          subject: "Pongdo Manager",
          text: `Your otp is <a>${randomOtp}</a>`,
          html: `<h1>Your otp is<a>${randomOtp}</a></h1><br/><b>This otp expires in 2 minutes</b>`,
        });
      }
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  }
}
