export class DocumentNotFoundException {
  message = 'Document not found';
  constructor(documentRefId?: string) {
    if (documentRefId) {
      this.message =
        'Document with documentRefId ' + documentRefId + 'not found';
    }
  }
}
