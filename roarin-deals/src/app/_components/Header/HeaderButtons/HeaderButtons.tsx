"use client"

import styles from './HeaderButtons.module.scss'
import { useRouter } from 'next/navigation';

export const HeaderButtons = () => {

    const router = useRouter();

    const handleLoginClick = () => {
      router.push('/login');
    };
  
    const handleRegisterClick = () => {
      router.push('/register');
    };

    return(
        <div className={styles.buttonContainer}>
            <button className={styles.loginButton}>Login</button>
            <button className={styles.registerButton} onClick={handleRegisterClick}>Register</button>
        </div>
    );
}