const router = require(`express`).Router();


// requiring route files
const productRoutes = require(`./products`),
    orderRoutes = require(`./orders`),
    userRoutes = require(`./user`);


// using routes
router.use(`/products`, productRoutes);
router.use(`/orders`, orderRoutes);
router.use(`/user`, userRoutes);


module.exports = router;