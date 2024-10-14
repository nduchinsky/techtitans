"use client"

import { useRouter } from 'next/navigation';
import styles from './OnboardingHeader.module.scss';
import { HeaderButtons } from './OnboardingHeaderButtons/HeaderButtons';

const OnboardingHeader = () => {
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

export default OnboardingHeader;