"use client"
import React, { useEffect, useState } from 'react';

const Item = ({item}) => {
    // console.log(`http://103.191.50.22/videos/${item}`);
    // const url = `http://103.191.50.22/videos/${item}`;
   
    async function copyContent(e) {
        try {
            console.log(e);
          await navigator.clipboard.writeText(e);
          console.log('Content copied to clipboard');
          alert("copy text: " + e);
          /* Resolved - text copied to clipboard successfully */
        } catch (err) {
          console.error('Failed to copy: ', err);
          /* Rejected - text failed to copy to the clipboard */
          
        }
      }

    return (
        <div className='flex items-center place-items-center'>
            
            <h1>{item}</h1> <button class='text-2xl ml-5 text-center bg-blue-500 shadow-lg shadow-blue-500/50 hover:bg-teal-500 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80'
				 onClick={()=>copyContent(item)}>Copy</button>
           
        </div>
    );
};

export default Item;