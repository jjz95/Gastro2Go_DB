var express = require('express');
var router = express.Router();

var User = require('../model/user')
var Product = require('../model/product')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('admin', {
        userList: User.list(),
        productList: Product.list()
        // interestList: Interest.list()
    })
});

router.get('/logout', function (req, res, next) {
    req.session.destroy();
    res.redirect('/');
});

router.post('/addproduct', function (req, res, next) {
    const lettersReg = /^([a-zA-Z]{2,})$/;
    var numberReg = /^\d+$/;
    let nazwa = req.body.nazwa.trim()
    let typ = req.body.typ.trim()
    let waga = req.body.waga.trim()
    let cena = req.body.cena.trim()
    if (lettersReg.test(nazwa)
        && lettersReg.test(typ)
        && numberReg.test(waga)
        && numberReg.test(cena)) {
        let newProduct = new Product(nazwa, typ, waga, cena)
        Product.add(newProduct);
    }

    res.redirect('/admin')
});

// router.post('/addinterest', function (req, res, next) {
//     const reqNameReg = /^([a-z]{2,})$/;
//     let name = req.body.name.trim()
//     if (reqNameReg.test(name)) {
//         let newInterest = new Interest(name)
//         Interest.add(newInterest);
//     }

//     res.redirect('/admin')

// });

router.delete('/deleteproducts', function (req, res, next) {
    try {
        req.body.productsToDelete.forEach(e => {
            if (e.toDelete)
                Product.delete(e.id)
        });
        res.end()
    }
    catch (error) {
        console.log(error)
    }
});

router.post('/updateproduct', async function (req, res, next) {
    const lettersReg = /^([a-zA-Z]{2,})$/;
    var numberReg = /^\d+$/;
    let nazwa = req.body.nazwa.trim()
    let typ = req.body.typ.trim()
    let waga = req.body.waga.trim()
    let cena = req.body.cena.trim()
    if (lettersReg.test(nazwa)
        && lettersReg.test(typ)
        && numberReg.test(waga)
        && numberReg.test(cena)) {
        await Product.edit(nazwa, typ, waga, cena, req.body.id)
    }

    res.redirect('/admin')
});

module.exports.route = router;