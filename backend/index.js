import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { config } from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.routes.js'
import messageRoutes from './routes/message.routes.js'
import { app, server } from "./lib/socket.js";


dotenv.config();

const app = express()

const PORT = process.env.PORT || 5000
connectDB();


//middlewares
app.use(express.json({ limit: "10mb" })) //upto 10mb file size can be uploaded
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser())

//api endpoint

app.get('/', (req, res) => {
    res.send("Hello from server")
})

app.use('/api/users', userRoutes)
app.use('/api/messages', messageRoutes)

server.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
})