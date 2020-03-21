const Person = require('./model.person');

class PersonService {
    constructor(personRepository) {
        this.personRepository = personRepository
    }

    async getPerson(id) {
        console.log('PersonService|getPerson: ' + id);
        return await this.personRepository.getPersonById(id);
    }

    async listAllPersons() {
        console.log('PersonService|listAllPersons');
        return await this.personRepository.getAll();
    }

    async addPerson(id, name, email) {
        console.log('PersonService|addPerson: ' + id);
        if (await this.getPerson(id) == null) {
            const person = new Person(id, name, email);
            console.log("start");
            console.log('PersonService|addPerson|Person: ' + person.toString());
            console.log('PersonService|addPerson|callRepository');
            return await this.personRepository.addPerson(person);
        } 
        console.log('PersonService|addPerson|throwError');
        throw "Person is already existing"
    }
}

module.exports = PersonService;