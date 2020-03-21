class Person {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
    toString() {
        return "[PERSON][id]=" + this.id + ", [name]=" + this.name + ', [email]=' + this.email;
    }
}

module.exports = Person