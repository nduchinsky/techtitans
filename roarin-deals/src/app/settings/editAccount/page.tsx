"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import styles from '../settings.module.scss';
import Modal from '../modal';
import placeholderImage from '../placeholder.png';
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import zxcvbn from 'zxcvbn';

export default function EditAccount() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [confirmValue, setConfirmValue] = useState('');
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmFirstName, setConfirmFirstName] = useState('');
  const [confirmLastName, setConfirmLastName] = useState('');

  const [email, setEmail] = useState(''); // Store the email value

  // Password strength states
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordScore, setPasswordScore] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const openModal = (type: string) => {
    setModalType(type);
    setModalOpen(true);
    setInputValue('');
    setConfirmValue('');
    setError('');
    setFile(null);
    setFirstName('');
    setLastName('');
    if (type === 'email') {
      setInputValue(email.split('@')[0]); // Only set the username part for email modal
      setConfirmValue(email.split('@')[0]);
    }
  };

  const validateInputs = (): boolean => {
    switch (modalType) {
      case 'email':
        if (!/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(`${inputValue}@umsystem.edu`)) {
          setError('Invalid email format.');
          return false;
        }
        break;
  
      case 'phone':
        if (!/^\d{10}$/.test(inputValue)) {
          setError('Phone number must be 10 digits.');
          return false;
        }
        break;
  
      case 'password':
        if (password.length < 8) {
          setError('Password must be at least 8 characters.');
          return false;
        }
        break;
  
      default:
        // For general cases, ensure non-empty input
        if (!inputValue || inputValue.trim() === '') {
          setError(`Please enter a valid ${modalType}.`);
          return false;
        }
        break;
    }
    return true;
  };
  

  const closeModal = () => setModalOpen(false);

  const handleModalSubmit = async () => {
    try {
      // Centralized validation logic
      if (!validateInputs()) return;
  
      let payload: any = {};
      let endpoint = '';
  
      switch (modalType) {
        case 'name':
          // Name validation
          if (firstName !== confirmFirstName || lastName !== confirmLastName) {
            setError('First name or last name do not match.');
            return;
          }
          payload = { firstName, lastName };
          endpoint = '/api/user/updateName';
          break;
  
        case 'email':
          // Email validation
          const newEmail = `${inputValue}@umsystem.edu`;
          if (newEmail !== confirmValue) {
            setError('Email addresses do not match.');
            return;
          }
          payload = { email: newEmail };
          endpoint = '/api/user/updateEmail';
          break;
  
        case 'password':
          // Password validation
          if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
          }
          payload = { password };
          endpoint = '/api/user/updatePassword';
          break;
  
        default:
          setError(`Unsupported modal type: ${modalType}`);
          return;
      }
  
      // Submit to the respective endpoint
      await axios.post(endpoint, payload);
  
      console.log(`${modalType} updated successfully.`);
      closeModal();
    } catch (err) {
      console.error(`Error updating ${modalType}:`, err);
      setError(`Failed to update ${modalType}.`);
    }
  };
  

  const validateInput = (): boolean => {
    if (modalType === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) {
      setError("Invalid email format.");
      return false;
    }

    if (modalType === 'phone' && !/^\d{10}$/.test(inputValue)) {
      setError("Phone number must be 10 digits.");
      return false;
    }

    if (modalType === 'password' && password.length < 8) {
      setError("Password must be at least 8 characters.");
      return false;
    }

    return true;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);

    const result = zxcvbn(pwd);
    setPasswordScore(result.score);
    setPasswordFeedback(result.feedback.warning || result.feedback.suggestions[0] || '');

    // Check if passwords match
    setPasswordsMatch(confirmPassword === pwd);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const confirmPwd = e.target.value;
    setConfirmPassword(confirmPwd);

    setPasswordsMatch(confirmPwd === password);
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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm((prev) => !prev);
  };

  const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(''); // Reset error on file change
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'profileImage':
        return 'Change Profile Image';
      case 'name':
        return 'Enter New Name';
      case 'email':
        return 'Enter New Email';
      case 'phone':
        return 'Enter New Phone Number';
      case 'password':
        return 'Change Password';
      default:
        return '';
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.sidebar}>
        <Link href="/settings/editAccount">
          <button className={styles.activeButton}>Edit account</button>
        </Link>
        <Link href="/settings/myOrders">
          <button>My Orders</button>
        </Link>
        <Link href="/settings/salesHistory">
          <button>Sales History</button>
        </Link>
      </div>

      <div className={styles.contentArea}>
        <div className={styles.profileSection}>
          <div className={styles.profileImageContainer}>
            <Image src={placeholderImage} alt="Profile" width={200} height={200} className={styles.profileImage} />
            <button className={styles.editButton} onClick={() => openModal('profileImage')}>Edit profile image ✏️</button>
          </div>

          <div className={styles.userInfo}>
            <button className={styles.editButton} onClick={() => openModal('name')} style={{ fontSize: '2rem' }}>
              {firstName && lastName ? `${firstName} ${lastName}` : 'USERNAME ✏️'}
            </button>
            <button className={styles.editButton} onClick={() => openModal('email')} style={{ fontSize: '1rem' }}>
              📧 {email ? `${email}` : 'username@umsystem.edu'} ✏️
            </button>
            <button className={styles.editButton} onClick={() => openModal('phone')} style={{ fontSize: '1rem' }}>📱 (xxx) xxx - xxxx ✏️</button>
            <button className={styles.editButton} onClick={() => openModal('password')} style={{ fontSize: '1rem' }}>🔒 Change Password ✏️</button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
        title={getModalTitle()}
        error={error} // Pass error to the modal
      >
        {modalType === 'profileImage' ? (
          <div>
            <p>Change Profile Image</p>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {error && <p className={styles.invalidFileError}>{error}</p>} {/* Show error if any */}
          </div>
        ) : modalType === 'name' ? (
          <>
            <div className={styles.modalField}>
            <label className={styles.modalLabel}>Enter New First Name</label>
            <br />
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className={styles.inputBox}
            />
          </div>
          <div className={styles.modalField}>
            <label className={styles.modalLabel}>Confirm New First Name</label>
            <br />
            <input
              type="text"
              value={confirmFirstName}
              onChange={(e) => setConfirmFirstName(e.target.value)}
              required
              className={styles.inputBox}
            />
          </div>
          <div className={styles.modalField}>
            <label className={styles.modalLabel}>Enter New Last Name</label>
            <br />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className={styles.inputBox}
            />
          </div>
          <div className={styles.modalField}>
            <label className={styles.modalLabel}>Confirm New Last Name</label>
            <br />
            <input
              type="text"
              value={confirmLastName}
              onChange={(e) => setConfirmLastName(e.target.value)}
              required
              className={styles.inputBox}
            />
          </div>

          </>
        ) : modalType === 'email' ? (
          <>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Enter New Email</label>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  required
                  className={styles.inputBox}
                  placeholder="Enter your email"
                />
                <span className={styles.emailDomain}>@umsystem.edu</span>
              </div>
            </div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Confirm New Email</label>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  value={confirmValue}
                  onChange={(e) => setConfirmValue(e.target.value)}
                  required
                  className={styles.inputBox}
                  placeholder="Confirm your email"
                />
                <span className={styles.emailDomain}>@umsystem.edu</span>
              </div>
            </div>
          </>
        ) : modalType === 'password' ? (
          <>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Enter new {modalType}</label>
              <div className={styles.inputGroup}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Enter your password"
                  className={styles.inputBox}
                />
                <span className={styles.passwordVisibilityToggle} onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <div
                className={styles.passwordStrength}
                style={{ color: getStrengthColor(passwordScore) }}
              >
                {passwordFeedback}
              </div>
            </div>
            
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Confirm new {modalType}</label>
              <div className={styles.inputGroup}>
                <input
                  type={showPasswordConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  placeholder="Enter your password again"
                  className={styles.inputBox}
                />
                <span className={styles.passwordVisibilityToggle} onClick={togglePasswordConfirmVisibility}>
                  {showPasswordConfirm ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {!passwordsMatch && <p className={styles.error}>Passwords do not match.</p>}
            </div>
          </>

        ) : (
          <div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Enter new {modalType}</label>
              <br />
              <input
                type={modalType === 'password' ? 'password' : 'text'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
                className={styles.inputBox}
              />
            </div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Confirm new {modalType}</label>
              <br />
              <input
                type={modalType === 'password' ? 'password' : 'text'}
                value={confirmValue}
                onChange={(e) => setConfirmValue(e.target.value)}
                required
                className={styles.inputBox}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
