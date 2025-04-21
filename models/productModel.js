const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },

    priceGoc: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: false,
        min: 0,
        max: 100
    }
}, { timestamps: true });
module.exports = mongoose.model('Product', productSchema)