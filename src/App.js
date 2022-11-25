import React, { Fragment, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Camera } from "./camera/illndex";
import { Root, Preview, Footer, GlobalStyle } from "./styles";
import { useUserMedia } from "./hooks/use-user-media";
import {
  Video,
} from "./camera/styles"
const CAPTURE_OPTIONS = {
  audio: false,
  video: { facingMode: "environment" }
};
function App() {
  const videoRef = useRef();
  const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }
  useEffect(()=>{
    if (mediaStream) {
      return function cleanup() {
        console.log("cleanup")
        mediaStream.getTracks().forEach(track => {
          track.stop();
        });
      };
    }
  },[mediaStream])
  console.log(mediaStream)
  if (!mediaStream) {
    return null;
  }
  function handleCanPlay() {
     videoRef.current.play();
     console.log("playing")
   }
  return (
    <>
    <div style={{display:"flex", flexDirection:"column", justifyContent:"start", alignItems:"center", overflow:"hidden"}}>
      <div className="VideoAndCanvas">
        <h1>hello</h1>
       <video
              ref={videoRef}
              onCanPlay={handleCanPlay}
              autoPlay
              playsInline
              muted
              height={"100%"}
         
  />
        </div>
        </div>
    </>
  );
}

export default App;
