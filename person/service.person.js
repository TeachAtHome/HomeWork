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

    async addPerson(firstname, lastname, email) {
        const persons = await this.personRepository.findPerson(firstname, lastname, email);
        if (persons == null) {
            const person = new Person(firstname, lastname, email);
            console.log('PersonService|addPerson|Person: ' + person.toString());
            console.log('PersonService|addPerson|callRepository');
            return await this.personRepository.addPerson(person);
        } 
        console.log('PersonService|addPerson|throwError');
        throw "Person is already existing"
    }
}

module.exports = PersonService;