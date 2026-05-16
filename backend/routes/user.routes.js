import express, { Router } from 'express'
import { login, logout, signup } from '../controllers/user.controllers';
const router = express.Router();


router.post('/signup', signup)
router.post('/login', login)
router.post('/logut', logout)
router.post('/update-profile', isAuthenticated)

export default rout