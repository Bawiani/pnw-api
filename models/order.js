const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    order_id:{
        type:String,
        required:true
    },
    customer_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer'
    },
    item_no:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Item'
    },
    date:{
        type:Date,
        default:Date.now,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;