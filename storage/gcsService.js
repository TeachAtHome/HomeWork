const { Storage } = require('@google-cloud/storage');

const uploadDocument = (document) => {
    console.log(`UPLOAD ${document}`);

    // Creates a client
    const storage = new Storage({projectId: 'ninth-moment-271720', keyFilename: "key.json"});

    async function uploadFile(filename) {
        // Uploads a local file to the bucket
        await storage.bucket('teachathome-document-bucket').upload(filename, {
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

        console.log(`${filename} uploaded to ${bucketName}.`);
    }

    uploadFile(document.tempFilePath).catch(console.error);
};

exports.uploadDocument = uploadDocument;