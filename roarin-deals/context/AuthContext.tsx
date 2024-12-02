"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
}

interface AuthContextProps {
    token: string | null;
    isAuthenticated: boolean;
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    validateToken: (tokenToValidate: string) => Promise<boolean>;
    fetchUserDetails: (currentToken: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const storedToken = localStorage.getItem("token");
                if (storedToken) {
                    const isValid = await validateToken(storedToken);
                    if (isValid) {
                        setToken(storedToken);
                        setIsAuthenticated(true);
                        // Fetch user details only if they are not already fetched
                        if (!user) {
                            await fetchUserDetails(storedToken);
                        }
                    } else {
                        logout();
                    }
                }
            } catch (error) {
                console.error("Error initializing authentication:", error);
                logout();
            }
        };

        initializeAuth();
    }, [user]);  // Now using 'user' instead of 'isUserFetched'

    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
        setIsAuthenticated(true);
        setUser(null);  // Ensure user is reset on login
        fetchUserDetails(newToken).catch((error) => {
            console.error("Error fetching user details after login:", error);
            logout();
        });
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
    };

    const validateToken = async (tokenToValidate: string): Promise<boolean> => {
        try {
            const response = await axios.get("http://localhost:3000/api/settings/verify-token", {
                headers: { Authorization: `Bearer ${tokenToValidate}` },
            });
            return response.status === 200;
        } catch (error) {
            console.error("Token validation failed:", error);
            return false;
        }
    };

    const fetchUserDetails = async (currentToken: string) => {
        if (!currentToken) {
            console.error("No token found during user detail fetch");
            throw new Error("User is not authenticated");
        }
    
        try {
            const response = await fetch("http://localhost:3000/api/settings", {
                method: "GET",
                headers: { Authorization: `Bearer ${currentToken}` },
            });
            const data = await response.json();
    
            // Ensure data structure is valid and matches the expected User shape
            console.log("Fetched user data:", data);
    
            // Map API response to match the User interface
            const mappedUser: User = {
                id: data.id ?? 0,  // Fallback values
                first_name: data.first_name ?? '',
                last_name: data.last_name ?? '',
                email: data.email ?? '',
                phone: data.phone ?? '',  // Optional field
            };
    
            // Set the user state
            setUser(mappedUser);
        } catch (error) {
            console.error("Error fetching user details:", error);
            throw new Error("Failed to fetch user details");
        }
    };
    
    

    return (
        <AuthContext.Provider value={{ token, isAuthenticated, user, login, logout, validateToken, fetchUserDetails }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
