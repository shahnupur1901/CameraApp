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
  return (
     
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<NextCameraComponent />} />
      <Route path="/approach" element={<NextCameraComponent />} />
    </Routes>
    </BrowserRouter>

    )
}

export default App;
