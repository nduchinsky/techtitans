"use client"

import Image from 'next/image';
import placeholderImage from './placeholder.png';
import styles from './onboarding.module.scss';
import Header from '../_components/Headers/OnboardingHeader/OnboardingHeader';
import Link from 'next/link';
import LoggedInHeader from '../_components/Headers/LoggedInHeader/LoggedInHeader';
import { useAuth } from '../../../context/AuthContext';

const Onboarding = () => {

  const { isUserLoggedIn } = useAuth();

  return (
    <div className={styles.pageContainer}>

      {isUserLoggedIn ? (
        <LoggedInHeader />
      ) : (
        <Header />
      )}


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
            To get started, register with the email provided by your university. List items and connect with fellow students to buy and sell effortlessly!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
