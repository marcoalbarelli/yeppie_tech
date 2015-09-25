var mongoose = require('mongoose'),
    config = require('../config.json'),
    utils = require('../lib/utils')
    ;

mongoose.connect(utils.getMongoConnectionString(config));



var product = mongoose.Schema({
    myean: String,
    URL: String,
    title: String,
    description: String,
    price: Number,
    shipping_price: Number
});

product.index({myean:1});

product.methods.mustBeReplacedBy =function(otherean){
    return this.price > otherean.price;
};

module.exports = mongoose.model('ean',product);
