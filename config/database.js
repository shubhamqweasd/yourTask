if(process.env.OPENSHIFT_MONGODB_DB_URL){
 	mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + 'yourtask';
} else {
	mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + 'yourtask';
}
module.exports = {
    remoteUrl : '',
    localUrl: mongodb_connection_string
};