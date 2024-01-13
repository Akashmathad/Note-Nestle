const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const AppError = require('./utils/appError');

const subjectRouter = require('./routes/subjectRoutes');

const app = express();

app.use(cors());
app.options('*', cors());

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(mongoSanitize());

app.use(xss());

app.use(compression());

app.use('/api/v1/note-nestle/subject', subjectRouter);

app.get('/', (req, res) => res.send('Hello World!'));

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
