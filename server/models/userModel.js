const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email Field must be filled'],
        unique: true,
        validate: {
            validator: function (email) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email);
            },
            message: props => `${props.value} is not a valid email adress!`
        }
    },
    password: {
        type: String,
        required: [true, 'Password Field must be filled'],
        select: false,
        hide: true,
        validate: {
            validator: function (password) {
                return password.length > 5;
            },
            message: () => `Password is too small`
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;