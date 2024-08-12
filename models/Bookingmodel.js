const mongoose=require('mongoose');

const BookingSchema=new mongoose.Schema({
    bookingId:{
        type:String,
        required:true
    },
    clientId:{
        type:String,
        required:true
    },
    providerId:{
        type:String,
        required:true
    },
    servicerequired:{
        type:String,
        required:true
    },
    BookingTime:{
        type:Date
    }
})

const Booking=mongoose.model('bookings',BookingSchema);
module.exports=Booking;