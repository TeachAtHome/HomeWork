const uuid = require('uuid');
const path = require('path');
const fs = require('fs').promises;

class StorageEndpoints {
    uploadDocument = async (req, res, next) => {
        try {
            if (!req.files || !req.files.document) {
                res.status(400).json({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {
                const documentName = uuid.v4().concat(path.extname(req.files.document.name));
                await req.services.storageService.uploadDocument(documentName, req.files.document.tempFilePath, req.files.document.minetype)
                res.status(201).json({
                    status: true,
                    message: 'File is uploaded',
                });
            }
        } catch (err) {
            res.status(500).send(err);
            next();
        }
    }
    storeDocument = async (req, res, next) => {
        try {
            if (!req.body.content) {
                res.status(400).json({
                    status: false,
                    message: 'No content uploaded'
                });
            } else {
                const documentRefId = req.body.documentRefId ? req.body.documentRefId : uuid.v4();
                const documentPath = await req.services.storageService.createTempFile(documentRefId, req.body.content);
                await req.services.storageService.uploadDocument(documentRefId, documentPath, 'application/json');
                res.status(201).json({
                    status: true,
                    message: 'Content is uploaded',
                    id: documentRefId
                });
            }
        } catch (err) {
            res.status(500).send(err);
            next();
        }
    }
    downloadDocument = async (req, res, next) => {
        try {
            if (!req.params || !req.params.documentRefId) {
                res.sendStatus(404);
            } else {
                const documentRefId = req.params.documentRefId;
                const documentPath = await req.services.storageService.downloadDocument(documentRefId);
                res.download(documentPath);
            }
        } catch (err) {
            res.status(500).send(err);
            next();
        }
    }

    getDocument = async (req, res, next) => {
        try {
            if (!req.params || !req.params.documentRefId) {
                res.sendStatus(400);
            } else {
                const documentRefId = req.params.documentRefId;
                const documentPath = await req.services.storageService.downloadDocument(documentRefId);
                const fileContent = await fs.readFile(documentPath);
                res.status(200).json({
                    content: fileContent.toString()
                });
            }
        } catch (err) {
            res.status(500).send(err);
            next();
        }
    }
}

module.exports = new StorageEndpoints();