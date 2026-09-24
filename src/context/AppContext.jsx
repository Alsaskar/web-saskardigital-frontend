import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedCustomers, setSelectedCustomers] = useState([]); // untuk send broadcast

  return (
    <AppContext.Provider
      value={{
        selectedCustomers,
        setSelectedCustomers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
