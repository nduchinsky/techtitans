// modal.tsx
import React from 'react';
import styles from './modal.module.scss';
import styleSet from '../modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  error?: string;
  children?: React.ReactNode; // Accepts children to delegate content rendering
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, error, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.modalCloseButton} onClick={onClose}>&times;</button>
        <header className={styles.modalHeader}>
          <h2>{title}</h2>
        </header>
        <div className={styles.modalBody}>
          {error && <p className={styles.error}>{error}</p>}
          {children} {/* Render the dynamic content */}
        </div>
        <footer className={styles.modalFooter}>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
