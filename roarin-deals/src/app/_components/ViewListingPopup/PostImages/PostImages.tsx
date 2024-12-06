import styles from './PostImages.module.scss'
import checkIfUserIsMobile from '../../../../../_utils/checkIfUserIsMobile';

const PostImages = () => {

    const isUserMobile = checkIfUserIsMobile(400);

    return(
        <div className={styles.pageContainer}>
            <div className={styles.imageContainer}></div>

            {!isUserMobile && (
                <div className={styles.buttonContainer}>
                    <button className={styles.contactSellerButton}>Contact Seller</button>
                </div>
            )}
        </div>
    )
}

export default PostImages;