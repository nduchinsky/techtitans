import React from 'react';
import Link from 'next/link';
import styles from '../settings.module.scss';

export default function SalesHistory() {
  return (
    <div className={styles.settingsContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <Link href="/settings/editAccount">
          <button>Edit account</button>
        </Link>
        <Link href="/settings/myOrders">
          <button>My Orders</button>
        </Link>
        <Link href="/settings/salesHistory">
          <button className={styles.activeButton}>Sales History</button>
        </Link>
      </div>

      {/* Sales History Content */}
      <div className={styles.contentArea}>
        <h2 className={styles['open-sans-text']}>Sales History</h2>
      </div>
    </div>
  );
}
