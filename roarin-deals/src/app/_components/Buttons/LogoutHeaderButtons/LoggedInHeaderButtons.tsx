"use client";

import { useRouter } from "next/navigation";
import styles from "./LoggedInHeaderButtons.module.scss";
import { useAuth } from "../../../../../context/AuthContext";
import { BsCaretDownFill } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

  const dropdownVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      y: -150,
      x: 100
    },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    exit: {
      scale: 0,
      opacity: 0, 
      y: -150,
      x: 100,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <div className={styles.container}>
      <div className={styles.pfpFrame} onClick={handleProfileClick} />
      <BsCaretDownFill className={styles.dropDownIcon} onClick={handleDropdownClick} />
      <AnimatePresence>
        {dropdownVisible && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={styles.dropdownContainer}
          >
            <BsCaretDownFill className={styles.dropdownCaret} />
              <button className={styles.dropdownButton} onClick={handleListingsClick}>View All Listings</button>
              <button className={styles.dropdownButton} onClick={handleProfileClick}>Edit Profile</button>
              <button className={styles.dropdownButton} onClick={handleLogoutClick}>Log Out</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
