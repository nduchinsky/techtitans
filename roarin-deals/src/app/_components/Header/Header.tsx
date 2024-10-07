"use client"

import styles from './Header.module.scss';
import { HeaderButtons } from './HeaderButtons/HeaderButtons';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Header(){
    const router = useRouter();

    const handleHomeClick = () => {
        router.push('/');
    };

    return(
        <div className={styles.headerContainer}>
            {/* <Image 
                src="/images/mizzou_logo.svg"
                alt="Mizzou Logo"
                width={70}
                height={70}
                className={styles.headerImage}
            /> */}
            <span className={styles.headerText} onClick={handleHomeClick}>Roarin' Deals</span>
            <div className={styles.buttons}>
                <HeaderButtons />
            </div>
        </div>
    );
}