var request = require('request'),
    expect = require('expect.js'),
    sinon  = require('sinon'),
    importer = require('../lib/yippie_importer')
    ;

describe('importer',function(){

    it('should call the passed url',function(){
        var expectedUrl = 'http://www.google.com';
        var spy = sinon.spy(request);
        importer.setup(expectedUrl,spy);
        expect(spy.callCount).to.equal(1);
        expect(spy.calledWith(expectedUrl)).to.be(true);
    });

    it('should return a valid Request ',function(){
        var req = importer.setup("http://www.google.com",request);
        expect(req).to.be.a(request.Request);
    });

    it('should throw an exception if no argument is passed when invoking',function(){
        expect(importer.setup).withArgs(null,request).to.throwException();
    });

    it('should throw an exception if the argument is not an url',function(){
        expect(importer.setup).withArgs("something else",request).to.throwException();
    });

    it('should not throw an exception if the argument an url',function(){
        expect(importer.setup).withArgs("http://www.adhocmobile.it",request).to.not.throwException();
    });

});