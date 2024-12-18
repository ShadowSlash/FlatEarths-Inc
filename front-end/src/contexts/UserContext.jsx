import React, { createContext, useState, useContext, useEffect } from "react";


// Create the context
export const UserContext = createContext();

const defaultUser = {
  username: "",
  email: "",
  password: "",
  isLoggedIn: false,
  avatar: "", // <----------------------------------------------Avi
};

// Theme provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(defaultUser); // Default theme color is white 

   
  const loginUser = (username) => {
    setUser({ username: username, isLoggedIn: true });
  }

  const logoutUser = () => {
    setUser(defaultUser);
  }

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);