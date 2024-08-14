const express=require('express');
const Router=express.Router();

const providercontroller=require('../controllers/providercontroller');
const auth=require("../middleware/auth")

Router.post('/addprovider',auth,providercontroller.Addprovider);
Router.get('/getprovider',providercontroller.getprovider)
Router.get('/provider-details',auth,providercontroller.providerdetail);
Router.get('/provider/:providerId',auth,providercontroller.providerinfo);
Router.get('/bookedservice',providercontroller.bookedservice);
Router.get('/search', providercontroller.search);
Router.put('/edit',providercontroller.editprovider);

module.exports=Router;




