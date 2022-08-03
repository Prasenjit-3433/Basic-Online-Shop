const express = require('express');

const cartController = require('../controllers/cart.controller');

const router = express.Router();

router.get('/', cartController.getCart); // actual path: '/cart/'

router.post('/items', cartController.addCartItem); // actual path: '/cart/items'

// `put` request --> to replace existing data, `patch` --> to update parts of an existing data:
router.patch('/items/', cartController.updateCartItem);

module.exports = router;