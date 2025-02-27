import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Store from "./components/Store/Store";
import ShopContextProvider from "./context/ShopContext"; // Import context provider
import "./App.css";
import Product from "./pages/Product";
import Home from "./pages/Home";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:productId" element = {<Product/>}/>
        <Route path="/user" element={<Dashboard />} />
      </Route>
    )
  );

  return (
    <ShopContextProvider> {/* ✅ Wrap the provider here */}
      <RouterProvider router={router} />
    </ShopContextProvider>
  );
}

export default App;
