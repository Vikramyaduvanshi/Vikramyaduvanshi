let mongoose= require("mongoose");


// in fontend for uploading video , send course id throuh params, make new route for uploading video
let courseSchema= new mongoose.Schema({
courseName:{type:String, required:true},
createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
description:{type:String, required:true},
rating:{type:String},
price:{type:String, required:true}
})

let Course= mongoose.model("Course", courseSchema);
module.exports=Course;