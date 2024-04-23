// starter file for our project using express, define routes and ports here
import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';

// import the book model
import  booksRoute  from './routes/booksRoute.js'
import cors from 'cors';

// create an express app
const app = express();

// middleware to parse json data(request body)
app.use(express.json());

// Use CORS middleware
app.use(cors());

// // Use CORS middleware with specific options
// app.use(cors({
//   origin: 'http://localhost:5173', // Allow requests from this origin
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
//   allowedHeaders: ['Content-Type'], // Allow specific headers
// }));


// define routes
app.get('/', (request, response) => {
    console.log('request');
    return response.status(234).send('Hello!, welcome home');
});

// use middlewares in routes folder
app.use('/books', booksRoute);


mongoose.connect(mongoDBURL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
}).then(() => {
  console.log('App connected to database');
  app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
  });
}).catch((error) => {
  console.log(error);
});