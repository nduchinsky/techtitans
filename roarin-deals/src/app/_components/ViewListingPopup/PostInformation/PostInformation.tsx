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
        const numericPrice = price.replace(/[^\d.]/g, '');
        return `$${Number(numericPrice).toLocaleString()}`;
    };

    const tagArray = tags.split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);

    const containerClassName = tagArray.length > 0 ? styles.tagsContainer : '';

    return(
        <div className={styles.container}>
            <div className={styles.postHeader}>
                <p className={styles.postTitle}>{title}</p>
                <p className={styles.postPrice}>{formatPrice(price)}</p>
            </div>

            <div className={styles.divider} />

            <div className={styles.nameTag}>
                <div className={styles.pfp} />
                <p className={styles.name}>First Last</p>
            </div>

            <p className={styles.subtitle}>Description</p>
            <p className={styles.plainText}>{description}</p>

            <p className={styles.subtitle}>Condition</p>
            <p className={styles.plainText}>{condition}</p>

            <p className={styles.subtitle}>Location</p>
            <p className={styles.plainText}>{location}</p>

            <p className={styles.subtitle}>Tags</p>
            <div className={containerClassName}>
                {tagArray.length > 0
                    ? tagArray.map((tag, index) => (
                        <p key={index} className={styles.tagText}>
                            {tag}
                        </p>
                    ))
                    : <p className={styles.plainText}>None</p>
                }
            </div>
        </div>
    )
}

export default PostInformation;