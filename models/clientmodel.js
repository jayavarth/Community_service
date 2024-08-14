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
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    streetname: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    bookinghistory:[{
      providerId:String,
      orderedDate:{
        type:Date,
        default:Date.now
      },
    }]
})

const Client=mongoose.model('Clients',clientschema);
module.exports=Client;