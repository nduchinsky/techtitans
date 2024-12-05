import styles from './ViewListingPopup.module.scss';
import CloseButton from '../Buttons/CloseButton/CloseButton';
import checkIfUserIsMobile from '../../../../_utils/checkIfUserIsMobile';
import PostInformation from './PostInformation/PostInformation';
import PostImages from './PostImages/PostImages';

type ViewListingPopupProps = {
    listing: {
      id: number;
      name: string;
      price: string;
      location: string;
      image: string;
    };
    onClose: () => void;
  };

const AddListingPopup = ({ onClose }: ViewListingPopupProps) => {

  const isUserMobile = checkIfUserIsMobile(400);

  const handleCloseClick = () => {
    onClose(); 
  };

  return (
    <>
      <div className={styles.backdrop} />
      <div className={styles.container}>
        <div className={styles.content}>
            <PostInformation />
            <PostImages />
            <div className={styles.closeButton}>
                <CloseButton onClick={handleCloseClick} />
            </div>
        </div>
      </div>
    </>
  );
};

export default AddListingPopup;
