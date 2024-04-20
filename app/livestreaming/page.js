"use client"

import React, { useEffect, useRef, useState } from 'react';
import VideoList from '../videos-list/page';

const Page = () => {

    const [from, setFrom] = useState('');
    const [mp3url, setMp3url] = useState('');
    const [fileurl, setFileurl1] = useState('');
    const [loop, setLoop] = useState('');
    const [url, setUrl] = useState('');
    const [key, setKey] = useState('');
    
  const rtmp = `${url}/${key}`;
  
    const data = {fileurl, loop, rtmp, from, mp3url};
    console.log(data);

    const startstream = async (event) => {
      event.preventDefault();
      try {
      let url = new URL(process.env.NEXT_PUBLIC_HOST_URL_STREAM);
      url.search = new URLSearchParams(data);

      const response = await fetch(url);
      const data2 = await response.json();
      console.log(data2);
        if (response.ok) {
            alert('done properly');
           
            // location.reload()
        }


    }

    catch (error) {
        console.log(error)
      alert('errr properly', error); 
       
    }
      }

      
  return (
    <div>
      <div class='bg-red-500'>
        <h1 class="mt-6 mb-5 text-ls text-center font-medium text-black-900">Live Streaming App</h1>
      </div>
    <div className="flex flex-col mx-5 mt-10 justify-center  items-center">
        <label> From Live:  
        <select onChange={(e) => setFrom(e.target.value)} name={from} required>
          <option value="ytvideo">YT Video To Live</option>
          <option value="photo">Photo and mp3 To Live</option>
          <option value="filevideo">Video To Live</option>
          <option value="fbvideo">FB Video To Live</option>
          <option value="canvas">canvas Video To Live</option>
        </select>
      </label>
      <br/>

      <label>file url link:
        <input 
          onChange={(e) => setFileurl1(e.target.value)}
            type="text" 
            name={fileurl} 
            placeholder="file url link"
            required
          />
        </label>
        <br/>

        <label>mp3 file link:
          <input
              type="text" 
              name={mp3url} 
              placeholder="mp3url file link"
              onChange={(e) => setMp3url(e.target.value)}
            />
          </label>
          <br/>

        <label> Loops:
          <select onChange={(e) => setLoop(e.target.value)} name={loop} required>
            <option value="1">No Loop</option>
            <option value="3">Loop 3</option>
            <option value="5">Loop 5</option>
            <option value="10">Loop 10</option>
            <option value="-1">Looping</option>
          </select>
        </label>
        <br/>
        <label> Live In:
          <select name={url} required onChange={(e) => setUrl(e.target.value)}>
          <option value="">twith</option>
            <option value="rtmps://live-api-s.facebook.com:443/rtmp">Facebook</option>
            <option value="rtmp://a.rtmp.youtube.com/live2">Youtube</option>
            <option value="rtmp://localhost:1935/live">node live</option>
          </select>
        </label>
        <br/>
        <label> Live Key:
        <input 
            type="text" 
            value={key} 
            placeholder="Live Key"
            required
            onChange={(e) => setKey(e.target.value)}
          />
        </label>
        <br/>
        <button onClick={startstream} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 bg-indigo-500 shadow-lg shadow-indigo-500/50 rounded-full">Live Start</button>
            
        </div>
        <VideoList/>
        </div>
    );
};

export default Page;