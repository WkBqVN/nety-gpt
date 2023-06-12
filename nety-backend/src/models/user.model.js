const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    userId: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "must be provided userId"],
    },
  
})

module.exports = model('users', UserSchema)