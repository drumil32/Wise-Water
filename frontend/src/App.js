import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route exact path="/register/customer" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
