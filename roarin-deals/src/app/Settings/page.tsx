import React, { useState } from 'react';
import styles from './Settings.module.scss';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('editAccount');

  return (
    <div className={styles.settingsContainer}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <button
          className={activeTab === 'editAccount' ? styles.activeButton : ''}
          onClick={() => setActiveTab('editAccount')}
        >
          Edit account
        </button>
        <button
          className={activeTab === 'myOrders' ? styles.activeButton : ''}
          onClick={() => setActiveTab('myOrders')}
        >
          My Orders
        </button>
        <button
          className={activeTab === 'salesHistory' ? styles.activeButton : ''}
          onClick={() => setActiveTab('salesHistory')}
        >
          Sales History
        </button>
      </div>

      {/* Content */}
      <div className={styles.contentArea}>
        {activeTab === 'editAccount' && (
          <div className={styles.editAccount}>
            <h2>Edit account</h2>
            <div className={styles.profileSection}>
              <div className={styles.profileImage}>
                <img src="/path/to/profile-image" alt="Profile" />
                <button>Edit profile image ✏️</button>
              </div>
              <div className={styles.userInfo}>
                <h3>USERNAME</h3>
                <p>username@university.edu ✏️</p>
                <p>Phone: (xxx) xxx - xxxx ✏️</p>
                <button>Change Password ✏️</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'myOrders' && (
          <div className={styles.myOrders}>
            <h2>My Orders</h2>
            <p>Seller | Date bought | Item code</p>
            <p>[Item description]</p>
            {/* Placeholder for future order items */}
            <div className={styles.placeholder}>?</div>
            <div className={styles.placeholder}>?</div>
            <div className={styles.placeholder}>?</div>
          </div>
        )}

        {activeTab === 'salesHistory' && (
          <div className={styles.salesHistory}>
            <h2>Sales History</h2>
            {/* Placeholder for future sales items */}
            <div className={styles.placeholder}>?</div>
            <div className={styles.placeholder}>?</div>
            <div className={styles.placeholder}>?</div>
          </div>
        )}
      </div>
    </div>
  );
}
