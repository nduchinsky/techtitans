"use client"

import { useRouter } from 'next/navigation';
import styles from './OnboardingHeaderButtons.module.scss';

export const OnboardingHeaderButtons = () => {
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
            <button className={styles.registerButton} onClick={handleRegisterClick}>Register</button>
        </div>
    );
}