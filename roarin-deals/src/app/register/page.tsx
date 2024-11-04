"use client";

import React, { useState } from 'react';
import styles from './Register.module.scss';
import Link from 'next/link';
import PlainHeader from '../_components/Headers/PlainHeader/PlainHeader';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(prevShowPasswordConfirm => !prevShowPasswordConfirm);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // At least one digit, one special character, and it must be 8 characters in length
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.{8,})/;

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Check if password meets the criteria
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        'Password must be at least 8 characters and include a capital letter, a special character, and a number.'
      );
      return;
    }

    // Logic if passwords pass criteria
    setErrorMessage('');

    try {
      const response = await axios.post('/api/register', {
        username,
        password,
        firstName,
        lastName,
      });
      console.log('Registration successful:', response.data);
      alert('Registration successful!');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.error || 'An error occurred. Please try again.');
      } else {
        setErrorMessage('An unknown error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      <PlainHeader />
      <div className={styles.pageContainer}>
        <div className={styles.formContainer}>
          <h2 className={styles.formHeader}>Register</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="username">Username</label>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
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
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className={styles.eyeIcon} onClick={togglePasswordConfirmVisibility}>
                  {showPasswordConfirm ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="firstname">First Name</label>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  id="firstname"
                  placeholder="Enter your First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="lastname">Last Name</label>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  id="lastname"
                  placeholder="Enter your Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            {/* Display error message if it needs one */}
            {errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}

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
