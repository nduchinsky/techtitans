import React, { useRef, useState } from 'react';
import styles from './AddImageContainer.module.scss';
import { FiUpload } from "react-icons/fi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PopupImageContainer = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const newImages = Array.from(files).map((file) =>
                URL.createObjectURL(file)
            );
            setImages((prevImages) => [...prevImages, ...newImages]);
        }
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.imageContainer}>
                {images.length > 0 ? (
                    <img
                        src={images[currentIndex]}
                        alt={`Preview ${currentIndex + 1}`}
                        className={styles.previewImage}
                    />
                ) : (
                    <FiUpload className={styles.icon} />
                )}
            </div>
            {images.length > 1 && (
                <div className={styles.navigation}>
                    <button className={styles.arrowButton} onClick={handlePrevious}>
                        <FaArrowLeft />
                    </button>
                    <button className={styles.arrowButton} onClick={handleNext}>
                        <FaArrowRight />
                    </button>
                </div>
            )}
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
};

export default PopupImageContainer;
