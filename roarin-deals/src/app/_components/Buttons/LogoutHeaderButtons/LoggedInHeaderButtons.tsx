"use client"

import { useRouter } from 'next/navigation';
import styles from './LoggedInHeaderButtons.module.scss';

export const LoggedInHeaderButtons = () => {
    const router = useRouter();

    const handleLogoutClick = () => {
      router.push('/');
    };

    return(
        <div className={styles.container}>
            <button className={styles.logoutButton} onClick={handleLogoutClick}>Log Out</button>
            <div className={styles.pfpFrame} />
        </div>
    );
}