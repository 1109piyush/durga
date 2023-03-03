import React from "react";
import {  Routes, Route } from "react-router-dom";
import ProductPage from "./ProductPage";
import NavratriHeader from "./component/NavratriHeader"

function App() {
  return (
      
        
        <Routes>
          <Route path="/" element={<NavratriHeader/>} />
          <Route path="/product/:productId" element={<ProductPage />} />
        </Routes>
  );
}

export default App;
