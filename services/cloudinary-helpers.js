const config = require('cloudinary');
const uploader = require('cloudinary');
const multer = require('multer');
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');

const cloudinaryConfig = () => config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});






module.exports = {
    cloudinaryConfig,
    uploader,
    multerUploads
}