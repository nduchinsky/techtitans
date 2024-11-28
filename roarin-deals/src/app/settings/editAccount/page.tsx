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
    const { isAuthenticated, user, validateToken, logout, fetchUserDetails, token } = useAuth();
    const router = useRouter();

    // State hooks to manage various fields and modal states
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [first_name, setfirst_name] = useState(user?.first_name || "");
    const [last_name, setlast_name] = useState(user?.last_name || "");
    const [confirmfirst_name, setConfirmfirst_name] = useState("");
    const [confirmlast_name, setConfirmlast_name] = useState("");
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

    const [isUserFetched, setIsUserFetched] = useState(false); // Track if user data is fetched
    const [loading, setLoading] = useState(true); // Loading state to handle async fetch

    // Log user data to check if it's being updated properly
    useEffect(() => {
        console.log("User data:", user); // Check if user is being updated
    }, [user]);

    // Token validation: only called once, when the component mounts or when token changes
    useEffect(() => {
        const checkAuth = async () => {
            if (token) {
                const isValid = await validateToken(token); // Pass the token for validation
                if (!isValid) {
                    console.warn("Token validation failed. Logging out...");
                    logout();
                    router.push("/login");
                }
            } else {
                console.warn("No token found. Logging out...");
                logout();
                router.push("/login");
            }
        };
        checkAuth();
    }, [token, validateToken, logout, router]); // Token change will re-trigger token validation

    // Fetch user details: Only fetch if not already fetched
    useEffect(() => {
        const fetchUser = async () => {
            if (!isUserFetched && token) {
                setLoading(true); // Set loading to true while fetching
                try {
                    await fetchUserDetails(token); // Fetch user data only if not already fetched
                    setIsUserFetched(true);
                } catch (err) {
                    console.error("Failed to fetch user details:", err);
                    logout();
                } finally {
                    setLoading(false); // Set loading to false once data is fetched
                }
            }
        };
        fetchUser();
    }, [token, fetchUserDetails, isUserFetched, logout]);

    // Open Modal
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
        setfirst_name("");
        setConfirmfirst_name("");
        setlast_name("");
        setConfirmlast_name("");
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
            if (token) await fetchUserDetails(token); // Refresh user details after successful update
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
        if (first_name !== confirmfirst_name || last_name !== confirmlast_name) {
            throw new Error("Name fields do not match.");
        }
        const response = await axios.put(
            "/api/user/updateName",
            { first_name, last_name },
            { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        if (response.status !== 200) {
            throw new Error(response.data.error || "Failed to update name.");
        }
        setfirst_name(first_name);
        setlast_name(last_name);
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

    // If not authenticated, show a redirect message
    if (!isAuthenticated || !user) {
        console.log("User is not authenticated. Hiding header.");
        return null;
    }

    // Show loading state until user details are fetched
    if (loading) {
        return <p>Loading...</p>;
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
                            {/* Display "First Last" if user data is available */}
                            {user?.first_name && user?.last_name
                                ? `${user.first_name} ${user.last_name} ✏️`
                                : "USERNAME ✏️"}
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
                            📱 {user?.phone
                                ? `(${user.phone.toString().slice(0, 3)}) ${user.phone.toString().slice(3, 6)}-${user.phone.toString().slice(6)}`
                                : "(xxx) xxx - xxxx"} ✏️
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
                    first_name={first_name}
                    setfirst_name={setfirst_name}
                    confirmfirst_name={confirmfirst_name}
                    setConfirmfirst_name={setConfirmfirst_name}
                    last_name={last_name}
                    setlast_name={setlast_name}
                    confirmlast_name={confirmlast_name}
                    setConfirmlast_name={setConfirmlast_name}
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
