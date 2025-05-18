let express= require("express");
let dotenv=require("dotenv");
let connectDB= require("./configure/db")
let router=require("./routes/Authuser");
let sessionrouter= require("./routes/sessionroute")


dotenv.config();
let app=express();
app.use(express.json());
connectDB();



app.get("/",(req,res)=>[
    res.json({message:"api is running"})
])

app.use("/user",router)

app.use("/session",sessionrouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});