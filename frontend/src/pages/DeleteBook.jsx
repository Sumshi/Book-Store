// this shows specific book details

import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'// for access URL parameters
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom' // it allows us to navigate to a different pages

const DeleteBook = () => {
  const [loading, setLoading] = useState(false); //no fetching data
  const { id } = useParams();// extracts id from the url parameters
  const navigate = useNavigate();// to navigate to the main route

const handleDeleteBook = () => {
  setLoading(true);// data is being fetched
  axios.delete(`https://book-store-brrd.onrender.com/books/${id}`)
  .then(() => {
    setLoading(false);
    navigate('/');
  })
  .catch(error => {
      setLoading(false);
      alert('Error in deleting a book');
      console.error(error);
    });
}; 
  
  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Delete a book</h1>
      {loading ? <Spinner /> : ''}
      
      <div className='flex flex-col items-center border-2 border-sky-200 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure you want to delete this book?</h3>
        <button className='p-4 bg-red-600 text-white m-8 w-full'
        onClick={handleDeleteBook}>Yes! Delete Book
        </button>
      </div>
    </div>
  )
}

export default DeleteBook;