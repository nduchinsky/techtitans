"use client";

import React, { useState, useEffect } from "react";
import AddButton from "../_components/Buttons/AddButton/AddButton";
import styles from "./show_listining.module.scss";
import LoggedInHeader from "../_components/Headers/LoggedInHeader/LoggedInHeader";
import { BsSearch } from "react-icons/bs";
import ViewListingPopup from '../_components/ViewListingPopup/ViewListingPopup';
import axios from 'axios';

export default function Listings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListing, setSelectedListing] = useState<any | null>(null);  // State to manage the selected listing
  const [listings, setListings] = useState<any[]>([]); // State to store listings
  const [userId, setUserId] = useState<number | null>(null); // State to store the current user's ID

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/listings');
        console.log('Fetched listings:', response.data); // Debug log for fetched listings
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    const fetchUserId = () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          const decoded = JSON.parse(jsonPayload);
          console.log('Decoded user ID:', decoded.id); // Debug log for decoded user ID
          setUserId(decoded.id);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    };

    fetchListings();
    fetchUserId();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClickListing = (listing: any) => {
    setSelectedListing(listing);  // Set the selected listing to show the popup
  };

  useEffect(() => {
    console.log('User ID:', userId); // Debug log for user ID
    console.log('Listings:', listings); // Debug log for listings
  }, [userId, listings]);

  const filteredListings = listings.filter(listing => {
    const matchesSearchTerm = listing.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const isNotCreatedByCurrentUser = listing.user_id !== userId;
    console.log(`Listing: ${listing.title}, Matches Search Term: ${matchesSearchTerm}, Is Not Created By Current User: ${isNotCreatedByCurrentUser}`);
    return matchesSearchTerm && isNotCreatedByCurrentUser;
  });

  console.log('Filtered listings:', filteredListings); // Debug log for filtered listings

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
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <div key={listing.id} className={styles.productCard} onClick={() => handleClickListing(listing)} >
                <img
                  src={listing.image}
                  alt={listing.title}
                  className={styles.productImage}
                />
                <div className={styles.productDetails}>
                  <h3 className={styles.productName}>{listing.title}</h3>
                  <p className={styles.productPrice}>${listing.price}</p>
                  <p className={styles.productLocation}>{listing.zip}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No listings found.</p>
          )}
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