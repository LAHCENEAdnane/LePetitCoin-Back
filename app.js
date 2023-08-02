require('dotenv').config();
require('./models/connection')

let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let toiletRouter = require('./routes/toilet');
let reviewRouter = require('./routes/review');
let toiletsRouter = require('./routes/toilets')
const cors = require('cors');


let app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/toilet', toiletRouter);
app.use('/review', reviewRouter);
app.use('/toilets', toiletsRouter);

module.exports = app;
