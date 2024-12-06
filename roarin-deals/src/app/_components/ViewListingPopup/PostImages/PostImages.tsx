import styles from './PostImages.module.scss'

const PostImages = () => {
    return(
        <div className={styles.pageContainer}>
            <div className={styles.imageContainer}></div>
            <div className={styles.buttonContainer}>
                <button className={styles.contactSellerButton}>Contact Seller</button>
            </div>
        </div>
    )
}

export default PostImages;