class PersonRepository {

    constructor(db) {
        this.db = db;
        this.collectionName = 'persons';
    }

    async getPersonById(id) {
        console.log('PersonRepository|getPersonById' + id);

        const result = await this.db.getCollectionEntries(this.collectionName, {id: id});
        if (result.length > 1) {
            console.log("Warning: Found multiple persons with the same id! " + id);
        }
        if (result.length >= 1) {
            return Promise.resolve(result[0]);
        } else {
            return null;
        }
    }

    async getAll() {
        console.log('PersonRepository|getAll');
        return await this.db.getAllCollectionEntries(this.collectionName);
    }

    async addPerson(person) {
        console.log('PersonRepository|addPerson' + JSON.stringify(person));
        await this.db.addObject(person, this.collectionName);
    }

    async deletePerson(person) {
        console.log('PersonRepository|deletePerson' + JSON.stringify(person));
        await this.db.deleteCollectionEntry(this.collectionName, {id: person.id}, true);
    }

    async updatePerson(person) {
        console.log('PersonRepository|updatePerson' + JSON.stringify(person));
        await this.db.updateCollectionEntry(this.collectionName, {id: person.id}, person);
    }
}

module.exports = PersonRepository;
