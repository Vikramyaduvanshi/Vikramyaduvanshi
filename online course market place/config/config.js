let mongoose= require("mongoose");


async function ConnectDb (){

try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Server has connected to Mongodb")
}catch(e){
    console.log({messge:e.message})
}


}


module.exports=ConnectDb;