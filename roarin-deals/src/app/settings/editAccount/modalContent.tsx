import React, { useState } from "react";
import Modal from "./modal"; // Assuming a Modal component exists
import styles from "./modal.module.scss";
import styleSet from "../settings.module.scss";

import { FaEye, FaEyeSlash } from "react-icons/fa";

interface ModalContentProps {
  isModalOpen: boolean;
  closeModal: () => void;
  handleModalSubmit: () => void;
  modalType: string;
  error?: string | undefined;
  firstName?: string;
  confirmFirstName?: string;
  lastName?: string;
  confirmLastName?: string;
  inputValue?: string;
  confirmValue?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  confirmPhone?: string;
  showPassword?: boolean;
  showPasswordConfirm?: boolean;
  setFirstName?: (value: string) => void;
  setConfirmFirstName?: (value: string) => void;
  setLastName?: (value: string) => void;
  setConfirmLastName?: (value: string) => void;
  setInputValue?: (value: string) => void;
  setConfirmValue?: (value: string) => void;
  setPhone?: (value: string) => void;
  setConfirmPhone?: (value: string) => void;
  setPassword?: (value: string) => void; // Add this
  setConfirmPassword?: (value: string) => void; // Add this
  handlePasswordChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirmPasswordChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  togglePasswordVisibility?: () => void;
  togglePasswordConfirmVisibility?: () => void;
  getModalTitle: () => string;
  getStrengthColor?: (score: number) => string;
  handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Added this
  passwordScore?: number; // Added this
  passwordFeedback?: string;
  passwordsMatch?: boolean;
}

const defaultStrengthColor = (score: number): string => {
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




const ModalContent: React.FC<ModalContentProps> = ({
  isModalOpen,
  closeModal,
  handleModalSubmit,
  modalType,
  error,
  firstName,
  confirmFirstName,
  lastName,
  confirmLastName,
  inputValue,
  confirmValue,
  phone,
  confirmPhone,
  password,
  confirmPassword,
  showPassword,
  showPasswordConfirm,
  handleFileChange,
  setFirstName,
  setConfirmFirstName,
  setLastName,
  setConfirmLastName,
  setInputValue,
  setConfirmValue,
  setPhone,
  setConfirmPhone,
  handlePasswordChange,
  handleConfirmPasswordChange,
  togglePasswordVisibility,
  togglePasswordConfirmVisibility,
  getModalTitle,
  getStrengthColor,
  passwordFeedback,
  passwordsMatch,
  passwordScore = 0, // Default value
}) => {
  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      onSubmit={handleModalSubmit}
      title={getModalTitle()}
      error={error}
    >
      {modalType === "profileImage" && (
        <div>
          <label className={styles.modalLabel}>Change Profile Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {error && <p className={styleSet.invalidFileError}>{error}</p>}
        </div>
      )}
  
      {modalType === "name" && (
        <>
          <div className={styles.modalField}>
            <label className={styles.modalLabel}>Enter new First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName?.(e.target.value)}
              className={styles.inputBox}
              placeholder="Enter new First Name"
              required
            />
          </div>
          <div className={styles.modalField}>
            <label className={styles.modalLabel}>Confirm First Name</label>
            <input
              type="text"
              value={confirmFirstName}
              onChange={(e) => setConfirmFirstName?.(e.target.value)}
              className={styles.inputBox}
              placeholder="Confirm new First Name"
              required
            />
          </div>
          <div className={styles.modalField}>
            <label className={styles.modalLabel}>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName?.(e.target.value)}
              className={styles.inputBox}
              placeholder="Enter new Last Name"
              required
            />
          </div>
          <div className={styles.modalField}>
            <label className={styles.modalLabel}>Confirm Last Name</label>
            <input
              type="text"
              value={confirmLastName}
              onChange={(e) => setConfirmLastName?.(e.target.value)}
              className={styles.inputBox}
              placeholder="Confirm new Last Name"
              required
            />
          </div>
        </>
      )}
  
      {modalType === "email" && (
        <>
          <div className={styles.modalEmailField}>
            <label className={styles.modalLabel}>New Email</label>
            <div className={styles.inputGroup}>
              <input
                type="email"
                value={inputValue}
                onChange={(e) => setInputValue?.(e.target.value)}
                className={styles.inputBox}
                placeholder="Enter new email"
                required
              />
              <span className={styles.emailDomain}>@umsystem.edu</span>
            </div>
          </div>
          <div className={styles.modalField}>
            <label className={styles.modalLabel}>Confirm Email</label>
            <div className={styles.inputGroup}>
              <input
                type="email"
                value={inputValue}
                onChange={(e) => setInputValue?.(e.target.value)}
                className={styles.inputBox}
                placeholder="Confirm new email"
                required
              />
              <span className={styles.emailDomain}>@umsystem.edu</span>
            </div>
          </div>
        </>
      )}
  
      {modalType === "phone" && (
        <>
          <div className={styles.modalField}>
            <label className={styles.modalLabel}>New Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone?.(e.target.value)}
              className={styles.inputBox}
              placeholder="Enter new phone number"
              required
            />
          </div>
          <div className={styles.modalField}>
            <label className={styles.modalLabel}>Confirm Phone Number</label>
            <input
              type="tel"
              value={confirmPhone}
              onChange={(e) => setConfirmPhone?.(e.target.value)}
              className={styles.inputBox}
              placeholder="Confirm new phone number"
              required
            />
          </div>
        </>
      )}
  
      {modalType === "password" && (
        <>
          <div className={styles.modalField}>
            <label className={styles.modalLabel}>Enter new password</label>
            <div className={styles.inputGroupPassword}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                required
                placeholder="Enter your password"
                className={styles.inputBoxPassword}
              />
              <span
                className={styles.passwordVisibilityTogglePassword}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            { password && (
            <div className={styles.passwordStrength}>
              <div className={styles.strengthBar}>
                <div
                  className={styles.strengthIndicator}
                  style={{
                    width: `${(passwordScore + 1) * 20}%`,
                    backgroundColor: (getStrengthColor ?? (() => '#e0e0e0'))(passwordScore),
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
  
          <div className={styles.modalField}>
            <label className={styles.modalLabel}>Confirm new password</label>
            <div className={styles.inputGroupPassword}>
              <input
                type={showPasswordConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
                placeholder="Enter your password again"
                className={styles.inputBoxPassword}
              />
              <span
                className={styles.passwordVisibilityTogglePassword}
                onClick={togglePasswordConfirmVisibility}
              >
                {showPasswordConfirm ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {!passwordsMatch && (
              <p className={styles.errorPassword}>Passwords do not match.</p>
            )}
          </div>
        </>
      )}
    </Modal>
  );
};

export default ModalContent;
