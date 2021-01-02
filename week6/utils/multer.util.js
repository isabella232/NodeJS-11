const multer = require("multer");

// multer setting
const multerOption ={
    storage : multer.diskStorage({
        destination:(req,file,cb)=>{
            console.log('dest');
            //...
            req.custom = 1;
            cb(null,'uploads/')
        },
        filename:(req,file,cb) => {
            console.log('filename');
            console.log(req.custom);
            //...
            cb(null,Date.now() +'-'+ file.originalname);
        },
    }),
    limits:{fileSize: 20 * 1024 * 1024}
};

const upload = multer(multerOption);
// const upload = multer({ dest: 'upload/' });

module.exports = {
    upload
}