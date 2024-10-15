import styles from './CloseButton.module.scss';
import { FaTimes } from "react-icons/fa";


export default function CloseButton(){
    return(
        <>
            <div className={styles.buttonContainer}>
                <FaTimes className={styles.icon} />
            </div>
        </>  
    );
}