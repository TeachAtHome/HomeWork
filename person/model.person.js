class Person {
    constructor(_id, firstname, lastname, email, role) {
        this._id = _id;
        this.firstname = firstname;
        this.lastname = lastname
        this.email = email;
        this.role = role;
    }

    static ROLES = {
        TEACHER: 'teacher',
        STUDENT: 'student',
        PARENT: 'parent',
    }

    toString() {
        return '[PERSON][_id]='+_id+'[firstname]=' + this.firstname + '[lastname]=' + this.lastname + ', [email]=' + this.email + ', [role]=' + this.role;
    }
}

module.exports = Person