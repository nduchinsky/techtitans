import styles from './PostInformation.module.scss'

const PostInformation = () => {
    return(
        <div className={styles.container}>
            <div className={styles.postHeader}>
                <p className={styles.postTitle}>Post Title</p>
                <p className={styles.postPrice}>$0.00</p>
            </div>

            <div className={styles.divider} />

            <div className={styles.nameTag}>
                <div className={styles.pfp} />
                <p className={styles.name}>First Last</p>
            </div>

            <p className={styles.subtitle}>Description</p>
            <p className={styles.plainText}>This is a short description from the database</p>

            <p className={styles.subtitle}>Condition</p>
            <p className={styles.plainText}>Condition Type</p>

            <p className={styles.subtitle}>Pickup Preferences</p>
            <p className={styles.plainText}>Preferences listed from database?</p>

            <button className={styles.contactSellerButton}>Contact Seller</button>

        </div>
    )
}

export default PostInformation;