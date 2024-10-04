import React, { useState } from 'react';
import Header from './_components/Header/Header'; 
import Footer from './_components/Footer/Footer'; 
import './new_product/css/sellItems.css'; 

const SellItemPage: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImage(files[0]);
        }
    };

    return (
        <div className="container">
            <Header />
            <div className="upload-container">
                <div className="upload-box">
                    <div className="image-upload">
                        <div className="upload-placeholder">
                            <span>&uarr;</span>
                            <p>Upload Image(s)</p>
                        </div>
                        <input type="file" className="upload-input" multiple onChange={handleImageUpload} />
                    </div>
                    <div className="form">
                        <input type="text" placeholder="Name" className="input" />
                        <input type="text" placeholder="Description" className="input" />
                        <input type="text" placeholder="$ | Selling Price" className="input" />
                        <div className="tags">
                            <p>Apply relevant tags</p>
                            <div className="tag-buttons">
                                <button className="tag">Furniture</button>
                                <button className="tag">Electronics</button>
                                <button className="tag">Books</button>
                                <button className="tag">Clothing</button>
                                <button className="tag">Home Goods</button>
                                <button className="tag">Appliances</button>
                                <button className="tag">Miscellaneous</button>
                            </div>
                        </div>
                        <button className="submit-btn">Save & Upload</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SellItemPage;
