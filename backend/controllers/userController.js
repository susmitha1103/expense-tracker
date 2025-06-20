const { signToken } = require('../middleware/protect');
const Users = require('../models/users');
const jwt = require('jsonwebtoken');


const registerUser = async(req,res) =>{
  const{username, password} = req.body;
  try{
    const existingUser = await Users.findOne({username});
    if(existingUser){
      return res.status(400).json({message: `username ${username} already exists`});
    }
    if( username.length < 6 || password.length < 6){
      return res.status(400).json({message: "username  and password must have atleast 6 characters"});
    }
    
    const newUser = new Users({username, password});
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  }
  catch(error){
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  } 
};

const loginUser = async(req,res) =>{
  const{username, password} = req.body;
    try{
      
      const existingUser = await Users.findOne({ username });
  
      if (!existingUser || existingUser.password !== String(password)) {
        return res.status(403).json({ message: "Invalid username or password" });
      }
      const token = signToken(existingUser._id);
      
      res.status(200).json({message: "user logged in successfully",token});
    }
    catch(error){
      console.error(error);
      return res.status(500).json({message: "server error"});
    }
  };

  module.exports = {
    registerUser,
    loginUser
  };

