import React, { createContext, useState, useContext } from 'react';

export const MatkakohdeContext = createContext(null);

export const MatkakohdeProvider = ({ children }) => {
    const [matkakohdeId, setMatkakohdeId] = useState("-1");

    return (
        <MatkakohdeContext.Provider value={{ matkakohdeId, setMatkakohdeId }}>
            {children}
        </MatkakohdeContext.Provider>
    )
}

export const useMatkakohde = () => useContext(MatkakohdeContext);