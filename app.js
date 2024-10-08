const express=require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const cors=require('cors');

const userrouter=require('./routes/userroutes');
const providerrouter=require("./routes/providerroutes")
const clientrouter=require('./routes/clientroutes');


mongoose.connect('mongodb+srv://jayavardhinim14:Jayvardh2004@cluster0.yxnqgbb.mongodb.net/Community_service?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('mongodb connected');
})

const app=express();

app.use(cors());
app.use(express.json());
app.use(bodyparser.json());

app.use('/',userrouter);
app.use('/',providerrouter);
app.use('/',clientrouter);

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log("server running");
})