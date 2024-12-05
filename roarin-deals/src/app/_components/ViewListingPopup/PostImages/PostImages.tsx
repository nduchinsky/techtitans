import styles from './PostImages.module.scss'

const PostImages = () => {
    return(
        <div className={styles.pageContainer}>
            <div className={styles.imageContainer}></div>
            <button className={styles.contactSellerButton}>Contact Seller</button>
        </div>
    )
}

export default PostImages;