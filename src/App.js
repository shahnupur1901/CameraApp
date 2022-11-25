import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import { Camera } from "./camera";
import { Root, Preview, Footer, GlobalStyle } from "./styles";

function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cardImage, setCardImage] = useState();

  return (
    <Fragment>
          <Camera
            onCapture={blob => setCardImage(blob)}
            onClear={() => setCardImage(undefined)}
          />
    </Fragment>
  );
}

export default App;
