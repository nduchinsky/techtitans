"use client";

import { useRouter } from "next/navigation";
import styles from "./LoggedInHeader.module.scss";
import logo from "../../../../../public/images/RD_logo.svg";
import Image from "next/image";
import { LoggedInHeaderButtons } from "../../Buttons/LogoutHeaderButtons/LoggedInHeaderButtons";
import { useAuth } from "../../../../../context/AuthContext"; // Importing AuthContext for authentication state
import { useEffect } from "react";

const LoggedInHeader = () => {
  const { isUserLoggedIn, token } = useAuth(); // Use AuthContext for login state
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  useEffect(() => {
    console.log("LoggedInHeader - isUserLoggedIn:", isUserLoggedIn);
    console.log("LoggedInHeader - token:", token);
  }, [isUserLoggedIn, token]);

  // Show the header only if the user is logged in
  if (!isUserLoggedIn) {
    console.log("User not logged in. Hiding header.");
    return null;
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.titleContainer}>
        <span>
          <Image src={logo} alt="RD Logo" width={60} height={60} />
        </span>
        <span className={styles.headerText} onClick={handleHomeClick}>
          Roarin' Deals
        </span>
      </div>
      <LoggedInHeaderButtons />
    </div>
  );
};

export default LoggedInHeader;
