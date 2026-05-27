import User from "../models/userModels.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = 'trackExpenseSecretKey';

export default async function authMiddleware(req,res,next){
  //grab the token 
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(401).json({success:false,message:"Unauthorized"});
  }
  const token = authHeader.split(" ")[1];

  // to verify the token
  try{
    const payload = jwt.verify(token,JWT_SECRET);
    const user = await User.findById(payload.id).select("-password");
    if(!user){
      return res.status(401).json({success:false,message:"Unauthorized"});
    }
    req.user = user;
    next();
  }
  catch(err){
    console.error("JWT verification failed:", err);
    return res.status(401).json({success:false,message:"Unauthorized"});
  }

}