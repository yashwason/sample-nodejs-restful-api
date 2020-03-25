const { catchPromiseError } = require(`../handlers/errors`),
    Product = require(`../models/product`);


exports.fetchAllProducts = (req, res, next) => {
    catchPromiseError(
        next,
        Product.find({})
        .select(`name price image _id`)
        .sort({ updatedAt: -1 })
        .then((products) => {
            res.status(200).json({
                count: products.length,
                products: products.map((productObj) => {
                    return {
                        ...productObj.toObject(),
                        find_product: {
                            method: `GET`,
                            url: `${process.env.BASE_URL}/products/${productObj._id}`
                        }
                    }
                })
            });
        })
    );
}

exports.createProduct = (req, res, next) => {
    catchPromiseError(
        next,
        Product.create({
            ...req.body,
            image: req.file.path
        })
        .then((product) => {
            res.status(201).json({
                message: `Created new product`,
                product: {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    find_product: {
                        method: `GET`,
                        url: `${process.env.BASE_URL}/products/${product._id}`
                    }
                }
            });
        })
    )
}

exports.fetchProductByProductID = (req, res, next) => {
    const id = req.params.id;
    catchPromiseError(
        next,
        Product.findById(id)
        .then((product) => {
            if(product){
                res.status(200).json({
                    product: {
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        find_product: {
                            method: `GET`,
                            url: `${process.env.BASE_URL}/products/${product._id}`
                        }
                    }
                });
            }
            else{
                res.status(404).json({
                    error: {
                        message: `No product with the provided ID`
                    }
                });
            }
        })
    );
}

exports.updateProduct = (req, res, next) => {
    const id = req.params.id;

    catchPromiseError(
        next,
        Product.findByIdAndUpdate(id, req.body)
        .then((product) => {
            if(product){
                res.status(200).json({
                    message: `Updated product`,
                    product: {
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        find_product: {
                            method: `GET`,
                            url: `${process.env.BASE_URL}/products/${product._id}`
                        }
                    }
                });
            }
            else{
                res.status(404).json({
                    error: {
                        message: `No product with the provided ID`
                    }
                });
            }
        })
    );
}

exports.deleteProduct = (req, res, next) => {
    const id = req.params.id;
    catchPromiseError(
        next,
        Product.findByIdAndRemove(id)
        .then((result) => {
            if(result){
                res.status(200).json({
                    message: `Deleted product`,
                    add_product: {
                        type: `POST`,
                        url: `${process.env.BASE_URL}/products`,
                        body: { name: "String", price: "Number" }
                    }
                });
            }
            else{
                res.status(404).json({
                    error: {
                        message: `No product with the provided ID`
                    }
                });
            }
        })
    );
}