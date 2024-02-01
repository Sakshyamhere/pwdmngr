import mongoose from 'mongoose';
const { Schema } = mongoose;

const otpSchema = new Schema({
email : {type:String , required:true},
otp : {type:Number , required:true},
createdAt: { type: Date, expires: '2m', default: Date.now }
});

export default mongoose.models.Otp ||
  mongoose.model("Otp", otpSchema);