//const Item = require("../models/item");
const { Item, Product, Sales } = require('../models/product');
const slug = require("slug");

//Add New Item Controller
exports.addItem =  async(req, res)=>{
    const nameSlug = slug(req.body.description);
    let duplicateItem = await Item.findOne({item_no: req.body.item_no});
    if(duplicateItem){
        return res.status(422).json({message: "Item with similar item number already exists"});
    }
        
        const { item_no, description, unit_price } = req.body;
        const item = new Item({
            item_no,
            description,
            unit_price,
            slug: nameSlug
        })
    try {
            await item.save().then((result)=>{
                res.status(200).json({data: result});
            }).catch((err)=>{
                res.status(500).json({message: "Item not saved!"});
            })
        
    } catch (e) {
        res.status(500).json({message: "Something weng wrong"});
    }
};

//Get Items Controller
exports.items = async(req, res)=>{
    try {
        const items = await Item.find();
        await res.status(200).json(items);
    } catch (e) {
        await res.status(500).json(e);
    }
}

//Get Item by ID Controller
exports.findItem = async(req, res)=>{
    try {
        const item = await Item.findById(req.params.id);
        const products= await Product.find({item: item._id});
        const sales= await Sales.find({item: item._id});
        let sumProductQnty= products.reduce((acc, curr)=> acc += curr.quantity, 0);
        let sumSalesQnty= sales.reduce((acc, curr)=> acc += curr.quantity, 0);
        let sumOfQnty = sumProductQnty - sumSalesQnty;
        //console.log(sumOfQnty);
        await res.status(200).json({
            data:{
                item,
                sumOfQnty
            }
        });
    } catch (e) {
        await res.status(500).json({message: "Something went wrong"});
    }
}

//Update Item Controller
exports.updateItem = async(req, res)=>{
    try {
        const item = await Item.findById(req.params.id);
        item.item_no = req.body.item_no,
        item.description = req.body.description,
        item.unit_price = req.body.unit_price
        await item.save().then((result)=>{
            res.status(200).json({
                message: "Item updated successfully",
                data: result})
        }).catch((err)=>{
            res.status(400).json({message: "Could not Update Item"});
        })
    } catch (e) {
        await res.status(500).json({message: "Something went wrong"});
    }
}

//Delete Item Controller
exports.deleteItem = async(req, res)=>{
    try {
        const item = await Item.findById(req.params.id);
        await item.remove();

        res.status(200).json(item);
    } catch (e) {
        await res.status(500).json({message: "Something went wrong"}); 
    }
}