const { catchPromiseError } = require(`../handlers/errors`),
    Order = require(`../models/order`),
    Product = require(`../models/product`);

exports.fetchAllOrders = (req, res, next) => {
    catchPromiseError(
        next,
        Order.find({})
        .select(`product quantity _id`)
        .populate(`product`, `name price image`)
        .sort({ updatedAt: -1 })
        .then((orders) => {
            res.status(200).json({
                count: orders.length,
                orders: orders.map((orderObj) => {
                    return {
                        ...orderObj.toObject(),
                        find_order: {
                            method: `GET`,
                            url: `${process.env.BASE_URL}/orders/${orderObj._id}`
                        }
                    }
                })
            });
        })
    );
}

exports.createOrder = (req, res, next) => {
    catchPromiseError(
        next,
        Product.findById(req.body.product)
        .then((product) => {
            if(product){
                return Order.create(req.body)
            }
            else{
                res.status(404).json({
                    error: {
                        message: `No product with the provided ID`
                    }
                });
            }
        })
        .then((order) => {
            res.status(201).json({
                message: `Created new order`,
                order: {
                    _id: order._id,
                    product: order.product,
                    quantity: order.quantity,
                    find_order: {
                        method: `GET`,
                        url: `${process.env.BASE_URL}/orders/${order._id}`
                    }
                }
            });
        })
        
    );
}

exports.fetchOrderByOrderID = (req, res, next) => {
    const id = req.params.id;
    catchPromiseError(
        next,
        Order.findById(id)
        .populate(`product`, `name price`)
        .then((order) => {
            if(order){
                res.status(200).json({
                    order: {
                        _id: order._id,
                        product: order.product,
                        quantity: order.quantity,
                        find_order: {
                            method: `GET`,
                            url: `${process.env.BASE_URL}/orders/${order._id}`
                        }
                    }
                });
            }
            else{
                res.status(404).json({
                    error: {
                        message: `No order with the provided ID`
                    }
                });
            }
        })
    );
}

exports.deleteOrderByOrderID = (req, res, next) => {
    const id = req.params.id;
    catchPromiseError(
        next,
        Order.findByIdAndRemove(id)
        .then((result) => {
            if(result){
                res.status(200).json({
                    message: `Deleted order`,
                    add_order: {
                        type: `POST`,
                        url: `${process.env.BASE_URL}/orders`,
                        body: { product: "mongoose.Schema.Types.ObjectId", quantity: "Number" }
                    }
                });
            }
            else{
                res.status(404).json({
                    error: {
                        message: `No order with the provided ID`
                    }
                });
            }
        })
    );
}