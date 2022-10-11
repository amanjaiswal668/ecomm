const ObjectId = require('mongodb').ObjectId;
const Product = require('../Model/products');

var fs = require('fs');
var path = require('path');

var multer = require('multer');
// Create a new product start.
async function createProduct(req, res) {
    try {
        // Get the values from the body sent by the user.
        const productTitle = req.body.productTitle;
        const productDescription = req.body.productDescription;
        const productImage = req.body.productImage;
        const productPrice = req.body.productPrice;
        // const productImage = fs.readFileSync(path.join(__dirname + '/uploads/'));


        // Image area start


        // var storage = multer.diskStorage({
        //     destination: (req, file, cb) => {
        //         cb(null, 'uploads')
        //     },
        //     filename: (req, file, cb) => {
        //         cb(null, file.fieldname + '-' + Date.now())
        //     }
        // });
        // Image area end

        const product = new Product({
            productTitle: productTitle,
            productDescription: productDescription,
            productImage: productImage,
            productPrice : productPrice
        });

        await product.save(function (err) {
            if (!err) {
                res.json({ productId: product._id });
            } else {
                res.send(err);
            }
        })
    } catch (e) {
        res.status(500).json({
            message: "Unable to create new product!!!!"
        })
    }
}

// Create a new product ends.

// Delete the existing product starts.

async function deleteProduct(req, res) {
    try {
        const productId = req.body.productId;

        Product.findById({ _id: productId }, async function (error, productFound) {
            if (error) {
                res.send("Unable to find the product.");
            } else {
                if (productFound) {
                    const deleted = await Product.deleteOne({ _id: productId });
                    // Product.findByIdAndDelete({id : productFound._id});
                    res.send(deleted);
                } else {
                    res.send("Invalid product Id");
                }
            }
        })

    } catch (e) {
        res.status(500).json({
            message: "No product found with the given product Id. Unable to delete"
        })
    }
}

// Delete the existing product ends.

// Update the existing product starts.

async function updateProduct(req, res) {

    try {
        const productId = req.body.productId;
        const productTitle = req.body.productTitle;
        const productDescription = req.body.productDescription;
        const productImage = req.body.productImage;
        const productPrice = req.body.productPrice;

        Product.findOne({ _id: productId }, async function (error, productFound) {
            if (error) {
                res.send("Unable to find the product.");
            } else {
                if (productFound) {
                    const updated = await Product.findOneAndUpdate({ _id: productId },
                        { productTitle: productTitle, productDescription: productDescription, productImage: productImage, productPrice : productPrice },
                        { useFindAndModify: false })
                    res.send(updated);
                } else {
                    res.send("Invalid product Id");
                }
            }
        })

    } catch (e) {
        res.status(500).json({
            message: "No product found with the given product Id. Unable to update."
        })
    }

}
// Update the existing product ends.

// Read a product using id starts.

async function viewProductById(req, res) {

    try {
        const productId = req.body.productId;

        const allProduct = await Product.findById({ _id: productId });

        res.send(allProduct);

    } catch (e) {
        res.status(500).json({
            message: "No product found with the given product Id."
        })
    }
}
// Read a product using id ends.


// Read all the products starts.

async function viewProduct(req, res) {

    try {
        const allProduct = await Product.find();

        res.send(allProduct);

    } catch (e) {
        res.status(500).json({
            message: "No product found with the given product Id."
        })
    }

}
// Read all the products ends.

// ==========================*****************************===================================

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    viewProductById,
    viewProduct

}