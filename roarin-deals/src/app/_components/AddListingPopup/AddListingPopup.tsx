"use client"

import React, { FC, useState, useEffect } from 'react';
import styles from './AddListingPopup.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import CloseButton from '../Buttons/CloseButton/CloseButton';
import PopupImageContainer from './AddImageContainer/AddImageContainer';
import PopupInputs from './PopupInputs/PopupInputs';

interface AddListingPopupProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const AddListingPopup: FC<AddListingPopupProps> = ({ open, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [open]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Match the duration of exit animation
  };

  // animation variants
  const popupVariants = {
    hidden: {
      y: '100%', // Start hidden below
      opacity: 0, // Start invisible
    },
    visible: {
      y: '0%', // Slide to original position
      opacity: 1, // Fade in
      transition: {
        duration: 0.1, // Duration of the animation
      },
    },
    exit: {
      y: '100%', // Slide back down when exiting
      opacity: 0, // Fade out
      transition: {
        duration: 0.3, // Duration of the animation
      },
    },
  };

  const backdropVariants = {
    hidden: {
      opacity: 0, // Start invisible
    },
    visible: {
      opacity: 1, // Fade out
      transition: {
        duration: 0.3, // Duration of the animation
      },
    },
    exit: {
      opacity: 0, // Fade out
      transition: {
        duration: 0.3, // Duration of the animation
      },
    },
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.div
              className={styles.backdrop}
              onClick={handleClose}
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            />
            <motion.div
              className={styles.container}
              variants={popupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className={styles.content}>
                <div>
                  <PopupImageContainer />
                </div>
                <div style={{ width: '100%' }}>
                  <PopupInputs onClick={handleClose} />
                </div>
                <div style={{ marginTop: '-20px' }}>
                  <CloseButton onClick={handleClose} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddListingPopup;
