import React, { createContext, useState, useEffect } from 'react';

// Create the context
const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [globalValue, setGlobalValue] = useState(() => {
        // Retrieve the initial state from localStorage if it exists
        const savedValue = localStorage.getItem('globalValue');
        return savedValue !== null ? JSON.parse(savedValue) : "initial value";
    });

    useEffect(() => {
        // Save the globalValue to localStorage whenever it changes
        localStorage.setItem('globalValue', JSON.stringify(globalValue));
    }, [globalValue]);

    return (
        <GlobalContext.Provider value={{ globalValue, setGlobalValue }}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, GlobalProvider };
