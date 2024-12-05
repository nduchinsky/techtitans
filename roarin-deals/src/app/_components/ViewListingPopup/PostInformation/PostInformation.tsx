import styles from './PostInformation.module.scss'

interface PostInformationProps {
    title: string;
    price: string;
    location: string;
    description: string;
    condition: string;
    tags: string;
}

const PostInformation = ({ title, price, location, description, condition, tags }: PostInformationProps) => {
    const formatPrice = (price: string) => {
        // Remove any non-numeric characters except decimal point
        const numericPrice = price.replace(/[^\d.]/g, '');
        // Parse the price and format with commas
        return `$${Number(numericPrice).toLocaleString()}`;
    };

    return(
        <div className={styles.container}>
            <div className={styles.postHeader}>
                <p className={styles.postTitle}>{title}</p>
                <p className={styles.postPrice}>{formatPrice(price)}</p>
            </div>

            <div className={styles.divider} />

            <div className={styles.nameTag}>
                <div className={styles.pfp} />
                <p className={styles.name}>Location: {location}</p>
            </div>

            <p className={styles.subtitle}>Description</p>
            <p className={styles.plainText}>{description}</p>

            <p className={styles.subtitle}>Condition</p>
            <p className={styles.plainText}>{condition}</p>

            <p className={styles.subtitle}>Tags</p>
            <p className={styles.plainText}>{tags}</p>

            <button className={styles.contactSellerButton}>Contact Seller</button>
        </div>
    )
}

export default PostInformation;