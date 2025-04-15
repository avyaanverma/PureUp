import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Store from "./components/Store/Store";
import ShopContextProvider from "./context/ShopContext";
import Product from "./pages/Product";
import Home from "./pages/Home";
import Login from "./components/Login/Login"; // Add your login page
import ProtectedRoute from "./components/ProtectedRouter"; // <-- Import
import { CartProvider } from "./context/CartContext";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
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
