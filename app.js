var request = require('request')
    , yippie_importer = require('./lib/yippie_importer')
    , domain = require('domain')
    , flow = require('xml-flow-cdata')
    , flowOptions = {preserveMarkup: flow.ALWAYS}
    , d = domain.create()
    , EAN = require('./model/EAN')
    , url = process.argv[2]
    , inStream = yippie_importer.setup(url, request)
    , xmlStream = flow(inStream, flowOptions)
    ;

if (process.argv.length != 3) {
    throw new Error('you must provide an url as the only argument');
}

xmlStream.on('tag:record', function (record) {
    var newEAN = new EAN();
    yippie_importer.populateEANfields(record, newEAN);
    yippie_importer.insertOrUpdateEAN(newEAN);
});

xmlStream.on('end',function(){
    process.exit();
});

