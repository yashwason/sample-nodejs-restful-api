const multer = require(`multer`),
    Path = require(`path`);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./uploads/products`);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + Date.now() + Path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === `image/jpeg` || file.mimetype === `image/png`){
        cb(null, true)
    }
    else{
        cb(new Error(`Image format not supported`), false)
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

exports.upload = upload;