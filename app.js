const express = require('express');
const app = express();

var appHost = '0.0.0.0';
var appPort = parseInt(process.argv[2]) || 8080;
var dbHost = process.argv[3];
var dbPort = parseInt(process.argv[4]);
var dbName = 'homework'

/*
  Configure db
*/

const MongoService = require('./storage/mongoService').MongoService;
const db = new MongoService(dbHost, dbPort, dbName);
db.open().catch(console.error);

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
app.use(cookieParser());

/* 
  Setup Service Injection
*/

// Person service
const PersonService = require('./person/service.person');
const PersonRepository = require('./person/repository.person');
const pRepository = new PersonRepository(db);
const pService = new PersonService(pRepository);

// Group service
const GroupService = require('./group/service.group');
const GroupRepository = require('./group/repository.group');
const gRepository = new GroupRepository(db);
const gService = new GroupService(gRepository);

// Storage service
const StorageService = require('./storage/service.storage');
const sService = new StorageService();

// Collect injectable services
var services = {
  personService: pService,
  groupService: gService,
  storageService: sService,
};

// Inject Services
const addServicesToRequest = require('./middleware/service.dependencies.middleware');
const setupServiceDependencies = (server) => {
  const servicesMiddleware = addServicesToRequest(services);
  server.use(servicesMiddleware);
}
setupServiceDependencies(app);

/* 
  Configure API Endpoints
*/

const configureAPIEndpoints = (server) => {
  // Hello World
  server.get('/api/hello', (req, res) => { res.send('Hello World').status(200) })
  server.post('/api/posttest', (req, res) => {
    console.log(req.body);
    res.send(
      `I received your POST request. This is what you sent me: ${req.body.post}`
    );
  });

  // Person
  const personRoutes = require('./person/route.person');
  server.get('/api/student/:id', personRoutes.getStudent);
  server.get('/api/student', personRoutes.getAllStudent);
  server.post('/api/student', personRoutes.postStudent);

  // Group
  const groupRoutes = require('./group/route.group');
  server.get('/api/group/:name', groupRoutes.getGroup); 
  server.get('/api/group', groupRoutes.getAllGroups);
  server.post('/api/group', groupRoutes.postGroup);

  // Storage
  const storageRoutes = require('./storage/route.storage');
  app.put('/api/upload', storageRoutes.uploadDocument);
}
configureAPIEndpoints(app);


app.listen(appPort, appHost, function () {
  console.log('Example app listening on port: ' + appPort);
  // todo: close mongo db connection
});
