const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    tags: {
        type: Array,
        default: []
    }
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;