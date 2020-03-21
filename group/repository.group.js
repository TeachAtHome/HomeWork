class GroupRepository {

    constructor(db) {
        this.db = db;
        this.collectionName = 'groups';
    }

    async getGroupByName(name) {
        console.log('GroupRepository|getGroupByName: ' + name);

        const result = await this.db.getCollectionEntries(this.collectionName, {name: name});
        if (result.length > 1) {
            console.log("Warning: Found multiple groups with the same name! " + id);
        }
        if (result.length >= 1) {
            return Promise.resolve(result[0]);
        } else {
            return null;
        }
    }

    async getAll() {
        console.log('GroupRepository|getAll');
        return await this.db.getAllCollectionEntries(this.collectionName);
    }

    async addGroup(group) {
        console.log('GroupRepository|addGroup: ' + JSON.stringify(group));
        return await this.db.addObject(group, this.collectionName);
    }
}

module.exports = GroupRepository;