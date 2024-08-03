const jwt=require('jsonwebtoken');

const auth=async(req,res)=>{
    const token=req.header('Authorization').split(" ")[1];
    if(!token){res.status(404).json("token required")};

    try{
        const decoded=jwt.verify(token,"secret_key");
        req.user=decoded.userId;
        next();
    }
    catch(err){
        res.status(500).json({message:"Internal server error"});
    }
}

module.exports={auth};