"use client";

import React, { useState, useEffect } from "react";
import AddButton from "../_components/Buttons/AddButton/AddButton";
import styles from "./show_listining.module.scss";
import LoggedInHeader from "../_components/Headers/LoggedInHeader/LoggedInHeader";
import { BsSearch } from "react-icons/bs";
import ViewListingPopup from '../_components/ViewListingPopup/ViewListingPopup';
import axios from 'axios';
import { AnimatePresence } from "framer-motion";

export default function Listings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedListing, setSelectedListing] = useState<any | null>(null); 
  const [listings, setListings] = useState<any[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/listings');
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
          console.log('Decoded user ID:', decoded.id);
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
    setSelectedListing(listing);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  const filteredListings = listings.filter(listing => {
    const searchWords = searchTerm.toLowerCase().split(' ').filter(word => word.length > 0);
    
    const matchesSearchTerm = searchWords.length === 0 || searchWords.every(word => 
        listing.title?.toLowerCase().includes(word)
    );
    
    const isNotCreatedByCurrentUser = listing.user_id !== userId;
    const matchesTag = selectedTag ? listing.tags?.toLowerCase().includes(selectedTag.toLowerCase()) : true;
    
    return matchesSearchTerm && isNotCreatedByCurrentUser && matchesTag;
  });

  return (
    <div className={styles.listingsPage}>
      <LoggedInHeader />
      <div className={styles.categoryBar}>
        <div className={styles.categoriesBubble}>
          {['Furniture', 'Electronics', 'Books', 'Clothing', 'Home Goods', 'Misc'].map((tag) => (
            <button
              key={tag}
              className={`${styles.categoryButton} ${selectedTag === tag ? styles.selected : ''}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
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
      <AnimatePresence>
        {selectedListing && (
            <ViewListingPopup
                key={selectedListing.id} 
                listing={selectedListing}
                onClose={() => setSelectedListing(null)}
            />
        )}
      </AnimatePresence>
    </div>
  );
}