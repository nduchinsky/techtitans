import styles from './AddListingPopup.module.scss';
import CloseButton from '../Buttons/CloseButton/CloseButton';
import PopupInputs from './PageOne/PopupInputs/PopupInputs';

interface AddListingPopupProps {
  onClose: () => void; // This prop is passed from the parent
}

const AddListingPopup = ({ onClose }: AddListingPopupProps) => {

  const handleCloseClick = () => {
    onClose();  // Call the function passed via props to close the popup
  };

  return (
    <>
      <div className={styles.backdrop} />
      <div className={styles.container}>
        <CloseButton onClick={handleCloseClick} />
        <h1 className={styles.headerText}>Create a Listing</h1>
        <div className={styles.inputContainer}>
          <PopupInputs onClick={handleCloseClick} />
        </div>
      </div>
    </>
  );
};

export default AddListingPopup;
