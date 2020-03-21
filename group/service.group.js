const Group = require('./model.group');

class GroupService {
    constructor(groupRepository) {
        this.groupRepository = groupRepository
    }

    async listAllGroups() {
        console.log('GroupService|listAllGroups');
        return await this.groupRepository.getAll();
    }

    async getGroup(name) {
        console.log('GroupService|getGroup: ' + name);
        return await this.groupRepository.getGroupByName(name);
    }

    async addGroup(name, students) {
        console.log('GroupService|addGroup: ' + name);
        if (await this.getGroup(name) == null) {
            const group = new Group(name, students);
            console.log('GroupService|addGroup|Group: ' + group.toString());
            console.log('GroupService|addGroup|callRepository');
            return await this.groupRepository.addGroup(group);
        } 
        console.log('GroupService|addGroup|throwError');
        throw "Group is already existing"
    }
}

module.exports = GroupService;