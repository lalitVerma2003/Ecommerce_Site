import express from 'express';
const router=express.Router();
import User from '../models/user.js';
import {createUser,login,logout} from '../controller/user.js';
import { checkAuth } from '../utils/authMiddleware.js';

router.post('/register',createUser)

router.post('/login',login);

router.get('/logout',checkAuth,logout); 

export default router;