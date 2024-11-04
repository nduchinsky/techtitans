// page.tsx

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

  const openModal = (type: string) => {
    setModalType(type);
    setModalOpen(true);
    setInputValue('');
    setConfirmValue('');
    setError('');
    setFile(null);
  };

  const closeModal = () => setModalOpen(false);

  const handleModalSubmit = async () => {
    if (modalType === 'profileImage' && file) {
      console.log("Uploading profile image:", file);
      // Upload logic here
    } else if (inputValue !== confirmValue) {
      setError("Values do not match."); // Show error if values don’t match
    } else {
      setError('');
      console.log("Submitted value:", inputValue);
      // Process submission (e.g., save changes)
      closeModal();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const getModalTitle = () => {
    switch (modalType) {
      case 'profileImage':
        return 'Change Profile Image';
      case 'username':
        return 'Enter New Username';
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
            <button className={styles.editButton} onClick={() => openModal('username')} style={{ fontSize: '2rem' }}>USERNAME ✏️</button>
            <button className={styles.editButton} onClick={() => openModal('email')} style={{ fontSize: '1rem' }}>📧 username@umsystem.edu ✏️</button>
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
          </div>
        ) : (
          <>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Enter new {modalType}</label>
              <br/>
              <input 
                type="text" 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
                required 
                className={styles.inputBox} 
              />
            </div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Enter new {modalType} again</label>
              <br/>
              <input 
                type="text" 
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
