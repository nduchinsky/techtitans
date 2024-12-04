"use client";

import { useRouter } from "next/navigation";
import styles from "./LoggedInHeaderButtons.module.scss";
import { useAuth } from "../../../../../context/AuthContext";
import { BsCaretDownFill } from "react-icons/bs";
import { useState } from "react";

export const LoggedInHeaderButtons = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleDropdownClick = () => {
    setDropdownVisible(true);

    if(dropdownVisible){
      setDropdownVisible(false);
    }
  }

  const handleLogoutClick = () => {
    logout();
    router.push("/");
  };

  const handleProfileClick = () => {
    router.push("/settings/editAccount");
  };

  const handleListingsClick = () => {
    router.push("/listings");
  };

  const handleMyListingsClick = () => {
    router.push("/settings/editAccount");
  };

  return (
    <div className={styles.container}>
      <div className={styles.pfpFrame} onClick={handleProfileClick} />
      <BsCaretDownFill className={styles.dropDownIcon} onClick={handleDropdownClick} />
      {dropdownVisible && (
        <div className={styles.dropdownContainer}>
          <button className={styles.dropdownButton} onClick={handleListingsClick}>View All Listings</button>
          <button className={styles.dropdownButton} onClick={handleProfileClick}>Edit Profile</button>
          <button className={styles.dropdownButton} onClick={handleLogoutClick}>Log Out</button>
        </div>
      )}
    </div>
  );
};
