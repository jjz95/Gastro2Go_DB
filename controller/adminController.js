var express = require('express');
var router = express.Router();

var User = require('../model/user')
var Product = require('../model/product')
var ProductView = require('../model/productView')
var Order = require('../model/order')
var OrderComponent = require('../model/orderComponent')


/* GET home page. */
router.get('/', async function (req, res, next) {
    res.render('admin', {
        userList: await User.list(),
        productList: await Product.list()
        // interestList: Interest.list()
    })
});


router.get("/adminseeorders/:id", async (req, res, next) => {
    // let productList = []
    // let realProductList = await Product.list()
    // let orderComponents = await OrderComponent.list()

    // orderComponents.filter(oc => oc.idPurchase == req.params.id)
    //     .forEach(oc => {
    //         let newProd = realProductList.find(p => p.id == oc.idProduct)
    //         let newProdView = new ProductView(newProd, oc.ilosc)
    //         productList.push(newProdView)
    //     })


    // res.render('adminseeorders', {
    //     productList: productList,
    //     orderId: req.params.id
    // })
    let confirmedOrders = await Order.getOrderedOrdersByUserId(req.params.id)
    // let confirmedOrdersView = []
    // confirmedOrders.forEach(co => {

    // })
    // confirmedOrdersView = new ConfirmedOrderView()
    res.render('adminseeorders', {
        confirmedOrders: confirmedOrders,
        userId: req.params.id
    })
})

router.post("/admindeleteorder/:userId/:orderId", async (req, res, next) => {
    await Order.delete(req.params.orderId)
    res.redirect(`/admin/adminseeorders/${req.params.userId}`)
})

router.get("/adminseeorderedproducts/:id", async (req, res, next) => {
    let productList = []
    let realProductList = await Product.list()
    let orderComponents = await OrderComponent.list()

    orderComponents.filter(oc => oc.idPurchase == req.params.id)
        .forEach(oc => {
            let newProd = realProductList.find(p => p.id == oc.idProduct)
            let newProdView = new ProductView(newProd, oc.ilosc)
            productList.push(newProdView)
        })


    res.render('adminseeorderedproducts', {
        productList: productList,
        orderId: req.params.id
    })
})

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
    if(isNaN(waga) || waga < 1){
        waga = 1
        this.value = waga
    }
    if(isNaN(cena) || cena < 1){
        cena = 1
        this.value = cena
    }
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

router.delete('/deleteproducts', async function (req, res, next) {
    try {
        req.body.productsToDelete.forEach(async e => {
            if (e.toDelete){
                console.log(e.id)
                await Product.delete(e.id)
            } else{
                console.log(e.toDelete)
            }
                
        });
        console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', req.body.productsToDelete)
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
    if(isNaN(waga) || waga < 1){
        waga = 1
        this.value = waga
    }
    let cena = req.body.cena.trim()
    if(isNaN(cena) || cena < 1){
        cena = 1
        this.value = cena
    }
    if (lettersReg.test(nazwa)
        && lettersReg.test(typ)
        && numberReg.test(waga)
        && numberReg.test(cena)) {
        await Product.edit(nazwa, typ, waga, cena, req.body.id)
    }

    res.redirect('/admin')
});

module.exports.route = router;