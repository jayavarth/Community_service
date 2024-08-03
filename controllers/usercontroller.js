const User=require('../models/Usermodel');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');

const adduser=async(req,res)=>{
    try{
        const {username,email,password,role}=req.body;
        const exist=await User.findOne({email:email});
        if(exist){
            return res.send("user already exist");
        }
        const newuser=new User({username,email,password,role});
        await newuser.save();
        res.status(200).json({message:"user added successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }
}

const Login=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    try{
        if(!user){
            return res.status(404).json({message:"invalid user email"});
        }
        const valid=await bcrypt.compare(password,user.password);
        if(!valid){
            res.json({message:"invalid password"});
        }
        const token=jwt.sign({userId : user._id},"secret_key",{
            expiresIn:'2h'
        });
        res.status(200).json({"token":token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports={adduser,Login};