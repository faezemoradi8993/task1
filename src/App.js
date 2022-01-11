import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import ShoppingCart from "./pages/shoppingCart";
import ProductList from "./pages/productList";
import ProductDetiles from "./pages/productDetiles";
import FavoriteProducts from "./pages/favoriteProducts";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "./pages/login";
import Register from "./pages/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TokenContextProvider,
  CartContextProvider,
  UserContextProvider,
} from "./context";
import AxiosInterceptor from "./api/AxiosInterceptor";

const queryClient = new QueryClient();
function App() {
  return (
    <BrowserRouter>
      <AxiosInterceptor>
        <QueryClientProvider client={queryClient}>
          <TokenContextProvider>
            <CartContextProvider>
              <UserContextProvider>
                <Layout>
                  <Routes>
                    <Route path="/" exact element={<ProductList />} />
                    <Route
                      path="/product/:id"
                      exact
                      element={<ProductDetiles />}
                    />
                    <Route
                      path="/shoppingCart"
                      exact
                      element={<ShoppingCart />}
                    />
                    <Route
                      path="/favoriteProducts"
                      exact
                      element={<FavoriteProducts />}
                    />
                    <Route path="/register" exact element={<Register />} />
                    <Route path="/login" exact element={<Login />} />
                  </Routes>
                </Layout>
                <ToastContainer />
              </UserContextProvider>
            </CartContextProvider>
          </TokenContextProvider>
        </QueryClientProvider>
      </AxiosInterceptor>
    </BrowserRouter>
  );
}

export default App;
