import React, { Fragment, useState, useRef } from "react";
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
       <video
              ref={videoRef}
              onCanPlay={handleCanPlay}
              autoPlay
              playsInline
              muted
              height={"100%"}
        />
    </>
  );
}

export default App;
