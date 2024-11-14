"use client";

import React, { useState } from 'react';
import styles from './Register.module.scss';
import Link from 'next/link';
import PlainHeader from '../_components/Headers/PlainHeader/PlainHeader';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
// @ts-expect-error
import zxcvbn from 'zxcvbn';

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordScore, setPasswordScore] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(prevShowPasswordConfirm => !prevShowPasswordConfirm);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);

    const result = zxcvbn(pwd);
    setPasswordScore(result.score);
    setPasswordFeedback(result.feedback.warning || result.feedback.suggestions[0] || '');

    // Update passwordsMatch state
    setPasswordsMatch(confirmPassword === pwd);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPwd = e.target.value;
    setConfirmPassword(confirmPwd);
    setPasswordsMatch(confirmPwd === password);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Check if passwords match
    if (!passwordsMatch) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    // Check if password strength is sufficient
    if (passwordScore < 3) {
      setErrorMessage('Password is too weak.');
      return;
    }

    // Logic if passwords pass criteria
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:3000/api/register', {
        email,
        firstName,
        lastName,
        password,
        phone
      });
      console.log('Registration successful:', response.data);
      window.location.href = '/login';
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.error || 'An error occurred. Please try again.');
      } else {
        setErrorMessage('An unknown error occurred. Please try again.');
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
            {/* Username Field */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="email">University Email</label>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className={styles.divider}></div>
                <span>@umsystem.edu</span>
              </div>
            </div>

            {/* Password Field with Strength Meter */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="phone">Phone Number</label>
              <div className={styles.inputGroup}>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
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

            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="password">Password</label>
              <div className={styles.passwordInputGroup}>
                <input
                  className={styles.inputBox}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
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
                    Password Strength: {['Too Weak', 'Weak', 'Fair', 'Good', 'Strong'][passwordScore]}
                  </p>
                  {passwordFeedback && (
                    <p className={styles.passwordFeedback}>{passwordFeedback}</p>
                  )}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="password-confirm">Confirm Password</label>
              <div className={styles.passwordInputGroup}>
                <input
                  className={`${styles.inputBox} ${confirmPassword && !passwordsMatch ? styles.mismatch : ''}`}
                  type={showPasswordConfirm ? "text" : "password"}
                  id="password-confirm"
                  placeholder="Enter your password again"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
                <span className={styles.eyeIcon} onClick={togglePasswordConfirmVisibility}>
                  {showPasswordConfirm ? <FaEye /> : <FaEyeSlash />}
                </span>
                {/* Icon Indicator */}
                {confirmPassword && passwordsMatch && (
                  <span className={styles.matchIcon}>
                    <FaCheckCircle color="#00cc44" />
                  </span>
                )}
                {confirmPassword && !passwordsMatch && (
                  <span className={styles.matchIcon}>
                    <FaTimesCircle color="#ff4d4d" />
                  </span>
                )}
              </div>
              {/* Real-Time Password Match Feedback */}
              {confirmPassword && !passwordsMatch && (
                <p className={styles.passwordMismatch}>Passwords do not match.</p>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}

            {/* Register Button */}
            <div className={styles.registerBtnContainer}>
              <button
                type="submit"
                className={styles.registerBtn}
                disabled={!passwordsMatch || passwordScore < 3}
              >
                REGISTER
              </button>
            </div>

            {/* Login Link */}
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
