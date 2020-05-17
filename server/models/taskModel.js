const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    flowId: {
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
            message: () => `taskName is too small`
        }
    },
    description: {
        type: String,
        default: ''
    },
    comments: {
        type: Array,
        default: []
    },
    tags: {
        type: Array,
        default: []
    },
    priority: {
        type: Number,
        default: 0
    },
    sprintId: {
        type: String,
        default: '0'
    },
    assignedTo: {
        type: String,
        default: ''
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;