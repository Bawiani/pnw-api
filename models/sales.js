const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    sales: [
        {
            type:Schema.Types.ObjectId,
            ref:'Sales',
        },
    ],
});

const salesSchema = new mongoose.Schema({
    date:{
        type:Date,
        required:true
    },
    item:{
        type:Schema.Types.ObjectId,
        ref:'Item',
        required: true,
    },
    quantity:{
        type:Number,
        required:true
    },
    amount:{
        type:Number,
        required:true
    }
});

// Clean up all sales associated with item
// after deleting an item
itemSchema.post("remove", function (next) {
    Sales.remove({ item: this._id }).exec();
    next();
  });

salesSchema.post("save", async function (doc, next) {
    // Add sales ID to item products
    const item = await Item.findById(doc.item);
    item.sales.push(doc._id);
    await item.save();
    
    // const items = await Item.findById(doc.item_id).populate("products");
    // console.log(items);
    next();
  });

const Item = mongoose.model('Item', itemSchema);
const Sales = mongoose.model('Sales', salesSchema);

module.exports = { Item, Sales };

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const itemSchema = new mongoose.Schema({
//     item_no:{
//         type:String,
//         required:true
//     },
//     description:{
//         type:String,
//         required:true
//     },
//     slug: {
//         type: String,
//         required: true,
//         unique: true,
//       },
//     unit_price:{
//         type:String,
//         required:true
//     },
//     sales: [
//         {
//             type:Schema.Types.ObjectId,
//             ref:'Sales',
//         },
//     ],
// });

// const salesSchema = new mongoose.Schema({
//     // customer_id:{
//     //     type:mongoose.Schema.Types.ObjectId,
//     //     ref:'Customer'
//     // },
//     // order_id:{
//     //     type:mongoose.Schema.Types.ObjectId,
//     //     ref:'Order'
//     // },
//     date:{
//         type:Date,
//         required:true
//     },
//     item:{
//         type:Schema.Types.ObjectId,
//         ref:'Item',
//         required: true
//     },
//     quantity:{
//         type:Number,
//         required:true
//     },
//     Amount:{
//         type:Number,
//         required:true
//     }
// });

// // Clean up all sales associated with item
// // after deleting an item
// itemSchema.post("remove", function (next) {
//     Sales.remove({ item: this._id }).exec();
//     next();
//   });

// salesSchema.post("save", async function (doc, next) {
//     // Add sales ID to item products
//     const item = await Item.findById(doc.item);
//     item.sales.push(doc._id);
//     await item.save();
    
//     // const items = await Item.findById(doc.item_id).populate("products");
//     // console.log(items);
//     next();
//   });

// const Item = mongoose.model('Item', itemSchema);
// const Sales = mongoose.model('Sales', salesSchema);

// module.exports = { Item, Sales };