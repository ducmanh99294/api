const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    role: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema)