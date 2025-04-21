const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    nameBlog: {
        type: String,
        required: true
    },
    imageBlog: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);