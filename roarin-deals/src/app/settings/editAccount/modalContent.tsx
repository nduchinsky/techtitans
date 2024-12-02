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
  first_name?: string;
  confirmfirst_name?: string;
  last_name?: string;
  confirmlast_name?: string;
  inputValue?: string;
  confirmValue?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  confirmPhone?: string;
  showPassword?: boolean;
  showPasswordConfirm?: boolean;
  setfirst_name?: (value: string) => void;
  setConfirmfirst_name?: (value: string) => void;
  setlast_name?: (value: string) => void;
  setConfirmlast_name?: (value: string) => void;
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

const ModalContent: React.FC<ModalContentProps> = ({
  isModalOpen,
  closeModal,
  handleModalSubmit,
  modalType,
  error,
  first_name,
  confirmfirst_name,
  last_name,
  confirmlast_name,
  inputValue,
  confirmValue,
  phone,
  confirmPhone,
  password,
  confirmPassword,
  showPassword,
  showPasswordConfirm,
  handleFileChange,
  setfirst_name,
  setConfirmfirst_name,
  setlast_name,
  setConfirmlast_name,
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
              value={first_name}
              onChange={(e) => setfirst_name?.(e.target.value)}
              className={styles.inputBox}
              placeholder="Enter new First Name"
              required
            />
          </div>
          <div className={styles.modalField}>
            <label className={styles.modalLabel}>Confirm First Name</label>
            <input
              type="text"
              value={confirmfirst_name}
              onChange={(e) => setConfirmfirst_name?.(e.target.value)}
              className={styles.inputBox}
              placeholder="Confirm new First Name"
              required
            />
          </div>
          <div className={styles.modalField}>
            <label className={styles.modalLabel}>Last Name</label>
            <input
              type="text"
              value={last_name}
              onChange={(e) => setlast_name?.(e.target.value)}
              className={styles.inputBox}
              placeholder="Enter new Last Name"
              required
            />
          </div>
          <div className={styles.modalField}>
            <label className={styles.modalLabel}>Confirm Last Name</label>
            <input
              type="text"
              value={confirmlast_name}
              onChange={(e) => setConfirmlast_name?.(e.target.value)}
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
