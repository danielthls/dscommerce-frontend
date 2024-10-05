import "./App.css";
import ProductDetails from "./routes/ClientHome/ProductDetails";
import Catalog from './routes/ClientHome/Catalog'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ClientHome from "./routes/ClientHome";
import Cart from "./routes/ClientHome/Cart";
import { useState } from "react";
import { ContextCartCount } from "./utils/context-cart";
import * as cartService from './services/CartService'
import Login from "./routes/ClientHome/Login";


function App() {
  const initCartCount = cartService.getCart().items.length;

  const [contextCartCount, setContextCartCount] = useState<number>(initCartCount);

  return (
    <ContextCartCount.Provider value={{ contextCartCount, setContextCartCount }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClientHome />}>
            <Route index element={<Catalog />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="product-details/:productId" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ContextCartCount.Provider>
  );
}

export default App;
