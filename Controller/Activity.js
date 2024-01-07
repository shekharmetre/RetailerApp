import MongodbConnection from "../Util/MongodbConnection.js";
import Activity from "../models/ActivityItem.js";
import Inventory from "../models/Inventory.js";
import User from "../models/User.js";


export const createActivity = async (req, resp) => {
	const { email, item, qty, description, brand, sellPrice, select, about, number } = req.body;
	const currentDate = new Date();
	const date = `${currentDate.getDate()}${currentDate.getMonth() + 1}${currentDate.getFullYear()}`;
	const time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
	await MongodbConnection();
	try {
	  const user = await User.findOne({ email }).populate('inventory');
	  if (!user) {
		return resp.status(404).send('User not found');
	  }

	 const updatedData = await Inventory.findOneAndUpdate(
		{ _id: item._id },
		{ $inc: { stock: -qty } },
		{ new: true }
	  )
	  
	  const createdActivity = {
		item, qty, description, brand, sellPrice, select, about, number, time, date
	  };
	  const createdActivityContent = await Activity.create(createdActivity);
  
	  // Use the addToSet method to ensure uniqueness in the array
	  user.activity.addToSet(createdActivityContent._id);
	  
	  // Save the modified user document
	  await user.save();
	  resp.send({messageg:"successfully added"});
	
	} catch (error) {
	  resp.status(500).send(error.message);
	}
  };


  export const fetchingActivity = async (req, resp) => {
	try {
	  const { month, date, year, email } = req.body;
	  const dateString = `${date}${month}${year}`;

	  await MongodbConnection();
  
	  // Assuming that 'date' is a field in your AItem schema
	  const user = await User.findOne({ email }).populate('activity');
  
	  // Filter activities based on the provided date
	  const foundActivity = user.activity.filter(activity => activity.date === dateString);
  
	  resp.json(foundActivity);
	} catch (error) {
	  resp.status(500).send(error.message);
	}
  };






