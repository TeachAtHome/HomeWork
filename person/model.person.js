class Person {
    constructor(firstname, lastname, email) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
    }
    toString() {
        return "[PERSON][id]=" + this.firstname + this.lastname + this.email
    }
}

module.exports = Person