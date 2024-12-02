"use client";

import { useRouter } from "next/navigation";
import styles from "./LoggedInHeaderButtons.module.scss";
import { useAuth } from "../../../../../context/AuthContext";

export const LoggedInHeaderButtons = () => {
  const router = useRouter();
  const { logout } = useAuth(); // Use logout function from AuthContext

  const handleLogoutClick = () => {
    logout(); // Clear authentication state and token
    router.push("/"); // Redirect to the home page
  };

  const handleProfileClick = () => {
    router.push("/settings/editAccount"); // Navigate to the settings page
  };

  return (
    <div className={styles.container}>
      <button className={styles.logoutButton} onClick={handleLogoutClick}>
        Log Out
      </button>
      <div className={styles.pfpFrame} onClick={handleProfileClick} />
    </div>
  );
};
