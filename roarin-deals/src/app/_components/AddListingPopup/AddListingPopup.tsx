import styles from './AddListingPopup.module.scss';
import CloseButton from '../Buttons/CloseButton/CloseButton';
import PopupInputs from './PageOne/PopupInputs/PopupInputs';
import AddImageContainer from './PageOne/AddImageContainer/AddImageContainer';
import checkIfUserIsMobile from '../../../../_utils/checkIfUserIsMobile';

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
      <div className={styles.container}>
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
      </div>
    </>
  );
};

export default AddListingPopup;
