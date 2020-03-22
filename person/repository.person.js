const Person = require('./model.person');

class PersonRepository {

    constructor(db) {
        this.db = db;
        this.collectionName = 'persons';
    }

    async getPerson(person) {
        const query = PersonRepository.convertPersonToQuery(person);
        const result = await this.db.getCollectionEntries(this.collectionName, query);
        if (result.length > 1) {
            console.log("Warning: Found multiple persons!");
        }
        if (result.length >= 1) {
            return Promise.resolve(result[0]);
        } else {
            return null;
        }
    }

    async checkPersonExists(person) {
        const query = PersonRepository.convertPersonToQuery(person);
        const result = await this.db.getCollectionEntries(this.collectionName, query);
        return result.length >= 1;
    }

    async getAllByRole(role) {
        const query = {};
        query[role] = true;
        const persons = await this.db.getCollectionEntries(this.collectionName, query);
        for (const personIdx in persons) {
            persons[personIdx] = PersonRepository.convertNoSQLToPersonRoles(persons[personIdx]);
        }
        return persons;
    }

    async addPerson(person) {
        person = PersonRepository.convertPersonRolesToNoSQL(person);
        const result = await this.db.addObject(person, this.collectionName);
        return result.toString();
    }

    async deletePerson(person) {
        console.log('PersonRepository|deletePerson' + JSON.stringify(person));
        await this.db.deleteCollectionEntry(this.collectionName, { id: person.id }, true);
    }

    async updatePerson(person) {
        console.log('PersonRepository|updatePerson' + JSON.stringify(person));
        await this.db.updateCollectionEntry(this.collectionName, { id: person.id }, person);
    }

    static convertPersonRolesToNoSQL(person) {
        for (const role in Person.ROLES) {
            person[Person.ROLES[role]] = person.role === Person.ROLES[role]
        }
        delete person.role
        return person;
    }

    static convertNoSQLToPersonRoles(person) {
        for (const role in Person.ROLES) {
            if (person[Person.ROLES[role]])
                person.role = Person.ROLES[role]
            delete person[Person.ROLES[role]]
        }
        return person;
    }

    static convertPersonToQuery(person) {
        const query = {};
        const personProperties = Object.keys(person);
        for (const propIdx in personProperties) {
            const propertyKey = personProperties[propIdx];
            if (propertyKey === 'role') {
                for (const role in Person.ROLES) {
                    query[Person.ROLES[role]] = person[propertyKey] === Person.ROLES[role]
                }
            } else if (propertyKey !== '_id') {
                query[propertyKey] = person[propertyKey]
            }
        }
        return query;
    }
}

module.exports = PersonRepository;
