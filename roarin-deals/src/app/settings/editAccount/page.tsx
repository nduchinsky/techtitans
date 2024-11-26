"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import styles from "../settings.module.scss";
import Modal from "../modal";
import placeholderImage from "../placeholder.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import zxcvbn from "zxcvbn";

export default function EditAccount() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmFirstName, setConfirmFirstName] = useState("");
  const [confirmLastName, setConfirmLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPhone, setConfirmPhone] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordScore, setPasswordScore] = useState(0);
  const [passwordFeedback, setPasswordFeedback] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const getStrengthColor = (score: number): string => {
    switch (score) {
      case 0:
        return "#ff4d4d"; // Red
      case 1:
        return "#ff751a"; // Orange
      case 2:
        return "#ffb31a"; // Yellow
      case 3:
        return "#85e085"; // Light Green
      case 4:
        return "#00cc44"; // Green
      default:
        return "#e0e0e0"; // Grey for unrecognized scores
    }
  };
  

  useEffect(() => {
    const checkAuthentication = async () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        redirectToLogin("No token found. Please log in.");
        return;
      }

      try {
        const response = await axios.post("/api/auth/verifyToken", {
          token: storedToken,
        });
        if (response.status === 200) {
          setToken(storedToken);
        } else {
          redirectToLogin("Invalid token. Please log in.");
        }
      } catch (err) {
        console.error("Token validation error:", err);
        redirectToLogin("Error validating token. Please log in again.");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  const redirectToLogin = (message: string) => {
    alert(message);
    window.location.href = "/login";
  };

  if (isLoading) {
    return <div className={styles.loader}>Loading...</div>;
  }

  if (!token) {
    return null; // Prevent rendering if token is invalid
  }

  const handleModalSubmit = () => {
    switch (modalType) {
      case "email":
        handleEmailSubmit();
        break;
      case "phone":
        handlePhoneSubmit();
        break;
      case "name":
        handleNameSubmit();
        break;
      case "password":
        handlePasswordSubmit();
        break;
      case "profileImage":
        console.log("Profile Image Updated");
        closeModal();
        break;
      default:
        setError("Unsupported operation.");
    }
  };

  const handleEmailSubmit = async () => {
    const updatedEmail = `${inputValue}@umsystem.edu`;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedEmail)) {
      setError("Invalid email format. Ensure the username part is correct.");
      return;
    }

    if (updatedEmail !== confirmValue) {
      setError("Email addresses do not match.");
      return;
    }

    try {
      const response = await axios.put(
        "/api/user/updateEmail",
        { email: updatedEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        console.log("Email updated successfully:", updatedEmail);
        setEmail(updatedEmail); // Update the UI with the new email
        closeModal();
      } else {
        setError(response.data.error || "Failed to update email.");
      }
    } catch (err) {
      console.error("Error updating email:", err);
      setError("An error occurred while updating your email. Please try again.");
    }
  };

  const handlePhoneSubmit = () => {
    if (!/^\d{10}$/.test(phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }
    if (phone !== confirmPhone) {
      setError("Phone numbers do not match.");
      return;
    }
    console.log("Updated Phone Number:", phone);
    closeModal();
  };

  const handlePasswordSubmit = () => {
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    console.log("Updated Password");
    closeModal();
  };

  const handleNameSubmit = () => {
    if (firstName !== confirmFirstName || lastName !== confirmLastName) {
      setError("First name or last name does not match confirmation.");
      return;
    }
    console.log("Updated Name:", { firstName, lastName });
    closeModal();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);

    const result = zxcvbn(pwd);
    setPasswordScore(result.score);
    setPasswordFeedback(result.feedback.suggestions[0] || "");
    setPasswordsMatch(confirmPassword === pwd);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(password === e.target.value);
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const togglePasswordConfirmVisibility = () => setShowPasswordConfirm((prev) => !prev);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log("File selected:", e.target.files[0]);
    }
  };

  const openModal = (type: string) => {
    setModalType(type);
    setModalOpen(true);
    setError("");
    setInputValue("");
    setConfirmValue("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setConfirmFirstName("");
    setLastName("");
    setConfirmLastName("");
  };

  const closeModal = () => {
    setModalType(null);
    setModalOpen(false);
    setError("");
  };

  const getModalTitle = () => {
    switch (modalType) {
      case "email":
        return "Update Email";
      case "phone":
        return "Update Phone Number";
      case "password":
        return "Update Password";
      case "name":
        return "Update Name";
      case "profileImage":
        return "Change Profile Image";
      default:
        return "";
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <div className={styles.sidebar}>
        <Link href="/settings/editAccount">
          <button className={styles.activeButton}>Edit Account</button>
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
            <button className={styles.editButton} onClick={() => openModal("profileImage")}>
              Edit profile image ✏️
            </button>
          </div>
          <div className={styles.userInfo}>
            <button className={styles.editButton} onClick={() => openModal("name")} style={{ fontSize: "2rem" }}>
              {firstName && lastName ? `${firstName} ${lastName}` : "USERNAME ✏️"}
            </button>
            <button className={styles.editButton} onClick={() => openModal("email")} style={{ fontSize: "1rem" }}>
              📧 {email ? `${email}` : "username@umsystem.edu"} ✏️
            </button>
            <button className={styles.editButton} onClick={() => openModal("phone")} style={{ fontSize: "1rem" }}>
              📱 {phone ? phone : "(xxx) xxx - xxxx"} ✏️
            </button>
            <button className={styles.editButton} onClick={() => openModal("password")} style={{ fontSize: "1rem" }}>
              🔒 Change Password ✏️
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleModalSubmit}
        title={getModalTitle()}
        error={error}
      >
        {modalType === "email" ? (
          <>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Enter New Email Username</label>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className={styles.inputBox}
                  placeholder="Enter your email username"
                  required
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
                  className={styles.inputBox}
                  placeholder="Confirm your full email"
                  required
                />
              </div>
            </div>
          </>
        ) : modalType === "phone" ? (
          <>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Enter New Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={styles.inputBox}
                placeholder="Enter 10-digit phone number"
                required
              />
            </div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Confirm New Phone Number</label>
              <input
                type="text"
                value={confirmPhone}
                onChange={(e) => setConfirmPhone(e.target.value)}
                className={styles.inputBox}
                placeholder="Re-enter phone number"
                required
              />
            </div>
          </>
        ) : modalType === "password" ? (
          <>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Enter New Password</label>
              <div className={styles.inputGroup}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  className={styles.inputBox}
                  required
                />
                <span onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              <p
                className={styles.passwordStrength}
                style={{ color: getStrengthColor(passwordScore) }}
              >
                {passwordFeedback}
              </p>
            </div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Confirm New Password</label>
              <div className={styles.inputGroup}>
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={styles.inputBox}
                  required
                />
                <span onClick={togglePasswordConfirmVisibility}>
                  {showPasswordConfirm ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {!passwordsMatch && <p className={styles.error}>Passwords do not match.</p>}
            </div>
          </>
        ) : modalType === "name" ? (
          <>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Enter New First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={styles.inputBox}
                required
              />
            </div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Confirm New First Name</label>
              <input
                type="text"
                value={confirmFirstName}
                onChange={(e) => setConfirmFirstName(e.target.value)}
                className={styles.inputBox}
                required
              />
            </div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Enter New Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={styles.inputBox}
                required
              />
            </div>
            <div className={styles.modalField}>
              <label className={styles.modalLabel}>Confirm New Last Name</label>
              <input
                type="text"
                value={confirmLastName}
                onChange={(e) => setConfirmLastName(e.target.value)}
                className={styles.inputBox}
                required
              />
            </div>
          </>
        ) : null}
      </Modal>
    </div>
  );
}
