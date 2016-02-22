/*
Init DB instance and load collection
*/


/*
ar mongodb = require('mongodb');

module.exports.init = function (callback) {
  var server = new mongodb.Server("127.0.0.1", 27017, {});
  new mongodb.Db('test', server, {w: 1}).open(function (error, client) {
    //export the client and maybe some collections as a shortcut
    module.exports.client = client;
    module.exports.myCollection = new mongodb.Collection(client, 'myCollection');
    callback(error);
  });
};
*/

var mongodb = require('mongodb');
/*var collection_options = {
  "capped":false,
  "autoIndexId":true,
  "validator":[
    {'firstname':{$type:"string"}}
  ]
}
*/

module.exports.init = function (callback) {
  var server = new mongodb.Server("127.0.0.1", 27017, {});
  new mongodb.Db('addressbook', server, {w: 1}).open(function (error, client) {
    //export the client and maybe some collections as a shortcut
    module.exports.client = client;
    module.exports.myObject = mongodb.ObjectID;
    module.exports.myCollection = client.collection("contacts");
    var index_params = {}
    client.collection('contacts').ensureIndex({"$**":"text"},{"name":"TextIndex"});
    callback(error);
  });
};