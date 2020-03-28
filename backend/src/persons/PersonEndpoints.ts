import { NextFunction, Request, Response } from 'express';
import {
  OK,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  CREATED,
  BAD_REQUEST
} from 'http-status-codes';

export class PersonEndpoints {
  getStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      let person;
      const id = req.params.id;
      if (id) {
        person = await req.services.personService.getPersonById(id);
      } else {
        const firstname = req.params.firstname;
        const lastname = req.params.lastname;
        const email = req.params.email;
        person = await req.services.personService.getStudent(
          firstname,
          lastname,
          email
        );
      }

      if (person) {
        res.status(OK).json(person);
      } else {
        res.sendStatus(NOT_FOUND);
      }
    } catch (error) {
      console.log(error);
      next(error);
      res.sendStatus(INTERNAL_SERVER_ERROR);
    }
  };
  getAllStudents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const persons = await req.services.personService.listAllStudents();
      if (persons) {
        res.status(OK).json(persons);
      } else {
        res.sendStatus(NOT_FOUND);
      }
    } catch (error) {
      console.log(error);
      next(error);
      res.sendStatus(INTERNAL_SERVER_ERROR);
    }
  };
  postStudent = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const sick = !!req.params.sick;

    try {
      const person = await req.services.personService.addStudent(
        firstname,
        lastname,
        email,
        sick
      );
      res.status(CREATED).json(person);
    } catch (error) {
      console.log(error);
      next(error);
      res.send(error).status(BAD_REQUEST);
    }
  };
}
