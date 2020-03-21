const { Storage } = require('@google-cloud/storage');

class StorageService {
    constructor() {
        this.storage = new Storage({ projectId: 'ninth-moment-271720', keyFilename: "key.json" });
    }

    async uploadDocument(document) {
        console.log('StorageService|uploadDocument');
        await this.storage.bucket('teachathome-document-bucket').upload(document.tempFilePath, {
            // Support for HTTP requests made with `Accept-Encoding: gzip`
            gzip: true,
            // By setting the option `destination`, you can change the name of the
            // object you are uploading to a bucket.
            metadata: {
                // Enable long-lived HTTP caching headers
                // Use only if the contents of the file will never change
                // (If the contents will change, use cacheControl: 'no-cache')
                cacheControl: 'public, max-age=31536000',
            },
        });
        console.log(`${document.tempFilePath} uploaded to teachathome-document-bucket.`);
    }

}

module.exports = StorageService;