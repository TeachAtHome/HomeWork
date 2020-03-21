const Person = require('./model.person');

class PersonService {
    constructor(personRepository) {
        this.personRepository = personRepository
    }

    getPerson(id) {
        console.log('PersonService|getPerson' + id);
        return this.personRepository.getPersonById(id);
    }

    listAllPersons() {
        console.log('PersonService|listAllPersons');
        return this.personRepository.getAll();
    }

    addPerson(id) {
        console.log('PersonService|addPerson' + id);
        if (!this.getPerson(id)) {
            const person = new Person(id);
            console.log('PersonService|addPerson|Person' + person.toString());
            console.log('PersonService|addPerson|callRepository');
            return this.personRepository.addPerson(person);
        }
        console.log('PersonService|addPerson|throwError');
        throw "Person is already existing"
    }
}

module.exports = PersonService;