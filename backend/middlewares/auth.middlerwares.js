//decoding token

import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const isAuthenticated = async function() {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: "Unauthorized user, No token available" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        console.log("Error in auth middlewares", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}