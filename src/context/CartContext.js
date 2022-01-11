import React, { useContext, createContext, useState } from "react";

//cart context
const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);
function CartContextProvider({ children }) {
  const [cart, setCart] = useState();
  const value = { cart, setCart };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export default CartContextProvider;
