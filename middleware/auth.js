const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    //grab token from cookie
    console.log(req.cookies);
    const {token} = req.cookies;

    //if no token, then stop there
    if(!token) {
        res.status(403).send("Please login first")
    }

    //decode that token and get id
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET_CODE);
        console.log(decode);
        req.user = decode;
    } catch (error) {
        console.log(error);
        res.status(401).send('Invalid Token');
    }

    //query to DB for that user id

    return next();

}

module.exports = auth;