import express from 'express'
import cors from 'cors'
import http from 'http';
import dotenv from 'dotenv'
import User from './routes/User.js'
import ActivityRoutes from './routes/Activity.js'
import bodyParser from 'body-parser'
dotenv.config()
const PORT = process.env.PORT
console.log(PORT)
const app = express()
const server = http.createServer(app)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(express.json())
app.use("/api",User)
app.use('/activity',ActivityRoutes)


app.get('/',(req,resp)=>{
	resp.send("thhis is a new updates")
})

server.listen(PORT,()=>{
	console.log('server started on ' + PORT)
})