const Provider=require('../models/providermodel');
const User=require('../models/Usermodel');
const jwt=require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const Addprovider=async(req,res)=>{
    try{
        const {profession,servicesOffered,experience,certifications,pricing,availability,portfolio}=req.body;
        // const userid=req.userId;
        const token = req.header("Authorization").split(" ")[1];
        const decoded = jwt.verify(token, "secret_key");
        const userid = decoded.userId;

        // console.log(userid);
        // if(!userid){
        //     return res.status(404).json({message:"user not found/token expired"});
        // }
        const providerId=uuidv4();

        const exist=userid.ProviderId;
        const existingProvider = await Provider.findOne({exist});
        if (existingProvider) {
            return res.status(400).json({ message: "Provider details already exist." });
        }


        const pnameid=await User.findOne({_id:userid});
        const providername=pnameid.username;
        const newprovider=new Provider({providerId,providername,profession,servicesOffered,experience,certifications,pricing,availability,portfolio});
        await newprovider.save();
        res.status(200).json({message:"service provider details added successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports={Addprovider};