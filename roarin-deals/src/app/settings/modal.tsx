// src/components/Modal.tsx

"use client";

import React from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, onSubmit, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>✖️</button>
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
          {children}
          <button type="submit">Submit Changes</button>
        </form>
      </div>
    </div>
  );
}
