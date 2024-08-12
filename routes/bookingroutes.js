const express=require('express');
const Router=express.Router();

const bookingcontroller=require('../controllers/bookingcontroller');

Router.post("/bookservice",bookingcontroller.Bookservice);

module.exports=Router;