"use client"
import React, { useEffect, useState } from 'react';
import Item from '../components/Item';

const MovieListComponent = () => {

    const [videolist, setVideolist] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = new URL('http://103.191.50.22/videolist');
        const response = await fetch(url);
        const movies = await response.json();
        setVideolist(movies);
        console.log(movies);
        
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();

  }, []);
  return (
    <div className='m-10 pl-10'>
       <h1 class="mt-6 text-2xl text-center font-medium text-black-900">Videos List </h1>
       
       <br/>
      <div className="grid gap-2 grid-cols-2 m-5 shadow-2xl">
        
      {
      videolist?.map((it, index) =><Item key={index} item={it}></Item>)
              }
      </div>
    </div>
  );
};

export default MovieListComponent;