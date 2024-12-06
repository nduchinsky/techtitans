import React, { useState, useEffect, useRef } from "react";
import styles from "./modal.module.scss";
import styleSet from "../settings.module.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Modal from "./modal";

interface ModalContentProps {
  isModalOpen: boolean;
  closeModal: () => void;
  modalType: string;
  error?: string | undefined;
  first_name?: string;
  confirmfirst_name?: string;
  last_name?: string;
  confirmlast_name?: string;
  inputValue?: string;
  confirmValue?: string;
  phone?: string;
  confirmPhone?: string;
  password?: string;
  confirmPassword?: string;
  currentPassword?: string;
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
  setPassword?: (value: string) => void;
  setConfirmPassword?: (value: string) => void;
  setCurrentPassword?: (value: string) => void;
  togglePasswordVisibility?: () => void;
  togglePasswordConfirmVisibility?: () => void;
  getModalTitle: () => string;
  getStrengthColor?: (score: number) => string;
  handlePasswordChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleConfirmPasswordChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordScore?: number;
  passwordFeedback?: string;
  passwordsMatch?: boolean;
  handleModalSubmit: () => Promise<void>; // Add this line
}


const ModalContent: React.FC<ModalContentProps> = ({
  isModalOpen,
  closeModal,
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
  setfirst_name,
  setConfirmfirst_name,
  setlast_name,
  setConfirmlast_name,
  setInputValue,
  setConfirmValue,
  setPhone,
  setConfirmPhone,
  togglePasswordVisibility,
  togglePasswordConfirmVisibility,
  getModalTitle,
  getStrengthColor,
}) => {
  const [validationErrors, setValidationErrors] = useState({
    firstNameError: "",
    lastNameError: "",
    phoneError: "",
    emailError: "",
    passwordError: "",
  });

  const [inputEmail, setInputEmail] = useState(inputValue || "");
  const [confirmEmail, setConfirmEmail] = useState(confirmValue || "");
  const [inputPhone, setInputPhone] = useState(phone || "");
  const [confirmPhoneNumber, setConfirmPhoneNumber] = useState(confirmPhone || "");
  const [inputPassword, setInputPassword] = useState(password || "");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState(confirmPassword || "");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const passwordsMatch = inputPassword === confirmPasswordValue;

  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    return score;
  };

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(inputPassword));
    setValidationErrors((prev) => ({
      ...prev,
      passwordError:
        inputPassword &&
        confirmPasswordValue &&
        (inputPassword !== confirmPasswordValue || passwordStrength < 4)
          ? "Passwords must match and meet strength requirements."
          : "",
    }));
  }, [inputPassword, confirmPasswordValue]);

  useEffect(() => {
    const errors = {
      firstNameError:
        first_name && confirmfirst_name && first_name !== confirmfirst_name
          ? "First names do not match."
          : "",
      lastNameError:
        last_name && confirmlast_name && last_name !== confirmlast_name
          ? "Last names do not match."
          : "",
      phoneError:
        inputPhone && 
        confirmPhoneNumber &&
        (!/^\d{10}$/.test(inputPhone) || inputPhone !== confirmPhoneNumber)
          ? "Phone numbers must match and be 10 digits."
          : "",
      emailError:
        inputEmail && confirmEmail && inputEmail !== confirmEmail
          ? "Emails do not match."
          : "",
      passwordError: validationErrors.passwordError,
    };
    setValidationErrors(errors);
  }, [
    first_name,
    confirmfirst_name,
    last_name,
    confirmlast_name,
    inputPhone,
    confirmPhoneNumber,
    inputEmail,
    confirmEmail,
    validationErrors.passwordError,
  ]);

  const handleSubmit = async () => {
    if (!validationErrors || Object.values(validationErrors).some((error) => error)) {
        alert("Please fix validation errors.");
        return;
    }

    try {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Authentication token is missing. Please log in.");
            return;
        }

        // Send the image URL as part of the request body
        const response = await fetch("http://localhost:3000/api/settings", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email: inputEmail,
                phone: inputPhone,
                currentPassword: inputPassword,
                newPassword: confirmPasswordValue,
                profileImageUrl: image, 
            }),
        });

        if (response.ok) {
            alert("Profile updated successfully!");
            closeModal();
        } else {
            const result = await response.json();
            alert(result.error || "Failed to update profile.");
        }
    } catch (error) {
        alert("An error occurred.");
    }
  };



  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setFileName(file.name);
    }
  };


  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      onSubmit={handleSubmit}
      title={getModalTitle()}
      error={error}
    >
      {modalType === "profileImage" && (
        <div>
          {image ? (
            <button className={styles.uploadFileButton} onClick={handleUploadClick}>
              Choose Different File
            </button>
          ):(
            <button className={styles.uploadFileButton} onClick={handleUploadClick}>
              Choose File
            </button>
          )}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept="image/*"
          />
          {fileName && <p className={styles.fileName}>{fileName}</p>}
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
            {validationErrors.firstNameError && (
              <p className={styles.errorPassword}>{validationErrors.firstNameError}</p>
            )}
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
            {validationErrors.lastNameError && (
              <p className={styles.errorPassword}>{validationErrors.lastNameError}</p>
            )}
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
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
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
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                className={styles.inputBox}
                placeholder="Confirm new email"
                required
              />
              <span className={styles.emailDomain}>@umsystem.edu</span>
            </div>
            {validationErrors.emailError && (
              <p className={styles.errorPassword}>{validationErrors.emailError}</p>
            )}
          </div>
        </>
      )}

      {modalType === "phone" && (
              <>
                <div className={styles.modalField}>
                  <label className={styles.modalLabel}>New Phone Number</label>
                  <input
                    type="tel"
                    value={inputPhone}
                    onChange={(e) => setInputPhone(e.target.value.replace(/\D/g, ''))}  // Allow only digits
                    className={styles.inputBox}
                    placeholder="Enter new phone number"
                    required
                  />
                  {validationErrors.phoneError && (
                    <p className={styles.errorPassword}>{validationErrors.phoneError}</p>
                  )}
                </div>
                <div className={styles.modalField}>
                  <label className={styles.modalLabel}>Confirm Phone Number</label>
                  <input
                    type="tel"
                    value={confirmPhoneNumber}
                    onChange={(e) => setConfirmPhoneNumber(e.target.value.replace(/\D/g, ''))}  // Allow only digits
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
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
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

            {inputPassword && !calculatePasswordStrength(inputPassword) && (
              <p className={styles.passwordFeedback}>
                Password must be at least 8 characters long, contain uppercase, lowercase, numbers, and special characters.
              </p>
            )}

            {inputPassword && (
              <div className={styles.passwordStrength}>
                <div className={styles.strengthBar}>
                  <div
                    className={styles.strengthIndicator}
                    style={{
                      width: `${passwordStrength * 20}%`,
                      backgroundColor: (getStrengthColor ?? (() => '#e0e0e0'))(passwordStrength),
                    }}
                  ></div>
                </div>
                <p className={styles.strengthLabel}>
                  Password Strength:{' '}
                  {['Too Weak', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength]}
                </p>
              </div>
            )}
          </div>

          <div className={styles.modalField}>
            <label className={styles.modalLabel}>Confirm new password</label>
            <div className={styles.inputGroupPassword}>
              <input
                type={showPasswordConfirm ? 'text' : 'password'}
                value={confirmPasswordValue}
                onChange={(e) => setConfirmPasswordValue(e.target.value)}
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

      {modalType === "post-options" && (
        <>
          <button className={styles.submitButton}>Edit Post</button>
          <button className={styles.submitButton}>Delete Post</button>
        </>
      )}

      {modalType !== "post-options" && (
        <button
          type="submit"
          className={styles.submitButton}
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
      )}
    </Modal>
  );
};

export default ModalContent;
