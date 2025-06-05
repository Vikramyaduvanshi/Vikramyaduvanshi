let mongoose= require("mongoose");


let attendence= new mongoose.Schema({
userid:{type:mongoose.Schema.Types.ObjectId, ref:"User", required:true},
videoid:{type:mongoose.Schema.Types.ObjectId, ref:"Coursevideo", required:true},
attendedAt:{type:Date, default:Date.now}
})



let Attendence= mongoose.model("Attendence", attendence);


module.exports= Attendence