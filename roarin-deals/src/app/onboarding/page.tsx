"use client"

import Image from 'next/image';
import harry_s from './harry_s.png';
import styles from './onboarding.module.scss';
import Header from '../_components/Headers/OnboardingHeader/OnboardingHeader';
import LoggedInHeader from '../_components/Headers/LoggedInHeader/LoggedInHeader';
import { useAuth } from '../../../context/AuthContext';
import checkIfUserIsMobile from '../../../_utils/checkIfUserIsMobile';
import { useRouter } from 'next/navigation';

const Onboarding = () => {
  const {isAuthenticated} = useAuth();
  const isUserMobile = checkIfUserIsMobile(400);
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleRegisterClick = () => {
    router.push('/register');
  };

  const handleListingsClick = () => {
    router.push('/listings');
  };

  const handleProfileClick = () => {
    router.push('/');
  };

  return (
    <div className={styles.pageContainer}>

      {isAuthenticated ? (
        <LoggedInHeader />
      ) : (
        <Header />
      )}


      <div className={styles.mainContent}>
        {/* Placeholder */}
        <div className={styles.imageContainer}>
          <Image
            src={harry_s}
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

        {isUserMobile && (
          <>
            {isAuthenticated ? (
              <div className={styles.userButtonContainer}>
                <button className={styles.loginButton} onClick={handleListingsClick}>Listings</button>
                <button className={styles.registerButton} onClick={handleProfileClick}>Profile</button>
              </div>
            ) : (
              <div className={styles.userButtonContainer}>
                <button className={styles.loginButton} onClick={handleLoginClick}>Log In</button>
                <button className={styles.registerButton} onClick={handleRegisterClick}>Register</button>
              </div>
            )}
          </>
        )}


      </div>
    </div>
  );
};

export default Onboarding;
