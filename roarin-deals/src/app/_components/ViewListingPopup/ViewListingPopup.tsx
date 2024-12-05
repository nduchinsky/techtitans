import styles from './ViewListingPopup.module.scss';
import CloseButton from '../Buttons/CloseButton/CloseButton';
import checkIfUserIsMobile from '../../../../_utils/checkIfUserIsMobile';
import PostInformation from './PostInformation/PostInformation';
import PostImages from './PostImages/PostImages';

type ViewListingPopupProps = {
    listing: {
      id: number;
      title: string;
      description: string;
      price: string;
      condition: string;
      tags: string;
      created_at: string;
      address1: string;
      address2: string | null;
      city: string;
      state: string;
      zip: string;
      user_id: number;
      image: string;  // Added this line
    };
    onClose: () => void;
};

const ViewListingPopup = ({ listing, onClose }: ViewListingPopupProps) => {

  const isUserMobile = checkIfUserIsMobile(400);

  // Add a portal wrapper to mount the popup properly
  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.listingImage}>
            <img src={listing.image || '/placeholder-image.jpg'} alt={listing.title} />
          </div>
          <PostInformation
            title={listing.title}
            price={listing.price}
            location={listing.zip}
            description={listing.description}
            condition={listing.condition}
            tags={listing.tags}
          />
          <div className={styles.closeButton}>
            <CloseButton onClick={onClose} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewListingPopup;
