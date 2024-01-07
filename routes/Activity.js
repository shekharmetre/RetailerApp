import express from 'express'
import bodyParser from 'body-parser';
import { createActivity, fetchingActivity } from '../Controller/Activity.js';
import cors from 'cors'
import { UpdateInventory } from '../Controller/Inventory.js';


const ActivityRoutes = express.Router()
ActivityRoutes.use(express.json())
ActivityRoutes.use(cors())
ActivityRoutes.use(bodyParser.urlencoded({ extended: false }))

ActivityRoutes.post('/add',createActivity)
ActivityRoutes.post('/get',fetchingActivity)

ActivityRoutes.put('/update/:id',UpdateInventory)
export default ActivityRoutes;