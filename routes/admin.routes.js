const express = require('express');

const adminController = require('../controllers/admin.controller');
const imageUploadMiddleware = require('../middlewares/image-upload');

const router = express.Router();

// request handler for --> '/admin/products'
router.get('/products', adminController.getProducts);

// request handler for --> /admin/products/new'
router.get('/products/new', adminController.getNewProducts);

router.post('/products', imageUploadMiddleware, adminController.createNewProduct)

module.exports = router;