import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { generateToken } from '../lib/utils.js';

export const signup = async function(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "all field are required", success: false })
        }
        if (password.length < 5) {
            return res.status().json({ message: "Password must contain 5 words", success: false })
        }
        const existuser = await User.findOne({ email });
        if (existuser) {
            return res.status(400).json({ message: "User already exist" })
        }
        const hashPassword = await bcrypt.hash(password, 10)

        const user = new User({ //user created
            name,
            email,
            password: hashPassword
        })

        if (user) {
            generateToken(user._id, res);
            await user.save();

            res.status(201).json({ message: "user created successfully", success: true })
        }
    } catch (error) {
        console.log("error in signup", error);
        res.status(500).json({ message: "Internal server error" })
    }
}