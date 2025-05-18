function sessionmiddle(req,res,next){
let {mentorId, sessionType, date, durationMinutes, ratePerHour, status, }=req.body;
console.log(req.body)
if( !mentorId || !sessionType || !date || !durationMinutes || !ratePerHour || !status ){
    return res.json({message:"incomplete data can not upload"})
}else{
next();
}


}



module.exports=sessionmiddle;