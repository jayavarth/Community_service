const express=require('express');
const Router=express.Router();

const usercontroller=require('../controllers/usercontroller');

Router.post('/adduser',usercontroller.adduser);
Router.get('/login',usercontroller.Login);

module.exports=Router;