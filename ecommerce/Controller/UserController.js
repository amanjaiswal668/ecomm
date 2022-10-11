const User = require('../Model/users');

const bcrypt = require('bcrypt');
const { getToken } = require('../Utils/AuthorizationToken');
const { encode } = require('punycode');


// Create a new user start.
async function createUser(req, res) {
    try {
        // Get the values from the body sent by the user.
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        // Password encryption.

        const saltRounds = 12;

        const encodedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User({
            name: name,
            email: email,
            password: encodedPassword
        });

        const token = getToken({ id: user.id });

        await user.save(function (err) {
            if (!err) {
                res.ststus(201).json({ userId: user._id, token: token });
            } else {
                res.status(400).json(err);
            }
        })
    } catch (e) {
        res.status(500).json({
            message: "Unable to create new user!!!!"
        })
    }
}

// Create a new user ends.

// Login existing user using email and password starts.

async function userLogin(req, res) {
    try {
        userName = req.body.name,
        email = req.body.email;
        password = req.body.password;

        User.findOne({ email: email , name : userName}, function (error, userFound) {
            if (error) {
                res.json({ message: "Unable to login." });
            } else {
                if (userFound) {
                    bcrypt.compare(password, userFound.password, function (err, result) {
                        if (result === true) {
                            const token = getToken({ id: userFound._id });
                            console.log(userFound._id)
                            res.status(200).json({ userId: userFound._id, token: token });
                        } else {
                            console.log("error")
                            res.status(401).json({ message: "Invalid password. Please try using the correct password." })
                        }
                    });
                } else {
                    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! error")
                    res.status(400).json({ message: "User not found" });
                }
            }
        })

    } catch (e) {
        console.log("error !!!!!!!!!!!!!!")
        res.status(500).json({

            message: "Unable to login. Sorry for the inconvinence caused."
        })
    }
}

// Login existing user using email and password ends.


// ==========================*****************************===================================

module.exports = {
    createUser,
    userLogin
}