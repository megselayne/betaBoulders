require('dotenv').config();
const path = require('path');
const config = require('cloudinary');
const uploader = require('cloudinary');
const multer = require('multer');
const Datauri = require('datauri');
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');
const dUri = new Datauri();
const DatauriParser = require("datauri/parser");
const parser = new DatauriParser();

const cloudinaryConfig = (req, res, next) => {
    config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    next();
}


const dataUri = req => {
    dUri.format(path.extname(req.file.originalname).toString(),
    req.file.buffer);
}


module.exports = {
    cloudinaryConfig,
    uploader,
    multerUploads,
    dataUri
}