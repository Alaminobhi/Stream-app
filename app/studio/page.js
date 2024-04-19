"use client"
import React, { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";


const Studio = () => {
  const [openModal, setOpenModal] = useState(false);

  const [isStreaming, setIsStreaming] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Live stream is Not start');

  const [youtubeUrl, setyoutubeUrl] = useState('')
  const [youtubeBroadcastId, setYoutubeBroadcastId] = useState('')
  const [facebookUrl, setFacebookUrl] = useState('')
  const [facebookLiveVideoId, setfacebookLiveVideoId] = useState('')
  const [facebookAccessToken, setfacebookAccessToken] = useState('')
  const [longFacebookAccessToken, setlongFacebookAccessToken] = useState('')
  const [facebookPermalinkUrl, setfacebookPermalinkUrl] = useState('')
  const [twitchStreamKey, settwitchStreamKey] = useState('')
  const [twitchUsername, settwitchUsername] = useState('')
  const [twitchAccessToken, settwitchAccessToken] = useState('')
  const [twitchViewCount, settwitchViewCount] = useState(0)
  const [youtubeViewCount, setyoutubeViewCount] = useState(0)
  const [facebookViewCount, setfacebookViewCount] = useState(0)
  const [twitchChatMsgs, setTwitchChatMsgs] = useState(['Welcome to the chat!'])
  const [customRtmpServer, setcustomRtmpServer] = useState('')
  const [customRtmpStreamKey, setcustomRtmpStreamKey] = useState('')

  const [isActive, setIsActive] = useState(false)
  const [userFacing, setuserFacing] = useState(true)
  const [streamFinished, setstreamFinished] = useState(false)
  const [muted, setmuted] = useState(false)
  const [cameraOn, setcameraOn] = useState(true)

  const videoRef = useRef()
  const canvasRef = useRef(null);
  // const socket = useRef();

  const mediaRecorder = useRef()
  const stream = useRef(null)
  let liveStream
  let tempStream = new MediaStream();

  const viewCountTimer = 1000 * 60 * 1
  // Use polling every 30 seconds
  // const twitchViewCountTimer = 1000 * 30
  let timer = useRef(null)
  let on = false

  console.log(timer);
  const productionWsUrl = 'https://ohmystream.xyz'
  
  const developmentWsUrl = 'http://localhost:5000';
  const socket = io('http://103.191.50.22');
  // const socket2 = io('http://localhost:5000');
  // const socket = new WebSocket("ws://localhost:8080");
  const customRTMP = "rtmp://a.rtmp.youtube.com/live2/71f3-daek-fcv0-z7hs-09jw";
 
  const streamUrlParams = customRTMP;
  
  
    // client-side
    socket.on("connect", () => {

      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });



  const startTimer = () => {
    if (on) return
    timer.current = accurateTimer(() => {
      setelapsedSeconds((elapsedSeconds) => elapsedSeconds + 1)
      on = true
      let seconds = elapsedSeconds % 60
      seconds = seconds > 9 ? seconds : `0${seconds}`
      // console.log(`${elapsedSeconds} seconds have passed.`)
    })
  }

  const stopTimer = () => {
    if (on) console.log('Timer Stopped')
    on = false
    timer.current.cancel()
  }

  useEffect(() => {
      
    camera()

    videoRef.current.srcObject = tempStream.remoteStream
  }, [])

  async function screen() {
   stream.current = await navigator.mediaDevices.getDisplayMedia(
      {video: {
        displaySurface: "browser",
      },
      audio: {
        suppressLocalAudioPlayback: false,
      },
      preferCurrentTab: false,
      selfBrowserSurface: "exclude",
      systemAudio: "include",
      surfaceSwitching: "include",
      monitorTypeSurfaces: "include",}
    );
    // stream.current.replaceVideoTrack(stream.current.getVideoTracks()[0])

          if (videoRef.current) {
        videoRef.current.srcObject = stream.current;
        videoRef.current.play();
        }
  }

  async function canvas1() {
        const canvas = canvasRef.current;
          let context = canvas.getContext("2d");


        canvas.width = 1000;
        canvas.height = 500;
        canvas.style.background = "#ff8";

        var hit_counter = 0;

    class Circle {
        constructor(xpos, ypos, radius, speed, color, text) {

            this.position_x = xpos;
            this.position_y = ypos;

            this.radius = radius;

            this.speed = speed;

            this.dx = 2 * this.speed;
            this.dy = 2 * this.speed;

            this.text = text;

            this.color = color;
        }

        draw(context) {
            context.beginPath();
            context.strokeStyle = this.color;
            context.fillText(this.text, this.position_x, this.position_y);
            context.textAlign = "center";
            context.textBaseline = "middle"
            context.font = "30px Arial";
            context.lineWidth = 5;
            context.arc(this.position_x, this.position_y, this.radius, 0, Math.PI * 2);
            context.stroke();
            context.closePath();
        }

        update() {

            this.draw(context);

            if ( (this.position_x + this.radius) > 1000 ) {
                this.dx = -this.dx;
                hit_counter++;
            }
            
            if ( (this.position_x - this.radius) < 0 ) {
                this.dx = -this.dx;
                hit_counter++;
            }

            if ( (this.position_y - this.radius) < 0 ) {
                this.dy = -this.dy;
                hit_counter++;
            }

            if ( (this.position_y + this.radius) > 500 ) {
                this.dy = -this.dy;
                hit_counter++;
            }

            this.position_x += this.dx;
            this.position_y += this.dy; 
            
        }
    }


    let getDistance = function(xpos1, ypos1, xpos2, ypos2) {
      var result = Math.sqrt(Math.pow(xpos2-xpos1, 2) + Math.pow(ypos2-ypos1, 2));
      return result;
    }


    let randomNumber = function(min, max) {
      var result = Math.random() * (max - min) + min;
      return result;
    }


    var all_circles = [];

    for (var i = 0; i < 20; i++) {

      var radius = 50;
      var random_x = randomNumber(radius, (1000 - radius));
      var random_y = randomNumber(radius, (500 - radius));

      for( var a = 0; a < all_circles.length; a++) {
        if ( (getDistance(random_x, random_y, all_circles[a].xpos, all_circles[a].ypos) - radius + all_circles[a].radius < 0) ) {
          random_x = randomNumber(radius, (1000-radius));
          random_y = randomNumber(radius, (500-radius));
        }
        a = all_circles.length;
      }

      let my_circle = new Circle(random_x, random_y, radius, 2, 'Black', 'AFIA');
      all_circles.push(my_circle);
    }


    let updateCircle = function() {
      requestAnimationFrame(updateCircle);
      context.clearRect(0, 0, 1000, 500);

      all_circles.forEach(element => {
        element.update();
      })
    }

    updateCircle();
        stream.current = canvasRef.current.captureStream();

           if (videoRef.current) {
         videoRef.current.srcObject = stream.current;
         videoRef.current.play();
         }
   }

  async function camera() {
    stream.current = await navigator.mediaDevices.getUserMedia(
      {
        audio: true,
        video: true,
      }
    )

    if (videoRef.current) {
        videoRef.current.srcObject = stream.current;
        videoRef.current.play();
        }

    // stream.current.replaceVideoTrack(stream.current.getVideoTracks()[0])
    // stream.current.replaceAudioTrack(stream.current.getAudioTracks()[0])
  }

  const toggleCamera = () => {
    setcameraOn(!cameraOn)
    stream.current.getVideoTracks()[0].enabled =
      !stream.current.getVideoTracks()[0].enabled
  }

  const toggleMicrophone = () => {
    setmuted(!muted)
    stream.current.getAudioTracks()[0].enabled =
      !stream.current.getAudioTracks()[0].enabled
  }

    // toggles the stream to active or inactive
    const toggleActive = () => {
      setIsActive(!isActive)
    }

  const recorderInit = () => {
    // liveStream = canvasRef.current.captureStream(30) // 30 FPS

    liveStream = videoRef.current.captureStream(30) // 30 FPS
    mediaRecorder.current = new MediaRecorder(liveStream, {
      mimeType: 'video/webm;codecs=h264',
      // mimeType: 'video/webm;codecs=vp8,opus',
      videoBitsPerSecond: 3 * 1024 * 1024,
    })
    mediaRecorder.current.ondataavailable = (e) => {
      // socket.current.send(e.data)
      socket.emit('message', e.data)
      // chunks.push(e.data)
      console.log('send data', e.data)
    }
    // startTimer();
    // Start recording, and dump data every second
    mediaRecorder.current.start(1000)
  }

  const startRecording = () => {
    socket.current = io(developmentWsUrl + streamUrlParams, {
            transports: ['websocket'],
          })

      // socket.current.emit("stream", rtmp, (response) => {
      //   console.log(response); // "got it"
      // });
      // toggleActive()
      // startTimer()
      recorderInit()
      
   
  }

  const stopRecording = () => {
    toggleActive()
    mediaRecorder.current.stop()
    // socket.current.close()
    // endYoutubeStream()
    // endFacebookLivestream()
    // setstreamFinished(true)
    socket.emit('message', 'stop')
    stopTimer()

    // mediaRecorder.current.stop()
    // const recVideoBlob = new Blob(chunks, {
    //   type: 'video/webm;codecs=h264',
    // })
    // const videoURL = window.URL.createObjectURL(recVideoBlob)
    // setvideoUrl(videoURL)
  }


  const toggleRecording = () => {
    !isActive ? startRecording() : stopRecording()
  }

  const toggleScreenSharing = () => {
    userFacing ? screen() : camera()
    setuserFacing(!userFacing)
  }

  const loop = '-1';
  // const rtmp = "rtmp://a.rtmp.youtube.com/live2/3hg3-ssh5-sgv2-htcv-0dh2";
  // const data = {loop, rtmp};
    const [url, setUrl] = useState('');
    const [key, setKey] = useState('');

    const rtmp = `${url}/${key}`;

    const data = {loop, rtmp};

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Send a start-stream event to the server
    socket.emit('start-stream', data);
    // socket.emit('data', data);

    recorderInit();

    // Set the streaming status to true
    setIsStreaming(true);

    setOpenModal(false)
    // Listen for the confirmation message from the server
    socket.on('stream-started', (message) => {
      setStatusMessage(message);
    });
  }

  // Handle stopping the stream
  const stopStream = () => {
    // Send a stop-stream event to the server
    socket.emit('stop-stream', 'stop');

    mediaRecorder.current.stop()
    // socket.current.close()
    // Set the streaming status to false
    setIsStreaming(false);

    // Listen for the confirmation message from the server
    socket.on('stream-stopped', (message) => {
      setStatusMessage(message);
    });
  };

  const [input, setInout] = useState('false');
  const handleInput = (select) => {
    
    let text;
    let person = prompt("Please enter your name:", "Harry Potter");
    if (person == null || person == "") {
      text = "User cancelled the prompt.";
    } else {
      text = "Hello " + person + "! How are you today?";
    }

    let person2 = prompt("Please enter your name:", "Harry Potter");

    setInout(text);
  }

  return (
    <>
      <div className='grid gap-4 m-10'>
        <canvas ref={canvasRef} width="600" height="400" />
        <div className='justify-center mt-10'>
             <video ref={videoRef} width="720" height="650" autoPlay controls />
        </div>

        <div className='grid grid-cols-4 gap-4 ml-10 text-center'>
            <button className='bg-green-600 rounded-full font-bold hover:bg-blue-700' label={'Share Screen'} onClick={toggleScreenSharing}>
              <h6>Share Screen</h6>
            </button>
            <button className='bg-green-600 rounded-full font-bold hover:bg-blue-700' label={'Share Screen'} onClick={canvas1}>
              <h6>Share canvas</h6>
            </button>
            <button className='hover:bg-blue-700' label={'Camera'} onClick={toggleCamera}>
              {cameraOn ? (
                <h6>Camera off</h6>
              ) : (
                <h6>Camera on</h6>
              )}
            </button>

            <button className='hover:bg-blue-700' label={'Mic'} onClick={toggleMicrophone}>
              {!muted ? (
                <h6>mic off</h6>
              ) : (
                <h6>mic on</h6>
              )}
            </button>

        </div>
        
        <div className='bg-slate-400 grid grid-cols-3 gap-4 ml-10 text-center'>
        
            {/* <button class='content-center items-center' label={'Live stream start'} onClick={handleSubmit}>
              <h6>Live stream start</h6>
            </button> */}

            <p>Status: {isStreaming ? 'Streaming' : 'Not Streaming'}</p>
            <p>{statusMessage}</p>

            {isStreaming ? (
            <button className='bg-red-600 rounded-full font-bold hover:bg-blue-700' onClick={stopStream}>Stop Stream</button>
            ) : (
              <div className="flex flex-col m-10 justify-center  items-center">
              <Button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={() => setOpenModal(true)}>Add Stream</Button>
              <Modal show={openModal} size="sm" popup onClose={() => setOpenModal(false)}>
                <Modal.Header />
                <Modal.Body>
                  <div className="space-y-6 text-center items-center">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Live Stream inf</h3>
                    <div>
                      <div className="mb-2 block">
                        <Label value="Live In:" />
                      </div>
                      <select name={url} required onChange={(e) => setUrl(e.target.value)}>
                        <option value="">twith</option>
                        <option value="rtmps://live-api-s.facebook.com:443/rtmp">Facebook</option>
                        <option value="rtmp://a.rtmp.youtube.com/live2">Youtube</option>
                      </select>
                    </div>
                    <div>
                      <div className="mb-2 block">
                        <Label value="Live Key:" />
                      </div>
                      <TextInput type="text" 
                        value={key} 
                        placeholder="Live Key"
                        required
                        onChange={(e) => setKey(e.target.value)} />
                    </div>
                  
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  
                  <button className='bg-blue-500 items-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={handleSubmit}>Start Stream</button>
                </Modal.Footer>
              </Modal>

        {/* <label> Live In:
          <select name={url} required onChange={(e) => setUrl(e.target.value)}>
          <option value="">twith</option>
            <option value="rtmps://live-api-s.facebook.com:443/rtmp">Facebook</option>
            <option value="rtmp://a.rtmp.youtube.com/live2">Youtube</option>
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
              <button class='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full' onClick={handleSubmit}>Start Stream</button> */}
            </div>
            )}
        </div>

        <div class='bg-slate-600 grid grid-cols-2 gap-4 ml-10 text-center'>
            <p>{input}</p>
           
            <button
              onClick={handleInput}>
              <h6>handle Input</h6>
            </button>
        </div>

      </div>
            
    </>
  )
}

export default Studio
