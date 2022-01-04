import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import ShoppingCart from "./pages/shoppingCart";
import ProductList from "./pages/productList";
import ProductDetiles from "./pages/productDetiles";
import FavoriteProducts from "./pages/favoriteProducts";
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient();
function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Routes>
            <Route path="/" exact element={<ProductList />} />
            <Route path="/product/:id" exact element={<ProductDetiles />} />
            <Route path="/shoppingCart" exact element={<ShoppingCart />} />
            <Route path="/favoriteProducts" exact element={<FavoriteProducts />} />
          </Routes>
         
        </Layout>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;