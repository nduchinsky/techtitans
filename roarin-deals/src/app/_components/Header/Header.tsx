"use client"

import styles from './Header.module.scss';
import { HeaderButtons } from './HeaderButtons/HeaderButtons';
import { useRouter } from 'next/navigation';


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