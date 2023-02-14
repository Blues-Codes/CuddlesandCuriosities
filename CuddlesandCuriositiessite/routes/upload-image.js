var express = require('express');
var router = express.Router();
const {uploadImg} = ('../config-cloudinary/cloudinary.config.js');
const multerS3 = require('multer-s3'); // streaming uploads
const { S3Client } = require('@aws-sdk/client-s3')//streaming uploads


router.post('/uploadimg', uploadImg.single("picture"), (req, res ) =>{
    if (!req.file) {
        return 
        res.status(400).json({msg:"uploadfail"})
    }
    return res.status(201).json({msg:req.file.path})
})

const s3 = new S3Client()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'some-bucket',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

app.post('/upload', upload.array('photos', 3), function(req, res, next) {
  res.send('Successfully uploaded ' + req.files.length + ' files!')
})
