import React, { useState } from 'react';
import PlainHeader from '../_components/Headers/PlainHeader/PlainHeader';
import Footer from "../_components/Footer/Footer";
import './new_product/css/sellItems.css'; 


const SellItemPage: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImage(files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
    };

    return (
        <div className="container">
            <PlainHeader />
            <div className="upload-container">
                <div className="upload-box">
                    <div className="image-upload">
                        <div className="upload-placeholder">
                            <span>&uarr;</span>
                            <p>Upload Image(s)</p>
                        </div>
                        <input type="file" className="upload-input" multiple onChange={handleImageUpload} />
                    </div>
                    <form className="form" onSubmit={handleSubmit}>
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
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SellItemPage;
