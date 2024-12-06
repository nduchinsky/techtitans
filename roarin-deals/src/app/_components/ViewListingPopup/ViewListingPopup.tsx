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
      zip: string;
      user_id: number;
      image: string;
    };
    onClose: () => void;
};

const ViewListingPopup = ({ listing, onClose }: ViewListingPopupProps) => {

  const isUserMobile = checkIfUserIsMobile(400);

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.container}>
        <div className={styles.content}>

          {isUserMobile && (
            <div className={styles.buttonsContainer}>
              <button className={styles.contactSellerButton}>Contact Seller</button>
              <button className={styles.contactSellerButton}>See Images</button>
            </div>
          )}

          <PostInformation
            title={listing.title}
            price={listing.price}
            location={listing.zip}
            description={listing.description}
            condition={listing.condition}
            tags={listing.tags}
          />
          {!isUserMobile && (
            <PostImages />
          )}
          <div className={styles.closeButton}>
            <CloseButton onClick={onClose} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewListingPopup;
