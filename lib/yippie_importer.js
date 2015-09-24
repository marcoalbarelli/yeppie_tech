var request = require('request');

module.exports = {
    setup: function(url,request){
        return request(url);
    }
}