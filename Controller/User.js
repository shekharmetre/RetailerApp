import { comparing, generateHash } from "../Util/HashGeneratoru.js";
import MongodbConnection from "../Util/MongodbConnection.js"
import User from "../models/User.js";

export const Registration = async (req, resp) => {
    const { name, email, password, token, mobile, photo, role, shopName, address } = req.body
    await MongodbConnection();
    try {
        const LoggedUser = await User.findOne({ email })
        if (LoggedUser) {
            resp.json({ message: "User already exists" })
        } else {
            if (password) {
                const hasPassword = await generateHash(password)
                const creatUser = { name, email, password: hasPassword, token, mobile, photo, role }
                const newUser = await User.create(creatUser)
                resp.send({ name, email, mobile, token, role, photo, shopName, address })
            } else {
                resp.send("password required")
            }
        }
    } catch (error) {
        resp.send(error)
    }
}

export const Login = async (req, resp) => {
    const { email, password } = req.body;
    await MongodbConnection();
    try {
        const user = await User.findOne({ email })
        if (!user) {
            resp.status(202).json({ message: "please complete Registration.." })
        } else {
            const compare = await comparing(password, user?.password)
            if (compare) {
                const {name,email,role} = user
                resp.status(200).json({name,email,role})
            } else {
                resp.status(201).json({ message: "email and password doesn't match" })
            }
        }


    } catch (error) {
        resp.send(error)
    }

}