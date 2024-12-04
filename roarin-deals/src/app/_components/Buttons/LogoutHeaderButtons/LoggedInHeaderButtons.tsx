"use client";

import { useRouter } from "next/navigation";
import styles from "./LoggedInHeaderButtons.module.scss";
import { useAuth } from "../../../../../context/AuthContext";

export const LoggedInHeaderButtons = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogoutClick = () => {
    logout();
    router.push("/");
  };

  const handleProfileClick = () => {
    router.push("/settings/editAccount");
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
