<<<<<<< HEAD
const express = require('express');
const app = express();

/* 
  Initialize Middleware
*/
const cors = require('cors');
=======
const express = require("express");
const router = express.Router();
const app = express();
const cookieParser = require("cookie-parser");
/*
let index = require(__dirname + "/routes/index.js");
let schueler = require(__dirname + "/routes/schueler");
let lehrer = require(__dirname + "/routes/lehrer");

router.use("/", index);
router.use("/student", schueler);
router.use("/teacher", lehrer);
*/
const cors = require("cors");
>>>>>>> Server Connection doesnt work
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

<<<<<<< HEAD
const fileUpload = require('express-fileupload');
app.use(fileUpload({
  createParentPath: true,
  safeFileNames: true,
  useTempFiles: true
}));

const cookieParser = require('cookie-parser');
app.use(cookieParser())

/* 
  Setup Service Injection
*/

// Person service
const PersonService = require('./person/service.person');
const PersonRepository = require('./person/repository.person');
const pReository = new PersonRepository();
const pService = new PersonService(pReository)

// Storage service
const StorageService = require('./storage/service.storage');
const sService = new StorageService();

// Collect injectable services
var services = {
  personService: pService,
  storageService: sService
};

// Inject Services
const addServicesToRequest = require('./middleware/service.dependencies.middleware');
const setupServiceDependencies = (server) => {
  const servicesMiddleware = addServicesToRequest(services)
  server.use(servicesMiddleware)
}
setupServiceDependencies(app);

/* 
  Configure API Endpoints
*/

const configureAPIEndpoints = (server) => {
  // Hello World
  server.get('/api/hello', (req, res) => { res.send('Hello World').status(418) })

  // Person
  const personRoutes = require('./person/route.person');
  server.get('/api/student/:id', personRoutes.getStudent);
  server.get('/api/student', personRoutes.getAllStudent);
  server.post('/api/student', personRoutes.postStudent);

  // Storage
  const storageRoutes = require('./storage/route.storage');
  app.put('/api/upload', storageRoutes.uploadDocument);
}
configureAPIEndpoints(app);

var appHost = '0.0.0.0';
var appPort = parseInt(process.argv[2]) || 8080;
=======
// fileupload
const fileUpload = require("express-fileupload");
app.use(
  fileUpload({
    createParentPath: true,
    safeFileNames: true,
    useTempFiles: true
  })
);

// const {initBucket} = require('./storage/gcsService');
// initBucket();

app.get("/api/hello/", function(req, res) {
  res.send("Hello World!");
});

app.post("/api/posttest", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});

const { uploadDocument } = require("./storage/gcsService");

app.put("/upload", function(req, res) {
  try {
    if (!req.files || !req.files.document) {
      res.status(400).send({
        status: false,
        message: "No file uploaded"
      });
    } else {
      uploadDocument(req.files.document);
      res.send({
        status: true,
        message: "File is uploaded"
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

var appHost = "0.0.0.0";
var appPort = parseInt(process.argv[2]);
>>>>>>> Server Connection doesnt work
var dbHost = process.argv[3];
var dbPort = parseInt(process.argv[4]);
var dbName = "homework";

const { MongoService } = require("./storage/mongoService");

async function testMongo() {
  const mongo = new MongoService(dbHost, dbPort, dbName);
  await mongo.open();
  const collectionName = "submissions";
  const idOfInsertion = await mongo.addObject(
    { testKey1: "testVal1", testKey2: "testVal2" },
    collectionName
  );
  const result = await mongo.getCollectionEntries(collectionName, {
    _id: idOfInsertion
  });
  console.log(result);
  const result2 = await mongo.getAllCollectionEntries(collectionName);
  console.log(result2);
  await mongo.close();
}

testMongo();
<<<<<<< HEAD
app.listen(appPort, appHost, function () {
  console.log('Example app listening on port: ' + appPort);
});
=======
app.listen(appPort, appHost, function() {
  console.log("Example app listening on port: " + appPort);
});
>>>>>>> Server Connection doesnt work
