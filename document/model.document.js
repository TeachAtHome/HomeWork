class Document {
    constructor(documentRefId, groups) {
        this.documentRefId = documentRefId;
        this.groups = groups;
    }
    toString() {
        return "[Document][documentRefId] = " + this.documentRefId + this.groups.join(',');
    }
}

module.exports = Document