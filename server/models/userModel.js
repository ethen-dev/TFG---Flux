const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email Field must be filled'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password Field must be filled'],
        select: false
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;