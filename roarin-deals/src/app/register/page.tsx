"use client"

import React, { useState } from 'react';
import styles from './Register.module.scss';
import Link from 'next/link';
import PlainHeader from '../_components/Headers/PlainHeader/PlainHeader';
// Import eye icons from react-icons
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(prevShowPasswordConfirm => !prevShowPasswordConfirm);
  };

  return (
    <>
      <PlainHeader />
      <div className={styles.pageContainer}>
        <div className={styles.formContainer}>
          <h2 className={styles.formHeader}>Register</h2>
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

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="password-confirm">Confirm Password</label>
              <div className={styles.passwordInputGroup}>
                <input
                  className={styles.inputBox}
                  type={showPasswordConfirm ? "text" : "password"}
                  id="password-confirm"
                  placeholder="Enter your password again"
                />
                <span className={styles.eyeIcon} onClick={togglePasswordConfirmVisibility}>
                  {showPasswordConfirm ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className={styles.registerBtnContainer}>
              <button type="submit" className={styles.registerBtn}>REGISTER</button>
            </div>

            <p className={styles.loginText}>
              OR login using <span className={styles.lineBreak} />
              <Link href="/login" className={styles.loginLink}>LOGIN</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
