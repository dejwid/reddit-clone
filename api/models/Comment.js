import mongoose from "mongoose";

const schema = new mongoose.Schema({
  author: {type:String,required:true},
  title: {type:String},
  body: {type:String,required:true},
  postedAt: {type:Date,required:true},
});
const Comment = mongoose.model('Comment', schema);

export default Comment;