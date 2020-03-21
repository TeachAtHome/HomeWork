var express = require('express');
var app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// fileupload
const fileUpload = require('express-fileupload');
app.use(fileUpload({
  createParentPath: true,
  safeFileNames: true,
  useTempFiles: true
}));

// const {initBucket} = require('./storage/gcsService');
// initBucket();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

const { uploadDocument } = require('./storage/gcsService');

app.put('/upload', function (req, res) {
  try {
    if (!req.files || !req.files.document) {
      res.status(400).send({
        status: false,
        message: 'No file uploaded'
      });
    } else {
      uploadDocument(req.files.document);
      res.send({
        status: true,
        message: 'File is uploaded',
        // data: {
        //   name: avatar.name,
        //   mimetype: avatar.mimetype,
        //   size: avatar.size
        // }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});