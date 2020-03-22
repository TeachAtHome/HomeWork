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
            return DocumentRepository.convertNoSqlToGroups(result[0]);
        } else {
            return null;
        }
    }

    async getAllDocuments() {
        var documents = await this.db.getAllCollectionEntries(this.collectionName);
        documents = documents.map(DocumentRepository.convertNoSqlToGroups);
        // const documentRefIds = documents.reduce((ids, document) => {
        //     ids.push(document.documentRefId);
        //     return ids;
        // }, []);
        // return documentRefIds;
        return documents;
    }

    async getAllDocumentsByGroup(group) {
        const query = {};
        query[group] = true;
        var documents = await this.db.getCollectionEntries(this.collectionName, query);
        documents = documents.map(DocumentRepository.convertNoSqlToGroups);
        // const documentRefIds = documents.reduce((ids, document) => {
        //     ids.push(document.documentRefId);
        //     return ids;
        // }, []);
        // return documentRefIds;
        return documents;
    }


    async addDocument(document) {
        document = DocumentRepository.convertGroupsToNoSql(document);
        await this.db.addObject(document, this.collectionName);
    }

    async deleteDocument(documentRefId) {
        await this.db.deleteCollectionEntry(this.collectionName, { documentRefId: documentRefId }, true);
    }

    async updateDocument(document) {
        document = DocumentRepository.convertGroupsToNoSql(document);
        await this.db.updateCollectionEntry(this.collectionName, { id: document.id }, document);
    }

    static convertNoSqlToGroups(document) {
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
    }

    static convertGroupsToNoSql(document){
        for (const groupIdx in document.groups) {
            const groupName = document.groups[groupIdx];
            document[groupName] = true;
        }
        delete document.groups;
        return document;
    }
}

module.exports = DocumentRepository;
