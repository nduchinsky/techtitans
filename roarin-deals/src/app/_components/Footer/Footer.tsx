import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer(){
    return(
        <div className={styles.footerContainer}>
            <div className={styles.footerText}>
                <p>Roarin&apos; Deals 2024</p>
            </div>
            <div className={styles.footerText}>
                <Link href="/contactUs">
                    <p>Contact Us</p>
                </Link>
            </div>
            <div className={styles.footerText}>
                <Link href="/faq">
                    <p>Help</p>
                </Link>
            </div>
        </div>
    );
}
