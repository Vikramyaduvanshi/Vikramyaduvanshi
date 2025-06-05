let mongoose= require("mongoose");


const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  courseId: {type: mongoose.Schema.Types.ObjectId, ref: "Course",required: true},
  ratingby: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true},
  rate: {type: Number,min: 1,max: 5,required: true},
  feedback: String,
  overallexperience: { type: String, default: "" },
  contentquality: { type: String, default: "" }
}, { timestamps: true });

const Rating = mongoose.model("Rating", ratingSchema);
module.exports = Rating;
