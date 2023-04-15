import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./Home/home";
import Test from "./test";
import "./App.css";

import Testform from "./testform";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/test" element={<Test />}></Route>
          <Route path="/testform" element={<Testform />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
