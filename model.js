var mongoose = require('mongoose');
var Schemas = require('./schemas');
var config = require('./config');
module.exports = {
    //vendor model
    Bank: mongoose.model(config.modelBank, Schemas.bankSchema),
    //customer model
    Customer:mongoose.model(config.modelCustomers, Schemas.customerSchema),
    //item model
    Donor : mongoose.model(config.modelDonor, Schemas.donorSchema),
    //object model
   // Object :mongoose.model(config.modelObjects, Schemas.objectSchema),
    //order model
   // Order : mongoose.model(config.modelOrder, Schemas.orderSchema)
};