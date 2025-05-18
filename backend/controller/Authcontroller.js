let User= require("../models/User")
let Session=require("../models/Session")

async function Authcontrollerget(req,res){
let {email , password}=req.body;
if(!email || !password) return res.json({message :"please enter your full details"})
try{
    
    let check= await  User.find(req.body)
    res.json(check)
}catch(e){
    res.json({message:"user not found ", error:e.message})
}
}



async function Authcontrollerpost(req,res){
try{
    
    let newuser= new User(req.body)
await newuser.save();
res.json({message:'User created successfully'});
}catch(e){
    res.json({message:"some problem is coming",eoor:e.message})
}
}



  async function sessionpostpost(req,res){
try{
    
    let newpost= new Session(req.body)
await newpost.save();
res.json({message:'Session created successfully'});
}catch(e){
    res.json({message:"some problem is coming",error:e.message})
}
}
  async function sessionpostget(req,res){
try{
    
let data= await Session.find()
res.json(data)
}catch(e){
    res.json({message:"some problem is coming",error:e.message})
}
}





module.exports= {Authcontrollerget,Authcontrollerpost,sessionpostpost,sessionpostget};