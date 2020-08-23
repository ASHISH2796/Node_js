const crypto = require('crypto');
const cloudinary = require('cloudinary');
cloudinary.config({
        cloud_name:'nodelearning',
        api_key:'116292735255581',
        api_secret:process.env.CLOUDINARY_SECRET
    });
const CloudinaryStorage = require('multer-storage-cloudinary');
console.log(CloudinaryStorage);
const storage = CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'surf-shop',
  allowedFormats: ['jpeg', 'jpg', 'png'],
  filename: function (req, file, cb) {
  	let buf = crypto.randomBytes(16);
  	buf = buf.toString('hex');
  	let uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png/ig, '');
  	uniqFileName += buf;
    cb(undefined, uniqFileName );
  }
});

module.exports = {
	cloudinary,
	storage
}