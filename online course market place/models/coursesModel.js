let mongoose= require("mongoose");


// in fontend for uploading video , send course id throuh params, make new route for uploading video
let courseSchema= new mongoose.Schema({
courseVideos:[{type:mongoose.Schema.Types.ObjectId, ref:"CourseVideo"}],
courseName:{type:String, required:true},
createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
baughtBy:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
description:{type:String, required:true},
rating:{type:String},
price:{type:String, required:true}
})

let Course= mongoose.model("Course", courseSchema);
module.exports=Course;