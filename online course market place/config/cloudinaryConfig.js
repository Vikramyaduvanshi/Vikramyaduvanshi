const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("cloudinary").v2;




cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET

})


const videostorage= new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"session-videos",
        resource_type: "video",
        allowed_formats: ["mp4", "mov", "webm"],
    }
})


module.exports={cloudinary,videostorage}