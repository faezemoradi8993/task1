import React, { useContext, createContext, useState } from "react";

//user context
const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);
function UserContextProvider({ children }) {
  const [user, setUser] = useState();
  const value={user, setUser}
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
