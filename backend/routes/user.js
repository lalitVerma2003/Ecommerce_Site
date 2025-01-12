import express from 'express';
const router=express.Router();
import User from '../models/user.js';
import {createUser,login,logout, forgotPassword} from '../controller/user.js';
import { checkAuth } from '../utils/authMiddleware.js';

router.post('/register',createUser)

router.post('/login',login);

router.patch('/forgotpassword',forgotPassword);

router.get('/logout',logout); 

export default router;