// modal.tsx

import React from 'react';
import styles from './modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void; // Adjusted to remove unnecessary parameters
  title: string;
  children: React.ReactNode;
  error?: string; // New prop for error message
}

export default function Modal({ isOpen, onClose, onSubmit, title, children, error }: ModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(); // Trigger the submission from parent component
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>✖️</button>
        <div className={styles.modalHeader}>{title}</div>

        <form onSubmit={handleSubmit}>
          {children}
          {error && <p className={styles.errorText}>{error}</p>} {/* Display error if it exists */}
          <button type="submit" className={styles.submitButton}>Submit</button> {/* Submit button */}
        </form>
      </div>
    </div>
  );
}
