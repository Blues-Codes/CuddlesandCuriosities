const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const multer = require('multer')
const multerS3 = require('multer-s3')
const { S3Client } = require('@aws-sdk/client-s3')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });


  const storage = new CloudinaryStorage({
        cloudinary,
    params: {
        folder: 'Member photos', // The name of the folder in cloudinary
      resource_type: 'auto' 
    }
  });
  
 
  module.exports = multer({ storage });

//   const upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: 'some-bucket',
//       metadata: function (req, file, cb) {
//         cb(null, {fieldName: file.fieldname});
//       },
//       key: function (req, file, cb) {
//         cb(null, Date.now().toString())
//       }
//     })
//   })
  
//   app.post('/upload', upload.array('photos', 3), function(req, res, next) {
//     res.send('Successfully uploaded ' + req.files.length + ' files!')
//   })

//   module.exports = uploadImg;