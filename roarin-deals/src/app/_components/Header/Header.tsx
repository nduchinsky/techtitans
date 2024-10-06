import styles from './Header.module.scss';
import { HeaderButtons } from './HeaderButtons/HeaderButtons';

export default function Header(){
    return(
        <div className={styles.headerContainer}>
            <span className={styles.headerText}>Roarin' Deals</span>
            <div className={styles.buttons}>
                <HeaderButtons />
            </div>
        </div>
    );
}