module.exports = { getMongoConnectionString: function (config) {
    if (!config.mongoDBHost || !config.mongoDBPort || !config.mongoDBDatabase) {
        throw new Error('wrong config parameters provided');
    }
    return "mongodb://" + config.mongoDBHost + ":" + config.mongoDBPort + "/" + config.mongoDBDatabase;
}};