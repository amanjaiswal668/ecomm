const Order = require('../Model/orders');
const User = require('../Model/users');

const con = require('../Utils/config');


// Create a new order starts here.


async function createOrder(req, res) {

    try {
        const userId = req.body["userId"];
        const OrderedProduct = req.body["orders"];
        const order = new Order();
        order.userId = userId;
        // order.orderId = { $inc: { orderId: 1 } };
        OrderedProduct.forEach(function (d) {
            order.products.push({
                quantity: d.quantity,
                product: d.productId
            })
        });

        var userExist = await User.findById({ _id: userId });
        userExist.order.push(order._id);
        userExist.save();
        console.log("order :-" + order)
        await order.save(function (err) {
            if (!err) {
                res.json({ userOrderId: order._id });
            } else {
                res.send(err);
            }
        });

    } catch (e) {
        res.status(500).json({
            // message: e
            message: "Unable to create new order!!!!"
        })
    }
}

// Create a new order ends here.

// View all order for a specific user starts.


async function viewAllOrder(req, res) {

    try {
        const userId = req.body.userId;

        console.log("userId :- " + userId);


        // Connect three schemas with each other. A nested form.
        // ************************************************************************
        // => Pictorial representation : - 
        // User = { // Refering to user schema and collection.
        //     order: order = { // Refering to order schema and collection.
        //         product: product // Refering to product schema and collection.
        //     }
        // }
        // ************************************************************************
        // const allOrder = await User.findById({ _id: userId }).populate({
        //     path: "order", model: "order", populate: {
        //         path: "product",
        //         model: "product"
        //     }
        // }).populate();

        // Depricated. *************************************************************************************************

        // ****************************************** Populate nested documents in mongodb. ****************************************
        const allOrder = await User.findById({ _id: userId }).populate({
            path: "order", model: "order", populate: {
                path: "products.product",
                model: "product"
            }
        })
        console.log("allORder : - " + allOrder)
        res.json({ "orderHistory": allOrder["order"][0]["products"] });
    } catch (e) {
        res.status(500).json({
            message: e
        })
    }
}

// View all order for a specific user ends.


module.exports = {
    createOrder,
    viewAllOrder
}