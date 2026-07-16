import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsers = async function(req, res) {
    try {
        const logedInUserId = req.user._id;
        const filterdUsers = await User.find({ _id: { $ne: logedInUserId } }).select("-password");
        res.status(200.).json(filterdUsers);
    } catch (error) {
        console.error("Error in get user for side bar:", error.Message);
        res.status(500).json({ error: "Internal server error " });
    }
}

export const getMessages = async function(req, res) {
    try {
        const senderId = req.user._id;
        const { id: receiverId } = req.params;
        const messages = await Message.find({
            $or: [{
                    senderId: senderId,
                    receiverId: receiverId
                },
                {
                    senderId: receiverId,
                    receiverId: senderId
                }
            ],
        })
        res.status(200).json(messages)
    } catch (error) {
        console.error("Error in get message :", error.Message);
        res.status(500).json({ error: "Internal server error " });
    }
}

export const sendMessage = async function(req, res) {
    try {
        const { text, image } = req.body;
        const { receiverId } = req.params;
        const sendMessage = user._id;
        let imageUrl;
        if (image) {
            const result = await cloudinary.uploader.upload(image);
            imageUrl = result.secure_url;
        }

        const message = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        await message.save();
        res.status(200).json({ success: true, message: "Message sent successfully" })

    } catch (error) {
        console.error("Error in send message :", error.Message);
        res.status(500).json({ error: "Internal server error " });
    }
}