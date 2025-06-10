let express= require("express");
const auth = require("../middleware/authmiddleware");
const Course = require("../models/coursesModel");
let courserouter=express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
let Coursevideo= require('../models/CourseVideo');
const User = require("../models/usersModels");
const Baughtby = require("../models/baught.model");
const Attendence = require("../models/attendence.model");
let multer=require("multer")
let {videostorage}=require("../config/cloudinaryConfig")
courserouter.post("/createcourse", auth("constructor","admin"), async(req,res)=>{
try{
let newcourse= new Course({...req.body, createdBy:req.user})
await newcourse.save()
res.json({success:true, message:"course added successfull", course:newcourse})
}catch(e){
res.json({success:false, message:"please check course uploaded data"})
}
})

courserouter.patch("/update/:id", auth("constructor","admin"), async (req,res)=>{
try{
let id= req.params.id
let course = await Course.findByIdAndUpdate(id, req.body, {new:true})
res.json({success:true, message:"update successfully", updatedcourse:course})

}catch(e){
res.json({success:false, message:"course not updated", error:e.message})
}
})


courserouter.delete("/delete/:id", auth("constructor","admin"), async (req,res)=>{
try{
let id= req.params.id
let course = await Course.findByIdAndDelete(id, {new:true})
let videos= await Coursevideo.deleteMany({courseid:id})
res.json({success:true, message:"deleted successfully", deletedcourse:course})

}catch(e){
res.json({success:false, message:"course not deleted", error:e.message})
}
})

courserouter.get("/", auth("constructor", "student","admin"), async (req,res)=>{
try{
let totalcourses=await Course.find();
res.json({success:true, message:"fetched successfully", totalcourses:totalcourses})

}catch(e){
res.json({success:false, message:"cant't", error:e.message})
}
})




const razorpay = new Razorpay({
  key_id: process.env.ROZARPAYID,
  key_secret: process.env.ROZARPAYSECRETKEY
});

courserouter.post("/create-order/:id", auth("student"), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    const amount = parseInt(course.price) * 100; // amount in paisa

    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt_order_${req.params.id}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (e) {
    res.json({ success: false, message: e.message });
  }
});

courserouter.post("/verify-payment", auth("student"), async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.ROZARPAYSECRETKEY)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      const course = await Course.findById(courseId);
      let baught= new Baughtby({
        userid:req.user,
        courseid:courseId
      })
      await baught.save();
let user=await User.findById(req.user)
user.totalCourses.push(courseId);
await user.save()
      return res.json({
        success: true,
        message: "Payment verified and course enrolled successfully"
      });
    } else {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});




courserouter.get("/courselession/:id",  auth("user"), async(req,res)=>{
try{
let id= req.params.id;
let lessions= await Coursevideo.aggregate([ {$match:{courseid: new mongoose.Types.ObjectId(id)}}, {$lookup:{from:Attendence, localField:"_id", foreignField:"videoid", as:"attendence"}}, {$unwind:"$attendence"}])
res.json({success:true, lessions:lessions})
}catch(e){
res.json({success:false, message:e.message});
}

})

let upload=multer({storage:videostorage})


courserouter.post("/upload/:courseid",upload.single("videoFile") ,async(req,res)=>{
let courseid= req.params.courseid
try{
console.log("uploaded video", req.file)

let newvideo= new Coursevideo({
  courseid:courseid,
  video_id:req.file.filename,
  video:req.file.path,
})
await newvideo.save()
res.json({message:"video uploaded successfully", video_url: req.file.path, public_id:req.file.filename})

}catch(e){
res.json({success:false, error:e.message})
}

  
})



module.exports=courserouter