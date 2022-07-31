const express = require('express');

const adminController = require('../controllers/admin.controller');
const imageUploadMiddleware = require('../middlewares/image-upload');

const router = express.Router();

// request handler for --> '/admin/products'
router.get('/products', adminController.getProducts);

// request handler for --> /admin/products/new'
router.get('/products/new', adminController.getNewProducts);

router.post('/products', imageUploadMiddleware, adminController.createNewProduct);

router.get('/products/:id', adminController.getUpdateProduct);

router.post('/products/:id', adminController.updateProduct);

module.exports = router;