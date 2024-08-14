const Provider = require('../models/providermodel');
const User = require('../models/Usermodel');

const Addprovider = async (req, res) => {
    try {
        
        console.log(req.body);

        
        const { providername, profession, servicesOffered, experience, pricing, availability, contactNumber, email, location, profilePicture } = req.body;
        const userid = req.user; 

        
        console.log('User ID:', userid);

        
        if (!userid) {
            return res.status(400).json({ message: "User ID is missing" });
        }

        
        const pnameid = await User.findOne({ _id: userid });
        if (!pnameid) {
            return res.status(404).json({ message: "User not found" });
        }

        
        if (!profession || !experience || !pricing || !contactNumber || !email || !location) {
            return res.status(400).json({ message: "Missing required fields: profession, experience, pricing, contactNumber, email, or location" });
        }

        
        const existingProvider = await Provider.findOne({ providerId: userid });
        if (existingProvider) {
            return res.status(400).json({ message: "Provider details already exist." });
        }

        const servicesArray = Array.isArray(servicesOffered) ? servicesOffered : servicesOffered.split(',').map(service => service.trim());

        const newProvider = new Provider({
            providerId: userid,
            providername: pnameid.username, 
            profession,
            servicesOffered: servicesArray,
            experience,
            pricing,
            availability, 
            contactNumber,
            email,
            location,
            profilePicture, 
            ratings: [], 
            averageRating: 0 
        });

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
      const userId = req.user; 
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

  const bookedservice = async (req, res) => {
    try {
      const userId = req.user; 
      const details = await Provider.findOne({ providerId: userId }).populate('clients.clientId');
  
      if (!details) {
        return res.status(404).json({ message: "Provider details not found" });
      }
  
      res.json(details);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
const providerinfo= async (req, res) => {
    try {
      const provider = await Provider.findOne({ providerId: req.params.providerId });
  
      if (!provider) {
        return res.status(404).json({ message: 'Provider not found' });
      }
  
      res.json(provider);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching provider details', error });
    }
  }

  const search = async (req, res) => {
    try {
        const { location, service } = req.query;

        console.log('Search Query Params:', { location, service });

        const query = {
            location: { $regex: new RegExp(location, 'i') },
            servicesOffered: { $in: [service] }
        };

        console.log('MongoDB Query:', query); 

        const providers = await Provider.find(query);

        console.log('Search Results:', providers);

        res.json(providers);
    } catch (error) {
        console.error('Error in search:', error);
        res.status(500).json({ message: 'Server error' });
    }
}  

const editprovider=async (req, res) => {
  const {
    providername,
    profession,
    servicesOffered,
    experience,
    pricing,
    availability,
    contactNumber,
    email,
    location,
    profilePicture
  } = req.body;

  try {
    // Assuming you have the provider ID stored in the token or session
    const providerId = req.user.id; // Extracted from the JWT token or session

    const updatedProvider = await Provider.findByIdAndUpdate(
      providerId,
      {
        providername,
        profession,
        servicesOffered,
        experience,
        pricing,
        availability,
        contactNumber,
        email,
        location,
        profilePicture,
      },
      { new: true } // Return the updated document
    );

    if (!updatedProvider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    res.json(updatedProvider);
  } catch (error) {
    console.error('Error updating provider details:', error);
    res.status(500).json({ message: 'Failed to update provider details' });
  }
}

module.exports = { Addprovider, getprovider, providerdetail,providerinfo,bookedservice ,search,editprovider};
