import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import SignUp from "./components/signUp";
import Login from "./components/login";
import EditUser from "./components/editUser";
import Middleware from "./components/middleware";
import VerifyMessage from "./components/verifyMessage";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/edit" element={<EditUser />}></Route>
      <Route path="/middleware" element={<Middleware />}></Route>
      <Route path="/verify" element={<VerifyMessage />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
