import MongodbConnection from "../Util/MongodbConnection.js";
import AItem from "../models/ActivityItem.js";

export const createActivity = async (req, resp) => {
	const { item, qty, description, brand, sellPrice, select, about, number } = req.body;
	const currentDate = new Date();
	const date = `${currentDate.getDate()}${currentDate.getMonth() + 1}${currentDate.getFullYear()}`
	const time = `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`
	MongodbConnection();
	try {
		const createdActivity = {
			item, qty, description, brand, sellPrice, select, about,number,time, date
		}
		const createActivityContent = await AItem.create(createdActivity);
		resp.send(createActivityContent)
	} catch (error) {
		resp.send(error)
	}
}

export const fetchingActivity = async (req, resp) => {
	try {
	  const { month, date, year } = req.body;
	  const dateString = `${date}${month}${year}`;
	  // Assuming that 'date' is a field in your AItem schema
	  await MongodbConnection();
	  const response = await AItem.find({ date: dateString });
	  resp.send(response)
	} catch (error) {
	  resp.status(500).send(error.message);
	}
  };
  





