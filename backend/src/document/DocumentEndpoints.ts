import { NextFunction, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

export class DocumentEndpoints {
  postLinkDocumentToGroups = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (!req.body.documentRefId || !req.body.groups) {
      throw new Error(
        "Invalid request: parameter 'documentRefId' or 'groups' is not set in body"
      );
    }
    const documentRefId = req.body.documentRefId;
    const groups = req.body.groups;
    try {
      for (const groupIdx in groups) {
        if (!(await req.services.groupService.getGroup(groups[groupIdx]))) {
          throw new Error(`Group '${groups[groupIdx]}' does not exist.`);
        }
      }
      await req.services.documentService.linkDocumentToGroups(
        documentRefId,
        groups
      );
      res.sendStatus(HttpStatus.CREATED);
    } catch (error) {
      console.log(error);
      next(error);
      res.status(HttpStatus.BAD_REQUEST).json({
        error
      });
    }
  };
  getDocument = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const documentRefId = req.params.documentRefId;
    try {
      const document = await req.services.documentService.getDocument(
        documentRefId
      );
      if (!document) {
        throw new Error(`Document with id '${documentRefId}' does not exist.`);
      }
      res.status(HttpStatus.OK).json(document);
    } catch (error) {
      console.log(error);
      next(error);
      res.status(HttpStatus.NOT_FOUND).json({
        error
      });
    }
  };
  getAllDocuments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const group = req.query.group;
    try {
      let documents;
      if (group) {
        documents = await req.services.documentService.getAllDocumentsByGroup(
          group
        );
      } else {
        documents = await req.services.documentService.getAllDocuments();
      }
      res.status(HttpStatus.OK).json(documents);
    } catch (error) {
      console.log(error);
      next(error);
      res.status(HttpStatus.NOT_FOUND).json({
        error
      });
    }
  };
  deleteDocument = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const documentRefId = req.params.documentRefId;
    try {
      await req.services.documentService.deleteDocument(documentRefId);
      if (document) {
        throw new Error(`Document with id '${documentRefId}' does not exist.`);
      }
      res.status(HttpStatus.OK).json(document);
    } catch (error) {
      console.log(error);
      next(error);
      res.status(HttpStatus.NOT_FOUND).json({
        error
      });
    }
  };
}
