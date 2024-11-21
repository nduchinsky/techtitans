import React, { useRef } from 'react';
import styles from './AddImageContainer.module.scss';
import { FiUpload } from "react-icons/fi";

const PopupImageContainer = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            console.log('Selected files:', files);
            // handle the file uploads here
        }
    };

    return(
        <div className={styles.pageContainer}>
            <div className={styles.imageContainer}>
                <FiUpload className={styles.icon} />
            </div>
            <div>
                <button 
                    className={styles.uploadButton} 
                    onClick={handleUploadClick}
                >
                    Upload Images
                </button>
                {/* Hidden file input for image upload */}
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    style={{ display: 'none' }} 
                    accept="image/*" 
                    multiple 
                />
            </div>
        </div>
    );
}

export default PopupImageContainer;
