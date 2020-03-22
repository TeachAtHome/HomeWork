class Group {
    constructor(name, personIds) {
        // name is used as unique identifier
        this.name = name;
        this.personIds = personIds;
    }
    toString() {
        return "[GROUP][name] = " + this.id + ", [memberIds] = " + this.personIds.join(', ');
    }
}

module.exports = Group