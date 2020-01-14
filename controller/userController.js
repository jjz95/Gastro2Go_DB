const express = require('express');
const router = express.Router();

const User = require('../model/user');
const Product = require('../model/product');
const OrderComponent = require('../model/orderComponent');
const Order = require('../model/order');

const ProductView = require('../model/productView');
const ConfirmedOrderView = require('../model/confirmedOrderView');

router.get("/", async (req, res, next) => {
    let productList = []
    let products = []
    let restProductList = []

    let realProductList = await Product.list()
    let orderComponents = await OrderComponent.list()
    let orderPending = await Order.findPendingOrderByUserId(req.session.loggedUser.id)
    let orderPendingId = -1
    if (orderPending) {
        orderPendingId = orderPending.id

        orderComponents.filter(oc => oc.idPurchase == orderPending.id)
            .forEach(oc => {
                let newProd = realProductList.find(p => p.id == oc.idProduct)
                products.push(newProd)
                let newProdView = new ProductView(newProd, oc.ilosc)
                productList.push(newProdView)
            })

        restProductList = realProductList.filter((el) => !products.includes(el));
    } else {
        restProductList = realProductList
    }

    res.render('profil', {
        productList: productList,
        restProductList: restProductList,
        orderPendingId: orderPendingId
    })
})

router.get("/shop", async (req, res, next) => {
    let productList = []
    let products = []
    let restProductList = []

    let realProductList = await Product.list()
    let orderComponents = await OrderComponent.list()
    let orderPending = await Order.findPendingOrderByUserId(req.session.loggedUser.id)
    let orderPendingId = -1
    if (orderPending) {
        orderPendingId = orderPending.id

        orderComponents.filter(oc => oc.idPurchase == orderPending.id)
            .forEach(oc => {
                let newProd = realProductList.find(p => p.id == oc.idProduct)
                products.push(newProd)
                let newProdView = new ProductView(newProd, oc.ilosc)
                productList.push(newProdView)
            })

        restProductList = realProductList.filter((el) => !products.includes(el));
    } else {
        restProductList = realProductList
    }

    res.render('eksplorujProdukty', {
        productList: productList,
        restProductList: restProductList,
        orderPendingId: orderPendingId
    })
})

router.get("/orders", async (req, res, next) => {
    let confirmedOrders = Order.findConfirmedOrdersByUserId(req.session.loggedUser.id)
    let confirmedOrdersView = []
    // confirmedOrders.forEach(co => {

    // })
    confirmedOrdersView = new ConfirmedOrderView()
    res.render('zamowienia', {
        confirmedOrdersView: confirmedOrdersView
    })
})


router.get("/panel", (req, res, next) => {
    var dateObj = new Date(req.session.loggedUser.dateOfBirth)
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    let date
    if (month < 10)
        date = year + "-" + "0" + month + "-" + day;
    else {
        date = year + "-" + month + "-" + day;
    }
    res.render('panel', {
        user: req.session.loggedUser,
        date: date
    })
})

//USER UPDATE
router.post("/panel", async (req, res, next) => {
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
            await User.edit(imie, nazwisko, email, pass, date, numer, dzialalnosc, adres, kod, kraj, req.session.loggedUser.id);
            //firstName, lastName, email, passwordHash, dateOfBirth, contactNumber, business, address, zipCode, country, id
            req.session.loggedUser.firstName = imie
            req.session.loggedUser.lastName = nazwisko
            req.session.loggedUser.email = email
            req.session.loggedUser.dateOfBirth = date
            req.session.loggedUser.contactNumber = numer
            req.session.loggedUser.business = dzialalnosc
            req.session.loggedUser.address = adres
            req.session.loggedUser.zipCode = kod
            req.session.loggedUser.country = kraj
        }
        res.redirect("/users");
    }
})

router.post("/delete", async (req, res, next) => {
    await User.delete(req.session.loggedUser.id)
    req.session.destroy();
    res.redirect('/');
})

router.post("/removeproduct/:id", async (req, res, next) => {
    let orderPending = await Order.findPendingOrderByUserId(req.session.loggedUser.id)
    await OrderComponent.delete(orderPending.id, req.params.id, req.session.loggedUser.id)
    res.redirect('/users')
})

router.post("/addproduct", async (req, res, next) => {
    let userId = req.session.loggedUser.id
    let productId = req.body.productId
    if (!isNaN(userId) && !isNaN(productId) && userId != '' && productId != '') {
        await OrderComponent.add(userId, productId)
    }
    res.redirect('/users/shop')
})

router.put("/updateproduct", async (req, res, next) => {
    let orderPending = await Order.findPendingOrderByUserId(req.session.loggedUser.id)

    req.body.productsToModify.forEach(async pm =>
        await OrderComponent.edit(orderPending.id, pm.productId, pm.ilosc)
    )
    res.end()
})

router.post("/ordernow/:id", async (req, res, next) => {
    // let orders = await Order.list()
    // orders.find(o => o.id == req.params.id)
    let orderComponents = await OrderComponent.list()
    let orderComponentsFromPendingOrder = orderComponents.filter(oc => oc.idPurchase == req.params.id)
    let products = await Product.list()

    let cost = 0;
    let wage = 0;
    orderComponentsFromPendingOrder.forEach(oc => {
        let currProduct = products.find(p => p.id == oc.idProduct)
        let currPrice = currProduct.cena
        let currWage = currProduct.waga
        cost += currPrice * oc.ilosc
        wage += currWage * oc.ilosc
    })
    Order.updateStatusToConfirmed(req.params.id, cost, wage)
    res.redirect('/users')
})


module.exports.route = router; 