// starter file for our project using express, define routes and ports here
import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';

// import the book model
import { Book } from './models/bookModel.js';
import  booksRoute  from './routes/booksRoute.js'
 
// create an express app
const app = express();

// middleware to parse json data
app.use(express.json());


// define routes
app.get('/', (request, response) => {
    console.log('request');
    return response.status(234).send('Hello!, welcome home');
});

// use middlewares in routes folder
app.use('/books', booksRoute);


mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
}).then(() => {
  console.log('App connected to database');
  app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
  });
}).catch((error) => {
  console.log(error);
});