import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// route to save a new book
router.post('/', async (request, response) => {
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
router.get('/', async (request, response) => {
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
router.get('/:id', async (request, response) => {
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


// route to update a book in the database by id
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(500).send({ message: 'All fields are required' });
    }

    // find a book by id and update it
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).send({ message: 'Book not found' });
    } else {
      return response.status(200).send({ message: 'Book updated successfully' });
    }
    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Deleting a book in the database by its id
router.delete('/:id', async (request, response) => {
  try {
    // find a book by id and delete it
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send({ message: 'Book not found' });
    } else {
      return response.status(200).send({ message: 'Book deleted successfully' });
    }
    
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;