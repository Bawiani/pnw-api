const { now } = require('mongoose');
const { Item, Product } = require('../models/product');
//const Item = require('../models/item');

//Add New Production Controller
exports.addproduct = async(req, res) => {
        
    const product = new Product({
        date : req.body.date,
        item : req.body.item_id,
        quantity : req.body.quantity
    })
    try {
        await product.save().then((doc)=>{
            
            Product.findById(doc._id).populate({
                path: "item",
                select: "item_no description",
                match: { _id: doc.item }})
             .exec(function (err, result){
                res.status(200).json({data: result});
            });
            
        }).catch((err)=>{
            res.status(500).json({message: "Item not saved!"});
        });
    
    } catch (e) {
        res.status(500).json({message: "Something weng wrong"});
    }
}

//Get Production Controller
exports.products = async(req, res) => {
    
    try {
            let date_ob = new Date();
            let day = (date_ob.getDate());
            let month = (date_ob.getMonth() + 1);
            let year = (date_ob.getFullYear());
            let date = day + '-' + month + '-' + year;

            const products = await Product.find({ date: date}).populate({
                path: 'item',
                select: 'item_no description'
            });
            await res.status(200).json({data: products});
        } catch (err) {
            res.status(500).json({message: "Something went wrong"});
        }
}

//Get Production Controller
exports.productsproduced = async(req, res) => {
    
    try {
            let date_ob = new Date();
            let day = (date_ob.getDate());
            let month = (date_ob.getMonth() + 1);
            let year = (date_ob.getFullYear());
            let date = day + '-' + month + '-' + year;

            const products = await Product.find().then((doc)=>{});
            console.log(products.date);
            // Product.find({ item: products.item }).populate({
            //     path: 'item',
            //     select: 'item_no description'
            // });
            // await res.status(200).json({data: products});
        } catch (err) {
            res.status(500).json({message: "Something went wrong"});
        }
}

//Get Production by ID Controller
exports.findproduct = async(req, res) => {
    
    try {
            const product = await Product.findById(req.params.id).populate({
            path: 'item',
            select: 'item_no description'
        });
        await res.status(200).json({data: product});
    } catch (err) {
        res.status(500).json({message: "Something went wrong"});
    }
}

//Update Production Controller
exports.updateproduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        product.date = req.body.date,
        product.item = req.body.item_id,
        product.quantity = req.body.quantity

        await product.save().then((doc)=>{
            Product.findById(doc._id).populate({
                path: "item",
                select: "item_no description",
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
exports.deleteproduct = async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id).populate({
            path: 'item',
            select: 'item_no description'
        });
        await res.status(200).json({data: product});
    } catch (err) {
        await res.status(500).json({message: "Something went wrong"});
    }
}