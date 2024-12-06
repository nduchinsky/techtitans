"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import styles from "../settings.module.scss";
import placeholderImage from "../placeholder.png";
import zxcvbn from "zxcvbn";
import { useAuth } from "../../../../context/AuthContext";
import { useRouter } from "next/navigation";
import LoggedInHeader from "../../_components/Headers/LoggedInHeader/LoggedInHeader";
import AddButton from "../../_components/Buttons/AddButton/AddButton";
import ModalContent from "./modalContent";
import Modal from "./modal";


export default function EditAccount() {
    
    const { isAuthenticated, user, validateToken, logout, fetchUserDetails, token } = useAuth();
    const router = useRouter();

    // State hooks to manage various fields and modal states
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<string>("");
    const [error, setError] = useState("");
    const [first_name, setfirst_name] = useState(user?.first_name || "");
    const [last_name, setlast_name] = useState(user?.last_name || "");
    const [confirmfirst_name, setConfirmfirst_name] = useState("");
    const [confirmlast_name, setConfirmlast_name] = useState("");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [confirmPhone, setConfirmPhone] = useState("");
    const [password, setPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordScore, setPasswordScore] = useState(0);
    const [passwordFeedback, setPasswordFeedback] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [confirmValue, setConfirmValue] = useState("");

    const [isUserFetched, setIsUserFetched] = useState(false);
    const [loading, setLoading] = useState(true);

    const [listings, setListings] = useState<Array<{ id: number; title: string; description: string; image?: string }>>([
        { id: 1, title: "Sample Product 1", description: "Description for Product 1", image: placeholderImage.src },
        { id: 2, title: "Sample Product 2", description: "Description for Product 2", image: placeholderImage.src },
        { id: 3, title: "Sample Product 3", description: "Description for Product 3", image: placeholderImage.src },
    ]);
    
    useEffect(() => {
    }, [user]);

    useEffect(() => {
        const checkAuth = async () => {
            if (token) {
                const isValid = await validateToken(token);
                if (!isValid) {
                    logout();
                    router.push("/");
                }
            } else {
                logout();
                router.push("/");
            }
        };
        checkAuth();
    }, [token, validateToken, logout, router]);

    useEffect(() => {
        const fetchUser = async () => {
            if (!isUserFetched && token) {
                setLoading(true);
                try {
                    await fetchUserDetails(token);
                    setIsUserFetched(true);
                } catch (err) {
                    logout();
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchUser();
    }, [token, fetchUserDetails, isUserFetched, logout]);

    const openModal = (type: string) => {
        setModalType(type);
        setModalOpen(true);
        resetForm();
    };

    const closeModal = () => {
        setModalType("");
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
        setCurrentPassword("");
    };

    const handleModalSubmit = async () => {
        const payload: Record<string, string | undefined> = {};
        setError("");
    
        try {
            if (modalType === "name") {
                if (first_name !== confirmfirst_name || last_name !== confirmlast_name) {
                    setError("First and last names must match their confirmation fields.");
                    return;
                }
                payload.first_name = first_name;
                payload.last_name = last_name;
            } else if (modalType === "email") {
                if (inputValue !== confirmValue) {
                    setError("Emails do not match.");
                    return;
                }
                payload.email = inputValue;
            } else if (modalType === "phone") {
                if (phone !== confirmPhone) {
                    setError("Phone numbers do not match.");
                    return;
                }
                payload.phone = phone;
            } else if (modalType === "password") {
                if (password !== confirmPassword) {
                    setError("Passwords do not match.");
                    return;
                }
                if (!currentPassword) {
                    setError("Current password is required.");
                    return;
                }
                payload.currentPassword = currentPassword;
                payload.newPassword = password;
            } else {
                setError("Invalid modal type.");
                return;
            }
    
            // Send API request
            const response = await fetch("api/settings", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token || ""}`,
                },
                body: JSON.stringify(payload),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || "Failed to update user details.");
                return;
            }
    
            closeModal();
            await fetchUserDetails(token || "");
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
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
            case "post-options":
                return "Post Title";
            default:
                return "";
        }
    };

    const getStrengthColor = (score: number) => {
        const colors = ["#ff4d4d", "#ff751a", "#ffb31a", "#85e085", "#00cc44"];
        return colors[score] || "#e0e0e0";
    };

    if (!isAuthenticated || !user) {
        return null;
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    const handleEditAccountClick = () => {
        router.push('/settings/editAccount');
    }

    const handleMyOrdersClick = () => {
        router.push('/settings/myOrders');
    }

    const handleSalesHistoryClick = () => {
        router.push('/settings/salesHistory');
    }

    return (
    <div>
    <LoggedInHeader />

    <div className={styles.settingsContainer}>
        <div className={styles.sidebar}>
            <button className={styles.editAccountButton} onClick={handleEditAccountClick}>Edit Account</button>
            <button className={styles.myOrdersButton} onClick={handleMyOrdersClick}>My Orders</button>
            <button className={styles.salesHistoryButton} onClick={handleSalesHistoryClick}>Sales History</button>
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
                        Edit profile image
                    </button>
                </div>
                <div className={styles.userInfo}>
                    <button
                        className={styles.editButton}
                        onClick={() => openModal("name")}
                        style={{ fontSize: "2rem" }}
                    >
                        {user?.first_name && user?.last_name
                            ? `${user.first_name} ${user.last_name}`
                            : "USERNAME"}
                    </button>
                    <button
                        className={styles.editButton}
                        onClick={() => openModal("email")}
                        style={{ fontSize: "1rem" }}
                    >
                       {user?.email || "username@umsystem.edu"}
                    </button>
                    <button
                        className={styles.editButton}
                        onClick={() => openModal("phone")}
                        style={{ fontSize: "1rem" }}
                    >
                        {user?.phone
                            ? `(${user.phone.toString().slice(0, 3)}) ${user.phone
                                .toString()
                                .slice(3, 6)}-${user.phone.toString().slice(6)}`
                            : "(xxx) xxx - xxxx"}
                    </button>
                    <button
                        className={styles.editButton}
                        onClick={() => openModal("password")}
                        style={{ fontSize: "1rem" }}
                    >
                        Change Password
                    </button>
                </div>
            </div>

            <h2 className={styles.myListingsText}>MY LISTINGS</h2>
            {/* Listings Section */}
            <div className={styles.listingsSection}>
                <div className={styles.productsGrid}>
                    {/* Render each listing */}
                    {listings.map((listing, index) => (
                        <div key={index} className={styles.productCard} onClick={() => openModal("post-options")}>
                            <Image
                                src={listing.image || placeholderImage}
                                alt={listing.title || "Listing"}
                                width={200}
                                height={150}
                                className={styles.productImage}
                            />
                            <div className={styles.productDetails}>
                                <h3 className={styles.productName}>{listing.title || "Product Name"}</h3>
                                <p className={styles.productLocation}>
                                    {listing.description || "Product Description"}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Add New Listing Button */}
                    <div className={styles.addListingBox}>
                        <AddButton />
                    </div>
                </div>
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
            modalType={modalType}
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
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
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
