const { request } = require('express');
const { Db } = require('mongodb');
const Product = require('../models/product.model');

async function getProducts(req, res, next) {
    try {
        const products = await Product.findAll();
        res.render('admin/products/all-products', {products: products});
    }catch(error) {
        next(error);
        return;
    }
}

function getNewProducts(req, res) {
    res.render('admin/products/new-product');
}

async function createNewProduct(req, res, next) {
    const product = new Product({
        ...req.body,
        image: req.file.filename
    });

    try{
        await product.save();
    }catch(error) {
        next(error);
        return;
    }

    res.redirect('/admin/products');
}

async function getUpdateProduct(req, res, next) {
    try {
        const product = await Product.findById(req.params.id);
        res.render('admin/products/update-product', {product: product});
    } catch (error) {
        next(error);
    }

}

async function updateProduct(req, res, next) {
    const product = new Product({
        ...req.body,
        _id: req.params.id
    });

    if (req.file) {
        product.replaceImage(req.file.filename);
    }

    try {
        await product.save();
    }catch(error) {
        return next(error);
    }

    res.redirect('/admin/products');
}

async function deleteProduct(req, res, next) {
    try {
        const product = await Product.findById(req.params.id);
        await product.remove();
    } catch (error) {
        return next(error);
    }
    
    // As a response for frontend based js request, we don't load a new page instead stay on the same page:
    // res.redirect('/admin/products');

    // Instead we can send a response in Json format:
    res.json({message: 'Deleted product!'});
}

module.exports = {
    getProducts: getProducts,
    getNewProducts: getNewProducts,
    createNewProduct: createNewProduct,
    getUpdateProduct: getUpdateProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
};