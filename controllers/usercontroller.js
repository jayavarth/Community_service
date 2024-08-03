const User=require('../models/Usermodel');

const adduser=async(req,res)=>{
    try{
        const {username,email,password,role}=req.body;
        const exist=await User.findOne({email:email});
        if(exist){
            return res.send("user already exist");
        }
        const newuser=new User({username,email,password,role});
        await newuser.save();
        res.status(201).json({message:"user added successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports={adduser};