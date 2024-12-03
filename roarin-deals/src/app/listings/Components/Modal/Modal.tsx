import React from "react";
import styles from "./Modal.module.scss";

type ModalProps = {
  children: React.ReactNode; // Specifies that children can be any valid React node
  onClose: () => void; // Specifies that onClose must be a function
};

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()} // Prevent closing the modal when clicking inside
      >
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;


