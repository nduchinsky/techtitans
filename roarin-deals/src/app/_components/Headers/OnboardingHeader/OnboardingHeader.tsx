"use client"

import { HeaderButtons } from './OnboardingHeaderButtons/HeaderButtons';
import { useRouter } from 'next/navigation';
import styles from './OnboardingHeader.module.scss';

export default function Header(){
    const router = useRouter();

    const handleHomeClick = () => {
        router.push('/');
    };

    return(
        <div className={styles.headerContainer}>
            <span className={styles.headerText} onClick={handleHomeClick}>Roarin' Deals</span>
            <div className={styles.buttons}>
                <HeaderButtons />
            </div>
        </div>
    );
}