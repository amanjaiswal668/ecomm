const jwt = require('jsonwebtoken');

function getToken(payload) {
    const token = jwt.sign(
        payload,
        'user secret security',
        { expiresIn: '1d' }
    );

    return token;
}


function decodeToken(req, res, next) {
    // Decode the token for user authorization.
    try {
        let token = req.headers['authorization'];
        token = token.split(' ')[1];
        const decodedToken = jwt.verify(token, 'user secret security');
        console.log(decodedToken);
        req.userId = decodedToken.id;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "Authorization Failed"
        })
    }
}

module.exports = {
    getToken,
    decodeToken
}