import styles from './CloseButton.module.scss';
import { FaTimes } from "react-icons/fa";

interface CloseButtonProps {
    onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
    return(
        <>
            <div className={styles.buttonContainer} onClick={onClick}>
                <FaTimes className={styles.icon} />
            </div>
        </>  
    );
}

export default CloseButton;