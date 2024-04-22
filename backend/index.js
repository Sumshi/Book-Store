// starter file for our project using express, define routes and ports here
import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';

// import the book model
import { Book } from './models/bookModel.js';

// create an express app
const app = express();

// middleware to parse json data
app.use(express.json());


// define routes
app.get('/', (request, response) => {
    console.log('request');
    return response.status(234).send('Hello!, welcome home');
});


// route to save a new book
app.post('/books', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(500).send({ message: 'All fields are required' });
    }

    // create a new book
    const newBook = new Book({
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    });

    // save the book
    const book = await Book.create(newBook);
    return response.status(201).send(book);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// route to get All books from database
app.get('/books', async (request, response) => {
  try {
    // list all books from the database
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books
    });// return the books
    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
    
  }
});


// route to get one book from the database by id
app.get('/books/:id', async (request, response) => {
  try {
    // find a book by id
    const book = await Book.findById(request.params.id);
    return response.status(200).send(book);
    
    if (!book) {
      return response.status(404).send({ message: 'Book not found' });
    }
    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
    
  }
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
  serverSelectionTimeoutMS: 5000
}).then(() => {
  console.log('App connected to database');
  app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
  });
}).catch((error) => {
  console.log(error);
});