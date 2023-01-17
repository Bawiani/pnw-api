const mongoose = require('mongoose');
const Production = require('../models/production');

const itemSchema = new mongoose.Schema({
    item_no:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
      },
    unit_price:{
        type:String,
        required:true
    },
    products: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Production',
        },
    ],
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;