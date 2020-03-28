export interface DatabaseService {
    open: () => Promise<void>;
    close: () => Promise<void>;
    addObject: (collectionName: string, objectToInsert: any) => Promise<any>;
    getCollectionEntries: (collectionName: string, query: any) => Promise<any[]>;
    getAllCollectionEntries: (collectionName: string) => Promise<any[]>;
    deleteCollectionEntry: (collectionName: string, query: any) => Promise<void>;
    updateCollectionEntry: (collectionName: string, query: any, objectToUpdate: any) => Promise<void>;
}