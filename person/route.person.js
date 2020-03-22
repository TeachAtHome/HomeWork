class PersonEndpoints {
    getStudent = async (req, res, next) => {
        try {
            const id = req.params.id
            const firstname = req.params.firstname
            const lastname = req.params.lastname
            const email = req.params.email
            const sick = req.params.sick
            const person = await req.services.personService.getStudent(id, firstname, lastname, email, sick)

            if (person) {
                res.json(person)
            } else {
                res.sendStatus(404)
            }
        } catch (err) {
            // something could fail unexpectedly...
            // at some point the middleware chain should handle errors
            next(err)
        }
    }
    getAllStudents = async (req, res, next) => {
        try {
            const persons = await req.services.personService.listAllStudents();
            if (persons) {
                res.json(persons)
            } else {
                res.sendStatus(404)
            }
        } catch (err) {
            // something could fail unexpectedly...
            // at some point the middleware chain should handle errors
            next(err)
        }
    }
    postStudent = async (req, res, next) => {
        try {
            const firstname = req.body.firstname;
            const lastname = req.body.lastname;
            const email = req.body.email;
            const sick = req.body.sick;

            try {
                const id = await req.services.personService.addStudent(firstname, lastname, email, sick);
                res.status(201).json({
                    id: id
                });
            } catch (error) {
                res.send(error).status(400);
            }
        } catch (err) {
            console.log(err);
            // something could fail unexpectedly...
            // at some point the middleware chain should handle errors
            next(err)
        }
    }
}

module.exports = new PersonEndpoints();
