import React from "react";
import styles from "./AddButton.module.scss";

type AddButtonProps = {
  onClick: () => void; // Specifies that onClick must be a function
};

const AddButton: React.FC<AddButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.addButton} onClick={onClick}>
      <span>+</span>
    </button>
  );
};

export default AddButton;
