"use client";

import React, { useState } from 'react';
import styles from './Login.module.scss';
import Link from 'next/link';
import PlainHeader from '../_components/Headers/PlainHeader/PlainHeader';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const emailWithoutDomain = email.split('@')[0];
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: emailWithoutDomain, password })
      });

      console.log('Response status:', response.status);

      const contentType = response.headers.get('content-type');
      console.log('Content-Type:', contentType);

      if (response.ok && contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setIsUserLoggedIn(true);
        router.push('/listings');
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error('There was an error logging you in. Please try again.');
      setError('An unexpected error occurred');
    }
  };

  return (
    <>
      <PlainHeader />
      <div className={styles.pageContainer}>
        <div className={styles.formContainer}>
          <h2 className={styles.formHeader}>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="username">University Email</label>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Capture email input
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
                  onChange={(e) => setPassword(e.target.value)} // Capture password input
                />
                <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            {error && <p className={styles.error}>{error}</p>}

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
