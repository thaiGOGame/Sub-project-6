// ActiveTabContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const ActiveTabContext = createContext();

// Provider component
export const ActiveTabProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('Search'); // Default tab

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </ActiveTabContext.Provider>
  );
};
