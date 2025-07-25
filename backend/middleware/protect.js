const jwt = require('jsonwebtoken');
const Users = require('../models/users')


const signToken = (userId) =>{

    const token = jwt.sign({
      id:userId
    },
    process.env.JWT_SECRET,{
      expiresIn: "1h"
    })
    return token;
  }
  


const verifyToken = async(req,res,next) =>{
  
  const token = req.headers.authorization?.split(' ')[1];
  
    if(!token){
     return res.status(401).json({
        message: "token not provided"
      });
    }
    try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await Users.findById(decoded.id).select('-password');
    next();
  }
  catch(error){
    res.status(401).json({
      message: "Invalid or expired token"
    })
  }

}

module.exports = {signToken,verifyToken}