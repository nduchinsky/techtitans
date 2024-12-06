"use client"

import { useRouter } from 'next/navigation';
import styles from './OnboardingHeader.module.scss';
import { OnboardingHeaderButtons } from '../../Buttons/OnboardingHeaderButtons/OnboardingHeaderButtons';
import logo from '../../../../../public/images/RD_logo.svg';
import Image from 'next/image';
import checkIfUserIsMobile from '../../../../../_utils/checkIfUserIsMobile';

const OnboardingHeader = () => {
    const isUserMobile = checkIfUserIsMobile(400);

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
                <span className={styles.headerText} onClick={handleHomeClick}>Roarin&apos; Deals</span>
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