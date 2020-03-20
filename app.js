var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var appHost = '0.0.0.0';
var appPort = parseInt(process.argv[2]);
var dbHost = process.argv[3];
var dbPort = parseInt(process.argv[4]);
var dbName = 'homework'

var MongoClient = require('mongodb').MongoClient;
var client = new MongoClient(`mongodb://${dbHost}:${dbPort}`, { useUnifiedTopology: true });

client.connect(function(err, c) {
  if (err) throw err;

  objectToInsert = { arg1: 'val1', arg2: 'val2' };
  collectionName = 'submissions';

  var db = c.db(dbName);
  // Insert entry into mongo
  db.collection(collectionName).insertOne(objectToInsert, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  });

  // Find mongo entry
  db.collection(collectionName).find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
  });

});

console.log('Trying to establish a connection on port:' + appPort);

app.listen(appPort, appHost, function () {
  console.log('Example app listening on port: ' + appPort);
});