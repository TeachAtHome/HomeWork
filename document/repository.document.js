class DocumentRepository {

    constructor(db) {
        this.db = db;
        this.collectionName = 'documents';
    }

    async getDocumentById(documentRefId) {
        const result = await this.db.getCollectionEntries(this.collectionName, { documentRefId: documentRefId });
        if (result.length > 1) {
            console.log("Warning: Found multiple persons with the same id! " + id);
        }
        if (result.length >= 1) {
            const document = result[0];
            const groupReducer = (accumulator, currentValue) => {
                if (currentValue != 'documentRefId') {
                    accumulator.push(currentValue);
                    delete document[currentValue];
                }
                return accumulator;
            }
            delete document._id
            document.groups = Object.keys(document).reduce(groupReducer, []);
            return document;
        } else {
            return null;
        }
    }

    async getAllDocuments() {
        var documents = await this.db.getAllCollectionEntries(this.collectionName);
        documents = documents.map(document => {
            const groupReducer = (accumulator, currentValue) => {
                if (currentValue != 'documentRefId') {
                    accumulator.push(currentValue);
                    delete document[currentValue];
                }
                return accumulator;
            }
            delete document._id
            document.groups = Object.keys(document).reduce(groupReducer, []);
            return document;
        });
        return documents;
    }

    async addDocument(document) {
        for (const groupIdx in document.groups) {
            const groupName = document.groups[groupIdx];
            document[groupName] = true;
        }
        delete document.groups;
        await this.db.addObject(document, this.collectionName);
    }

    async deleteDocument(document) {
        await this.db.deleteCollectionEntry(this.collectionName, { id: document.id }, true);
    }

    async updateDocument(document) {
        for (const groupIdx in document.groups) {
            const groupName = document.groups[groupIdx];
            document[groupName] = true;
        }
        delete document.groups;
        await this.db.updateCollectionEntry(this.collectionName, { id: document.id }, document);
    }
}

module.exports = DocumentRepository;