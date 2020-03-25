const router = require(`express`).Router(),
    { checkAuthorisation } = require(`../middlewares/auth`),
    { upload } = require(`../middlewares/upload_file`),
    productsControllers = require(`../controllers/product`);


router.get(`/`, productsControllers.fetchAllProducts);

router.post(`/`, checkAuthorisation, upload.single(`image`), productsControllers.createProduct);

router.get(`/:id`, productsControllers.fetchProductByProductID);

router.patch(`/:id`, checkAuthorisation, productsControllers.updateProduct);

router.delete(`/:id`, checkAuthorisation, productsControllers.deleteProduct);


module.exports = router;