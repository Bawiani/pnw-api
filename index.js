const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const loginRoutes = require('./routes/loginRoutes');
const itemRoutes = require('./routes/itemRoutes');
const productRoutes = require('./routes/productRoutes');
const salesRoutes = require('./routes/salesRoutes');
const customerRoutes = require('./routes/customerRoutes');

require('dotenv').config();
const app = express();

require('./database/connect');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());



app.use(loginRoutes);
app.use(itemRoutes);
app.use(productRoutes);
app.use(salesRoutes);
app.use(customerRoutes);

app.use('/api', loginRoutes);

app.use('/', (req, res, next)=>{
    res.status(200).json({message: "PNW App is running"});
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, ()=>{
    console.log(`API Server is Running on Port ${PORT}`);
});