const jwt = require(`jsonwebtoken`);

exports.checkAuthorisation = (req, res, next) => {
    try{
        const encodedToken = req.headers.authorization.split(` `)[1];
        const decodedToken = jwt.verify(encodedToken, process.env.JWT_KEY);
        req.userData = decodedToken;
        next();
    }
    catch(err){
        return res.status(401).json({
            message: `Authorisation failed`
        });
    }
};