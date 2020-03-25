const mongoose = require(`mongoose`);

const OrderSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `Product`,
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model(`Order`, OrderSchema);