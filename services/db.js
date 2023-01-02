// server - mongoDB Integration

// 1 import mongoose
const mongoose = require('mongoose')

// 2 state connection string via mongoose
mongoose.connect('mongodb://localhost:27017/bankServer',{
    useNewUrlParser:true // avoide unwanted warnings
});

// define bank db model
const user=mongoose.model('user',
{
    // schema creation
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[] //array
});

// export collection

module.exports={
    user
}