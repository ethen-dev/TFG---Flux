const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({path: './config.env'});


const db = process.env.MONGO_STRING
    .replace('<PASSWORD>', process.env.MONGO_PASSWORD)
    .replace('<NAME>', process.env.MONGO_DB_NAME);


mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(connection => {
    console.log('connected to mongo database succesfully');
})

// Start the server //
app.listen(process.env.PORT, () => {
    console.log('Running with express');
});