function protectRoutes(req, res, next) {
    if (!res.locals.isAuth) {
       return res.redirect('/401');
    }

    // You're trying to access the admin routes while you are not admin:
    if (req.path.startsWith('/admin') && !res.locals.isAdmin) {
        return res.redirect('/403');
    }

    next();
}

module.exports = protectRoutes;