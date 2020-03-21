class StorageEndpoints {
    uploadDocument = async (req, res, next) => {
        try {
            if (!req.files || !req.files.document) {
                res.status(400).send({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {
                await req.services.storageService.uploadDocument(req.files.document)
                res.status(201).send({
                    status: true,
                    message: 'File is uploaded',
                });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = new StorageEndpoints();