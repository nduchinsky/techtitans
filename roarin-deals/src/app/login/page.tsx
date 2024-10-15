"use client";

import React, { useState } from 'react';
import styles from './Login.module.scss';
import Link from 'next/link';
import PlainHeader from '../_components/Headers/PlainHeader/PlainHeader';
// Import eye icons from react-icons
import { FaEye, FaEyeSlash } from 'react-icons/fa';

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
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
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
