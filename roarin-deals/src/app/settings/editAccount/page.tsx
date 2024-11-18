"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import styles from '../settings.module.scss';
import Modal from '../modal';
import placeholderImage from '../placeholder.png';

export default function EditAccount() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string>('');
  const [inputValue, setInputValue] = useState('');
  const [confirmValue, setConfirmValue] = useState('');
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(''); // Store the email value

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

  const closeModal = () => setModalOpen(false);

  const handleModalSubmit = async () => {
    if (modalType === 'profileImage' && file) {
      // Check file type
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        setError('Only .jpg and .png file types are allowed.');
        return;
      }

      try {
        const formData = new FormData();
        formData.append('file', file);

        // Example API request to upload profile image
        await axios.post('/api/user/uploadProfileImage', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        console.log("Profile image uploaded successfully.");
        closeModal();
      } catch (err) {
        console.error("Error uploading profile image:", err);
        setError("Failed to upload profile image.");
      }
    } else if (modalType === 'name') {
      if (firstName !== confirmValue || lastName !== confirmValue) {
        setError("First name and last name do not match.");
        return;
      }

      try {
        // Concatenate first and last name to update the username
        const fullName = `${firstName} ${lastName}`;
        
        // Example API request to update user's name
        await axios.post('/api/user/updateName', { fullName });

        console.log("Name updated successfully.");
        closeModal();
      } catch (err) {
        console.error("Error updating name:", err);
        setError("Failed to update name.");
      }
    } else if (modalType === 'email') {
      // Update email with the @umsystem.edu domain
      const newEmail = `${inputValue}@umsystem.edu`;

      if (newEmail !== confirmValue) {
        setError("Email addresses do not match.");
        return;
      }

      try {
        // Example API request to update user's email
        await axios.post('/api/user/updateEmail', { email: newEmail });

        console.log("Email updated successfully.");
        closeModal();
      } catch (err) {
        console.error("Error updating email:", err);
        setError("Failed to update email.");
      }
    } else {
      if (inputValue !== confirmValue) {
        setError("Values do not match."); // Show error if values don’t match
        return;
      }

      if (!validateInput()) {
        return; // Prevent submission if validation fails
      }

      try {
        // Example API request to update user details
        const endpoint = `/api/user/update${capitalizeFirstLetter(modalType)}`;
        await axios.post(endpoint, { value: inputValue });

        console.log(`${modalType} updated successfully.`);
        closeModal();
      } catch (err) {
        console.error(`Error updating ${modalType}:`, err);
        setError(`Failed to update ${modalType}.`);
      }
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

    if (modalType === 'password' && inputValue.length < 8) {
      setError("Password must be at least 8 characters.");
      return false;
    }

    return true;
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
                value={confirmValue}
                onChange={(e) => setConfirmValue(e.target.value)}
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
                value={confirmValue}
                onChange={(e) => setConfirmValue(e.target.value)}
                required
                className={styles.inputBox}
              />
            </div>
          </>
        ) : modalType === 'email' ? (
          <>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Enter New Email</label>
              <br />
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  value={inputValue} // Only user part, no domain
                  onChange={(e) => setInputValue(e.target.value)}
                  required
                  className={styles.inputBox}
                  placeholder="Enter your email"
                />
                <div className={styles.divider}></div>
                <span className={styles.emailDomain}>@umsystem.edu</span>
              </div>
            </div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Confirm New Email</label>
              <br />
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  value={confirmValue} // Only user part, no domain
                  onChange={(e) => setConfirmValue(e.target.value)}
                  required
                  className={styles.inputBox}
                  placeholder="Confirm your email"
                />
                <div className={styles.divider}></div>
                <span className={styles.emailDomain}>@umsystem.edu</span>
              </div>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </Modal>
    </div>
  );
}
