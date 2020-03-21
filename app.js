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

const { MongoService } = require('./storage/mongoService');

async function testMongo() {
  const mongo =  new MongoService(dbHost, dbPort, dbName);
  await mongo.open();
  const collectionName = 'submissions';
  const idOfInsertion = await mongo.addObject({testKey1: 'testVal1', testKey2: 'testVal2'}, collectionName);
  const result = await mongo.getCollectionEntries(collectionName, { _id: idOfInsertion });
  console.log(result);
  const result2 = await mongo.getAllCollectionEntries(collectionName);
  console.log(result2);
  await mongo.close();
}

testMongo();
app.listen(appPort, appHost, function () {
  console.log('Example app listening on port: ' + appPort);
}); 