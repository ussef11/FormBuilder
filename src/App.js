import { BrowserRouter, Routes,  Route } from "react-router-dom";
import React from "react";
import Home from "./Home/home";
import Test from "./test"
import './App.css';

function App() {
  return (

    <div className="App">
<BrowserRouter>
<Routes>
<Route path="/" element={<Home/>}></Route>
  <Route path="/test" element={<Test/>}></Route>
</Routes>


</BrowserRouter>
    </div>
  );
}

export default App;
