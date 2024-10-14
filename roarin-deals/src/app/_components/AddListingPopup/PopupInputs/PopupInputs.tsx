import { useState } from 'react';
import styles from './PopupInputs.module.scss'
import { FaDollarSign } from "react-icons/fa";


const PopupInputs = () => {

    // State to hold input values
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      name,
      description,
      price,
    };
    console.log('Submitted Data:', formData);
    // You can also add logic to send formData to your API or handle it as needed
    // Resetting form fields
    setName('');
    setDescription('');
    setPrice('');
  };
    return(
        <div>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              id="name"
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.input}
            />
          </div>
  
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              id="description"
              value={description}
              placeholder='Description'
              onChange={(e) => setDescription(e.target.value)}
              required
              className={styles.input}
            />
          </div>
  
          <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
            <FaDollarSign style={{ marginRight: '8px', alignItems: 'center' }} />
            <input
                type="number"
                id="price"
                placeholder="Selling Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className={styles.input}
                style={{ flex: 1 }} // Optional: Makes the input take remaining space
            />
            </div>
  
          <button type="submit" className={styles.submitButton}>
            Save and Upload
          </button>
        </form>
      </div>
    );
}

export default PopupInputs;