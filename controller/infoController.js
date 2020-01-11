const express = require('express');
const router = express.Router();


router.get("/kontakt", (req, res, next) => {
    res.render('kontakt')
})


router.get("/onas", (req, res, next) => {
    res.render('O_nas')
})


module.exports.route = router;
