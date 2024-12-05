"use client";

import React, { useState } from "react";
import AddButton from "../_components/Buttons/AddButton/AddButton";
import styles from "./show_listining.module.scss";
import LoggedInHeader from "../_components/Headers/LoggedInHeader/LoggedInHeader";
import { BsSearch } from "react-icons/bs";
import ViewListingPopup from '../_components/ViewListingPopup/ViewListingPopup';

export default function Listings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListing, setSelectedListing] = useState<any | null>(null);  // State to manage the selected listing

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClickListing = (listing: any) => {
    setSelectedListing(listing);  // Set the selected listing to show the popup
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
      <LoggedInHeader />
      <div className={styles.categoryBar}>
        <div className={styles.categoriesBubble}>
            <button className={styles.categoryButton}>Furniture</button>
            <button className={styles.categoryButton}>Electronics</button>
            <button className={styles.categoryButton}>Books</button>
            <button className={styles.categoryButton}>Clothing</button>
            <button className={styles.categoryButton}>Home Goods</button>
            <button className={styles.categoryButton}>Misc.</button>
        </div>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search for products"
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
          <span><BsSearch /></span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.productsGrid}>
          {mockListings.map((listing) => (
            <div key={listing.id} className={styles.productCard} onClick={() => handleClickListing(listing)} >
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
        <div className={styles.addButton}>
          <AddButton />
        </div>
      </div>
      {selectedListing && (
        <ViewListingPopup
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}  // Close the popup when the close button is clicked
        />
      )}
    </div>
  );
}