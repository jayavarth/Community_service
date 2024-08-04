const mongoose=require('mongoose');

const Providerschema= new mongoose.Schema({
    providerId: {
        type: String,
        required: true,
    },
    providername:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    profession: {
        type: String,
        required: true,
    },
    servicesOffered: [String],
    experience: {
        type: Number,
        required: true,
    },
    certifications: [String],
    pricing: {
        type: String,
        required: true,
    },
    availability: {
        type: Map,
        of: Boolean,
        required: true,
    },
    portfolio: [String],
});

const Provider=mongoose.model('Providers',Providerschema);
module.exports=Provider;