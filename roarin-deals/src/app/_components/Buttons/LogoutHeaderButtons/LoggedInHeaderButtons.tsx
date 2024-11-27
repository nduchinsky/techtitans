"use client";

import { useRouter } from "next/navigation";
import styles from "./LoggedInHeaderButtons.module.scss";
import { useAuth } from "../../../../../context/AuthContext";

export const LoggedInHeaderButtons = () => {
  const router = useRouter();
  const { setIsUserLoggedIn } = useAuth();

  const handleLogoutClick = () => {
    setIsUserLoggedIn(false);
    localStorage.removeItem("token"); // Clear token from local storage
    router.push("/");
  };

  const handleProfileClick = () => {
    router.push("/settings/editAccount"); // Navigate to the settings page
  };

  return (
    <div className={styles.container}>
      <button className={styles.logoutButton} onClick={handleLogoutClick}>
        Log Out
      </button>
      <div
        className={styles.pfpFrame}
        onClick={handleProfileClick} // Add navigation handler
      />
    </div>
  );
};
