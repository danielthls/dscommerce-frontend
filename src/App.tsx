import "./App.css";
import ProductDetails from "./routes/ClientHome/ProductDetails";
import Catalog from './routes/ClientHome/Catalog'
import { Navigate, Route, Routes } from "react-router-dom";
import ClientHome from "./routes/ClientHome";
import Cart from "./routes/ClientHome/Cart";
import { useEffect, useState } from "react";
import { ContextCartCount } from "./utils/context-cart";
import * as cartService from './services/CartService';
import * as authService from './services/AuthService';
import Login from "./routes/ClientHome/Login";
import Admin from "./routes/Admin";
import AdminHome from "./routes/Admin/AdminHome";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from "./utils/history";
import { PrivateRoute } from "./components/PrivateRoute";
import { AccessTokenPayloadDTO } from "./models/Auth";
import { ContextToken } from "./utils/context-token";
import Confirmation from "./routes/ClientHome/Confirmation";


function App() {
  const [contextTokenPayload, setContextTokenPayload] = useState<AccessTokenPayloadDTO>();
  const [contextCartCount, setContextCartCount] = useState<number>(0);

  useEffect(() => {
    setContextCartCount(cartService.getCart().items.length)

    if (authService.isAuthenticated()) {
      const payload = authService.getAccessTokenPayLoad();
      setContextTokenPayload(payload);
    }
  }, [])

  return (
    <ContextToken.Provider value={{ contextTokenPayload, setContextTokenPayload }}>
      <ContextCartCount.Provider value={{ contextCartCount, setContextCartCount }}>
        <HistoryRouter history={history}>
          <Routes>
            <Route path="/" element={<ClientHome />}>
              <Route index element={<Catalog />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="product-details/:productId" element={<ProductDetails />} />
              <Route path="cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
              <Route path="login" element={<Login />} />
              <Route path="confirmation/:orderId" element={<PrivateRoute><Confirmation /></PrivateRoute>} />
            </Route>
            <Route path="/admin/" element={
              <PrivateRoute roles={['ROLE_ADMIN']}>
                <Admin />
              </PrivateRoute>
            }>
              <Route index element={<AdminHome />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </HistoryRouter>
      </ContextCartCount.Provider>
    </ContextToken.Provider>
  );
}

export default App;
