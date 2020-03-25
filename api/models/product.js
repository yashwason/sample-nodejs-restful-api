const mongoose = require(`mongoose`);

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model(`Product`, ProductSchema);