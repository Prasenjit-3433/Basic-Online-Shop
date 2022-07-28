function checkAuthStatus(req, res, next) {
    const uid = req.session.uid;

    if (!uid) {
        // If the user isn't autheticated, still the request can travel on to the next middleware / route:
        return next();
    }

    res.locals.uid = uid;
    res.locals.isAuth = true;
    next();
}

module.exports = checkAuthStatus;