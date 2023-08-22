import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './Components/ProductList';
import Cart from './Components/Cart';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Shopping Cart</h1>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
