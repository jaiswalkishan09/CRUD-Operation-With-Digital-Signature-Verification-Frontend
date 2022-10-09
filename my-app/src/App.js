import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import SignUp from "./components/signUp";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp />}></Route>
      {/* <Route path="/movieDetail" element={<MovieDetail />}></Route> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
