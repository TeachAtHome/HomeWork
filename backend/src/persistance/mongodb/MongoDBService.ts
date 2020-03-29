import { MongoClient, Db, MongoClientOptions, ObjectID } from 'mongodb';
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
      console.log('Open db');
      const options: MongoClientOptions = { useUnifiedTopology: true };
      if (process.env.DBMOCK) {
        console.log('Using mocked mongo');
        const mongoClientMock = require('mongo-mock').MongoClient;
        MongoDBService.client = await mongoClientMock.connect(
          `mongodb://${this.databaseHost}:${this.databasePort}/${this.databaseName}`,
          options
        );
      } else {
        MongoDBService.client = await MongoClient.connect(
          `mongodb://${this.databaseHost}:${this.databasePort}/${this.databaseName}`,
          options
        );
      }
      this.database = MongoDBService.client.db(this.databaseName);
    } catch (error) {
      console.error(error);
    }
  }

  async close(): Promise<void> {
    try {
      console.log('Close db');
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
    return response.ops[0];
  }

  async getCollectionEntries(
    collectionName: string,
    // tslint:disable-next-line:no-any
    query: any
  ): Promise<Entity[]> {
    if (query['_id']) {
      query['_id'] = new ObjectID(query['_id'] as string);
    }
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
    // tslint:disable-next-line:no-any
    query: any
  ): Promise<void> {
    try {
      if (query['_id']) {
        query['_id'] = new ObjectID(query['_id'] as string);
      }
      await this.database.collection(collectionName).deleteOne(query);
    } catch (error) {
      console.error(error);
    }
  }

  async updateCollectionEntry(
    collectionName: string,
    // tslint:disable-next-line:no-any
    query: any,
    objectToUpdate: Entity
  ): Promise<void> {
    try {
      if (query['_id']) {
        query['_id'] = new ObjectID(query['_id'] as string);
      }
      await this.database
        .collection(collectionName)
        .updateOne(query, objectToUpdate);
    } catch (error) {
      console.error(error);
    }
  }
}
