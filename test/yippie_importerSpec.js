var request = require('request'),
    expect = require('expect.js'),
    sinon = require('sinon'),
    importer = require('../lib/yippie_importer'),
    utils = require('../lib/utils'),
    config = require('./test_config.json'),
    EAN = require('../model/EAN'),
    mongoose = require('mongoose')
    ;

describe('importer', function () {

    it('should call the passed url', function () {
        var expectedUrl = 'http://www.google.com';
        var spy = sinon.spy(request);
        importer.setup(expectedUrl, spy);
        expect(spy.callCount).to.equal(1);
        expect(spy.calledWith(expectedUrl)).to.be(true);
    });

    it('should return a valid Request ', function () {
        var req = importer.setup("http://www.google.com", request);
        expect(req).to.be.a(request.Request);
    });

    it('should throw an exception if no argument is passed when invoking', function () {
        expect(importer.setup).withArgs(null, request).to.throwException();
    });

    it('should throw an exception if the argument is not an url', function () {
        expect(importer.setup).withArgs("something else", request).to.throwException();
    });

    it('should not throw an exception if the argument an url', function () {
        expect(importer.setup).withArgs("http://www.adhocmobile.it", request).to.not.throwException();
    });
});

describe('utils', function () {
    it('should throw an exception if the config file is missing mandatory data', function () {
        var thrown = false;
        try {
            utils.getMongoConnectionString({});
        } catch (err) {
            thrown = true;
        }
        expect(thrown).to.be(true);
    });

    it('should return a properly formatted connection string if the config has all mandatory data', function () {
        var thrown = false;
        try {
            utils.getMongoConnectionString(config);
        } catch (err) {
            thrown = true;
        }
        expect(thrown).to.be(false);
    });

});

describe('importer mongodb related methods', function () {

    //before(function () {
    //    EAN.db.close();
    //    EAN.db = mongoose.connect(utils.getMongoConnectionString(config));
    //    EAN.remove({});
    //});
    //
    //it('should update EANs if db price is higher than scraped one', function () {
    //    var newEAN = new EAN();
    //    newEAN.myean = "AAAA";
    //    newEAN.price = 10.2;
    //    delete newEAN._id;
    //    importer.insertOrUpdateEAN(newEAN).then(function(insertEan){
    //        expect(insertEan.price).to.equal(10.2);
    //    }).then(function(a){
    //        newEAN = new EAN();
    //        newEAN.myean = "AAAA";
    //        newEAN.price = 10.1;
    //        delete newEAN._id;
    //        return importer.insertOrUpdateEAN(newEAN);
    //    }).then(function(newEAN){
    //        expect(newEAN.price).to.equal(10.1);
    //    });
    //});

    //it('should not update EANs if db price is lower or equal than scraped one', function () {

        //var newEAN = new EAN();
        //newEAN.myean = "AAAAB";
        //newEAN.price = 10.2;
        //importer.insertOrUpdateEAN(newEAN).then(function(a){
        //    expect(a.price).to.equal(10.2);
        //}).then(function(a){
        //    newEAN = new EAN();
        //    newEAN.myean = "AAAAB";
        //    newEAN.price = 10.3;
        //    delete newEAN._id;
        //    return importer.insertOrUpdateEAN(newEAN);
        //}).then(function(newEAN){
        //    expect(newEAN.price).to.equal(10.2);
        //});

    //});

    //it('should insert new EANs', function () {
    //
    //    clear db
    //    assert record count is 0
    //    insert one record with price 10.2
    //    assert record count is 1
    //});

    /**
     * TODO: kill the man that invented javascript promises
     */

});