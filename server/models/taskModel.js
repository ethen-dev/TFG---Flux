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
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;