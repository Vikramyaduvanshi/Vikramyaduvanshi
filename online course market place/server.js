let dotenv= require('dotenv');
dotenv.config()
let express= require("express");

const ConnectDb = require("./config/config");
const Userrouter = require("./routes/users.route");
const courserouter = require("./routes/course.route");
let app= express();

app.use(express.json());


app.get("/", (req,res)=>{
res.json({message:"welcome to Circumvent"})
})

app.use("/users", Userrouter)
app.use("/course", courserouter);
let PORT= process.env.PORT || 3000;


app.listen(PORT, ()=>{
    ConnectDb()
    console.log(`Server is running at http://localhost:${PORT}`)
})