import Image from 'next/image';
import placeholderImage from './placeholder.png';
import styles from './onboarding.module.scss';

export default function Onboarding() {
  return (
    <div className={styles['main-content']}>
      {/*placeholder */}
      <div className={styles['image-container']}>
        <Image
          src={placeholderImage}
          alt="Placeholder"
          width={300}
          height={300}
          className={styles.image}
        />
      </div>

      {/* Main text */}
      <div className={styles['text-section']}>
        <h1 className={styles['oswald-heading']}>Welcome to Roarin' Deals!</h1>
        <p className={styles['open-sans-text']}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
        </p>
      </div>
    </div>
  );
}
