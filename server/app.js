const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const sanitizeMongo = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const userRouter = require('./routes/userRouter');
const boardRouter = require('./routes/boardRouter');
const flowRouter = require('./routes/flowRouter');
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000, //1h
    message: 'Too many request from this IP, try again in an hour.' 
});

// Middleware - Is executed between every request -> dont forget to use next() at the end

// Set secure HTTP headers
app.use(helmet())
// https://expressjs.com/en/resources/middleware/cors.html
app.use(cors());
// Reading JSON on body request
app.use(bodyParser.json({limit: '30kb'}));
app.use(cookieParser());
// Data sanitization against NoSQL query injection
app.use(sanitizeMongo());
// Data sanitization against XSS
app.use(xss());
// Prevent parameter polution -> Accept option {whiteList: [parameterName]}
app.use(hpp());
// Limit request from same ip
app.use('/api', limiter);
// Allow the use of cookies
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

// Mounting Routes
app.use('/api/user/create', userRouter)
app.use('/api/user/auth', userRouter)
app.use('/api/user/token', userRouter)
app.use('/api/user/delete', userRouter)
app.use('/api/board/create', boardRouter)
app.use('/api/board/update', boardRouter)
app.use('/api/board/getAll', boardRouter)
app.use('/api/board/delete', boardRouter)
app.use('/api/flow/create', flowRouter)
app.use('/api/flow/update', flowRouter)
app.use('/api/flow/getAll', flowRouter)
app.use('/api/flow/delete', flowRouter)

module.exports = app;

