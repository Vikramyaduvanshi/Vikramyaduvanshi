let mongoose= require("mongoose");


async function ConnectDb (){

try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Server has connected to Mongodb")
}catch(e){
    console.log("error occured", "error: ",message)
}


}


module.exports=ConnectDb;