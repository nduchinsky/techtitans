import React from 'react';
import styles from './Login.module.scss';

const Login: React.FC = () => {
  return (
    <div className={styles.formContainer}>
      <h2>Register</h2>
      <form>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <div className={styles.inputGroup}>
            <input type="text" id="username" placeholder="Enter your username" />
            <span>@umsystem.edu</span>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="username-confirm"></label>
          <input type="text" id="username-confirm" placeholder="Enter your username again" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password-confirm"></label>
          <input type="password" id="password-confirm" placeholder="Enter your password again" />
        </div>

        <button type="submit" className={styles.registerBtn}>REGISTER</button>

        <p className={styles.loginText}>
          OR login using <br /> <a href="#">LOGIN</a>
        </p>
      </form>
    </div>
  );
};

export default Login;

