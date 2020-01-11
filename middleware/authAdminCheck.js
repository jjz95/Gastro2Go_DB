module.exports = (req, res, next) => {
    const isAdminLoggedIn = req.session.isAdminLoggedIn;
    if (isAdminLoggedIn) {
        next();
    } else {
        // req.flash('authError', 'Nie masz uprawnień do tego działania');
        res.redirect('/');
    }
}