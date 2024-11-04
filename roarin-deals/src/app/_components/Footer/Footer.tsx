import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer(){
    return(
        <div className={styles.footerContainer}>
            <div className={styles.footerText}>
                <p>Roarin' Deals 2024</p>
            </div>
            <div className={styles.footerText}>
                <p>Contact Us</p>
            </div>
            <div className={styles.footerText}>
                <Link href="/faq">
                    <p>Help</p>
                </Link>
            </div>
        </div>
    );
}
