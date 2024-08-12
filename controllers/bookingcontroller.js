const Booking=require('../models/Bookingmodel');
const Client=require('../models/clientmodel');
const { v4: uuidv4 } = require('uuid');
const jwt=require('jsonwebtoken');

const Bookservice=async(req,res)=>{
    try{
        const {servicerequired,providerId}=req.body;

        const token = req.header("Authorization").split(" ")[1];
        const decoded = jwt.verify(token, "secret_key");
        const clientId = decoded.userId;
        
    
        const cId=await Client.findOne({clientId});
        if(!cId){
            return res.status(404).json({message:"invalid token / userid"})
        }
        const bookingId=uuidv4();
        const booking=new Booking({bookingId,
            clientId,providerId,servicerequired,BookingTime:new Date()})
        await booking.save();
        res.status(200).json({message:"booking done"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server error"})
    }
}

module.exports={Bookservice};