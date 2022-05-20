import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Components
import HomePage from "./pages/HomePage/HomPage";
import ProductPage from "./pages/ProductPage/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
