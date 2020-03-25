const router = require(`express`).Router(),
    { checkAuthorisation } = require(`../middlewares/auth`),
    ordersControllers = require(`../controllers/orders`);


router.use(checkAuthorisation);

router.get(`/`, ordersControllers.fetchAllOrders);

router.get(`/:id`, ordersControllers.fetchOrderByOrderID);

router.post(`/`, ordersControllers.createOrder);

router.delete(`/:id`, ordersControllers.deleteOrderByOrderID);


module.exports = router;