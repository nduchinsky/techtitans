"use client"

import { useRouter } from 'next/navigation';
import styles from './OnboardingHeader.module.scss';
import { OnboardingHeaderButtons } from '../../Buttons/OnboardingHeaderButtons/OnboardingHeaderButtons';

const OnboardingHeader = () => {
    const router = useRouter();

    const handleHomeClick = () => {
        router.push('/');
    };

    return(
        <div className={styles.headerContainer}>
            <span className={styles.headerText} onClick={handleHomeClick}>Roarin' Deals</span>
            <div className={styles.buttons}>
                <OnboardingHeaderButtons />
            </div>
        </div>
    );
}

export default OnboardingHeader;