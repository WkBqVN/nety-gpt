const mongoose = require('mongoose');
require('dotenv').config();
const URL_DB = process.env.NETY_DB_URL;

const connectDB = () => {
    mongoose.connect(URL_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected mongoDB`))
    .catch(err => console.log(`Error connect DB ${err}`));

    mongoose.connection.on("connected", function () {
        console.log(`MongoDB connected with ${this.name} name` );
      });
    
    mongoose.connection.on("disconnected", function () {
        console.log(`MongoDB disconnected DBname ${this.name}`);
    });
}

module.exports = connectDB