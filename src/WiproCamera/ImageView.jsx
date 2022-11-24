import React, {useEffect, useState} from 'react';
import {useTakePicture} from "./useTakePicture";
import LensSharpIcon from '@mui/icons-material/Loop';
import LoopIcon from '@mui/icons-material/Loop';
 const ImageView = () => {
    const {captureImage ,imageData, switchCameraFacingMode} = useTakePicture(); // customHook that contains logics
    const [canvasOpacity,] = useState(0);
    let width = 400
    let height = 400
    return(
        <div style={{display:"flex", flexDirection:"column", justifyContent:"start", alignItems:"flex-start", width:width, height:height, overflow:"hidden"}}>
            <div className="VideoAndCanvas">
                <video width={width} style={{objectFit:'contain'}} />
                <canvas style={{opacity:canvasOpacity}} />
            </div>
         
            <LensSharpIcon 
                id='CaptureImageButton' 
                fontSize='large' 
                color="secondary" 
                style={{width:'75px', height:"75px", position:'absolute', top:height*0.9, left:width*0.5, transform: "translate(-50%, -50%)"}} 
                onClick={captureImage} 
            />
            <LoopIcon 
                id='SwitchCameraButton' 
                fontSize='large' 
                color="secondary" 
                style={{position:'absolute', top:'40px', left:'40px', transform: "translate(-50%, -50%)" }} 
                onClick={switchCameraFacingMode} 
            />
        </div>
    )
}

export default ImageView