import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import SignUp from "./components/signUp";
import Login from "./components/login";
import EditUser from "./components/editUser";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignUp />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/edit" element={<EditUser />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
