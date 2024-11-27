"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import styles from "../settings.module.scss";
import Modal from "./modal";
import ModalContent from "./modalContent";
import placeholderImage from "../placeholder.png";
import zxcvbn from "zxcvbn";
import { useAuth } from "../../../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function EditAccount() {
    const { isAuthenticated, user, validateToken, logout, fetchUserDetails } = useAuth();
    const router = useRouter();

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [confirmFirstName, setConfirmFirstName] = useState("");
    const [confirmLastName, setConfirmLastName] = useState("");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [confirmPhone, setConfirmPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordScore, setPasswordScore] = useState(0);
    const [passwordFeedback, setPasswordFeedback] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [confirmValue, setConfirmValue] = useState("");

    // Redirect unauthenticated users
    useEffect(() => {
        const checkAuth = async () => {
            const valid = await validateToken();
            if (!valid) {
                router.push("/login");
            }
        };
        checkAuth();
    }, [validateToken, router]);

    // Fetch the latest user details
    useEffect(() => {
        fetchUserDetails().catch((err) =>
            console.error("Failed to fetch user details on mount:", err)
        );
    }, [fetchUserDetails]);

    const openModal = (type: string) => {
        setModalType(type);
        setModalOpen(true);
        resetForm();
    };

    const closeModal = () => {
        setModalType(null);
        setModalOpen(false);
        setError("");
    };

    const resetForm = () => {
        setError("");
        setInputValue("");
        setConfirmValue("");
        setPassword("");
        setConfirmPassword("");
        setFirstName("");
        setConfirmFirstName("");
        setLastName("");
        setConfirmLastName("");
        setPhone("");
        setConfirmPhone("");
    };

    const handleModalSubmit = async () => {
        try {
            switch (modalType) {
                case "email":
                    await handleEmailSubmit();
                    break;
                case "phone":
                    await handlePhoneSubmit();
                    break;
                case "name":
                    await handleNameSubmit();
                    break;
                case "password":
                    await handlePasswordSubmit();
                    break;
                case "profileImage":
                    console.log("Profile Image Updated");
                    break;
                default:
                    throw new Error("Unsupported operation");
            }
            closeModal();
            await fetchUserDetails(); // Refresh user details after a successful update
        } catch (err: any) {
            setError(err.message || "An error occurred. Please try again.");
        }
    };

    const handleEmailSubmit = async () => {
        const updatedEmail = `${inputValue}@umsystem.edu`;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedEmail)) {
            throw new Error("Invalid email format.");
        }
        if (updatedEmail !== confirmValue) {
            throw new Error("Emails do not match.");
        }
        const response = await axios.put(
            "/api/user/updateEmail",
            { email: updatedEmail },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        if (response.status !== 200) {
            throw new Error(response.data.error || "Failed to update email.");
        }
        setEmail(updatedEmail);
    };

    const handlePhoneSubmit = async () => {
        if (!/^\d{10}$/.test(phone)) {
            throw new Error("Phone number must be 10 digits.");
        }
        if (phone !== confirmPhone) {
            throw new Error("Phone numbers do not match.");
        }
        const response = await axios.put(
            "/api/user/updatePhone",
            { phone },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        if (response.status !== 200) {
            throw new Error(response.data.error || "Failed to update phone.");
        }
        setPhone(phone);
    };

    const handleNameSubmit = async () => {
        if (firstName !== confirmFirstName || lastName !== confirmLastName) {
            throw new Error("Name fields do not match.");
        }
        const response = await axios.put(
            "/api/user/updateName",
            { firstName, lastName },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        if (response.status !== 200) {
            throw new Error(response.data.error || "Failed to update name.");
        }
        setFirstName(firstName);
        setLastName(lastName);
    };

    const handlePasswordSubmit = async () => {
        if (password.length < 8) {
            throw new Error("Password must be at least 8 characters.");
        }
        if (password !== confirmPassword) {
            throw new Error("Passwords do not match.");
        }
        const response = await axios.put(
            "/api/user/updatePassword",
            { password },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        if (response.status !== 200) {
            throw new Error(response.data.error || "Failed to update password.");
        }
        console.log("Updated Password");
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pwd = e.target.value;
        setPassword(pwd);
        const result = zxcvbn(pwd);
        setPasswordScore(result.score);
        setPasswordFeedback(result.feedback.suggestions[0] || "");
        setPasswordsMatch(pwd === confirmPassword);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const confirmPwd = e.target.value;
        setConfirmPassword(confirmPwd);
        setPasswordsMatch(password === confirmPwd);
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const togglePasswordConfirmVisibility = () =>
        setShowPasswordConfirm(!showPasswordConfirm);

    const getModalTitle = () => {
        switch (modalType) {
            case "email":
                return "Update Email";
            case "phone":
                return "Update Phone Number";
            case "name":
                return "Update Name";
            case "password":
                return "Change Password";
            case "profileImage":
                return "Change Profile Image";
            default:
                return "";
        }
    };

    const getStrengthColor = (score: number) => {
        const colors = ["#ff4d4d", "#ff751a", "#ffb31a", "#85e085", "#00cc44"];
        return colors[score] || "#e0e0e0";
    };

    if (!isAuthenticated) {
        return <p>Redirecting...</p>;
    }

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
                        <Image
                            src={placeholderImage}
                            alt="Profile"
                            width={200}
                            height={200}
                            className={styles.profileImage}
                        />
                        <button
                            className={styles.editButton}
                            onClick={() => openModal("profileImage")}
                        >
                            Edit profile image ✏️
                        </button>
                    </div>
                    <div className={styles.userInfo}>
                        <button
                            className={styles.editButton}
                            onClick={() => openModal("name")}
                            style={{ fontSize: "2rem" }}
                        >
                            {user?.firstName && user?.lastName
                                ? `${user.firstName} ${user.lastName}`: "USERNAME ✏️"}
                        </button>
                        <button
                            className={styles.editButton}
                            onClick={() => openModal("email")}
                            style={{ fontSize: "1rem" }}
                        >
                            📧 {user?.email || "username@umsystem.edu"} ✏️
                        </button>
                        <button
                            className={styles.editButton}
                            onClick={() => openModal("phone")}
                            style={{ fontSize: "1rem" }}
                        >
                            📱 {user?.phone ? `(${user.phone.toString().slice(0, 3)}) ${user.phone.toString().slice(3, 6)}-${user.phone.toString().slice(6)}` : "(xxx) xxx - xxxx"} ✏️
                        </button>
                        <button
                            className={styles.editButton}
                            onClick={() => openModal("password")}
                            style={{ fontSize: "1rem" }}
                        >
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
                error={error || undefined}
            >
                <ModalContent
                    isModalOpen={isModalOpen}
                    closeModal={closeModal}
                    handleModalSubmit={handleModalSubmit}
                    getModalTitle={getModalTitle}
                    modalType={modalType || ""}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                    confirmValue={confirmValue}
                    setConfirmValue={setConfirmValue}
                    phone={phone}
                    setPhone={setPhone}
                    confirmPhone={confirmPhone}
                    setConfirmPhone={setConfirmPhone}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    firstName={firstName}
                    setFirstName={setFirstName}
                    confirmFirstName={confirmFirstName}
                    setConfirmFirstName={setConfirmFirstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    confirmLastName={confirmLastName}
                    setConfirmLastName={setConfirmLastName}
                    passwordScore={passwordScore}
                    passwordFeedback={passwordFeedback}
                    passwordsMatch={passwordsMatch}
                    handlePasswordChange={handlePasswordChange}
                    handleConfirmPasswordChange={handleConfirmPasswordChange}
                    togglePasswordVisibility={togglePasswordVisibility}
                    togglePasswordConfirmVisibility={togglePasswordConfirmVisibility}
                    getStrengthColor={getStrengthColor}
                    showPassword={showPassword}
                    showPasswordConfirm={showPasswordConfirm}
                />
            </Modal>
        </div>
    );
}
