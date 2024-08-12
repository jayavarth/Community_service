const Provider = require('../models/providermodel');
const User = require('../models/Usermodel');

const Addprovider = async (req, res) => {
    try {
        // Log the request body to debug
        console.log(req.body);

        // Destructure fields from the request body
        const { providername, profession, servicesOffered, experience, pricing, availability, contactNumber, email, location, profilePicture } = req.body;
        const userid = req.user; // Extracted from middleware that decodes the JWT

        // Log the user ID
        console.log('User ID:', userid);

        // Check if the user ID is present
        if (!userid) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        // Check if the user exists
        const pnameid = await User.findOne({ _id: userid });
        if (!pnameid) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate required fields
        if (!profession || !experience || !pricing || !contactNumber || !email || !location) {
            return res.status(400).json({ message: "Missing required fields: profession, experience, pricing, contactNumber, email, or location" });
        }

        // Check for existing provider
        const existingProvider = await Provider.findOne({ providerId: userid });
        if (existingProvider) {
            return res.status(400).json({ message: "Provider details already exist." });
        }

        // Ensure servicesOffered is an array (in case it's not handled correctly in the frontend)
        const servicesArray = Array.isArray(servicesOffered) ? servicesOffered : servicesOffered.split(',').map(service => service.trim());

        // Create a new provider
        const newProvider = new Provider({
            providerId: userid,
            providername: pnameid.username, // Set provider name to username
            profession,
            servicesOffered: servicesArray,
            experience,
            pricing,
            availability, // This is already parsed and formatted correctly in the frontend
            contactNumber,
            email,
            location,
            profilePicture, // Optional
            ratings: [], // Default to empty array
            averageRating: 0 // Default to 0
        });

        // Save the provider details to the database
        await newProvider.save();
        res.status(200).json({ message: "Service provider details added successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getprovider = async (req, res) => {
    try {
        const providers = await Provider.find();
        res.send(providers);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

const providerdetail = async (req, res) => {
    try {
      const userId = req.user; // Ensure req.user has the user ID
      const details = await Provider.findOne({ providerId: userId });
  
      if (!details) {
        return res.status(404).json({ message: "Provider details not found" });
      }
  
      res.json(details);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
   

module.exports = { Addprovider, getprovider, providerdetail };
