let express= require("express");
let sessionmiddle=require("../middleware/middleware");
let {sessionpostpost,sessionpostget}=require("../controller/Authcontroller")

let sessionroute= express.Router()


sessionroute.post("/", sessionmiddle,  sessionpostpost )
sessionroute.get("/",  sessionpostget )


module.exports=sessionroute;