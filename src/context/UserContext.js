import React, { useState, createContext } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user_id, setUser_id] = useState(0);
    const [user_index, setUser_index] = useState(0);
    const [name, setName] = useState('');
    const [nick_name, setNick_name] = useState('');
    const [phone_number, setPhone_number] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState(0);
    const [birth, setBirth] = useState('');
    const [survey_check, setSurvey_check] = useState(0);
    const [loginmodalvisible, setLoginmodalvisible] = useState(true);
    const [login_state, setLogin_state] = useState(0);
    const [login_type, setLogin_type] = useState(0);
    const [login_token, setLogin_token] = useState('');
    const [user_profile_photo, setUser_profile_photo] = useState('');

    const user = {
        info: {
            user_id, user_index, name, nick_name, phone_number, email, gender, birth, survey_check, loginmodalvisible, login_state, login_type, login_token, user_profile_photo
        },
        actions: {
            setUser_id, setUser_index, setName, setNick_name, setPhone_number, setEmail, setGender, setBirth, setSurvey_check, setLoginmodalvisible, setLogin_state, setLogin_type, setLogin_token, setUser_profile_photo,
        }
    }

    return (
        <UserContext.Provider value={[user.info, user.actions]}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };