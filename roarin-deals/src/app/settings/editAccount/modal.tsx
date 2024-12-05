import React from 'react';
import styles from './modal.module.scss';
import CloseButton from '@/app/_components/Buttons/CloseButton/CloseButton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  error?: string;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, error, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalCloseButton}>
          <CloseButton onClick={onClose} />
        </div>
        <header className={styles.modalHeader}>
          <h2>{title}</h2>
        </header>
        <div className={styles.modalBody}>
          {error && <p className={styles.error}>{error}</p>}
          {children}
        </div>
        <footer className={styles.modalFooter}>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
