var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');



//adding product model
var Product = require('../models/product');

console.log('inside products.js');

router.get('/', (req, res) => {
	Product.getProducts((err, products) => {
    console.log('inside /products');
		if(err){
			throw err;
		}
		res.json(products);

	});
});


router.get('/:_id', (req, res) => {
	Product.getProductById(req.params._id, (err, product) => {
		if(err){
			throw err;
		}
		res.json(product);
	});
});

router.post('/', (req, res) => {
	var product = req.body;
	Product.addProduct(product, (err, product) => {
		if(err){
			throw err;
		}
		res.json(product);
	});
});

router.put('/:_id', (req, res) => {
	var id = req.params._id;
	var product = req.body;
	Product.updateProduct(id, product, {}, (err, product) => {
		if(err){
			throw err;
		}
		res.json(product);
	});
});

router.delete('/:_id', (req, res) => {
	var id = req.params._id;
	Product.removeProduct(id, (err, product) => {
		if(err){
			throw err;
		}
		res.json(product);
	});
});

module.exports = router;
