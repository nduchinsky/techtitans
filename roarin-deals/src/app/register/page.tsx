import React from 'react';
import styles from './Register.module.scss';
import Link from 'next/link';
import PlainHeader from '../_components/Headers/PlainHeader/PlainHeader';

const Register: React.FC = () => {
  return (
    <>
        <PlainHeader />
        <div className={styles.pageContainer}>
            <div className={styles.formContainer}>
                <h2 className={styles.formHeader}>Register</h2>
                    <form>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel} htmlFor="username">Username</label>
                            <div className={styles.inputGroup}>
                                <input type="text" id="username" placeholder="Enter your username" />
                                <div className={styles.divider}></div>
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

                        <div className={styles.registerBtnContainer}>
                            <button type="submit" className={styles.registerBtn}>REGISTER</button>
                        </div>

                        <p className={styles.loginText}>
                            OR login using <span className={styles.lineBreak} /> 
                            <Link href="/login" className={styles.loginLink}>LOGIN</Link>
                        </p>
                    </form>
            </div>
        </div>
    </>
  );
};

export default Register;

