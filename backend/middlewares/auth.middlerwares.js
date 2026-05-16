//decoding token

import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const isAuthenticated = async function(req, res, next) {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: "Unauthorized user, No token available" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized user, No token available" })
        }
        const user = await User.findById(decoded.userId)
        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in auth middlewares", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}