class PersonRepository {

    personStore = [];

    getPersonById(id) {
        console.log('PersonRepository|getPersonById' + id);
        return this.personStore.find((p) => p.id === person.id);
    }

    getAll() {
        console.log('PersonRepository|getAll');
        return this.personStore;
    }

    addPerson(person) {
        console.log('PersonRepository|addPerson' + JSON.stringify(person));
        this.personStore.push(person);
        console.log('PersonRepository|addPerson' + JSON.stringify(this.personStore));
    }

    deletePerson(person) {
        console.log('PersonRepository|deletePerson' + JSON.stringify(person));
        const personIdx = this.personStore.findIndex((p) => p.id === person.id);
        if (personIdx >= 0)
            this.personStore.splice(personIdx);
    }

    updatePerson(person) {
        console.log('PersonRepository|updatePerson' + JSON.stringify(person));
        const personIdx = this.personStore.findIndex((p) => p.id === person.id);
        if (personIdx >= 0)
            this.personStore[personIdx] = person;
    }
}

module.exports = PersonRepository;