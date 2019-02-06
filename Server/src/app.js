import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import filter from 'content-filter';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes';
import { DB_CONFIG } from './config';


// Setup environment config
dotenv.config();

// Initiate the app
const app = express();

// Connect to the database
mongoose.connect(DB_CONFIG.uri, DB_CONFIG.options);
mongoose.Promise = global.Promise;

// Apply the middleware
app.use(filter());

app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy());
app.use(helmet.noSniff());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger('dev'));


app.use('/', routes);


// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ error: 'Something failed!' });
});

// app.use(rollbar.errorHandler());

// Setup the ip and port
app.set('port', process.env.APP_PORT || 8000);
app.set('ip', process.env.APP_IP || '127.0.0.1');

// Start the app
app.listen(app.get('port'), () => {
  /* eslint-disable no-console */
  console.log('***************************************************************');
  console.log(`Server started on ${Date(Date.now())}`);
  console.log(`Server is listening on port ${app.get('port')}`);
  console.log('***************************************************************');
});

module.exports = app;
