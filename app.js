const express=require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const cors=require('cors');

mongoose.connect('mongodb+srv://jayavardhinim14:Jayvardh2004@cluster0.yxnqgbb.mongodb.net/Community_service?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('mongodb connected');
})

const app=express();

app.use(express.json());
app.use(cors());
app.use(bodyparser.json())

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log("server running");
})