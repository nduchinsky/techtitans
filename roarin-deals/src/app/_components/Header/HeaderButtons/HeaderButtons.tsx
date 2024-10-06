import styles from './HeaderButtons.module.scss'

export const HeaderButtons = () => {
    return(
        <div className={styles.buttonContainer}>
            <button className={styles.loginButton}>Login</button>
            <button className={styles.registerButton}>Register</button>
        </div>
    );
}