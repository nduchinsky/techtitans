import styles from './AddImageContainer.module.scss';
import { FiUpload } from "react-icons/fi";

const PopupImageContainer = () => {
    return(
        <div className={styles.pageContainer}>
            <div className={styles.imageContainer}>
                <FiUpload className={styles.icon} />
            </div>
            <div>
                <button className={styles.uploadButton}>Upload Images</button>
            </div>
        </div>
    );
}

export default PopupImageContainer;