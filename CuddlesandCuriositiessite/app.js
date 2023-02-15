var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer  = require('multer');
// const upload = multer({ dest: 'uploads/' });
const multerS3 = require('multer-s3'); // streaming uploads
const { S3Client } = require('@aws-sdk/client-s3')//streaming uploads

const session = require('express-session'); // declares session
const MongoStore = require('connect-mongo'); // declares mongostore 
const mongoose = require('mongoose')

const hbs = require('hbs')


var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var membersRouter = require('./routes/members');
var amigurumiRouter = require('./routes/amigurumi');
var clothingRouter = require('./routes/clothing');
 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");

//install sessions
app.set('trust proxy', 1);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//to use sessions
app.use(
  session({
    secret: process.env.SESS_SECRET, // sets secret passcode for sessions
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 12000000 // 60 * 1000 ms === 20 min
    },
    store: MongoStore.create({ // runs mongostore to keep cookie info on server
      mongoUrl: process.env.MONGODB_URI 

      // ttl => time to live
      // ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
    })
  })
);

// to use multer streaming uploads
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

//routers to use
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/members', membersRouter);
app.use('/amigurumi', amigurumiRouter);
app.use('/clothing', clothingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(x => {
    console.log(`Connected to Mongo database: "${x.connections[0].name}"`);
  })
  .catch(err => {
    console.log(`An error occurred while connecting to the Database: ${err}`);
  });

// potential video streaming? 

var http = require('http');
var fs = require('fs');
var mime = require('mime');
http.createServer(function(req,res){
    if (req.url != '/app.js') {
    var url = __dirname + req.url;
        fs.stat(url,function(err,stat){
            if (err) {
            res.writeHead(404,{'Content-Type':'text/html'});
            res.end('Your requested URI('+req.url+') wasn\'t found on our server');
            } else {
            var type = mime.getType(url);
            var fileSize = stat.size;
            var range = req.headers.range;
                if (range) {
                    var parts = range.replace(/bytes=/, "").split("-");
                var start = parseInt(parts[0], 10);
                    var end = parts[1] ? parseInt(parts[1], 10) : fileSize-1;
                    var chunksize = (end-start)+1;
                    var file = fs.createReadStream(url, {start, end});
                    var head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': type
                }
                    res.writeHead(206, head);
                    file.pipe(res);
                    } else {    
                    var head = {
                'Content-Length': fileSize,
                'Content-Type': type
                    }
                res.writeHead(200, head);
                fs.createReadStream(url).pipe(res);
                    }
            }
        });
    } else {
    res.writeHead(403,{'Content-Type':'text/html'});
    res.end('Sorry, access to that file is Forbidden');
    }
}).listen(8080);


module.exports = app;
