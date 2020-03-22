const Document = require('./model.document');

class DocumentService {
    constructor(documentRepository) {
        this.documentRepository = documentRepository;
    }

    async linkDocumentToGroups(documentRefId, groups) {
        var document = await this.documentRepository.getDocumentById(documentRefId);
        if(!document) {
            document = new Document(documentRefId, groups);
            return await this.documentRepository.addDocument(document);
        }
        document.groups = document.groups.concat(groups);
        return await this.documentRepository.updateDocument(document);
    }

    async getDocument(documentRefId) {
        return await this.documentRepository.getDocumentById(documentRefId);
    }

    async getAllDocuments() {
        return await this.documentRepository.getAllDocuments();
    }
}

module.exports = DocumentService;