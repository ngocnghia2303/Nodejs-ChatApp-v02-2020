var mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { 
        type: String, 
        required: true,
        index: { unique: true } },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    repeat_password:{
        type: String,
        required:true,
    },
    location: {
        type: String,
    },
    phone: {
        type: String,
    },
    job: {
        type: String,
    },
    workplace: {
        type: String,
    },
    age: {
        type: Number,
    },
    favorite: {
        type: String,
    },
    yourself: {
        type: String,
    },
    security: {
        type: String,
    },
    income: {
        type: Number,
    },
    alone: {
        type: Boolean,
    },
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;