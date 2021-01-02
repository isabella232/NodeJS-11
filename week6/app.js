const express = require('express');
const app = express();
const morgan = require('morgan');
const multer = require('multer');

// application middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// multer setting
const multerOption ={
    storage : multer.diskStorage({
        destination:(req,file,cb)=>{
            console.log('dest');
            //...
            req.custom = 1;
            cb(null,'upload/')
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

// router
app.all('/', upload.single('my-file'), (req, res, next) => {
    //req.files
    res.json(req.file);
});

// port binding
app.listen(9000, () => {
  console.log('server start');
});