const Person = require('./model.person');
const uuid = require('uuid');

class PersonService {
    constructor(personRepository) {
        this.personRepository = personRepository
    }

    async listAllPersons() {
        console.log('PersonService|listAllPersons');
        return await this.personRepository.getAll();
    }

    async addPerson(id, name, email, sick) {
        console.log('PersonService|addPerson: ' + id);
        if (await this.getPerson(id) == null) {
            const person = new Person(id, name, email, sick);
            console.log('PersonService|addPerson|Person: ' + person.toString());
            console.log('PersonService|addPerson|callRepository');
            return await this.personRepository.addPerson(person);
        }
        console.log('PersonService|addPerson|throwError');
        throw "Person is already existing"
    }

    async getStudent(id, firstname, lastname, email, sick) {
        const student = new Person(id, firstname, lastname, email, sick, Person.ROLES.STUDENT);
        return await this.personRepository.getPerson(student);
    }

    async addStudent(firstname, lastname, email, sick) {
        const student = new Person(uuid.v4(), firstname, lastname, email, sick, Person.ROLES.STUDENT);
        const personExists = await this.personRepository.checkPersonExists(student)
        if (!personExists) {
            return await this.personRepository.addPerson(student);
        }
        throw "Student is already existing"
    }

    async listAllStudents() {
        return await this.personRepository.getAllByRole(Person.ROLES.STUDENT);
    }
}

module.exports = PersonService;
