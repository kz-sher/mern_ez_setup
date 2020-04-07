const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './uploads'); // this is where the image will be stored
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname) // this is how the image file will be named
    }
});

const fileFilter = (req, file, cb) => {
    // Allowed ext
   const filetypes = /jpeg|jpg|png|gif/;
   // Check ext
    const extname =  filetypes.test(path.extname(file.originalname).toLowerCase());
   // Check mime
   const mimetype = filetypes.test(file.mimetype);
  
   if(mimetype && extname){
       return cb(null,true);
   } else {
       cb('Only .png, .jpg and .jpeg format allowed!');
   }
}

const MulterMiddleware = multer({storage, fileFilter, limits: {fileSize: 1024 * 1024 * 5 } }).single('image')

module.exports = MulterMiddleware;