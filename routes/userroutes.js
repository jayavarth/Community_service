const express=require('express');
const Router=express.Router();

const usercontroller=require('../controllers/usercontroller');

Router.post('/adduser',usercontroller.adduser);

module.exports=Router;