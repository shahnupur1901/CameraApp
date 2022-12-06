import React, { Fragment, useState, useRef, useEffect } from "react";
import axios from "axios"
import resemble from "resemblejs"



function CameraComponent(){


  const videoRef = useRef(null)
  const photoRef = useRef(null)
  const [videoDem, handleVideoDem] = useState({w:0, h:0})
  const [prevImages, setPrevImages] = useState([])
  const [prevPreview, setPrevPreview] = useState(null)
  const [mismatch, setMismatch] = useState(0)
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
  const takePhoto = async () =>{
    console.log(prevImages.length)
    const width = videoDem.w
    const height = videoDem.h
    let video = videoRef.current
    let photo = photoRef.current
    photo.width = width
    photo.height = height
    let ctx = photo.getContext('2d')
    let canvas= document.getElementById('canvasImage');
    canvas.height = height
    canvas.width = width
    ctx.drawImage(video,0,0,width, height)
    var image = canvas.toDataURL("image/jpeg").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    setPrevImages([...prevImages, image])
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.height = height
    canvas.width = 0.25*width
    ctx.drawImage(video,width*0.75, 0, width*0.25, height, 0,0, width*0.25, height)
    var image2 = canvas.toDataURL("image/jpeg").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    setPrevPreview(image2)

    const imageData = { imageData: prevImages, previousPreview : `${image2}`};
    console.log("in")
    const response = await axios.post('http://localhost:8000/', imageData);
      console.log(response)
    


    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  useEffect(()=>{
    getVideo();
  },[videoRef])
  const giveRecommendation = ()=>{
    if(prevImages.length > 0 ){
    const width = videoDem.w
    const height = videoDem.h
    let video = videoRef.current
    let photo = photoRef.current
    photo.width = width
    photo.height = height
    let ctx = photo.getContext('2d')
    let canvas= document.getElementById('canvasImage');
    canvas.width = 0.25*width
    ctx.drawImage(video,0, 0, width*0.25, height, 0,0, width*0.25, height)
    var image2 = canvas.toDataURL("image/jpeg").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    // console.log(image2)
    //   console.log(prevPreview)
   resemble.outputSettings({ useCrossOrigin: false });
  resemble(image2).compareTo(prevPreview).ignoreAntialiasing().onComplete((data)=>{
    // console.log(data)
    setMismatch(data.misMatchPercentage)
  })
   
    }
  }
  setInterval(()=>{
    giveRecommendation()
  },100)
  const getColor = ()=>{
    return mismatch > 50 ? "red" : "green"
  }
  return (



    
    <>
    <div className="App" style={{display:"flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop:"0px", overflow:"hidden"}}>

      <div className="camera" style={{position:"relative"}}>
      {prevImages.length>0 && <img src={`${prevPreview}`} style={{opacity : "0.5", position:"absolute", top:"0", left:"0", margin:"0"}}></img>}
        <video ref = {videoRef} ></video>
        <canvas ref={photoRef} id="canvasImage" hidden={true}></canvas>
      </div>
      </div>
      <div className="App" style={{display:"flex",justifyContent: "center", alignItems: "center"}}>
      <button onClick={takePhoto} style={{backgroundColor: getColor(), padding:"10px", color:"white", borderWidth:"0px"}}>{mismatch}</button>
</div>
      <div className="App" style={{display:"flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop:"0px", overflow:"scroll"}}>

      {prevImages.length>0 && prevImages.map(image =>
        <img src = {`${image}`}></img>
      )}
      </div>
     
       </>
  )

      }

  export default CameraComponent