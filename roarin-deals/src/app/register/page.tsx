import React from 'react';
import styles from './Register.module.scss';

const Register: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
        <div className={styles.formContainer}>
        <h2 className={styles.formHeader}>Register</h2>
            <form>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="username">Username</label>
                    <div className={styles.inputGroup}>
                        <input type="text" id="username" placeholder="Enter your username" />
                        <span>@umsystem.edu</span>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="username-confirm"></label>
                    <input className={styles.inputBox} type="text" id="username-confirm" placeholder="Enter your username again" />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.formLabel} htmlFor="password">Password</label>
                    <input className={styles.inputBox} type="password" id="password" placeholder="Enter your password" />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password-confirm"></label>
                    <input className={styles.inputBox} type="password" id="password-confirm" placeholder="Enter your password again" />
                </div>

                <button type="submit" className={styles.registerBtn}>REGISTER</button>

                <p className={styles.loginText}>
                OR login using <br /> <a href="#">LOGIN</a>
                </p>
            </form>
        </div>
    </div>
  );
};

export default Register;

