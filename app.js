var request = require('request')
    , yippie_importer = require('./lib/yippie_importer')
    , domain = require('domain')
    , flow = require('xml-flow-cdata')
    , flowOptions = {preserveMarkup: flow.ALWAYS}
    , d = domain.create()
    ;

d.run(function() {

    if(process.argv.length != 3){
        throw new Error('you must provide an url as the only argument');
    }

    var url = process.argv[2]
        , inStream = yippie_importer.setup(url,request)
        , xmlStream = flow(inStream, flowOptions)
        ;
    xmlStream.on('tag:record', function (record) {
        for (currentColumnIndex = 0; currentColumnIndex < record.$markup.length; currentColumnIndex++) {
            var currentColumn = record.$markup[currentColumnIndex];
            if (currentColumn.$attrs != undefined && currentColumn.$attrs.name == 'ean' && currentColumn.$markup.length > 0) {
                console.log('Found EAN ' + currentColumn.$markup[0]);
            }
        }
    });
});

d.on('error',function(error){
    console.log('critical error catched ');
    console.log(error);
    //TODO: do something sensible
    /**
     * Errors to possibly catch:
     * ECONNREFUSED
     * ECONNRESET
     * unexpected End of stream
     * malformed xml?
     */
})