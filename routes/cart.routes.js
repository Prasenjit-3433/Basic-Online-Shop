const express = require('express');

const cartController = require('../controllers/cart.controller');

const router = express.Router();

router.get('/', cartController.getCart); // actual path: '/cart/'

router.post('/items', cartController.addCartItem); // actual path: '/cart/items'

module.exports = router;