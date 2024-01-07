import express from 'express'

import { createInventory, fetchInventory } from '../Controller/Inventory.js';
import multer from 'multer'
import { Login, Registration } from '../Controller/User.js';

const User = express.Router()

const storage = multer.memoryStorage()
const upload = multer({storage:storage})

User.post('/addinventory',upload.single('file'),createInventory)
User.get("/fetch/:email",fetchInventory);
User.post('/user',Registration)
User.post('/login',Login)

User.post("/addinventory",upload.single('image'), createInventory)

export default User;
