const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const expirationDate = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

exports.createUser = (req, res) => {
    const {email, password, userName} = req.params;
    const newUser = new User({
        email,
        password,
        userName
    });

    const token = jwt.sign({id: newUser._id, email}, process.env.SECRET_KEY, {expiresIn: '90d'});

    res.cookie('tfg-jwt', token, {
        expires: expirationDate,
        httpOnly: true
    });

    newUser.save()
        .then(doc => {
            res
                .status(200)
                .json({
                    status: 'success',
                    message: 'User successfully created',
                    data: {
                        token,
                        email,
                        id: doc._id,
                        userName
                    }
                });
        })
        .catch(err => {
            res
                .status(400)
                .json({
                    status: 'fail',
                    message: err
                });
        });
};

exports.authUser = async (req, res) => {
    try {
        const user = await User.findOne({email: req.params.email, password: req.params.password});
        const {_id, email, userName} = user;
        const token = jwt.sign({id: _id, email}, process.env.SECRET_KEY, {expiresIn: '90d'});

        if (!user) {
            throw new Exception('User not found')
        }

        res.cookie('tfg-jwt', token, {
            expires: expirationDate,
            httpOnly: true
        });

        res
            .status(200)
            .json({
                status: 'success',
                message: `Successfully log in as ${email}`,
                auth: true,
                data: {
                    token,
                    _id,
                    email,
                    userName
                }
            });
    } catch (err) {
        res
            .status(401)
            .json({
                status: 'fail',
                message: err,
                auth: false
            });
    }
};

exports.authToken = async (req, res) => {
    try {
        const {token} = req.params;
        var decoded = jwt.verify(req.cookies[token], process.env.SECRET_KEY);
        
        const user = await User.findById(decoded.id);

        const { _id, email, userName} = user._doc;
        
        if (!user) {
            throw new Exception('User not found')
        }

        res
            .status(200)
            .json({
                status: 'success',
                message: `Successfully log in as ${email}`,
                auth: true,
                data: {
                    email,
                    id: _id,
                    userName
                }
            });
    } catch (err) {
        res
            .status(400)
            .json({
                status: 'fail',
                message: `Email or password incorrect`,
                auth: false
            });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.params;

        await User.findOneAndDelete({email, password});

        res
            .status(204)
            .json({
                status: 'success',
                message: 'User successfully deleted',
                data: null
            });
    } catch (err) {
        console.log(err)
        res
            .status(400)
            .json({
                status: 'fail',
                message: err
            });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await User.findByIdAndUpdate(userId, req.body, {
            new: true,
            runValidators: true
        });

        res
            .status(200)
            .json({
                status: 'success',
                message: 'User successfully updated',
                data: {
                    user
                }
            });
        
    } catch (err) {
        res
            .status(400)
            .json({
                status: 'fail',
                message: err
            });
    }
}

exports.logOut = async (req, res) => {
    try {
        const token = jwt.sign({}, process.env.SECRET_KEY, { expiresIn: '0' });

        res.cookie('tfg-jwt', token, {
            expires: expirationDate,
            httpOnly: true
        });

        console.log('logout')

        res
            .status(200)
            .json({
                status: 'success',
                message: `Successfully log out`,
            });
    } catch(err) {
        res
            .status(400)
            .json({
                status: 'fail',
                message: `Something fail on log out`
            });
    }
}

exports.getUsername = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const userName = user._doc.userName;

        res
            .status(200)
            .json({
                status: 'success',
                message: `Successfully get user name`,
                data: {
                    userName
                }
            });
    } catch (err) {
        res
            .status(400)
            .json({
                status: 'fail',
                message: `Something fail getting user name`
            });
    }


}
