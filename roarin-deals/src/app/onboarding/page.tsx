import Image from 'next/image';
import placeholderImage from './placeholder.png';
import styles from './onboarding.module.scss';
import Header from '../_components/Headers/OnboardingHeader/OnboardingHeader';

const Onboarding = () => {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.mainContent}>
        {/* Placeholder */}
        <div className={styles.imageContainer}>
          <Image
            src={placeholderImage}
            alt="Placeholder"
            width={300}
            height={300}
            className={styles.image}
          />
        </div>

        {/* Main text */}
        <div className={styles.textSection}>
          <h1 className={styles.oswaldHeading}>Welcome to Roarin' Deals!</h1>
          <p className={styles.openSansText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
