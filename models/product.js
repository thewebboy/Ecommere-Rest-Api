 var mongoose = require('mongoose');

// Product Schema
var productSchema = mongoose.Schema({
	imageUrl:{
		type: String,

	},
  title:{
    type: String
  },
	description:{
		type: String
	},
  price:{
		type: Number,
		required: true
	}
	});

var Product = module.exports = mongoose.model('Product', productSchema);


// Get All Products
module.exports.getProducts = (callback, limit) => {
	Product.find(callback).limit(limit);
}

// Get A Perticular Product
module.exports.getProductById = (id, callback) => {
	Product.findById(id, callback);

}


// Add A New Product
module.exports.addProduct = (product, callback) => {
	Product.create(product, callback);
}

// Edit A Product
module.exports.updateProduct = (id, product, options, callback) => {
	var query = {_id: id};
	var update = {
		imageUrl: product.imageUrl,
    title: product.title,
		description: product.description,
		price: product.price

	}
	Product.findOneAndUpdate(query, update, options, callback);
}

// Delete A Product
module.exports.removeProduct = (id, callback) => {
	var query = {_id: id};
	Product.remove(query, callback);
}
