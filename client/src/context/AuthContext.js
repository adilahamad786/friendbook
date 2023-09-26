import { createContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({
    token : '',
    isLogedIn : false,
    setLogedIn : (token) => {},
    setLogedOut : () => {},
});


export const AuthContextProvider = (props) => {
    const [token, setToken] = useState('');
    const [isLogedIn, setIsLogedIn] = useState(false);

    const setLogedIn = (token) => {
        Cookies.set('token', token, { expires: 1 });
        setToken(token);
        setIsLogedIn(true);
    }

    const setLogedOut = () => {
        Cookies.remove('token');
        setToken('');
        setIsLogedIn(false);
    }

    return <AuthContext.Provider value={{
        token,
        isLogedIn,
        setLogedIn,
        setLogedOut
    }}>
        {props.children}
    </AuthContext.Provider>
}

export default AuthContext;