var mongoose = require('mongoose')
var Schema = mongoose.Schema

var user = new Schema({

    name: { type : String, required: [true, "Please enter a valid name of the user."] , null : false},
    email: { type : String, required: [true, "Please enter a valid email adress of the user."], null : false },
    password: { type : String, required: [true, "Password must be 5 character long."], null : false },
    order : [{
        type : mongoose.Types.ObjectId,
        ref : "order"
    }],
    isAdmin : {type : Boolean, default : false}
    
})

const UserSchema = mongoose.model("user", user)

module.exports = UserSchema