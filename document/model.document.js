class Document {
    constructor(documentRefId, content, groups) {
        this.documentRefId = documentRefId;
        this.content = content;
        this.groups = groups;
    }
    toString() {
        return "[Document][documentRefId] = " + this.documentRefId + this.groups.join(',');
    }
}

module.exports = Document