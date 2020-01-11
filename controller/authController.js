const express = require('express');
const router = express.Router();

const User = require('../model/user');
const Admin = require('../model/admin');

const authRedirect = require('../middleware/authRedirect');


//login
router.post('/', authRedirect, (req, res, next)  => {
    const email = req.body.flogin;
    const password = req.body.fpass;
    const user = User.findByEmail(email);
    if (user) {
        user.comparePassword(password)
            .then(result => {
                if (result) {
                    req.session.isUserLoggedIn = true;
                    req.session.loggedUser = user;
                    res.redirect('/users/');
                } else {
                    invalidEmailOrPassword(req, res);
                }
            })
    } else {
        var foundAdmin = Admin.list().find(u => u.email.toLowerCase() === email.toLowerCase());
        if(foundAdmin){
            foundAdmin.comparePassword(password)
            .then(result => {
                if (result) {
                    req.session.isAdminLoggedIn = true;
                    req.session.loggedAdmin = foundAdmin;
                    res.redirect('/admin/');
                } else {
                    invalidEmailOrPassword(req, res);
                }
            }).catch(err => console.log(err))
            // let isAdminPassCorrect = await bcrypt.compare(bodyPassword, foundAdmin.password)

            // if (isAdminPassCorrect) {
            //     res.redirect('/admin')
            // } else {
            //     invalidEmailOrPassword(req, res, bodyEmail)
            // }
        } else {
            invalidEmailOrPassword(req, res);
        }
    }
});

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
});

function invalidEmailOrPassword(req, res) {
    req.flash('loginError', 'Nieprawidłowy email lub hasło');
    res.redirect('/');
}

module.exports.route = router;
