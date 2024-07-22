import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if user data is saved in localStorage
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    const loginUser = async ({ username, password }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}api/token/`, {
                username,
                password,
            });
            if (response.status === 200) {
                // Store the token or user info as needed
                // Redirect to the desired page
                localStorage.setItem('token', response.data.access);
    
                const userResponse = await axios.get(`${import.meta.env.VITE_API_URL}api/users/me/`, {
                    headers: {
                        Authorization: `Bearer ${response.data.access}`,
                    },
                });
                    
                login(userResponse.data)
            }
        } catch (error) {
            console.error('There was an error logging in!', error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, loginUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
