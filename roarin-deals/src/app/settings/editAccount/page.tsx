import React from 'react';
import Link from 'next/link';
import styles from '../settings.module.scss';

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
        <h2>Edit account</h2>
        <div className={styles.profileSection}>
          <div className={styles.profileImage}>
            <img src="/path/to/profile-image" alt="Profile" />
            <button className={styles.buttonClass}>Edit profile image ✏️</button>
          </div>
          <div className={styles.userInfo}>
            <h3>USERNAME</h3>
            <p>username@university.edu ✏️</p>
            <p>Phone: (xxx) xxx - xxxx ✏️</p>
            <button className={styles.buttonClass}>Change Password ✏️</button>
          </div>
        </div>
      </div>
    </div>
  );
}
