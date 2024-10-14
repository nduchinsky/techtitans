"use client";

import React, { useState } from 'react';
import styles from './Login.module.scss';
import Link from 'next/link';
import PlainHeader from '../_components/Headers/PlainHeader/PlainHeader';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  return (
    <>
      <PlainHeader />
      <div className={styles.pageContainer}>
        <div className={styles.formContainer}>
          <h2 className={styles.formHeader}>Login</h2>
          <form>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="username">Username</label>
              <div className={styles.inputGroup}>
                <input type="text" id="username" placeholder="Enter your username" />
                <div className={styles.divider}></div>
                <span>@umsystem.edu</span>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="password">Password</label>
              <div className={styles.passwordInputGroup}>
                <input
                  className={styles.inputBox}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                />
                <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    // Eye Open SVG
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17.5C9.52 17.5 7.5 15.48 7.5 13C7.5 10.52 9.52 8.5 12 8.5C14.48 8.5 16.5 10.52 16.5 13C16.5 15.48 14.48 17.5 12 17.5ZM12 10.5C10.62 10.5 9.5 11.62 9.5 13C9.5 14.38 10.62 15.5 12 15.5C13.38 15.5 14.5 14.38 14.5 13C14.5 11.62 13.38 10.5 12 10.5Z" fill="#333"/>
                    </svg>
                  ) : (
                    // Eye Slash SVG
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C13.62 19.5 15.16 19.11 16.53 18.4L18.34 20.21L19.75 18.8L5.27 4.32L3.86 5.73L5.68 7.55C3.88 8.85 2.48 10.31 1 12C2.73 16.39 7 19.5 12 19.5C15.18 19.5 18.04 18.05 20.14 15.61L21.98 17.45L23.39 16.04L2.61 3.27L1.2 4.68L3.03 6.51C4.15 5.39 5.5 4.5 7 4.5H12ZM12 8.5C14.48 8.5 16.5 10.52 16.5 13C16.5 13.87 16.22 14.68 15.75 15.35L9.63 9.23C10.32 8.75 11.13 8.5 12 8.5ZM7.5 13C7.5 11.62 8.62 10.5 10 10.5C10.87 10.5 11.68 10.75 12.35 11.23L7.5 16.08C7.5 15.18 7.5 14.39 7.5 13Z" fill="#333"/>
                    </svg>
                  )}
                </span>
              </div>
            </div>

            <div className={styles.loginBtnContainer}>
              <button type="submit" className={styles.loginBtn}>LOGIN</button>
            </div>

            <p className={styles.loginText}>
              OR register using <span className={styles.lineBreak} /> 
              <Link href="/register" className={styles.registerLink}>REGISTER</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
