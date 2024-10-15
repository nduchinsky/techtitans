import { div } from "framer-motion/client";
import styles from './AddImageContainer.module.scss'

const PopupImageContainer = () => {
    return(
        <div className={styles.pageContainer}>
            <div className={styles.imageContainer} />
            <div>
                <button className={styles.uploadButton}>Upload Images</button>
            </div>
        </div>
    );
}

export default PopupImageContainer;