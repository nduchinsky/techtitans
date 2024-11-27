"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string; // Optional phone field
}

interface AuthContextProps {
    token: string | null;
    isAuthenticated: boolean;
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
    validateToken: () => Promise<boolean>;
    fetchUserDetails: () => Promise<void>;
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
                        await fetchUserDetails(storedToken);
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
                headers: {
                    Authorization: `Bearer ${currentToken}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error("Failed to fetch user details. Response body:", errorData);
                throw new Error("Failed to fetch user details");
            }

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const userDetails = await response.json();
                console.log("Fetched user details:", userDetails);

                // Format the phone number for consistent display
                const formatPhoneNumber = (phone: string): string | undefined => {
                    if (!phone || phone.length !== 10) return phone;
                    return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
                };

                const mappedUser: User = {
                    id: userDetails.id,
                    firstName: userDetails.first_name,
                    lastName: userDetails.last_name,
                    email: userDetails.email,
                    phone: userDetails.phone ? formatPhoneNumber(userDetails.phone.toString()) : undefined,
                };

                console.log("Mapped user object:", mappedUser);
                setUser(mappedUser);
            } else {
                console.error("Unexpected response format:", contentType);
                throw new Error("Response is not JSON");
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error fetching user details:", error.message, error.stack);
                throw new Error(error.message);
            } else {
                console.error("An unknown error occurred:", error);
                throw new Error("An unexpected error occurred");
            }
        }
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                isAuthenticated,
                user,
                login,
                logout,
                validateToken: () => validateToken(token || ""),
                fetchUserDetails: () => fetchUserDetails(token || ""),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
