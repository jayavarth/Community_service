const Client=require('../models/clientmodel');
const Provider=require('../models/providermodel')
const jwt=require('jsonwebtoken');

const addclient=async(req,res)=>{

    try{
        const {clientphno,clientname,address,city,streetname,postalCode}=req.body;

        const token = req.header("Authorization").split(" ")[1];
        const decoded = jwt.verify(token, "secret_key");
        const userid = decoded.userId;

        const existingclient=await Client.findOne({clientId:userid});
        if(existingclient){
            return res.status(400).json({message:"client details already exist"})
        }
    
    
        const newclient=new Client({clientId:userid,
            clientname,clientphno,address,city,streetname,postalCode});
        await newclient.save();
    
        res.status(200).json({message:"client details added successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error"});
    }
}


const getClientDetails = async (req, res) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, "secret_key");
    const  clientId= decoded.userId;
    // const clientId = req.user; 
    console.log(clientId)
    const client = await Client.findOne({ clientId });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const updateClientDetails = async (req, res) => {
  try {
    const clientId = req.user;
    const { clientname, clientphno, address, city, streetname, postalCode } = req.body;

    const client = await Client.findOneAndUpdate(
      { clientId },
      { clientname, clientphno, address, city, streetname, postalCode },
      { new: true, runValidators: true }
    );

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



const AddBooking = async (req, res) => {
  const { clientId, providerId } = req.body;

  try {
    await Client.findOneAndUpdate(
      { clientId: clientId },
      { 
        $push: { bookinghistory: { providerId: providerId, orderedDate: new Date() } } 
      }
    );

    await Provider.findOneAndUpdate(
      { providerId: providerId },
      { 
        $push: { clients: { clientId: clientId, date: new Date() } } 
      }
    );

    res.status(200).json({ message: 'Booking added to both client and provider successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error });
  }
};


const clientinfo = async (req, res) => {
  try {
    const clientId = req.params.id;
    const client = await Client.findOne({ clientId: clientId });
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(client);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const clientdetail = async (req, res) => {
  try {
    // const userId = req.user; 
    const token = req.header("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, "secret_key");
    const userId = decoded.userId;
    console.log(userId)
    const details = await Client.findOne({ clientId: userId });

    if (!details) {
      return res.status(404).json({ message: "client details not found" });
    }

    res.json(details);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};



module.exports={addclient,getClientDetails,updateClientDetails,AddBooking,clientinfo,clientdetail};