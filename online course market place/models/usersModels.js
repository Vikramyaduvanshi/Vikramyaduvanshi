let mongoose= require("mongoose");



let UserSchema= new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password: {type:String, required:true},
    ProfilePicture:{type:String, default:""},
    totalCourses:[{type:mongoose.Schema.Types.ObjectId, ref:"Course"}],
    role:{type:String , enum:["admin", "constructor","student"]}
})

let User= mongoose.model("User", UserSchema);

module.exports= User;