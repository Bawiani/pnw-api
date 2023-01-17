const { Item, Sales, Customer } = require('../models/product');
// exports.addsales = async(req, res) => {
//     console.log("Thank you!");
// }

//Add New Sales Controller
exports.addsales = async(req, res) => {
    //const item = await Item.findById(req.body.item_id);
    //console.log(req.body.orderid);
    const sales = new Sales({
        customer_id: req.body.customerid,
        order_id: req.body.orderid,
        date : req.body.date,
        item : req.body.item_id,
        quantity: req.body.quantity,
        amount: req.body.amount,
        status: 'Pending'
    })
    await sales.save().then((doc) => {
        Sales.findById(doc._id).populate({
            path: "item",
            select: "item_no description unit_price",
            match: { _id: doc.item }})
         .exec(function (err, result){
            res.status(200).json({data: result});
        });
        
    }).catch((err)=>{
        res.status(500).json({message: "Item not saved!"});
    });
}

//Get Sales Controller
exports.sales = async(req, res) => {
    try {
            const sales = await Sales.find().populate({
                path: "item",
                select: "item_no description unit_price"
            });
        await res.status(200).json({data: sales});
        } catch (err) {
            res.status(500).json({message: "Something went wrong"});
        }
}

//Get Sales by ID Controller
exports.findsales = async(req, res) => {
   
    try {
        const sale = await Sales.findById(req.params.id);
        Sales.findById(req.params.id).populate({
            path: "item",
            select: "item_no description unit_price",
            match: { _id: sale.item }
        }).populate({
            path: "customer_id",
            select: "_id customer_id firstname lastname",
            match: { _id: sale.customer_id }
        }).exec(function (err, result){
            res.status(200).json({data: result});
        });
        //await res.status(200).json({data: product});
    } catch (err) {
        res.status(500).json({message: "Something went wrong"});
    }
}

//Get all sales with pending status
exports.findpendingsales = async(req, res) => {
    try {
        const sales = await Sales.find({$or: [{ status: 'Pending'}, { status: 'Ready' }]});
        Sales.find({$or: [{ status: 'Pending'}, { status: 'Ready' }]}).populate({
            path: "item",
            select: "item_no description unit_price",
            match: { _id: sales.item}
        }).populate({
            path: "customer_id",
            select: "_id customer_id firstname lastname",
            match: { _id: sales.customer_id}
        }).exec(function(err, result){
            res.status(200).json({data: result});
        })
    } catch (err) {
        await res.status(500).json({message: "Something went wrong"});
    }
}

//Update Sales Status(Ready) Controller
exports.readysales = async(req, res) => {
    try {
        const sales = await Sales.findById(req.params.id);
        sales.status = req.body.status

        await sales.save().then((doc) => {
            Sales.find({$or: [{ status: 'Pending' }, { status: 'Ready' }]}).populate({
                path: "item",
                select: "item_no description unit_price",
                match: { _id: doc.item}
            }).populate({
                path: "customer_id",
                select: "_id customer_id firstname lastname",
                match: { _id: doc.customer_id}
            }).exec(function(err, result){
                res.status(200).json({data: result});
            })
        }).catch((e)=>{
            res.status(400).json({message: "Could not update record"});
        });
    } catch (err) {
        await res.status(500).json({message: "Something went wrong"});
    }
}

//Update Sales Status(Delivery) Controller
exports.deliverysales = async(req, res) => {
    try {
        const sales = await Sales.findById(req.params.id);
        sales.status = req.body.status

        await sales.save().then((doc) => {
            Sales.find({$or: [{ status: 'Pending' }, { status: 'Ready' }]}).populate({
                path: "item",
                select: "item_no description unit_price",
                match: { _id: doc.item}
            }).populate({
                path: "customer_id",
                select: "_id customer_id firstname lastname",
                match: { _id: doc.customer_id}
            }).exec(function(err, result){
                res.status(200).json({data: result});
            })
        }).catch((e)=>{
            res.status(400).json({message: "Could not update record"});
        });
    } catch (err) {
        await res.status(500).json({message: "Something went wrong"});
    }
}

//Update Sales Controller
exports.updatesales = async(req, res) => {
    try {
        const sales = await Sales.findById(req.params.id);
        sales.customer_id = req.body.customerid,
        sales.date = req.body.date,
        sales.item = req.body.item_id,
        sales.quantity = req.body.quantity,
        sales.amount = req.body.amount

        await sales.save().then((doc) => {
            Sales.findById(doc._id).populate({
                path: "item",
                select: "item_no description unit_price",
                match: { _id: doc.item }})
             .exec(function (err, result){
                res.status(200).json({data: result});
            });
            // res.status(200).json({
            //     message: "Record updated successfully",
            //     data: result});
        }).catch((e)=>{
            res.status(400).json({message: "Could not update record"});
        });
    } catch (err) {
        await res.status(500).json({message: "Something went wrong"});
    }
}

//Delete Production Controller
exports.deletesales = async(req, res) => {
    try {
        const sales = await Sales.findByIdAndDelete(req.params.id).populate({
            path: 'item',
            select: 'item_no description unit_price'
        });
        await res.status(200).json({data: sales});
    } catch (err) {
        await res.status(500).json({message: "Something went wrong"});
    }
}