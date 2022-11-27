import React, { Fragment, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Camera } from "./camera/illndex";
import { Root, Preview, Footer, GlobalStyle } from "./styles";
import { useUserMedia } from "./hooks/use-user-media";
import ImageView from "./WiproCamera/ImageView";
import resemble from "resemblejs"
import { BrowserRouter, Route, Switch, Link, Routes } from "react-router-dom";
import { margin } from "@mui/system";
import CameraComponent from "./CameraComponent/CameraComponent";
import NextCameraComponent from "./NextCameraComponent/NextCameraComponent";
function App(){
  const [app1, setApp1] = useState(false)
  const [app2, setApp2] = useState(false)
  return (
    <>
    {!app1&&!app2 ? <> <button onClick={()=>setApp1(true)}>Approach 1</button><button onClick={()=>setApp2(true)}>Approach 2</button></> : <></>}
    {(app1) ? <CameraComponent></CameraComponent> : <></>}
    {(app2) ? <NextCameraComponent></NextCameraComponent> :  <></>}
    </>
    )
}

export default App;
