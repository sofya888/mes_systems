import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import ProductPage from "./components/ProductPage";
import CategoryProduct from "./components/CategoryProduct";
import Breadcrumbs from "./components/Breadcrumbs";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/category/:categoryName/product/:productId" element={<CategoryProduct />} />
          <Route
            path="*"
            element={
              <div className="not-found">
                <h2>Страница не найдена</h2>
                <p>
                  Перейдите, пожалуйста, на <a href="/">Главную страницу</a>
                </p>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
