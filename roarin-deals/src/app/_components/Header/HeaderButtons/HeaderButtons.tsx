"use client"

import Link from 'next/link';
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
            <button className={styles.loginButton} onClick={handleLoginClick}>Login</button>
            <button className={styles.registerButton}>Register</button>
        </div>
    );
}