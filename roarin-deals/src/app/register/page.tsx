"use client";

import React, { useState } from 'react';
import styles from './Register.module.scss';
import Link from 'next/link';
import PlainHeader from '../_components/Headers/PlainHeader/PlainHeader';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

import zxcvbn from 'zxcvbn';
import checkIfUserIsMobile from '../../../_utils/checkIfUserIsMobile';

// Import the profanity filter
import { Filter } from 'bad-words';

const Register: React.FC = () => {
  // Initialize the profanity filter
  const filter = new Filter();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastName, setLastName] = useState('');
  const [lastNameTouched, setLastNameTouched] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordScore, setPasswordScore] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const isUserMobile = checkIfUserIsMobile(400);

  // Error states
  const [emailError, setEmailError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm((prevShowPasswordConfirm) => !prevShowPasswordConfirm);
  };

  // Email validation function
  const validateEmail = (value: string) => {
    if (value.trim() === '') {
      return 'Email is required.';
    }
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value + '@umsystem.edu')) {
      return 'Invalid email format.';
    }
    return '';
  };

  // First Name validation function
  const validateFirstName = (value: string) => {
    if (value.trim() === '') {
      return 'First name is required.';
    }
    if (filter.isProfane(value)) {
      return 'Inappropriate language is not allowed.';
    }
    return '';
  };

  // Last Name validation function
  const validateLastName = (value: string) => {
    if (value.trim() === '') {
      return 'Last name is required.';
    }
    if (filter.isProfane(value)) {
      return 'Inappropriate language is not allowed.';
    }
    return '';
  };

  // Password validation function
  const validatePassword = (value: string) => {
    if (passwordScore < 3) {
      return 'Password is not strong enough.';
    }
    return '';
  };

  // Confirm Password validation function
  const validateConfirmPassword = (value: string) => {
    if (value !== password) {
      return 'Passwords do not match.';
    }
    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailTouched) {
      setEmailError(validateEmail(value));
    }
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    if (firstNameTouched) {
      setFirstNameError(validateFirstName(value));
    }
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    if (lastNameTouched) {
      setLastNameError(validateLastName(value));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);

    const result = zxcvbn(pwd);
    setPasswordScore(result.score);
    setPasswordFeedback(result.feedback.warning || result.feedback.suggestions[0] || '');

    // Update passwordsMatch state
    setPasswordsMatch(confirmPassword === pwd);

    if (passwordTouched) {
      setPasswordError(validatePassword(pwd));
    }
    if (confirmPasswordTouched) {
      setConfirmPasswordError(validateConfirmPassword(confirmPassword));
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPwd = e.target.value;
    setConfirmPassword(confirmPwd);
    setPasswordsMatch(confirmPwd === password);

    if (confirmPasswordTouched) {
      setConfirmPasswordError(validateConfirmPassword(confirmPwd));
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmail(email));
  };

  const handleFirstNameBlur = () => {
    setFirstNameTouched(true);
    setFirstNameError(validateFirstName(firstName));
  };

  const handleLastNameBlur = () => {
    setLastNameTouched(true);
    setLastNameError(validateLastName(lastName));
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
    setPasswordError(validatePassword(password));
  };

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordTouched(true);
    setConfirmPasswordError(validateConfirmPassword(confirmPassword));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Trigger validation for all fields
    setEmailTouched(true);
    setFirstNameTouched(true);
    setLastNameTouched(true);
    setPasswordTouched(true);
    setConfirmPasswordTouched(true);

    const emailErrorMsg = validateEmail(email);
    const firstNameErrorMsg = validateFirstName(firstName);
    const lastNameErrorMsg = validateLastName(lastName);
    const passwordErrorMsg = validatePassword(password);
    const confirmPasswordErrorMsg = validateConfirmPassword(confirmPassword);

    setEmailError(emailErrorMsg);
    setFirstNameError(firstNameErrorMsg);
    setLastNameError(lastNameErrorMsg);
    setPasswordError(passwordErrorMsg);
    setConfirmPasswordError(confirmPasswordErrorMsg);

    // Check if there are any errors
    if (
      emailErrorMsg ||
      firstNameErrorMsg ||
      lastNameErrorMsg ||
      passwordErrorMsg ||
      confirmPasswordErrorMsg
    ) {
      setErrorMessage('Please fix the errors above.');
      return;
    }

    // Proceed with form submission
    try {
      await axios.post('http://localhost:3000/api/register', {
        email,
        firstName,
        lastName,
        password,
      });
      console.log('Registration successful');
      window.location.href = '/login';
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage('An error occurred. Please try again.');
      } else {
        console.error('Unknown error:', error);
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  const getStrengthColor = (score: number) => {
    switch (score) {
      case 0:
        return '#ff4d4d'; // Red
      case 1:
        return '#ff751a'; // Orange
      case 2:
        return '#ffb31a'; // Yellow
      case 3:
        return '#85e085'; // Light Green
      case 4:
        return '#00cc44'; // Green
      default:
        return '#e0e0e0'; // Grey
    }
  };

  return (
    <>
      <PlainHeader />
      <div className={styles.pageContainer}>
        <div className={styles.formContainer}>
          <h2 className={styles.formHeader}>Register</h2>
          <form onSubmit={handleSubmit}>
            {/* University Email Field */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="email">
                University Email
              </label>
              <div className={styles.inputGroup}>
                <input
                  className={emailError ? styles.invalidInput : ''}
                  type="text"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                />
                {!isUserMobile && <div className={styles.divider}></div>}
                <span>@umsystem.edu</span>
              </div>
              {emailError && <p className={styles.fieldError}>{emailError}</p>}
            </div>

            {/* First Name Field */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="firstname">
                First Name
              </label>
              <div className={styles.inputGroup}>
                <input
                  className={firstNameError ? styles.invalidInput : ''}
                  type="text"
                  id="firstname"
                  placeholder="Enter your First Name"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  onBlur={handleFirstNameBlur}
                />
              </div>
              {firstNameError && <p className={styles.fieldError}>{firstNameError}</p>}
            </div>

            {/* Last Name Field */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="lastname">
                Last Name
              </label>
              <div className={styles.inputGroup}>
                <input
                  className={lastNameError ? styles.invalidInput : ''}
                  type="text"
                  id="lastname"
                  placeholder="Enter your Last Name"
                  value={lastName}
                  onChange={handleLastNameChange}
                  onBlur={handleLastNameBlur}
                />
              </div>
              {lastNameError && <p className={styles.fieldError}>{lastNameError}</p>}
            </div>

            {/* Password Field with Strength Meter */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="password">
                Password
              </label>
              <div className={styles.passwordInputGroup}>
                <input
                  className={`${styles.inputBox} ${passwordError ? styles.invalidInput : ''}`}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                />
                <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {passwordError && <p className={styles.fieldError}>{passwordError}</p>}
              {/* Password Strength Meter */}
              {password && (
                <div className={styles.passwordStrength}>
                  <div className={styles.strengthBar}>
                    <div
                      className={styles.strengthIndicator}
                      style={{
                        width: `${(passwordScore + 1) * 20}%`,
                        backgroundColor: getStrengthColor(passwordScore),
                      }}
                    ></div>
                  </div>
                  <p className={styles.strengthLabel}>
                    Password Strength:{' '}
                    {['Too Weak', 'Weak', 'Fair', 'Good', 'Strong'][passwordScore]}
                  </p>
                  {passwordFeedback && (
                    <p className={styles.passwordFeedback}>{passwordFeedback}</p>
                  )}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="password-confirm">
                Confirm Password
              </label>
              <div className={styles.passwordInputGroup}>
                <input
                  className={`${styles.inputBox} ${
                    (confirmPassword && !passwordsMatch) || confirmPasswordError
                      ? styles.invalidInput
                      : ''
                  }`}
                  type={showPasswordConfirm ? 'text' : 'password'}
                  id="password-confirm"
                  placeholder="Enter your password again"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onBlur={handleConfirmPasswordBlur}
                />
                <span className={styles.eyeIcon} onClick={togglePasswordConfirmVisibility}>
                  {showPasswordConfirm ? <FaEye /> : <FaEyeSlash />}
                </span>
                {/* Icon Indicator */}
                {confirmPassword && passwordsMatch && !confirmPasswordError && (
                  <span className={styles.matchIcon}>
                    <FaCheckCircle color="#00cc44" />
                  </span>
                )}
                {((confirmPassword && !passwordsMatch) || confirmPasswordError) && (
                  <span className={styles.matchIcon}>
                    <FaTimesCircle color="#ff4d4d" />
                  </span>
                )}
              </div>
              {confirmPasswordError && (
                <p className={styles.fieldError}>{confirmPasswordError}</p>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

            {/* Register Button */}
            <div className={styles.registerBtnContainer}>
              <button type="submit" className={styles.registerBtn}>
                REGISTER
              </button>
            </div>

            {/* Login Link */}
            <p className={styles.loginText}>
              OR login using <span className={styles.lineBreak} />
              <Link href="/login" className={styles.loginLink}>
                LOGIN
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
