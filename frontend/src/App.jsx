import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Store from "./components/Store/Store";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Login from "./components/Login/Login"; // ✅ Import Login
import ProtectedRoute from "./components/ProtectedRouter";
// index.js or App.jsx
import { GoogleOAuthProvider } from '@react-oauth/google';  
import ShopContextProvider from "./context/ShopContext";
import "./App.css";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:productId" element={<Product />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} /> {/* ✅ Added Login Route */}
      </Route>
    )
  );

  return (
    <ShopContextProvider>
      <RouterProvider router={router} />
    </ShopContextProvider>
  );
}

export default App;
