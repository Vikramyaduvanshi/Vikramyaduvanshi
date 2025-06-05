let mongoose=require("mongoose");



let CourseVideoSchema= new mongoose.Schema({
courseid:{type:mongoose.Schema.Types.ObjectId, ref:"Course", required:true},
video: {type:String, required:true},
uploadeddate: { type: Date, default: Date.now }
})






let Coursevideo= mongoose.model("Coursevideo", CourseVideoSchema);
 module.exports= Coursevideo;