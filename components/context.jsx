"use client";

import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();
const AppProvider = ({ children }) => {
  // const [sidemenu, setSidemenu] = useState(false);
  // const [dropSearch, setDropSearch] = useState(false)

  const [address, setAddress] = useState('')


  return (
    <AppContext.Provider value={{ address, setAddress}}>
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppContext, AppProvider };
