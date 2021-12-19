import React,{ createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import {signInWithEmailAndPassword , onAuthStateChanged , signOut} from 'firebase/auth';
import PropTypes from 'prop-types';


const AuthContext = createContext({
    currentUser: null,
    login: ()=> Promise,
    logout: () => Promise,
})

export const useAuth = () => useContext(AuthContext);

export default function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    //update user from null
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,user=>{
            setCurrentUser(user)
        })

        return()=>{
            unsubscribe();
        }
        
    },[])

    //for login
    function login(email,password){
        return signInWithEmailAndPassword(auth,email,password)
    }

    //for logout
    function logout(){
        return signOut(auth);
    }

    const value = {
        currentUser,
        login,
        logout
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
    }