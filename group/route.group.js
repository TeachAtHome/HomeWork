class GroupEndpoints {
    getGroupStudents = async (req, res, next) => {
        try {
            const groupName = req.params.name
            const group = await req.services.groupService.getGroup(groupName);

            if (!group) {
                res.sendStatus(404)
            }

            const name = group.name;
            var students = [];
            for (var i = 0; i < group.personIds.length; i++) {
                const student = await req.services.personService.getPerson(group.personIds[i]);
                students.push(student);
            }

            res.json({name: name, students: students});
        } catch (err) {
            // something could fail unexpectedly...
            // at some point the middleware chain should handle errors
            next(err)
        }
    }
    getGroup = async (req, res, next) => {
        try {
            const groupName = req.params.name
            const group = await req.services.groupService.getGroup(groupName);

            if (group) {
                res.json(group)
            } else {
                res.sendStatus(404)
            }
        } catch (err) {
            // something could fail unexpectedly...
            // at some point the middleware chain should handle errors
            next(err)
        }
    }
    getAllGroups = async (req, res, next) => {
        try {
            const groups = await req.services.groupService.listAllGroups();
            if (groups) {
                res.json(groups)
            } else {
                res.sendStatus(404)
            }
        } catch (err) {
            console.log(err);
            // something could fail unexpectedly...
            // at some point the middleware chain should handle errors
            next(err)
        }
    }
    postTest = async (req, res, next) => {
        try {
            console.log(req.body);
            try {
                res.sendStatus(201);
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
    postGroup = async (req, res, next) => {
        try {
            var groupName = req.body.name;
            var personIds = req.body.personIds;
            try {
                await req.services.groupService.addGroup(groupName, personIds);
                res.sendStatus(201);
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

module.exports = new GroupEndpoints();