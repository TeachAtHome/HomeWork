const express = require('express');
const app = express();

/* 
  Initialize Middleware
*/
const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
var dbHost = process.argv[3];
var dbPort = parseInt(process.argv[4]);
var dbName = 'homework'

var MongoClient = require('mongodb').MongoClient;
var client = new MongoClient(`mongodb://${dbHost}:${dbPort}`, { useUnifiedTopology: true });

client.connect(function (err, c) {
  if (err) throw err;

  objectToInsert = { arg1: 'val1', arg2: 'val2' };
  collectionName = 'submissions';

  var db = c.db(dbName);
  // Insert entry into mongo
  db.collection(collectionName).insertOne(objectToInsert, function (err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  });

  // Find mongo entry
  db.collection(collectionName).find().toArray(function (err, result) {
    if (err) throw err;
    console.log(result);
  });

});

app.listen(appPort, appHost, function () {
  console.log('Example app listening on port: ' + appPort);
});