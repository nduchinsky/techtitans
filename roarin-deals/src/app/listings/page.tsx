"use client";

import React, { useState, useEffect } from "react";
import AddButton from "../_components/Buttons/AddButton/AddButton";
import styles from "./show_listining.module.scss";
import LoggedInHeader from "../_components/Headers/LoggedInHeader/LoggedInHeader";

interface Listing {
  id: number;
  title: string;
  price: string;
  location: string;
  image: string;
}

export default function Listings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [listings, setListings] = useState<Listing[]>([]);
  const [error, setError] = useState<string>(""); // New error state

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/listings"); // Ensure your backend URL
        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }
        const data: Listing[] = await response.json();
        setListings(data);
      } catch (error: any) {
        console.error("Failed to fetch listings:", error);
        setError("Failed to load listings.");
      }
    };

    fetchListings();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredListings = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.listingsPage}>
      <LoggedInHeader />
      {error && <p className={styles.error}>{error}</p>} {/* Display error message */}
      <div className={styles.categoryBar}>
        <div className={styles.categoriesBubble}>
          <div className={styles.categoriesWrapper}>
            <button className={styles.categoryButton}>Furniture</button>
            <button className={styles.categoryButton}>Electronics</button>
            <button className={styles.categoryButton}>Books</button>
            <button className={styles.categoryButton}>Clothing</button>
            <button className={styles.categoryButton}>Home Goods</button>
            <button className={styles.categoryButton}>Miscellaneous</button>
          </div>
        </div>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search for products"
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.productsGrid}>
          {filteredListings.map((listing) => (
            <div key={listing.id} className={styles.productCard}>
              <img
                src={listing.image}
                alt={listing.title}
                className={styles.productImage}
              />
              <div className={styles.productDetails}>
                <h3 className={styles.productName}>{listing.title}</h3>
                <p className={styles.productPrice}>{listing.price}</p>
                <p className={styles.productLocation}>{listing.location}</p>
              </div>
            </div>
          ))}
        </div>
        <AddButton />
      </div>
    </div>
  );
}
