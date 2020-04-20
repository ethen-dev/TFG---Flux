const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (boardName) {
                return boardName.length > 3;
            },
            message: () => `boardName is too small`
        }
    },
    tags: {
        type: Array,
        default: []
    },
    hasFlows: {
        type: Boolean,
        default: false
    },
    isScrum: {
        type: Boolean,
        default: false
    }
});

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;