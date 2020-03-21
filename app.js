const express = require('express');
const router = express.Router();
const app = express();
const cookieParser = require('cookie-parser');

let index = require(__dirname+"/routes/index.js");
let schueler = require(__dirname+"/routes/schueler");
let lehrer = require(__dirname+"/routes/lehrer");

router.use("/",index)
router.use("/student",schueler)
router.use("/teacher",lehrer)


const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// fileupload
const fileUpload = require('express-fileupload');
app.use(fileUpload({
  createParentPath: true,
  safeFileNames: true,
  useTempFiles: true
}));

// const {initBucket} = require('./storage/gcsService');
// initBucket();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

const { uploadDocument } = require('./storage/gcsService');

app.put('/upload', function (req, res) {
  try {
    if (!req.files || !req.files.document) {
      res.status(400).send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      uploadDocument(req.files.document);
      res.send({
        status: true,
        message: 'File is uploaded',
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
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

app.listen(appPort, appHost, function () {
  console.log('Example app listening on port: ' + appPort);
}); 