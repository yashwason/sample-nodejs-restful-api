const router = require(`express`).Router(),
    jwt = require(`jsonwebtoken`),
    { catchPromiseError } = require(`../handlers/errors`),
    User = require(`../models/user`);


router.post(`/register`, (req, res, next) => {
    catchPromiseError(
        next,
        User.findOne({ email: req.body.email })
        .then((foundUser) => {
            if(foundUser){
                res.status(409).json({
                    message: `An account with that email already exists`
                });
            }
            else{
                const userToSave = new User();
                userToSave.email = req.body.email;
                userToSave.password = userToSave.hashPassword(req.body.password);
        
                return userToSave.save()
            }
        })
        .then((user) => {
            console.log(user);
            res.status(201).json(user);
        })
    );
});

router.post(`/login`, (req, res, next) => {
    catchPromiseError(next,
        User.findOne({ email: req.body.email })
        .then((user) => {
            if(user){
                if(user.verifyPassword(req.body.password)){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user._id
                    },
                    process.env.JWT_KEY, {
                        expiresIn: `1h`
                    });

                    res.status(200).json({
                        message: `Authorisation successful`,
                        token
                    });
                }
                else{
                    return res.status(401).json({
                        message: `Authorisation failed`
                    });
                }

            }
            else{
                return res.status(401).json({
                    message: `Authorisation failed`
                });
            }
        })
    );
});


module.exports = router;