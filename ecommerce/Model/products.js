var mongoose = require('mongoose')
var Schema = mongoose.Schema

var product = new Schema({

    productTitle: { type: String, required: [true, "Please enter a valid name of the product."], null: false },
    productDescription: { type: String, required: [true, "Please enter at least 50 characters."], null: false },
    // productImage: { data: Buffer, contentType: String },
    productImage: { type: String, required: [true, "Please select a correct image."], null: true },
    productPrice: { type: Number, required: [true, "Please select a correct price."], null: false },

})

const ProductSchema = mongoose.model("product", product);

module.exports = ProductSchema