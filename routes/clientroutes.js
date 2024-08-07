const express=require('express');
const Router=express.Router();

const clientcontroller=require('../controllers/clientcontroller');

Router.post('/addclient',clientcontroller.addclient);

module.exports=Router;