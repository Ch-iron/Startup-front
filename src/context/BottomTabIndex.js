import React, { useState, createContext } from 'react';

const IndexContext = createContext();

const IndexProvider = ({ children }) => {
    const [bottomtabindex, setBottomtabindex] = useState('Stylist');

    return (
        <IndexContext.Provider value={[bottomtabindex, setBottomtabindex]}>
            {children}
        </IndexContext.Provider>
    );
}

export { IndexContext, IndexProvider };