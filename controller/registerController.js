const express = require('express');
const router = express.Router();

const User = require('../model/user');

router.get("/", (req, res, next) => {
    res.render('rejestracja')
})

router.post("/", async (req, res, next) => {
    const dateReg = /^\d{4}[\/\-]((0?[1-9]|1[012])|[a-z]+)[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
    const emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const lettersReg = /^([a-zA-Z]{2,})$/;
    var numberReg = /^\d+$/;
    if (dateReg.test(req.body.fdate)) {
        let imie = req.body.fimie
        let nazwisko = req.body.fnazwisko
        let email = req.body.femail
        let pass = req.body.fpass
        let pass2 = req.body.fpass2
        let date = new Date(req.body.fdate)
        let numer = parseInt(req.body.fnumer)
        let dzialalnosc = req.body.fdzialalnosc
        let adres = req.body.fadres
        let kod = req.body.fkod
        let kraj = req.body.fkraj


        if (pass === pass2 &&
            lettersReg.test(imie) &&
            lettersReg.test(nazwisko) &&
            emailReg.test(email) &&
            pass !== '' &&
            numberReg.test(numer) &&
            lettersReg.test(dzialalnosc) &&
            adres !== '' &&
            kod !== '' &&
            lettersReg.test(kraj)
        ) {

            const newUser = new User(imie, nazwisko, email, pass, date, numer, dzialalnosc, adres, kod, kraj);
            await User.add(newUser);

        }
        res.redirect("/");
    }
});

module.exports.route = router; 
