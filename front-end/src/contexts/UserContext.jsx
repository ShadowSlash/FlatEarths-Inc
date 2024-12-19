import React, { createContext, useState, useContext } from "react";

// Create the context
export const UserContext = createContext();

const defaultUser = {
  username: "",
  email: "",
  avatar: "",  // Avatar is included here
  isLoggedIn: false,
};

// UserProvider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(defaultUser); // Set initial state to default user object

  // Function to log the user in (regular login or Discord login)
  const loginUser = (userData) => {
    setUser({
      username: userData.username,
      email: userData.email || '',  // Fallback if no email is provided
      avatar: userData.avatar || '',  // Fallback if no avatar is provided
      isLoggedIn: true,
    });
  };

  // Function to log the user out
  const logoutUser = () => {
    setUser(defaultUser); // Reset to default user
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use UserContext
export const useUser = () => useContext(UserContext);
