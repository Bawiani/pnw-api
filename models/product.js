const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const Item = require('../models/item');

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
            type:Schema.Types.ObjectId,
            ref:'Product',
        },
    ],
    sales: [
        {
            type:Schema.Types.ObjectId,
            ref:'Sales',
        },
    ],
});

const productSchema = new mongoose.Schema({
    date:{
        type: String,
        required: true
    },
    item:{
            type:Schema.Types.ObjectId,
            ref:'Item',
            required: true,
    },
    quantity:{
        type: Number,
        required: true
    }
});

const salesSchema = new mongoose.Schema({
    customer_id:{
        type:Schema.Types.ObjectId,
        ref:'Customer',
        required: true,
    },
    order_id:{
        type: String,
        required:true
    },
    date:{
        type: String,
        required:true
    },
    item:{
        type:Schema.Types.ObjectId,
        ref:'Item',
        required: true,
    },
    quantity:{
        type: Number,
        required:true
    },
    amount:{
        type: Number,
        required:true
    },
    status:{
        type: String,
        required: true
    }
});

const customerSchema = new mongoose.Schema({
    customer_id:{
        type: String,
        required: true,
        unique: true
    },
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    sales: [
        {
            type:Schema.Types.ObjectId,
            ref:'Sales',
        },
    ],
});

// Clean up all products and sales associated with item
// after deleting an item
itemSchema.post('remove', async function(doc, next) {
    
    // Remove all the docs that refers Item
    await Product.deleteMany({ item: doc._id });
    await Sales.deleteMany({ item: doc._id });
    next();
});

// itemSchema.post('save', async function(doc, next) {
//     console.log("Item saved", doc);
// })

productSchema.post("save", async function (doc, next) {
    
    // Add product ID to item products
    const item = await Item.findById(doc.item);
    item.products.push(doc._id);
    await item.save();
    
    // const items = await Item.findById(doc.item_id).populate("products");
    // console.log(items);
    next();
  });

//   productionSchema.pre("save", async function(next){
//     const item = await Item.find().populate("products");
//     console.log(item);
//         //this.item_no = {item_no : item.item_no}
//   });

// Clean up all sales associated with item
// after deleting an item
// itemSchema.post("remove", function (next) {
//     Sales.remove({ item: this._id }).exec();
//     next();
//   });

salesSchema.post("save", async function (doc, next) {
    // Add sales ID to item products
    const item = await Item.findById(doc.item);
    item.sales.push(doc._id);
    await item.save();

    // Add sales ID to customer
    // const customer = await Customer.findById(doc.customer_id);
    // customer.sales.push(doc._id);
    // await customer.save();
    
    next();
  });
  
salesSchema.post("save", async function (doc, next) {
    // Add sales ID to customer
    const customer = await Customer.findById(doc.customer_id);
    customer.sales.push(doc._id);
    await customer.save();
    
    // const items = await Item.findById(doc.item_id).populate("products");
    // console.log(items);
    next();
  });

const Item = mongoose.model('Item', itemSchema);
const Product = mongoose.model('Product', productSchema);
const Sales = mongoose.model('Sales', salesSchema);
const Customer = mongoose.model('Customer', customerSchema);

module.exports = { Item, Product, Sales, Customer };