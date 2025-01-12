import Product from '../models/products.js';
import Cart from '../models/cart.js';

export async function allProducts(req, res) {
    if (req.user&&(req.user.role === "admin")) {
        const productData = await Product.find({ owner: req.user });
        const total=productData.length;
        return res.json({productData,total});
    }
    // if (req.user.role === "user") {
        let { category, brand, page, limit } = req.query;
        // category = category.toLowerCase();
        // brand=brand.toLowerCase();
        let query={};
        query=brand?{ ...query,brand:brand }:query;
        query=category?{ ...query,category:category }:query;
        let productData = await Product.find(query).skip((page-1)*limit).limit(limit).select("name description price images");
        let total=productData.length;
        // console.log(productData);
        res.status(200).json({productData,total});
    // }
}

export async function showProduct(req, res) {
    const product = await Product.findById(req.params.id).populate("reviews").populate('reviews.owner','owner');
    // console.log(product);
    res.status(200).json(product);
}

export async function createProduct(req, res) {
    const { name, description, price, brand, category } = req.body;
    const images=req.files;
    const newProduct = new Product({ name, description, price, brand, category });
    newProduct.owner = req.user;
    const newImages = images.map((img) => {
        return {
            url: img.path,
            filename: "image1"
        }
    })
    newProduct.images =newImages;
    await newProduct.save();
    console.log("New product",newProduct);
    res.status(200).json(newProduct);
}

export async function updateProduct(req, res, next) {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        await product.save();
        const images = req.files.map(f => ({ url: f.path, filename: f.filename }));
        product.images.push(...images);
        await product.save();
        req.flash('success', 'Congratulations,Product update successfully');
        res.redirect(`/products/${id}`);
    } catch (err) {
        next(err);
    }
}

export async function deleteProduct(req, res) {
    // Also remove products from cart of users
    const { id } = req.params;
    const product=await Product.findById(id);
    const deletedCarts=await Cart.deleteMany({product:product});
    const deleteProduct = await Product.findByIdAndDelete(id, { new: true });
    res.status(200).json(deleteProduct);
}