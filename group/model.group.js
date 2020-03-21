class Group {
    constructor(name, studentIds) {
        // name is used as unique identifier
        this.name = name;
        this.studentIds = studentIds;
    }
    toString() {
        return "[GROUP][name] = " + this.id + ", [students] = " + this.studentIds.join(', ');
    }
}

module.exports = Group