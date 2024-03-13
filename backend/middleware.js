
const jwt=require("jsonwebtoken")
const {JWT_SECRET}=require("./config");

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization
if(!authHeader||!authHeader.startswith("Bearer")){
    res.status(403).json({})
}
const token=authHeader.split(" ")[1]
try{
    const decoded=jwt.verify(token,JWT_SECRET)
    if(decoded.userId){  
    req.userId=decoded.userId
    next()
    }
   
}
catch (err) {
    return res.status(403).json({});
}
}

module.exports = {
    authMiddleware
}