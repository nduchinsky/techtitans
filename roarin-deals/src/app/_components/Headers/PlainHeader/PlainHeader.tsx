"use client"

import { useRouter } from 'next/navigation';
import styles from './PlainHeader.module.scss';

const PlainHeader = () => {
    const router = useRouter();

    const handleHomeClick = () => {
        router.push('/');
    };

    return(
        <div className={styles.headerContainer}>
            <span className={styles.headerText} onClick={handleHomeClick}>Roarin' Deals</span>
        </div>
    );
}

export default PlainHeader;