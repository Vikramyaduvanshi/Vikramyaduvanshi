let mongoose= require("mongoose");



let Baughtschema= new mongoose.Schema({
userid:{type:mongoose.Schema.Types.ObjectId, required:true},
courseid:{type:mongoose.Schema.Types.ObjectId, required:true},
date:{type:Date, default:Date.now}
})


let Baughtby = mongoose.model("Baughtby", Baughtschema);


module.exports= Baughtby