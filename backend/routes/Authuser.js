let express= require("express");


let {Authcontrollerget,Authcontrollerpost}= require("../controller/Authcontroller")
let Router= express.Router();



Router.get("/Authuser",  Authcontrollerget);
Router.post("/Authuser",  Authcontrollerpost);





module.exports=Router;