class GroupEndpoints {
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
            // something could fail unexpectedly...
            // at some point the middleware chain should handle errors
            next(err)
        }
    }
    postGroup = async (req, res, next) => {
        try {
            var groupName = req.body.name;
            var studentIds = req.body.studentIds;
            try {
                await req.services.groupService.addGroup(groupName, studentIds);
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