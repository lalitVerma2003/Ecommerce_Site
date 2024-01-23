import express from 'express';
const router=express.Router();
import multer from 'multer';
import {allProducts,showProduct,createProduct,updateProduct,deleteProduct} from '../controller/products.js';
import { checkAuth,checkOwner,checkAdmin } from '../utils/authMiddleware.js';
import storage from "../cloudinary/uploading.js"; 
const upload = multer({ storage: storage });

router.get('/all',checkAuth,allProducts);

router.get('/:id',showProduct)

router.post('/new',checkAuth,checkAdmin,upload.array("images",5),createProduct);

router.put('/:id',checkAuth,checkOwner,updateProduct)

router.delete('/:id',checkAuth,checkOwner,deleteProduct);

export default router;