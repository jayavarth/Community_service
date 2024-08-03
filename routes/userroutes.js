const express=require('express');
const Router=express.Router();

const usercontroller=require('../controllers/usercontroller');

Router.post('/adduser',usercontroller.adduser);
Router.post('/login',usercontroller.Login);

module.exports=Router;