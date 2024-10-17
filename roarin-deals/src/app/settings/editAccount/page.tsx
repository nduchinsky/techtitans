import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../settings.module.scss';
import placeholderImage from '../placeholder.png';

export default function EditAccount() {
  return (
    <div className={styles.settingsContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <Link href="/settings/editAccount">
          <button className={styles.activeButton}>Edit account</button>
        </Link>
        <Link href="/settings/myOrders">
          <button>My Orders</button>
        </Link>
        <Link href="/settings/salesHistory">
          <button>Sales History</button>
        </Link>
      </div>

      {/* Edit Account Content */}
      <div className={styles.contentArea}>
        <div className={styles.profileSection}>
          {/* Profile Image Container with Circle Image */}
          <div className={styles.profileImageContainer}>
            <Image
              src={placeholderImage}
              alt="Profile"
              width={100}
              height={100}
              className={styles.profileImage}
            />

            <button className={`${styles.buttonClass} ${styles.orbitronText}`}>
              <center/>Edit profile image ✏️
            </button>
          </div>

          {/* User Info Section */}
          <div className={styles.userInfo}>
            <h3 className={styles['open-sans-text']}>
              <button className={`${styles.buttonClass} ${styles.orbitronText}`}>
                USERNAME ✏️
              </button>
            </h3>
            <p className={styles['open-sans-text']}>
              <button className={`${styles.buttonClass} ${styles.orbitronText}`}>
                username@university.edu ✏️
              </button>
            </p>
            <p className={styles['open-sans-text']}>
              <button className={`${styles.buttonClass} ${styles.orbitronText}`}>
                Phone: (xxx) xxx - xxxx ✏️
              </button>
            </p>
            <button className={`${styles.buttonClass} ${styles.orbitronText}`}>
              Change Password ✏️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
