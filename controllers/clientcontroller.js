const Client=require('../models/clientmodel');
const User=require('../models/Usermodel');
const jwt=require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const addclient=async(req,res)=>{

    try{
        const {clientphno,address}=req.body;

        const token = req.header("Authorization").split(" ")[1];
        const decoded = jwt.verify(token, "secret_key");
        const userid = decoded.userId;

        const exist=userid.clientId;
        const existingclient=await Client.findOne({exist});
        if(existingclient){
            return res.status(400).json({message:"client details already exist"})
        }
    
        const cnameid=await User.findOne({_id:userid});
        const clientname=cnameid.username;
    
        const clientId=uuidv4();
    
        const newclient=new Client({clientId,clientname,clientphno,address});
        await newclient.save();
    
        res.status(200).json({message:"user added successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports={addclient};