import React from 'react';
import logo from './logo.svg';
import './App.css';
import Parse from 'parse/dist/parse.min.js';
import ImageView from "./WiproCamera/ImageView"
const PARSE_APPLICATION_ID = 'pDDlM9eMAMetxB7yIZQCZB38t0N2NZvsIanQ0xIp';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'XlveY2urQm4OQd9qfsIHsxPRuFPNhcAZGBnRWiRW';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;
function App() {
  return (
    <div className="App">
      <ImageView></ImageView>
    </div>
  );
}

export default App;
