const express = require('express');

const adminController = require('../controllers/admin.controller');

const router = express.Router();

// request handler for --> '/admin/products'
router.get('/products', adminController.getProducts);

// request handler for --> /admin/products/new'
router.get('/products/new', adminController.getNewProducts)

module.exports = router;