// var MongoClient;

// if (process.env.DBMOCK) {
//     console.log("Using mocked mongo");
//     MongoClient = require('mongo-mock').MongoClient;
//     MongoClient.persist = "mongo_mock.js";
// } else {
//     MongoClient = require('mongodb').MongoClient;
// }

import { MongoClient, Db, MongoClientOptions, FilterQuery } from 'mongodb';
import { DatabaseService } from '../DatabaseService';
import { Entity } from '../../types/Entity';

export class MongoDBService implements DatabaseService {
  private static client: MongoClient;
  private database!: Db;

  constructor(
    private databaseHost: string,
    private databasePort: number,
    private databaseName: string
  ) {}

  async open(): Promise<void> {
    try {
      console.log('open db');
      const options: MongoClientOptions = { useUnifiedTopology: true };
      MongoDBService.client = await MongoClient.connect(
        `mongodb://${this.databaseHost}:${this.databasePort}/${this.databaseName}`,
        options
      );
      this.database = MongoDBService.client.db(this.databaseName);
    } catch (error) {
      console.error(error);
    }
  }

  async close(): Promise<void> {
    try {
      console.log('close db');
      await MongoDBService.client.close();
    } catch (error) {
      console.error(error);
    }
  }

  async addObject(
    collectionName: string,
    objectToInsert: Entity
  ): Promise<Entity> {
    const response = await this.database
      .collection(collectionName)
      .insertOne(objectToInsert);
    // select first entry, because we only insert one entry and the array consists of one object.
    // const id = response.ops[0];

    // return Promise.resolve(id);
    return response.ops[0];
  }

  async getCollectionEntries(
    collectionName: string,
    query: { [key: string]: string | string[] | boolean | number }
  ): Promise<Entity[]> {
    return this.database
      .collection(collectionName)
      .find(query)
      .toArray();
  }

  async getAllCollectionEntries(collectionName: string): Promise<Entity[]> {
    return this.database
      .collection(collectionName)
      .find()
      .toArray();
  }

  async deleteCollectionEntry(
    collectionName: string,
    query: { [key: string]: string | string[] | boolean | number }
  ): Promise<void> {
    try {
      await this.database.collection(collectionName).deleteOne(query);
    } catch (error) {
      console.error(error);
    }
  }

  async updateCollectionEntry(
    collectionName: string,
    query: { [key: string]: string | string[] | boolean | number },
    objectToUpdate: Entity
  ): Promise<void> {
    try {
      await this.database
        .collection(collectionName)
        .updateOne(query, objectToUpdate);
    } catch (error) {
      console.error(error);
    }
  }
}
