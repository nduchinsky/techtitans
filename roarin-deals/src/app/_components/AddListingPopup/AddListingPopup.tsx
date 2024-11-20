"use client"

import React, { FC, useState, useEffect } from 'react';
import styles from './AddListingPopup.module.scss';
import { motion, AnimatePresence } from 'framer-motion';
import CloseButton from '../Buttons/CloseButton/CloseButton';
import PopupImageContainer from './PageOne/AddImageContainer/AddImageContainer';
import PopupInputs from './PageOne/PopupInputs/PopupInputs';

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
    onClose();            
  };

  // animation variants
  const popupVariants = {
    hidden: {
      y: '100%',
      opacity: 0, 
    },
    visible: {
      y: '0%', 
      opacity: 1, 
      transition: {
        duration: 0.1,
      },
    },
    exit: {
      y: '100%', 
      opacity: 0, 
      transition: {
        duration: 0.3, 
      },
    },
  };

  const backdropVariants = {
    hidden: {
      opacity: 0, 
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3, 
      },
    },
    exit: {
      opacity: 0, 
      transition: {
        duration: 0.3,
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
