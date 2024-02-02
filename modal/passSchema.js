import mongoose from 'mongoose';
const { Schema } = mongoose;

const passSchema = new Schema({
email : {type:String , required:true},
site : {type:String , required:true},
icon : {type:String , required:true},
username : {type:String , required:true},
password : {type:String , required:true},
description : {type:String}
});

export default mongoose.models.Pass ||
  mongoose.model("Pass", passSchema);