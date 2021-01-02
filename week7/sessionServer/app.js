const express =require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session)
const app = express();

const SECRET = "NAMS";
//load middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({
    store: new FileStore(),
    secret: SECRET,
    resave: false,
    saveUninitialized:true,
    cookie: {
        maxAge: 1000 * 60,
        secure: false,
        httpOnly: true,
    }
}));

app.use('/auth', require('./routes/auth.router'));
app.use('/users', require('./routes/users.router'));
app.use((req,res, next)=>{
    res.status(404).json({success:false,message:'없는 경로'});
})
app.use((err,req,res,next)=>{
    res.status(500).json({success:false, message:'error'});
});
app.listen(9000,err=>{
    if(err) console.error(err.message);
    else console.log('server start');
})