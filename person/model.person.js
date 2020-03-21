class Person {
    constructor(id) {
        this.id = id;
    }
    toString() {
        return "[PERSON][id]=" + this.id
    }
}

module.exports = Person