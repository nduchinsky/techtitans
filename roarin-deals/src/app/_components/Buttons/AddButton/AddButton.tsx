"use client"

import { useState } from 'react';
import styles from './AddButton.module.scss';
import { FaPlus } from "react-icons/fa";
import AddListingPopup from '../../AddListingPopup/AddListingPopup';
import { AnimatePresence } from 'framer-motion';

export default function AddButton() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(prev => !prev);
    };

    return (
        <>
            <div className={styles.buttonContainer} onClick={togglePopup}>
                <FaPlus className={styles.icon} />
            </div>

            <AnimatePresence>
                {isPopupOpen && (
                    <AddListingPopup
                        key="popup" // key to trigger remounting for the popup
                        onClose={() => setIsPopupOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
