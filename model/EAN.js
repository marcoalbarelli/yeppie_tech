var mongoose = require('mongoose'),
    config = require('../config.json'),
    utils = require('../lib/utils')
    ;

mongoose.connect(utils.getMongoConnectionString(config));



var product = mongoose.Schema({
    ean: String,
    _ean: String,
    URL: String,
    title: String,
    description: String,
    price: Number,
    shipping_price: Number
});

product.index({_ean:1},{unique:true});

product.methods.mustBeReplacedBy =function(otherean){
    return this.price > otherean.price;
};

module.exports = mongoose.model('ean',product);
