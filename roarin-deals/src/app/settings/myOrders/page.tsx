import React from 'react';
import Link from 'next/link';
import styles from '../settings.module.scss';

export default function MyOrders() {
  return (
    <div className={styles.settingsContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <Link href="/settings/editAccount">
          <button>Edit account</button>
        </Link>
        <Link href="/settings/myOrders">
          <button className={styles.activeButton}>My Orders</button>
        </Link>
        <Link href="/settings/salesHistory">
          <button>Sales History</button>
        </Link>
      </div>

      {/* My Orders Content */}
      <div className={styles.contentArea}>
        <h2 className={styles['open-sans-text']}>My Orders</h2>
        <p className={styles['open-sans-text']}>Seller | Date bought | Item code</p>
        <p className={styles['open-sans-text']}>[Item description]</p>
      </div>
    </div>
  );
}
