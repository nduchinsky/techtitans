"use client";

import { useRouter } from "next/navigation";
import styles from "./LoggedInHeaderButtons.module.scss";
import { useAuth } from "../../../../../context/AuthContext";
import { BsCaretDownFill } from "react-icons/bs";
import { AnimatePresence, motion } from "framer-motion";
import checkIfUserIsMobile from '../../../../../_utils/checkIfUserIsMobile';
import { useEffect, useState } from "react";

export const LoggedInHeaderButtons = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const isUserMobile = checkIfUserIsMobile(400);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the user's profile data, including the profile picture URL
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No authentication token found.");
          return;
        }

        const response = await fetch("http://localhost:3000/api/settings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch profile data.");
          return;
        }

        const data = await response.json();
        console.log("from logged in header:", data);
        setProfileImageUrl(data.profile_image_url || null); // Ensure default fallback
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

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

  const mobileDropdownVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      y: -150,
      x: 20
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
      x: 20,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <div className={styles.container}>
        <div
          className={styles.pfpFrame}
          onClick={handleProfileClick}
          style={{
            backgroundImage: profileImageUrl ? `url(${profileImageUrl})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      <BsCaretDownFill className={styles.dropDownIcon} onClick={handleDropdownClick} />
      <AnimatePresence>
        {dropdownVisible && (
          <motion.div
          variants={isUserMobile ? mobileDropdownVariants : dropdownVariants}
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
