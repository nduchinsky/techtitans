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
    const [isInitialized, setIsInitialized] = useState(false);

    const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

    useEffect(() => {
        const initializeAuth = async () => {
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                try {
                    const isValid = await validateToken(storedToken);
                    if (isValid) {
                        setToken(storedToken);
                        setIsAuthenticated(true);
                        await fetchUserDetails(storedToken);
                    } else {
                        logout();
                    }
                } catch (error) {
                    console.error("Error during auth initialization:", error);
                    logout();
                }
            }
            setIsInitialized(true);
        };

        initializeAuth();
    }, []);

    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
        setIsAuthenticated(true);
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
            const response = await axios.get(`${BASE_URL}/api/settings/verify-token`, {
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
            throw new Error("Token is missing");
        }

        try {
            const response = await axios.get(`${BASE_URL}/api/settings`, {
                headers: { Authorization: `Bearer ${currentToken}` },
            });
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
            throw new Error("Failed to fetch user details");
        }
    };

    if (!isInitialized) {
        return <div>Loading...</div>;
    }

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
