import React, { useContext, createContext, useState } from "react";

//token context
const TokenContext = createContext();
export const useTokenContext = () => useContext(TokenContext);
function TokenContextProvider({ children }) {
  const [token, setToken] = useState();
  const value={token, setToken}
  return (
    <TokenContext.Provider value={value}>
      {children}
    </TokenContext.Provider>
  );
}
export default TokenContextProvider;
