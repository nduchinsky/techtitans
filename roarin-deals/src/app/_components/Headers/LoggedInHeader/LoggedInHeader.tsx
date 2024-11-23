"use client"

import { useRouter } from 'next/navigation';
import styles from './LoggedInHeader.module.scss';
import logo from '../../../../../public/images/RD_logo.svg'
import Image from 'next/image';
import { LoggedInHeaderButtons } from '../../Buttons/LogoutHeaderButtons/LoggedInHeaderButtons';
import checkIfUserIsMobile from '../../../../../_utils/checkIfUserIsMobile';

const LoggedInHeader = () => {
    const router = useRouter();
    const isUserMobile = checkIfUserIsMobile(400);

    const handleHomeClick = () => {
        router.push('/');
    };

    return(
        <div className={styles.headerContainer}>
            {!isUserMobile && (
                <div className={styles.titleContainer}>
                    <span>
                        <Image src={logo} alt="RD Logo" width={60} height={60} />
                    </span>
                    <span className={styles.headerText} onClick={handleHomeClick}>Roarin' Deals</span>
                </div>
            )}
            <LoggedInHeaderButtons />
        </div>
    );
}

export default LoggedInHeader;