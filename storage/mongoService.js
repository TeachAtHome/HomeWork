var MongoClient;

if (process.env.DBMOCK) {
    console.log("Using mocked mongo");
    MongoClient = require('mongo-mock').MongoClient;
    MongoClient.persist="mongo_mock.js";
} else {
    MongoClient = require('mongodb').MongoClient;
}
 

class MongoService {
    constructor(dbHost, dbPort, dbName) {
        this.dbHost = dbHost;
        this.dbPort = dbPort;
        this.dbName = dbName;
        this.db = null;
        this.client = null;
    }

    async open() {
        this.client = await MongoClient.connect(`mongodb://${this.dbHost}:${this.dbPort}/${this.dbName}`, { useUnifiedTopology: true })
            .catch(err => { console.log(err); });
        this.db = await this.client.db(this.dbName);
    }

    async close() {
        await this.client.close();
    }

    async addObject(objectToInsert, collectionName) {
        const response = await this.db.collection(collectionName).insertOne(objectToInsert);
        // select first entry, because we only insert one entry and the array consists of one object.
        const id = response.ops[0]._id;

        return Promise.resolve(id);
    }

    async getCollectionEntries(collectionName, query) {
        return await this.db.collection(collectionName).find(query).toArray();
    }

    async getAllCollectionEntries(collectionName) {
        return await this.db.collection(collectionName).find().toArray();
    }
}

exports.MongoService = MongoService;