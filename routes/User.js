import express from 'express'

import { createInventory, fetchInventory } from '../Controller/Inventory.js';
import multer from 'multer'
import MongodbConnection from '../Util/MongodbConnection.js';

const User = express.Router()

const storage = multer.memoryStorage()
const upload = multer({storage:storage})

User.post('/addinventory',upload.single('file'),createInventory)

User.get("/fetch",fetchInventory);

// {
//   const {originalname,buffer}  = req.file
//   const {name,stock,image,mrp,brand,attribute}= req.body;
//   MongodbConnection();
 

// }



User.post("/addinventory",upload.single('image'), createInventory)

export default User;
