const express=require('express');
const Router=express.Router();

const providercontroller=require('../controllers/providercontroller');

Router.post('/addprovider',providercontroller.Addprovider);

module.exports=Router;