import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { generateToken } from '../lib/utils.js';

import cloudinary from '../lib/cloudinary.js';


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

            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                profilePic: user.profilePic,
                message: "user created successfully",
                success: true
            })
        } else {
            res.status(500).json({ mesage: "invalid user id" })
        }
    } catch (error) {
        console.log("error in signup", error);
        res.status(500).json({ message: "Internal server error" })
    }
}

export const login = async function(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({ message: "User not found", success: false })
        }
        const isMatched = await bcrypt.compare(password, user.password)
        generateToken(user._id, res) //passsword is correct
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
            message: "user login successfully",
            success: true
        })
    } catch (error) {
        console.log("Error in login", error);
        res.status(500).json({ message: "Internal  server error" })
    }
}

export const logout = async function(req, res) {
    try {
        res.cookoie('token', '', { maxAge: 0 })

    } catch (error) {
        console.log("Error in logout", error);
        res.status(500).json({ message: "Error in internal server" })
    }
}

export const updateProfile = async function() {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile picture is required" })
        }
        const result = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: result.secure_url }, { new: true })
        res.status(200).json({
            updatedUser,
            message: "profile picture updated successfully",
            success: true
        })
    } catch (error) {
        console.log("Error in update profile", error);
        res.status(500).json({ message: "Error in internal server" })
    }
}

export const isAuth = async function(req, res) {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in isAuth", error);
        res.status(500).json({ message: "Error in internal server" })
    }
}