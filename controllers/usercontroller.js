const User=require('../models/Usermodel');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');

const adduser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newuser = new User({ username, email, password, role });
        await newuser.save();

        const token = jwt.sign(
            { userId: newuser._id, role: newuser.role },
            "secret_key",
            { expiresIn: '2h' }
        );

        res.status(200).json({ message: "User added successfully", token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};


// const Login=async(req,res)=>{
//     const {email,password}=req.body;
//     const user=await User.findOne({email});
//     try{
//         if(!user){
//             return res.status(404).json({message:"invalid user email"});
//         }
//         const valid=await bcrypt.compare(password,user.password);
//         if(!valid){
//             return  res.json({message:"invalid password"});
//         }
//         const token=jwt.sign({userId : user._id},"secret_key",{
//             expiresIn:'2h'
//         });
//         res.status(200).json({"token":token});
//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({message:"Internal server error"});
//     }
// }


const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid user email" });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            "secret_key",
            { expiresIn: '2h' }
        );

        res.status(200).json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports={adduser,Login};