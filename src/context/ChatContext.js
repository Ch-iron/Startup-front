import React, { useState, createContext } from 'react';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [fcmtoken, setFcmtoken] = useState('');
    const [isread_exist, setIsread_exist] = useState(0)

    return (
        <ChatContext.Provider value={[fcmtoken, setFcmtoken, isread_exist, setIsread_exist]}>
            {children}
        </ChatContext.Provider>
    );
}

export { ChatContext, ChatProvider };