class Person {
    constructor(id, name, email, sick) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.sick = sick;
    }
    toString() {
        return "[PERSON][id]=" + this.id + ", [name]=" + this.name + ', [email]=' + this.email + ', [sick]=' + this.sick;
    }
}

module.exports = Person
