var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Product = require('../models/product');
var Cart = require('../models/cart-model');


//to add items to cart
router.get('/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart.items : {});

    Product.findById(productId, function (err, product) {
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');

    });
});

// router.get('/', function (req, res, next) {
//     if (!req.session.cart) {
//         return res.render('shop/shopping-cart', {products: null});
//     }
//     var cart = new Cart(req.session.cart.items);
//     res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
// });

module.exports = router;
