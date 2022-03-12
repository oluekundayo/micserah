const express = require('express');
const path = require('path')
const logger = require("morgan");
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require("express-session");
const Router = require('./routes')



const app = express();

app.use(logger('dev'))
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.json())
app.use(express.static(path.join(__dirname, 'upload')));
app.use(cors({origin: '*'}));

app.get('/', (req, res) => {
    res.send('Hello API')
})
  
Router(app);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true 
}))

app.use(bodyParser.json())

app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));


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



app.listen(0, () => console.log(''))