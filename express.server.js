const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');
const fileUpload = require('express-fileupload');

const noCache = require('./middleware/service.nocache.middleware');
const addServicesToRequest = require('./middleware/service.dependencies.middleware');

/**
 * Abstraction around the raw Express.js server and Nodes' HTTP server.
 * Defines HTTP request mappings, basic as well as request-mapping-specific
 * middleware chains for application logic, config and everything else.
 */
class ExpressServer {
    constructor(requestServices, dbConnection) {
        this.requestServices = requestServices;
        this.dbConnection = dbConnection;
    }

    async setup(port) {
        const server = express()
        this.setupStandardMiddlewares(server)
        this.setupServiceDependencies(server)
        this.configureApiEndpoints(server)

        this.httpServer = this.listen(server, port)
        this.server = server
        return this.server
    }

    listen(server, port) {
        console.info(`Starting server on port ${port}`)
        return server.listen(port)
    }

    kill() {
        if (this.httpServer) this.httpServer.close()
    }

    setupStandardMiddlewares(server) {
        server.use(cors());
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({ extended: true }));
        server.use(cookieParser());
        server.use(compression());
        server.use(fileUpload({
            createParentPath: true,
            useTempFiles: true
        }));


    }

    setupServiceDependencies(server) {
        const servicesMiddleware = addServicesToRequest(this.requestServices);
        server.use(servicesMiddleware)
    }

    configureApiEndpoints(server) {

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
        server.get('/api/student/:id', noCache, personRoutes.getStudent);
        server.get('/api/student', noCache, personRoutes.getAllStudent);
        server.post('/api/student', noCache, personRoutes.postStudent);

        // Group
        const groupRoutes = require('./group/route.group');
        server.get('/api/group/:name', groupRoutes.getGroup);
        server.get('/api/group/:name/students', groupRoutes.getGroupStudents);
        server.get('/api/group', groupRoutes.getAllGroups);
        server.post('/api/group', groupRoutes.postGroup);

        // Document
        const documentRoutes = require('./document/route.document');
        server.post('/api/document', documentRoutes.postLinkDocumentToGroups);
        server.get('/api/document/:documentRefId', documentRoutes.getDocument);
        server.get('/api/document', documentRoutes.getAllDocuments);

        // Storage
        const storageRoutes = require('./storage/route.storage');
        server.put('/api/storage/upload', noCache, storageRoutes.uploadDocument);
        server.post('/api/storage/store', noCache, storageRoutes.storeDocument);
        server.get('/api/storage/download/:documentRefId', noCache, storageRoutes.downloadDocument);
        server.get('/api/storage/document/:documentRefId', noCache, storageRoutes.getDocument);

    }

}

module.exports = ExpressServer;