import { Entity } from '../types/Entity';

export interface DatabaseService {
  open: () => Promise<void>;
  close: () => Promise<void>;
  addObject: (
    collectionName: string,
    objectToInsert: Entity
  ) => Promise<Entity>;
  getCollectionEntries: (
    collectionName: string,
    query: { [key: string]: string | string[] | boolean | number }
  ) => Promise<Entity[]>;
  getAllCollectionEntries: (collectionName: string) => Promise<Entity[]>;
  deleteCollectionEntry: (
    collectionName: string,
    query: { [key: string]: string | string[] | boolean | number }
  ) => Promise<void>;
  updateCollectionEntry: (
    collectionName: string,
    query: { [key: string]: string | string[] | boolean | number },
    objectToUpdate: Entity
  ) => Promise<void>;
}
