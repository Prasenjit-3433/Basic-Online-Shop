const Cart = require("../models/cart.model");

// job of this function is to looking at the incoming request and determining whether it's coming from a user who
// already has a cart or who doesn't have a cart yet. Either way, the cart should be initialized:
function initializeCart(req, res, next) {
  let cart;

  if (!req.session.cart) {
    cart = new Cart();
  } else {
    const sessionCart = req.session.cart;
    
    // Even if cart exists in the session, it's stored in the session in a way that the methods attached to that
    // object are not stored there. That's why we initializing the class again:
    cart = new Cart(
      sessionCart.items,
      sessionCart.totalQuantity,
      sessionCart.totalPrice
    );
  }

  res.locals.cart = cart;
  next();
}

module.exports = initializeCart;
