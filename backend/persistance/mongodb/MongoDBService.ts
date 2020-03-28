// var MongoClient;

// if (process.env.DBMOCK) {
//     console.log("Using mocked mongo");
//     MongoClient = require('mongo-mock').MongoClient;
//     MongoClient.persist = "mongo_mock.js";
// } else {
//     MongoClient = require('mongodb').MongoClient;
// }


import { MongoClient, Db, MongoClientOptions, FilterQuery } from "mongodb";
import { DatabaseService } from "../DatabaseService";

export class MongoDBService implements DatabaseService {

    private static client: MongoClient;
    private database!: Db;

    constructor(private database_host: string, private database_port: number, private database_name: string) {
    }

    public async open(): Promise<void> {
        try {
            console.log("open db");
            const options: MongoClientOptions = { useUnifiedTopology: true };
            MongoDBService.client = await MongoClient.connect(`mongodb://${this.database_host}:${this.database_port}/${this.database_name}`, options)
            this.database = MongoDBService.client.db(this.database_name);
        } catch (error) {
            console.error(error);
        }
    }

    public async close(): Promise<void> {
        try {
            console.log("close db");
            await MongoDBService.client.close();
        } catch (error) {
            console.error(error);
        }
    }

    public async addObject(collectionName: string, objectToInsert: any): Promise<any> {
        const response = await this.database.collection(collectionName).insertOne(objectToInsert);
        // select first entry, because we only insert one entry and the array consists of one object.
        // const id = response.ops[0];

        // return Promise.resolve(id);
        return response.ops[0];
    }

    public async getCollectionEntries(collectionName: string, query: FilterQuery<any>): Promise<any[]> {
        return await this.database.collection(collectionName).find(query).toArray();
    }

    public async getAllCollectionEntries(collectionName: string): Promise<any[]> {
        return await this.database.collection(collectionName).find().toArray();
    }

    public async deleteCollectionEntry(collectionName: string, query: FilterQuery<any>): Promise<void> {
        try {
            await this.database.collection(collectionName).deleteOne(query)
        } catch (error) {
            console.error(error);
        }
    }

    public async updateCollectionEntry(collectionName: string, query: FilterQuery<any>, objectToUpdate: any): Promise<void> {
        try {
            await this.database.collection(collectionName).updateOne(query, objectToUpdate)
        } catch (error) {
            console.error(error);
        }
    }
}