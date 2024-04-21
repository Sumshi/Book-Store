// starter file for our project using express, define routes and ports here
import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';

// create an express app
const app = express();

// define routes
app.get('/', (request, response) => {
    console.log('request');
    return response.status(234).send('Hello!, welcome home');
});


// connect to the database
// mongoose
//   .connect(mongoDBURL)
//   .then(() => {
//     console.log('App connected to database');
//     app.listen(PORT, () => {
//       console.log(`App is listening to port: ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
}).then(() => {
  console.log('App connected to database');
  app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
  });
}).catch((error) => {
  console.log(error);
});