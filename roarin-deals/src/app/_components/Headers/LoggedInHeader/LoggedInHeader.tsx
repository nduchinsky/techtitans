"use client";

import { useRouter } from "next/navigation";
import styles from "./LoggedInHeader.module.scss";
import logo from "../../../../../public/images/RD_logo.svg";
import Image from "next/image";
import { LoggedInHeaderButtons } from "../../Buttons/LogoutHeaderButtons/LoggedInHeaderButtons";
import { useAuth } from "../../../../../context/AuthContext";
import { useEffect } from "react";
import checkIfUserIsMobile from '../../../../../_utils/checkIfUserIsMobile';

const LoggedInHeader = () => {
    const { isAuthenticated, user, validateToken, logout, token } = useAuth();
    const router = useRouter();
    const isUserMobile = checkIfUserIsMobile(400);

    const handleHomeClick = () => {
        router.push("/");
    };

    useEffect(() => {
        const checkAuthentication = async () => {
            if (token) {
                const isValid = await validateToken(token);
                if (!isValid) {
                    console.warn("Token validation failed. Logging out...");
                    logout();
                    router.push("/");
                }
            } else {
                console.warn("No token found. Logging out...");
                logout();
                router.push("/");
            }
        };

        checkAuthentication();
    }, [token, validateToken, logout, router]);

    useEffect(() => {
        console.log("LoggedInHeader - isAuthenticated:", isAuthenticated);
        console.log("LoggedInHeader - user:", user);
    }, [isAuthenticated, user]);

    // Show the header only if the user is authenticated
    if (!isAuthenticated) {
        console.log("User is not authenticated. Hiding header.");
        return null;
    }

    return (
        <div className={styles.headerContainer}>
            {!isUserMobile && (
                <div className={styles.titleContainer}>
                    <span>
                        <Image src={logo} alt="RD Logo" width={60} height={60} />
                    </span>
                    <span className={styles.headerText} onClick={handleHomeClick}>Roarin&apos; Deals</span>
                </div>
            )}
            <LoggedInHeaderButtons />
        </div>
    );
};

export default LoggedInHeader;
