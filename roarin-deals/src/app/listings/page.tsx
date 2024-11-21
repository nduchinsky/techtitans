"use client";

import React, { useEffect, useState } from "react";
import AddButton from "../_components/Buttons/AddButton/AddButton";
import PlainHeader from "../_components/Headers/PlainHeader/PlainHeader";
import styles from "./show_listining.module.scss";
import { useRouter } from "next/navigation";

export default function Listings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // New state to track if the user is logged in
  const router = useRouter();

  useEffect(() => {
    // Make an API request to check the user session
    const checkSession = async () => {
      try {
        const res = await fetch("/api/protected"); // Protected route to check the session
        const data = await res.json();

        if (res.ok) {
          // User is logged in, set authentication status to true
          setIsAuthenticated(true);
        } else {
          // User is not authenticated, redirect to login page
          setIsAuthenticated(false);
          router.push("/login"); // Redirect to login page
        }
      } catch (err) {
        console.error("Error checking session", err);
        setIsAuthenticated(false); // In case of error, consider the user as not authenticated
        router.push("/login");
      }
    };

    checkSession();
  }, [router]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const mockListings = [
    {
      id: 1,
      name: "Name of Product",
      price: "Price of Product",
      location: "Location of Product",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      name: "Name of Product",
      price: "Price of Product",
      location: "Location of Product",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      name: "Name of Product",
      price: "Price of Product",
      location: "Location of Product",
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 4,
      name: "Name of Product",
      price: "Price of Product",
      location: "Location of Product",
      image: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <div className={styles.listingsPage}>
      <PlainHeader />
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
          {mockListings.map((listing) => (
            <div key={listing.id} className={styles.productCard}>
              <img
                src={listing.image}
                alt={listing.name}
                className={styles.productImage}
              />
              <div className={styles.productDetails}>
                <h3 className={styles.productName}>{listing.name}</h3>
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
