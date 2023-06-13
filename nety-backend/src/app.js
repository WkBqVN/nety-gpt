const express = require('express');
const app = express();
const createError = require('http-errors');
const dbConnect = require('./db/initDB');
const userRouter = require('./routers/user.router');
const conversationRouter = require('./routers/conversation.router');
const cors = require('cors')

const errStatusCode = 500;
// init cors
app.use(cors())
//init database
dbConnect()
//init router
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', cors() ,userRouter);
app.use('/conversation', cors(), conversationRouter);


// app.get('/', (req, res, next) => {
//     return res.status(200).json({
//         message: 'Welcome my ecommerce platform',
//     })
// })
// //handle error
app.use((req, res, next) => {
    next(createError.NotFound('Router does not exits!'));
});
app.use((error, req, res, next) => {
    res.json({
        status: error.status || errStatusCode,
        message: error.message
    })
})


module.exports = app
