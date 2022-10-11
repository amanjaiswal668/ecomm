const User = require('../Model/users');

const bcrypt = require('bcrypt');
const { getToken } = require('../Utils/AuthorizationToken');
const { encode } = require('punycode');


// Create a new user start.
async function createAdmin(req, res) {
    try {
        // Get the values from the body sent by the user.
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const admin = req.body.admin;

        // Password encryption.

        const saltRounds = 12;

        const encodedPassword = await bcrypt.hash(password, saltRounds);

        const user = new User({
            name: name,
            email: email,
            password: encodedPassword,
            isAdmin : admin
        });

        const token = getToken({ id: user.id });

        await user.save(function (err) {
            if (!err) {
                res.json({ userId: user._id, token: token });
            } else {
                res.send(err);
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

async function adminLogin(req, res) {
    try {
        email = req.body.email;
        password = req.body.password;

        User.findOne({ email: email }, function (error, userFound) {
            if (error) {
                res.send("Unable to login.");
            } else {
                if (userFound) {
                    bcrypt.compare(password, userFound.password, function (err, result) {
                        if (result === true) {
                            const token = getToken({ id: userFound._id });
                            res.json({ userId: userFound._id, token: token });
                        } else {
                            res.send("Invalid password. Please try using the correct password.")
                        }
                    });
                } else {
                    res.send("Invalid password");
                }
            }
        })

    } catch (e) {
        res.status(500).json({
            message: "No user found with the given email address"
        })
    }
}

// Login existing user using email and password ends.


// ==========================*****************************===================================

module.exports = {
    createAdmin,
    adminLogin
}