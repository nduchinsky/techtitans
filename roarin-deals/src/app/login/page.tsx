"use client";

import React, { useState, useEffect } from "react";
import styles from "./Login.module.scss";
import Link from "next/link";
import PlainHeader from "../_components/Headers/PlainHeader/PlainHeader";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Field values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Touched states for real-time validation
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [error, setError] = useState("");

  const router = useRouter();
  const { login } = useAuth(); // Use login from AuthContext

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectTo = params.get("redirectTo");
    console.log("Redirect target after login:", redirectTo || "/listings");
  }, []);

  // Validation functions
  const validateEmail = (value: string) => {
    if (value.trim() === "") {
      return "Email is required.";
    }
    return "";
  };

  const validatePassword = (value: string) => {
    if (value.trim() === "") {
      return "Password is required.";
    }
    return "";
  };

  // Event handlers for email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailTouched) {
      setEmailError(validateEmail(value));
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setEmailError(validateEmail(email));
  };

  // Event handlers for password
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordTouched) {
      setPasswordError(validatePassword(value));
    }
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
    setPasswordError(validatePassword(password));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Mark fields as touched
    setEmailTouched(true);
    setPasswordTouched(true);

    // Validate fields
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);

    // Check if there are any errors
    if (emailValidationError || passwordValidationError) {
      setError("Please fix the errors above.");
      return;
    }

    // Clear previous error
    setError("");

    const emailWithoutDomain = email.split("@")[0];
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailWithoutDomain, password }),
      });

      console.log("Response status:", response.status);

      const contentType = response.headers.get("content-type");
      console.log("Content-Type:", contentType);

      if (response.ok && contentType && contentType.includes("application/json")) {
        const data = await response.json();

        // Use login method to store the token and update authentication state
        login(data.token);

        // Check for a redirect query parameter
        const params = new URLSearchParams(window.location.search);
        const redirectTo = params.get("redirectTo") || "/listings";
        router.push(redirectTo); // Redirect to the intended or default page
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error("There was an error logging you in. Please try again." + error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <>
      <PlainHeader />
      <div className={styles.pageContainer}>
        <div className={styles.formContainer}>
          <h2 className={styles.formHeader}>Login</h2>
          <form onSubmit={handleSubmit}>
            {/* University Email Field */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="username">
                University Email
              </label>
              <div className={styles.inputGroup}>
                <input
                  className={emailError ? styles.invalidInput : ""}
                  type="text"
                  id="username"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                />
                <div className={styles.divider}></div>
                <span>@umsystem.edu</span>
              </div>
              {emailError && <p className={styles.fieldError}>{emailError}</p>}
            </div>

            {/* Password Field */}
            <div className={styles.formGroup}>
              <label className={styles.formLabel} htmlFor="password">
                Password
              </label>
              <div className={styles.passwordInputGroup}>
                <input
                  className={`${styles.inputBox} ${passwordError ? styles.invalidInput : ""}`}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={handlePasswordBlur}
                />
                <span className={styles.eyeIcon} onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {passwordError && <p className={styles.fieldError}>{passwordError}</p>}
            </div>

            {/* General Error Message */}
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.loginBtnContainer}>
              <button type="submit" className={styles.loginBtn}>
                LOGIN
              </button>
            </div>

            <p className={styles.loginText}>
              OR register using <span className={styles.lineBreak} />
              <Link href="/register" className={styles.registerLink}>
                REGISTER
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
