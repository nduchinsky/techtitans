import styles from './AddListingPopup.module.scss';
import CloseButton from '../Buttons/CloseButton/CloseButton';
import PopupInputs from './PageOne/PopupInputs/PopupInputs';
import AddImageContainer from './PageOne/AddImageContainer/AddImageContainer';
import checkIfUserIsMobile from '../../../../_utils/checkIfUserIsMobile';
import { motion } from 'framer-motion';

interface AddListingPopupProps {
  onClose: () => void;
}

const AddListingPopup = ({ onClose }: AddListingPopupProps) => {

  const isUserMobile = checkIfUserIsMobile(400);

  const handleCloseClick = () => {
    onClose(); 
  };

  return (
    <>
      <div className={styles.backdrop} />
      <motion.div
        className={styles.container}
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className={styles.closeButton}>
          <CloseButton onClick={handleCloseClick} />
        </div>
        <h1 className={styles.headerText}>Create a Listing</h1>
        <div className={styles.content}>
          {!isUserMobile && (
            <div className={styles.addImageContainer}>
              <AddImageContainer />
            </div>
          )}

          <div className={styles.inputContainer}>
            <PopupInputs onClick={handleCloseClick} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AddListingPopup;
