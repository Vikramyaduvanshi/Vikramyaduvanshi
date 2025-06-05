let jwt= require("jsonwebtoken");



function auth(allowedrole){

return (req,res, next)=>{

try{
    let token= req.headers.authrization.split(" ")[1]

var decoded = jwt.verify(token, 'shhhhh');

if(decoded && decoded.role==allowedrole){
    req.user=decoded.userId
    next();
}else{
    res.json({message:"this route not allowed"})
}

}catch(e){
if(e.message=="jwt expired"){
    let token= req.headers.refreshtoken.split(" ")[1]
if(!token) return res.json({message:"refresh token is missing"});

try{
let refreshtoken= jwt.verify(token,'shhhhh')

let newaccesstoken= jwt.sign({email:refreshtoken.email, userId:refreshtoken.userId, role:refreshtoken.role}, 'shhhhh', {expiresIn:"7d"});
 req.user=refreshtoken.userId
res.setHeader("new-access-token", newaccesstoken)
next()

}catch(e){
res.json({message:"refresh token has been exeperied", error:e.message})
}
}else{
return res.json({message:"login failed", error:e.message})
}
}
}


}


module.exports= auth;