import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

const UserSchema = new mongoose.Schema({
    name: String,
    shopName : String,
    address : String,
    email: String,
    inventory: [{ type: ObjectId, ref: 'Inventory' }],
    activity: [{ type: ObjectId, ref: 'Activity' }],
    password: String,
    mobile: Number,
    photo: Buffer,
    time: String,
    role : String,
}, { timestamps: true });

const User = mongoose.model("user", UserSchema);

export default User;
