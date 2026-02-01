import React, { createContext, useState, useContext } from 'react';

export const BooleanContext = createContext(null);

export const BooleanProvider = ({ children }) => {

    const [totuusarvo, setTotuusarvo] = useState(false);

    return (
        <BooleanContext.Provider value={{ totuusarvo, setTotuusarvo }}>
            {children}
        </BooleanContext.Provider>
    )
}

export const useBoolean = () => useContext(BooleanContext);