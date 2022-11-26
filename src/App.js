import React, { Fragment, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Camera } from "./camera/illndex";
import { Root, Preview, Footer, GlobalStyle } from "./styles";
import { useUserMedia } from "./hooks/use-user-media";
import ImageView from "./WiproCamera/ImageView";
import { margin } from "@mui/system";
// import {
//   Video,
// } from "./camera/styles"
// const CAPTURE_OPTIONS = {
//   audio: false,
//   video: { facingMode: "environment" }
// };
// function App() {
//   const videoRef = useRef();
//   const mediaStream = useUserMedia(CAPTURE_OPTIONS);
//   if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
//     videoRef.current.srcObject = mediaStream;
//   }
//   useEffect(()=>{
//     if (mediaStream) {
//       videoRef.current.play();
//       return function cleanup() {
//         console.log("cleanup")
//         mediaStream.getTracks().forEach(track => {
//           track.stop();
//         });
//       };
//     }
//   },[mediaStream])
//   console.log(mediaStream)
//   if (!mediaStream) {
//     return null;
//   }
//   function handleCanPlay() {
//      videoRef.current.play();
//      console.log("playing")
//    }
//   return (
//     <>
//     <div style={{display:"flex", flexDirection:"column", justifyContent:"start", alignItems:"center", overflow:"hidden"}}>
//       <div className="VideoAndCanvas">
//         <h1>hello</h1>
//        <video
//               ref={videoRef}
//               onCanPlay={handleCanPlay}
//               autoPlay
//               playsInline
//               muted
//               height={"100%"}
         
//         />
//         </div>
//         </div>
//     </>
//   );
// }

// export default App;
function App(){
  const videoRef = useRef(null)
  const photoRef = useRef(null)
  const [videoDem, handleVideoDem] = useState({w:0, h:0})
  const [prevImages, setPrevImages] = useState([])
  const [prevPreview, setPrevPreview] = useState(null)
  const getVideo = () =>{
    navigator.mediaDevices.getUserMedia({
      audio: false,
  video: { facingMode: "environment" }
    }).then(stream=>{
      let video = videoRef.current
      video.srcObject = stream
      video.onloadedmetadata = ()=>{
        //get position of video tag;
        let {clientLeft, clientTop, videoWidth, videoHeight} = video
        handleVideoDem({w:videoWidth, h:videoHeight})
      }
      video.play()
    }).catch(e=>console.log(e))
  }
  const takePhoto = () =>{
    const width = videoDem.w
    const height = videoDem.h
    let video = videoRef.current
    let photo = photoRef.current
    photo.width = width
    photo.height = height
    let ctx = photo.getContext('2d')
    ctx.drawImage(video,0,0,width, height)
    let canvas= document.getElementById('canvasImage');
    var image = canvas.toDataURL("image/jpeg").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    console.log(image)
    setPrevImages([...image])
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    console.log(width)
    canvas.height = height
    canvas.width = 0.1*width
    ctx.drawImage(video,width*0.9, 0, width*0.1, height, 0,0, width*0.1, height)
    var image2 = canvas.toDataURL("image/jpeg").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    console.log(image2)
    setPrevPreview(image2)

  }
  useEffect(()=>{
    getVideo();
  },[videoRef])
  return (
    <>
    <div className="App" style={{display:"flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop:"0px", overflow:"hidden"}}>
      
      <div className="camera">
      {prevImages.length>0 && <img src={`${prevPreview}`} style={{margin:"0px"}}></img>}
        <video ref = {videoRef}></video>
        <canvas ref={photoRef} id="canvasImage" hidden={true}></canvas>
      </div>
      </div>
      <div className="App" style={{display:"flex",justifyContent: "center", alignItems: "center"}}>
      <button onClick={takePhoto}>Click</button>
      </div>
   
       </>
  )
}

export default App;
