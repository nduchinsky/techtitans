"use client"

import { useRouter } from 'next/navigation';
import styles from './OnboardingHeader.module.scss';
import { OnboardingHeaderButtons } from '../../Buttons/OnboardingHeaderButtons/OnboardingHeaderButtons';
import logo from '../../../../../public/images/RD_logo.svg'
import Image from 'next/image';
import { useEffect, useState } from 'react';

const OnboardingHeader = () => {
    const [isUserMobile, setIsUserMobile] = useState(false);

    // Checking if the user is on a mobile device
    useEffect(() => {
        const checkIfMobile = () => {
            setIsUserMobile(window.innerWidth < 400);
        };
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    const router = useRouter();

    const handleHomeClick = () => {
        router.push('/');
    };

    return(
        <div className={styles.headerContainer}>

            <div className={styles.titleContainer}>
                <span>
                    <Image src={logo} alt="RD Logo" className={styles.headerImage} />
                </span>
                <span className={styles.headerText} onClick={handleHomeClick}>Roarin' Deals</span>
            </div>

            {!isUserMobile && (
                <div className={styles.buttons}>
                    <OnboardingHeaderButtons />
                </div>
            )}
        </div>
    );
}

export default OnboardingHeader;