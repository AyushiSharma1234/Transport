import React from "react";
import "./App.css";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { MapComponent } from "./components/MapComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Authentication } from "./components/Authentication";
import { Home } from "./pages/Home";
import { AboutUsPage } from "./pages/About";
import { Services } from "./pages/Services";
import { Products } from "./pages/Products";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Authentication />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/register" element={<MapComponent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
