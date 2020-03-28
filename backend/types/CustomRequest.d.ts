/* tslint:disable no-namespace */
import 'express'
import { PersonService } from '../persons/PersonService'
import { GroupService } from '../groups/GroupService'
import { DocumentService } from "../document/DocumentService";

export interface RequestServices {
    personService: PersonService
    groupService: GroupService
    documentService: DocumentService
}

declare global {
    namespace Express {
        interface Request {
            services: RequestServices
        }
    }
}
