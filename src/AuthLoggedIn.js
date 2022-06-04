import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
const AuthContext = createContext();

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(undefined);

    async function getLoggedIn(){
         // const loggedInRes = await axios.get("http://localhost:9000/loggedIn");
        const loggedInRes = await axios.get("https://whatsap-mern-clone.herokuapp.com/loggedIn");
        setLoggedIn(loggedInRes.data)
    }

    useEffect(() => {
        getLoggedIn();
    }, []);
    return (
        <AuthContext.Provider value={{loggedIn, getLoggedIn}}>
           {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export {AuthContextProvider};