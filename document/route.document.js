class DocumentEndpoints {
    postLinkDocumentToGroups = async (req, res, next) => {
        if(!req.body.documentRefId || !req.body.groups){
            throw "Invalid request: parameter 'documentRefId' or 'groups' is not set in body"
        }
        const documentRefId = req.body.documentRefId;
        const groups = req.body.groups;
        try {
            for (const groupIdx in groups) {
                if (!await req.services.groupService.getGroup(groups[groupIdx]))
                    throw `Group '${groups[groupIdx]}' does not exist.`
            }
            await req.services.documentService.linkDocumentToGroups(documentRefId, groups);
            res.sendStatus(201);
        } catch (error) {
            res.status(400).send(error);
            console.log(error);
            next(error)
        }
    }
    getDocument = async (req, res, next) => {
        const documentRefId = req.params.documentRefId;
        try {
            const document = await req.services.documentService.getDocument(documentRefId);
            if (!document)
                throw `Document with id '${documentRefId}' does not exist.`
            res.status(200).json(document);
        } catch (error) {
            res.status(404).send(error);
            console.log(error);
            next(error)
        }
    }
    getAllDocuments = async (req, res, next) => {
        const group = req.query.group;
        try {
            var documents;
            if(group) {
                documents = await req.services.documentService.getAllDocumentsByGroup(group);
            } else {
                documents = await req.services.documentService.getAllDocuments();
            }
            res.status(200).json(documents);
        } catch (error) {
            res.status(404).send(error);
            console.log(error);
            next(error)
        }
    }
    deleteDocument = async (req, res, next) => {
      const documentRefId = req.params.documentRefId;
      try {
          await req.services.documentService.deleteDocument(documentRefId);
          if (document)
              throw `Document with id '${documentRefId}' does not exist.`
          res.status(200).json(document);
      } catch (error) {
          res.status(404).send(error);
          console.log(error);
          next(error)
      }
    }
}

module.exports = new DocumentEndpoints();
