const mongoose = require('mongoose');

const flowSchema = new mongoose.Schema({
    boardId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (name) {
                return name.length > 3;
            },
            message: () => `flowName is too small`
        }
    },
    tasks: {
        type: Array,
        default: []
    }
});

const Flow = mongoose.model('Flow', flowSchema);

module.exports = Flow;