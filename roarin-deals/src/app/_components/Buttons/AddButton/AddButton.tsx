"use client"

import { useState } from 'react';
import styles from './AddButton.module.scss';
import { FaPlus } from "react-icons/fa";
import AddListingPopup from '../../AddListingPopup/AddListingPopup';
import popupStyles from '../../AddListingPopup/AddListingPopup.module.scss';
import CloseButton from '../CloseButton/CloseButton';

export default function AddButton(){

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
      };

    return(
        <>
            <div className={styles.buttonContainer} onClick={togglePopup}>
                <FaPlus className={styles.icon} />
            </div>
            {isPopupOpen && (
                <AddListingPopup open={isPopupOpen} onClose={togglePopup}>
                </AddListingPopup>
            )}
        </>  
    );
}