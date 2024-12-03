"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../settings.module.scss';
import LoggedInHeader from "../../_components/Headers/LoggedInHeader/LoggedInHeader";
import placeholderImage from '../placeholder.png'; // Ensure the placeholder image path is correct

export default function SalesHistory() {
  // Sample listings data
  const [listings] = useState([
    { id: 1, title: "Sample Product 1", description: "Description for Product 1", image: placeholderImage },
    { id: 2, title: "Sample Product 2", description: "Description for Product 2", image: placeholderImage },
    { id: 3, title: "Sample Product 3", description: "Description for Product 3", image: placeholderImage },
  ]);

  return (
    <div>
      <LoggedInHeader />
      <div className={styles.settingsContainer}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <Link href="/settings/editAccount">
            <button>Edit Account</button>
          </Link>
          <Link href="/settings/myOrders">
            <button className={styles.activeButton}>My Orders</button>
          </Link>
          <Link href="/settings/salesHistory">
            <button>Sales History</button>
          </Link>
        </div>

        {/* Sales History Content */}
        <div className={styles.contentArea}>
        <div className={styles.description}>
          <h2 className={styles['orbitron-text']}>Previously purchased items</h2>
          <p className={styles['open-sans-text']}>
            You can see which items you have purchased in the past in this section.
          </p>
        </div>
          {/* Listings Section */}
          <div className={styles.listingsSection}>
            <div className={styles.productsGrid}>
              {/* Render each listing */}
              {listings.map((listing, index) => (
                <div key={index} className={styles.productCard}>
                  <Image
                    src={listing.image || placeholderImage}
                    alt={listing.title || "Listing"}
                    width={200}
                    height={150}
                    className={styles.productImage}
                  />
                  <div className={styles.productDetails}>
                    <h3 className={styles.productName}>{listing.title || "Product Name"}</h3>
                    <p className={styles.productLocation}>
                      {listing.description || "Product Description"}
                    </p>
                    <p className={styles.productLocation}>
                      {"Date purchased: XX/XX/XXXX"}
                    </p>
                    <p className={styles.productLocation}>
                      {"Name of seller: XXXX"}
                    </p>
                    <p className={styles.productLocation}>
                      {"Product ID: XXXXXXXX"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
