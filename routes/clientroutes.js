const express=require('express');
const Router=express.Router();

const auth=require("../middleware/auth")
const clientcontroller=require('../controllers/clientcontroller');

Router.post('/addclient',auth,clientcontroller.addclient);
Router.get('/getclient',auth,clientcontroller.getClientDetails);
Router.put('/updateclient',auth,clientcontroller.updateClientDetails);
Router.get('/client-details',auth,clientcontroller.clientdetail)
Router.get('/client-info/:id',auth,clientcontroller.clientinfo);
Router.post('/add-booking',auth,clientcontroller.AddBooking)

module.exports=Router;