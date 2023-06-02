import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename="">
      <Routes>
        <Route path="/" element={<h1>Website is under maintenance :)</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
