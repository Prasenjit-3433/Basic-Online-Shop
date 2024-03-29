const path = require("path");

const express = require("express");
const session = require('express-session');
const csrf = require('csurf');

const createSessionConfig = require('./config/session');
const db = require("./data/database");
const addCsrfTokenMiddleware = require('./middlewares/csrf-token');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const protectRoutesMiddleware = require('./middlewares/protect-routes');
const cartMiddleware = require('./middlewares/cart');
const updateCartPricesMiddleware = require('./middlewares/update-cart-prices');
const notFoundMiddleware = require('./middlewares/not-found');
const authRoutes = require("./routes/auth.routes");
const productsRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/base.routes');
const adminRoutes = require('./routes/admin.routes');
const cartRoutes = require('./routes/cart.routes');
const ordersRoutes = require('./routes/orders.routes');

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
// '/products/assets' is omitted from the request's url:
app.use('/products/assets', express.static('product-data'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const sessionConfig = createSessionConfig();
app.use(session(sessionConfig));
app.use(csrf());

// Must appear after the session middleware because it uses session under the hoods:
app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);

// it should appear after csrf middleware as we csrfToken() method on req object to generate token:
app.use(addCsrfTokenMiddleware);

app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', protectRoutesMiddleware, ordersRoutes);
app.use('/admin', protectRoutesMiddleware, adminRoutes); 

app.use(notFoundMiddleware);

// Note: only requests with a path that starts with '/admin' will make it into to the adminRoutes and this starting
//       path '/admin' is then removed from the path of request. So that inside of the file adminRoutes, we can
//       have the rest of the path..... 
//       e.g: '/admin/products' --> 'products' ; '/admin/products/new' --> '/products/new'


app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to the database!");
    console.log(error);
  });
