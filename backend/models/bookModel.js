import mongoose from "mongoose";
// define the bookModel schema
const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        author: {
            type: String,
            required: true,
        },

        publishYear: {
            type: Number,
            required: true,
        },
    },

    {
        timestamps: true,// includes the time the book was created and updated
    }
);

// create a model from schema and export it
export const Book = mongoose.model('Book', bookSchema);