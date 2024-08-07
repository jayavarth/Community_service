const mongoose=require('mongoose');

const clientschema=new mongoose.Schema({
    clientId:{
        type:String,
        required:true
    },
    clientname:{
        type:String,
        required:true
    },
    clientphno:{
        type:String,
        required:true
    },
    address: {
        address: {
          type: String,
          required: true
        },
        city: {
          type: String,
          required: true
        },
        state: {
          type: String,
          required: true
        },
        postalCode: {
          type: String,
          required: true
        }
    }
})

const Client=mongoose.model('Clients',clientschema);
module.exports=Client;