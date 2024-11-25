"use client"

import { useRouter } from 'next/navigation';
import styles from './LoggedInHeader.module.scss';
import logo from '../../../../../public/images/RD_logo.svg'
import Image from 'next/image';
import { LoggedInHeaderButtons } from '../../Buttons/LogoutHeaderButtons/LoggedInHeaderButtons';

const LoggedInHeader = () => {
    const router = useRouter();

    const handleHomeClick = () => {
        router.push('/');
    };

    return(
        <div className={styles.headerContainer}>
            <div className={styles.titleContainer}>
                <span>
                    <Image src={logo} alt="RD Logo" width={60} height={60} />
                </span>
                <span className={styles.headerText} onClick={handleHomeClick}>Roarin' Deals</span>
            </div>
            <LoggedInHeaderButtons />
        </div>
    );
}

export default LoggedInHeader;