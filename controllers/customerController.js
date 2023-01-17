//const Customer = require('../models/customer');
const { Sales, Customer } = require('../models/product');
//Add new Customer
exports.addcustomer = async(req, res) => {
    const customer = new Customer({
        customer_id: req.body.customer_id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        contact: req.body.contact,
        address: req.body.address,
        // email: req.body.email,
        // password: req.body.password
    })
    try {
        await customer.save().then((result)=>{
            res.status(200).json({data: result});
        }).catch((err)=>{
            res.status(500).json({message: "Customer not saved!"});
        });
        
    } catch (e) {
        res.status(500).json({message: "Internal Server Error!"});
    }
}

//Get all Customers
exports.customers = async(req, res) => {
    try {
        const customers = await Customer.find();
        await res.status(200).json(customers);
    } catch (err) {
        await res.status(500).json({message: "Internal Server Error"});
    }
}

//Get Customer by ID
exports.findcustomer = async(req, res) => {
    // let searchCustomer = await Customer.findOne({customer_id: req.body.search});
    // console.log(searchCustomer);
    try {
        const customer = await Customer.findById(req.params.id);
        await res.status(200).json({data: customer});
    } catch (err) {
        await res.status(500).json({message: "Internal Server Error"});
    }
}

//Update Customer
exports.updatecustomer = async(req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        customer.customer_id = req.body.customer_id,
        customer.firstname = req.body.firstname,
        customer.lastname = req.body.lastname,
        customer.contact = req.body.contact,
        customer.address = req.body.address,
        customer.email = req.body.email,
        customer.password = req.body.password
        await customer.save().then((result)=>{
            res.status(200).json({
                message: "Customer updated successfully!",
                data: result
            })
        }).catch((err)=>{
            res.status(400).json({message: "Customer couldn't be updated!"});
        })
    } catch (err) {
        res.status(500).json({message: "Internal Server Error"});
    }
}

//Delete Customer
exports.deletecustomer = async(req, res) =>{
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        await res.status(200).json({data: customer});
    } catch (err) {
        await res.status(500).json({message: "Internal Server Error"});
    }
}
