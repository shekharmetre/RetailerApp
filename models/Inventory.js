import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  name : String,
  stock : Number,
  image : Buffer,
  mrp : Number,
  brand : String,
  attribute : String
});

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
