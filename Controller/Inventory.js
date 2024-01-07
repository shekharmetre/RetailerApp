import MongodbConnection from "../Util/MongodbConnection.js";
import Inventory from "../models/Inventory.js";
import User from "../models/User.js";

export const createInventory = async (req, resp) => {
  const { email , name, stock, mrp, brand, attribute } = req.body;
  const buffer = req.file
 await MongodbConnection();
  try {
	  const user = await User.findOne({ email });

	  if (!user) {
		return resp.status(404).send('User not found');
	  }
	  const createdInvenotry = await Inventory.create({name,stock,mrp,brand,attribute,image:buffer ? buffer.buffer : ""});
	  user.inventory.addToSet(createdInvenotry._id);
  	  await user.save();
	  resp.send(createdInvenotry)
	} catch (error) {
	  resp.status(500).send(error.message);
	}
};

export const fetchInventory = async (req, resp) => {
  const {email} = req.params;
  await MongodbConnection();
  try {
	  const user = await User.findOne({ email }).populate('inventory');
	  // Filter activities based on the provided date
	  resp.json(user.inventory);
	} catch (error) {
	  resp.status(500).send(error.message);
	}
};


export const UpdateInventory = async (req, resp) => {
  const {name,stock,mrp,brand,attribute} = req.body;
  const id = req.params.id;
  await MongodbConnection();
  try {
    const response = await Inventory.findOneAndUpdate({_id:id},{name,stock,mrp,brand,attribute},{new:true})
    resp.send("successfully updated")
  } catch (error) {
    resp.send(error)
    console.log(error)
  }
  
}
