import { GroupRepository } from './GroupRepository';
import { Group } from './Group';

export class GroupService {
  constructor(private groupRepository: GroupRepository) {}

  async listAllGroups(): Promise<Group[]> {
    const groups = await this.groupRepository.getAll();
    if (!groups) {
      throw new Error('No groups exist');
    }
    return groups;
  }

  async getGroup(name: string): Promise<Group> {
    const group = await this.groupRepository.getGroupByName(name);
    if (!group) {
      throw new Error('Group does not exist');
    }
    return group;
  }

  async addGroup(name: string, personIds: string[]): Promise<Group> {
    const group = { name, personIds };
    if (!(await this.groupRepository.checkGroupExists(group))) {
      return this.groupRepository.addGroup(group);
    }
    throw new Error('Group is already existing');
  }

  async updateGroup(name: string, personIds: string[]): Promise<void> {
    const group = { name, personIds };
    if (await this.groupRepository.checkGroupExists(group)) {
      await this.groupRepository.updateGroup(group);
    }
    throw new Error('Group is already existing');
  }
}
