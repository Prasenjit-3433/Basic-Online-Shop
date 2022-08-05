const stripe = require('stripe')('sk_test_51LTKe9SEGog8SDHRasHjVAcquQePZ6SKedGZP7qnI3m7bDhSMGKcsyJZX2F4MhIVovADXJv5dYEYfqn5cb2DWsIr00uAwFBQre');

const Order = require('../models/order.model');
const User = require('../models/user.model');

async function getOrders(req, res, next) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render('customer/orders/all-orders', {orders: orders});
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
    const cart = res.locals.cart;

    let userDocument;

    try {
      userDocument = await User.findById(res.locals.uid);
    } catch (error) {
      return next(error);
    }

    const order = new Order(cart, userDocument);
    try {
      await order.save();
    } catch (error) {
      next(error);
      return;
    }

    // Once the order is place, clear the from session:
    req.session.cart = null;

    // Making payment - code starts:
    const session = await stripe.checkout.sessions.create({
      line_items: cart.items.map(function(item) {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.product.title
            },
            unit_amount: +item.product.price * 100
          },
          quantity: item.quantity,
        }
      }) ,
      mode: 'payment',
      success_url: `http://localhost:3000/orders/success`,
      cancel_url: `http://localhost:3000/orders/failure`,
    });

    // we redirect the user to Stripe's own site after we configure stripe's session:
    res.redirect(303, session.url);
}

function getSuccess(req, res) {
  res.render('customer/orders/success');
}

function getFailure(req, res) {
  res.render('customer/orders/failure');
}

module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
  getSuccess: getSuccess,
  getFailure: getFailure
};
