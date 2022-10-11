var mongoose = require('mongoose')
var Schema = mongoose.Schema

var order = new Schema([{

    // quantity: { type: String, required: [false, "quantity error for the order"], null: false },
    // userId: { type: String, required: [true, "invalid userId for the order."], null: false },
    // orderId: { type: Number, default: 1 },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    products: [{
        quantity: { type: String, required: [false, "quantity error for the order"], null: false },
        product: {
            type: mongoose.Types.ObjectId,
            ref: "product"
        }
    }]
}])

const OrderSchema = mongoose.model("order", order);

module.exports = OrderSchema