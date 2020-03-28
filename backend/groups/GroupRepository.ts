import { Group } from './Group'
import { DatabaseService } from '../persistance/DatabaseService';

export class GroupRepository {

    private collectionName = 'groups';

    constructor(private databaseConnection: DatabaseService) { }

    async getGroupByName(name: string): Promise<Group | null> {
        const result = await this.databaseConnection.getCollectionEntries(this.collectionName, { name });
        if (result.length >= 1) {
            return result[0];
        }
        return null;
    }

    async getAll(): Promise<Group[] | null> {
        return this.databaseConnection.getAllCollectionEntries(this.collectionName);
    }

    async addGroup(group: Group): Promise<Group> {
        return this.databaseConnection.addObject(this.collectionName, group);
    }

    async updateGroup(group: Group): Promise<void> {
        await this.databaseConnection.updateCollectionEntry(this.collectionName, { name: group.name }, group);
    }

    async checkGroupExists(group: Group): Promise<boolean> {
        const result = await this.databaseConnection.getCollectionEntries(this.collectionName, { name: group.name });
        return result.length >= 1;
    }
}
