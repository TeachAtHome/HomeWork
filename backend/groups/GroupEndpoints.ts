import { NextFunction, Request, Response } from 'express'
import * as HttpStatus from 'http-status-codes'

export class GroupEndpoints {

    public getStudentsByGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const groupName = req.params.name;
            const group = await req.services.groupService.getGroup(groupName);
            const students = [];
            for (let i = 0; i < group.personIds.length; i++) {
                const student = await req.services.personService.getPersonById(group.personIds[i]);
                if (student)
                    students.push(student);
            }
            res.status(HttpStatus.OK).json({ name: group.name, students });
        } catch (error) {
            console.log(error);
            next(error);
            if (error == "Person does not exist") {
                res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            } else {
                res.sendStatus(HttpStatus.NOT_FOUND);
            }
        }
    }
    public getGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const groupName = req.params.name
            const group = await req.services.groupService.getGroup(groupName);
            res.status(HttpStatus.OK).json(group);
        } catch (error) {
            console.log(error);
            next(error);
            res.status(HttpStatus.NOT_FOUND).json({
                error
            });
        }
    }
    public getAllGroups = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const groups = await req.services.groupService.listAllGroups();
            res.status(HttpStatus.OK).json(groups)
        } catch (error) {
            console.log(error);
            next(error);
            res.status(HttpStatus.NOT_FOUND).json({
                error
            });
        }
    }
    public postTest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            console.log(req.body);
            res.sendStatus(HttpStatus.OK);
        } catch (error) {
            console.log(error);
            next(error);
            res.status(HttpStatus.NOT_FOUND).json({
                error
            });
        }
    }
    public postGroup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const groupName = req.body.name;
            const personIds = req.body.personIds;
            for (let i = 0; i < personIds.length; i++) {
                await req.services.personService.getPersonById(personIds[i]);
            }
            const group = await req.services.groupService.addGroup(groupName, personIds);
            res.status(HttpStatus.CREATED).json(group);
        } catch (error) {
            console.log(error);
            next(error);
            res.status(HttpStatus.BAD_REQUEST).json({
                error
            });
        }
    }
}
