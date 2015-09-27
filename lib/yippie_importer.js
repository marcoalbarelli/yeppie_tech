var EAN = require('../model/EAN')
    ;

module.exports = {
    setup: function (url, request) {
        return request(url);
    },
    populateEANfields: function (record, newEAN, counter) {
        for (var currentColumnIndex = 0; currentColumnIndex < record.$markup.length; currentColumnIndex++) {
            var currentColumn = record.$markup[currentColumnIndex];
            if (currentColumn.$attrs != undefined && currentColumn.$markup.length > 0) {
                switch (currentColumn.$attrs.name) {
                    case 'ean':
                        newEAN.ean = currentColumn.$markup[0];
                        newEAN._ean = newEAN.ean;
                        counter[currentColumn.$markup[0]] >= 0 ? counter[currentColumn.$markup[0]]++ : counter[currentColumn.$markup[0]]=0;
                        break;
                    case 'url':
                        newEAN.URL = currentColumn.$markup[0];
                        break;
                    case 'title':
                        newEAN.title = currentColumn.$markup[0];
                        break;
                    case 'description':
                        newEAN.description = currentColumn.$markup[0];
                        break;
                    case 'price_shipping':
                        newEAN.url = parseFloat(currentColumn.$markup[0].replace(',', '.'));
                        break;
                    case 'price':
                        newEAN.price = parseFloat(currentColumn.$markup[0].replace(',', '.'));
                        break;
                    default:
                        break;
                }
            }
        }
    },
    insertOrUpdateEAN: function (newEAN) {
        return EAN.findOne({_ean: newEAN._ean}, function (err, oldEan) {
            if (oldEan == null) {
                newEAN.save(function (err, p, num) {
                    if (err) {
                        //race lost
                        console.log(err);
                    }
                });
                //console.log("need to insert ++++++++++++++++++++++++++++++++++++++++");
            } else if (oldEan.mustBeReplacedBy(newEAN)) {
                console.log("Found a lower price for EAN " + oldEan.ean);
                console.log("From " + oldEan.price + " to " + newEAN.price);
                var upsertData = newEAN.toObject();
                delete upsertData._id;

                EAN.findOneAndUpdate({_ean: newEAN._ean}, upsertData, {upsert: true}, function (err, updatedEAN) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Replaced ean "+newEAN._ean);
                    }
                });
            } else {
                //console.log("keep it steady ==========================================");
            }
        });
    }

};