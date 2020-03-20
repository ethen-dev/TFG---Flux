const mongoose = require('mongoose');

const flowSchema = new mongoose.Schema({
    boardId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    tasks: {
        type: Array,
        default: []
    }
});

const Flow = mongoose.model('Flow', flowSchema);

module.exports = Flow;