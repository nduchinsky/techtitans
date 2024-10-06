import styles from './Header.module.scss';

export default function Header(){
    return(
        <div className={styles.headerContainer}>
            <h1 className={styles.headerText}>Roarin Deals</h1>
        </div>
    );
}