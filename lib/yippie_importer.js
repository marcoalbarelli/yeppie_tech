var EAN = require('../model/EAN')
    ;

module.exports = {
    setup: function (url, request) {
        return request(url);
    },
    populateEANfields: function (record, newEAN) {
        for (var currentColumnIndex = 0; currentColumnIndex < record.$markup.length; currentColumnIndex++) {
            var currentColumn = record.$markup[currentColumnIndex];
            if (currentColumn.$attrs != undefined && currentColumn.$markup.length > 0) {
                switch (currentColumn.$attrs.name) {
                    case 'ean':
                        console.log('Found EAN ' + currentColumn.$markup[0]);
                        newEAN.myean = currentColumn.$markup[0];
                        break;
                    case 'price':
                        console.log('Found Price ' + currentColumn.$markup[0]);
                        newEAN.price = parseFloat(currentColumn.$markup[0].replace(',', '.'));
                        break;
                    default:
                        break;
                }
            }
        }
    },
    insertOrUpdateEAN: function (newEAN) {
        return EAN.findOne({myean: newEAN.myean}, function (err, oldEan) {
            if (oldEan == null) {
                newEAN.save(function (err, p, num) {
                    if (err) {
                        console.log(err);
                    }
                });
                console.log("need to insert ++++++++++++++++++++++++++++++++++++++++");
            } else if (oldEan.mustBeReplacedBy(newEAN)) {
                console.log("Found with a lower price for EAN " + oldEan.myean);
                console.log("From " + oldEan.price + " to " + newEAN.price);
                var upsertData = newEAN.toObject();
                delete upsertData._id;

                EAN.findOneAndUpdate({myean: newEAN.myean}, upsertData, {upsert: true}, function (err, updatedEAN) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Replaced ***************************************");
                    }
                });
            } else {
                console.log("keep it steady ==========================================");
            }
        });
    }

};