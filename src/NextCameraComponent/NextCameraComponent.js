import React, { Fragment, useState, useRef, useEffect } from "react";
import resemble from "resemblejs"
function NextCameraComponent(){
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
        const takePhoto = () =>{
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
          if(prevImages.length==0) ctx.drawImage(video,0,0,width, height)
          else{
            canvas.height = height
            canvas.width = width
            ctx.drawImage(video,0,0,width, height)
          }
          var image = canvas.toDataURL("image/jpeg").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
        //  downloadURI(`${image}`, `${image}.jpeg`);
          setPrevImages([...prevImages, image])
      
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          canvas.height = height
          canvas.width = 0.25*width
          ctx.drawImage(video,width*0.75, 0, width*0.25, height, 0,0, width*0.25, height)
          var image2 = canvas.toDataURL("image/jpeg").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
      
      // var fd = new FormData(document.forms[0]);
      // fd.append("canvasImage", blob);
      // axios({
      //   method: "POST",
      //   url: "http://127.0.0.1:8000/camera/",
      //   headers: {
        
      //     Authorization: "Bearer 6tEg0RinS5rxyZ8TX84Vc6qXuR2Xxw"
      //   },
      //   fd
      // })
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err));
      // };
      
      setPrevPreview(image2)
      
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        useEffect(()=>{
          getVideo();
        },[videoRef])
      
        function downloadURI(uri, name) {
          var link = document.createElement("a");
          link.download = name;
          link.href = uri;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      
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
          <div className="App">
            <div className="camera" style={{display:"flex", flexDirection: "row", marginTop:"0px",  overflow:"scroll"}}>
            
            {prevImages.length>0 && <img src={`${prevPreview}`}></img>}
              <video ref = {videoRef} ></video>
              <canvas ref={photoRef} id="canvasImage" hidden={true}></canvas>
            </div>
            </div>
            <div className="App" style={{display:"flex",justifyContent: "center", alignItems: "center"}}>
            <button onClick={takePhoto} style={{color: getColor()}}>{mismatch}</button>
      </div>
            <div className="App" style={{display:"flex", flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop:"0px", overflow:"scroll"}}>
      
            {prevImages.length>0 && prevImages.map(image =>
              <img src = {`${image}`}></img>
            )}
            </div>
           
             </>
        )
}
export default NextCameraComponent