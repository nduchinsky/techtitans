import React, { FC } from 'react';
import styles from './AddListingPopup.module.scss';
import { motion } from 'framer-motion';
import CloseButton from '../Buttons/CloseButton/CloseButton';
import PopupImageContainer from './AddImageContainer/AddImageContainer';
import PopupInputs from './PopupInputs/PopupInputs';

interface AddListingPopupProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const AddListingPopup: FC<AddListingPopupProps> = ({ open, onClose, children }) => {
  // Define motion variants
  const variants = {
    hidden: {
      y: '100%', // Start hidden below
      opacity: 0, // Start invisible
    },
    visible: {
      y: '0%', // Slide to original position
      opacity: 1, // Fade in
      transition: {
        duration: 0.3, // Duration of the animation
      },
    },
    exit: {
      y: '100%', // Slide back down when exiting
      opacity: 0, // Fade out
      transition: {
        duration: 0.2, // Duration of the animation
      },
    },
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center'}}>
      {open && <div className={styles.backdrop} onClick={onClose}></div>}
      <motion.div 
        className={styles.container}
        variants={variants}
        initial="hidden"
        animate={open ? "visible" : "hidden"}
        exit="exit"
      >
        <div className={styles.content}>
             <div>
                <PopupImageContainer />
            </div>
            <div style={{width: '50%'}}>
                <PopupInputs />
            </div>
            <div style={{marginLeft: '90px', marginTop: '-20px'}}>
                <CloseButton />
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AddListingPopup;
