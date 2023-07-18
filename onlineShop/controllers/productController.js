const asyncHandler = require('express-async-handler');
const { deleteOneProduct, findOneProductByIdAndUpdate, createOneProduct, findOneProductById } = require('../services/productServices');
require('dotenv').config();


//@desc Create Product
//@route POST /api/products/create
//@acsess private

const createProduct = asyncHandler(async (req, res) => {
    const { title, image, description, quantity, price, cod, color, delivery} = req.body;
    if (!title || !image || !description || !quantity || !cod || !color || !delivery || !price) {
        res.status(400).json({
            message: "Not found"
        });;
    }
    
    const product = await createOneProduct(title, image, description, quantity, price, cod, color, delivery, req.customer.id);

    if (product) {
        res.status(200).json({ id: product._id, title: product.title, cid: req.customer.id });
    } else {
        res.status(400).json({
            message: "Data not valid"
        });
    }
    res.end();

});



//@desc Product Edit
//@route PUT /api/products/edit
//@acsess private

const editProduct = asyncHandler(async (req, res) => {
    const product= await findOneProductById(req.params.id);

    if (product) {
        const updated = await findOneProductByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(updated);
    }

})

//@desc Products Delete
//@route DELETE /api/products/delete
//@acsess private

const deleteProduct = asyncHandler(async (req, res) => {
    console.log('1')
    const product = await findOneProductById(req.params.id);

    if (product) {
        await deleteOneProduct(req.params.id);
        res.status(200).json(product);
    } else {
        res.status(400).json({
            message: "Product Not Found"
        });;
    }

});

module.exports = { createProduct, editProduct, deleteProduct }