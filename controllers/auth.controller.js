const User = require("../models/user.model");
const authUtill = require("../util/authentication");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");

function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req);
 
  if (!sessionData) {
    sessionData  = {
      email: '',
      confirmEmail: '',
      password: '',
      fullname: '',
      street: '',
      postal: '',
      city: ''
    };
  }

  res.render("customer/auth/signup", {inputData: sessionData});
}

async function signup(req, res, next) {
  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body['confirm-email'],
    password: req.body.password,
    fullname: req.body.fullname,
    street: req.body.street,
    postal: req.body.postal,
    city: req.body.city,
  };

  if (
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    ) ||
    !validation.emailIsConfirmed(req.body.email, req.body["confirm-email"])
  ) {
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage:
          "Please check your input. Password must be atleast 6 characters long, postal code must be 5 characters long!",
        ...enteredData,
      },
      function () {
        res.redirect("/signup");
      }
    );

    return;
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  // async error handling:
  try {
    const existsAlready = await user.existsAlready();

    if (existsAlready) {
      sessionFlash.flashDataToSession(req, {
        errorMessage: 'User exists already! - Try login instead',
        ...enteredData
      }, function() {
        res.redirect("/signup");
      });
      return;
    }

    await user.signup();
  } catch (error) {
    return next(error);
  }

  res.redirect("/login");
}

function getLogin(req, res) {
  let sessionData = sessionFlash.getSessionData(req);
 
  if (!sessionData) {
    sessionData  = {
      email: '',
      password: ''
    };
  }
  
  res.render("customer/auth/login", {inputData: sessionData});
}

async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);

  let existingUser;

  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    return next(error);
  }

  const sessionErrorData = {
    errorMessage: 'Invalid credentials - Please check your email & password!',
    email: req.body.email,
    password: req.body.password
  };

  if (!existingUser) {
    sessionFlash.flashDataToSession(req, sessionErrorData, function() {
      res.redirect("/login");
    });
    return;
  }

  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(req, sessionErrorData, function() {
      res.redirect("/login");
    });
    return;
  }

  authUtill.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}

function logout(req, res) {
  authUtill.destroyUserAuthSession(req);
  res.redirect("/login");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
