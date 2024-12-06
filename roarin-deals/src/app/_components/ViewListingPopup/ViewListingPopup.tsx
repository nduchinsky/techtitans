import styles from './ViewListingPopup.module.scss';
import CloseButton from '../Buttons/CloseButton/CloseButton';
import checkIfUserIsMobile from '../../../../_utils/checkIfUserIsMobile';
import PostInformation from './PostInformation/PostInformation';
import PostImages from './PostImages/PostImages';
import { useState } from 'react';
import { div } from 'framer-motion/client';

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

  const [showImages, setShowImages] = useState(false);

  const [showListingInfo, setShowListingInfo] = useState(true);

  const handleImagesClick = () => {
    setShowListingInfo(false);
    setShowImages(true);
  }

  const handleBackClick = () => {
    setShowImages(false);
    setShowListingInfo(true);
  }

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.container}>

      {showListingInfo && (
        <div className={styles.content}>

        {isUserMobile && (
          <div className={styles.buttonsContainer}>
            <button className={styles.contactSellerButton}>Contact Seller</button>
            <button className={styles.contactSellerButton} onClick={handleImagesClick}>See Images</button>
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
      )}

      {showImages && (
        <>
          <PostImages />
          <button className={styles.backButton} onClick={handleBackClick}>Back to Post</button>
        </>
      )}

      
      </div>
    </>
  );
};

export default ViewListingPopup;
