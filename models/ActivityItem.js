import mongoose from "mongoose";

const ActivityItem = new mongoose.Schema({
	item: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Inventory',
	  },
	qty : {type : Number},
	description : {type : String},
	brand : {type : String},
	sellPrice : {type : Number},
	select : {type:String},
	about : {type : String},
	number : {type:Number},
	date : {type:String},
	time : {type:String},
},{timestamps:true})

const Activity = mongoose.model("Activity",ActivityItem)


export default Activity;