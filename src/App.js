import "./App.css";
import { Router, Routes, Route } from "react-router-dom";

// Components
import HomePage from "./pages/HomePage/HomPage";
import ProductPage from "./pages/ProductPage/ProductPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
