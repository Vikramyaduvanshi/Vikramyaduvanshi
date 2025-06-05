let express= require("express");
let Userrouter= express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/usersModels");
let jwt= require("jsonwebtoken");
let saltRounds=8;



Userrouter.post("/signup", (req,res)=>{
let {password}= req.body
let myPlaintextPassword=password
try{
    bcrypt.hash(myPlaintextPassword, saltRounds, async function(err, hash) {
let newuser=new User({...req.body, password:hash})
await newuser.save()
res.json({success:true, user:newuser})
});
}catch(e){
res.json({success:false, message:e.message});
}
})


Userrouter.post('/login', (req,res)=>{

let {email, password}=req.body;
let user= User.find({email});
if(!user) return res.json({success:false, message:"user not found"})
let myPlaintextPassword=password;
let hash=user.password
bcrypt.compare(myPlaintextPassword, hash, function(err, result) {

if(result){

var accesstoken = jwt.sign({email:email, userId:user._id, role:user.role}, 'shhhhh', {expiresIn:"500"});
var refreshtoken = jwt.sign({email:email, userId:user._id, role:user.role}, 'shhhhh', {expiresIn:"7d"});

res.json({success:true, accesstoken:accesstoken, refreshtoken:refreshtoken})
}else{
    res.json({message:"password does not match", success:false})
}


});


})




module.exports= Userrouter;