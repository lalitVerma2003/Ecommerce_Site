import Product from '../models/products.js';
import Cart from '../models/cart.js';

export async function allProducts(req, res) {
    if (req.user.role === "admin") {
        const products = await Product.find({ owner: req.user });
        res.json(products);
    }
    if (req.user.role === "user") {
        let productData = await Product.find({});
        let { category, brand, page, limit } = req.query;
        if (category) {
            // category = category.toLowerCase();
            productData = productData.filter((product)=> product.category===category)
        }
        if (brand) {
            // brand=brand.toLowerCase();
            productData = productData.filter((product)=> product.brand===brand)
        }
        let total=productData.length;
        if(page&&limit){
            page=parseInt(page,10);
            limit=parseInt(limit,10);
            productData=productData.slice((page-1)*limit,(page-1)*limit+limit);
        }
        // console.log(productData);
        res.status(200).json({productData,total});
    }
}

export async function showProduct(req, res) {
    const product = await Product.findById(req.params.id).populate({
        path: 'reviews', populate: {
            path: 'owner'
        }
    }).populate('owner');
    // console.log(product);
    // res.render('products/showOne',{product});
    res.status(200).json(product);
}

export async function createProduct(req, res) {
    const { name, description, price, brand, category } = req.body;
    const images=req.files;
    // console.log(req.body,images);
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